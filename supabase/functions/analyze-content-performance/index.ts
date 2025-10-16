// Phase 11: Advanced AI & Analytics - Content Performance Analysis Edge Function
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { corsHeaders } from "../_shared/cors.ts";

interface ContentAnalysis {
	user_id: string;
	brand_id?: string;
	analysis_type:
		| "performance_review"
		| "trend_analysis"
		| "optimization_suggestions";
	timeframe_days?: number;
}

interface PerformancePattern {
	content_type: string;
	avg_performance: number;
	trend: "improving" | "declining" | "stable";
	sample_count: number;
	top_performers: any[];
}

// AI Provider for content analysis
async function analyzeContentWithAI(
	contentData: any[],
	analysisType: string,
): Promise<string> {
	try {
		// Use OpenAI for content analysis
		const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
		if (!openaiApiKey) {
			throw new Error("OpenAI API key not configured");
		}

		const prompt = generateAnalysisPrompt(contentData, analysisType);

		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${openaiApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "gpt-4",
				messages: [
					{
						role: "system",
						content:
							"You are an expert social media analyst specializing in content performance optimization. Provide actionable, data-driven insights based on engagement metrics and content patterns.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
				max_tokens: 1000,
				temperature: 0.3,
			}),
		});

		if (!response.ok) {
			throw new Error(`OpenAI API error: ${response.status}`);
		}

		const data = await response.json();
		return data.choices[0]?.message?.content || "Unable to generate analysis";
	} catch (error) {
		console.error("AI analysis error:", error);
		// Fallback to basic analysis
		return generateBasicAnalysis(contentData, analysisType);
	}
}

function generateAnalysisPrompt(
	contentData: any[],
	analysisType: string,
): string {
	const dataJson = JSON.stringify(contentData.slice(0, 20), null, 2); // Limit data size

	switch (analysisType) {
		case "performance_review":
			return `Analyze this social media content performance data and provide insights on:
1. Top performing content patterns
2. Common characteristics of high-engagement posts
3. Platform-specific performance differences
4. Content timing patterns

Data: ${dataJson}

Provide specific, actionable recommendations for improving content performance.`;

		case "trend_analysis":
			return `Analyze trends in this social media content data:
1. Performance trends over time
2. Emerging content patterns
3. Declining engagement areas
4. Opportunity identification

Data: ${dataJson}

Focus on identifying actionable trends and future content direction.`;

		case "optimization_suggestions":
			return `Based on this content performance data, provide optimization suggestions:
1. Content format recommendations
2. Posting time optimizations
3. Engagement strategy improvements
4. Platform-specific adjustments

Data: ${dataJson}

Provide 3-5 specific, implementable recommendations.`;

		default:
			return `Analyze this social media content data and provide insights: ${dataJson}`;
	}
}

function generateBasicAnalysis(
	contentData: any[],
	analysisType: string,
): string {
	if (contentData.length === 0) {
		return "Insufficient data for analysis. Continue creating content to receive insights.";
	}

	const avgEngagement =
		contentData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) /
		contentData.length;

	const topPerformer = contentData.reduce(
		(best, current) =>
			(current.performance_score || 0) > (best.performance_score || 0)
				? current
				: best,
		contentData[0],
	);

	return `Basic Performance Analysis:
- Average engagement rate: ${(avgEngagement * 100).toFixed(2)}%
- Top performing content scored ${topPerformer.performance_score || 0}/100
- Analyzed ${contentData.length} posts
- Recommendation: Focus on content similar to your top performers for better engagement.`;
}

Deno.serve(async (req) => {
	// Handle CORS preflight requests
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		const supabase = createClient(
			Deno.env.get("SUPABASE_URL") ?? "",
			Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
		);

		const analysisRequest: ContentAnalysis = await req.json();
		const {
			user_id,
			brand_id,
			analysis_type,
			timeframe_days = 30,
		} = analysisRequest;

		if (!user_id || !analysis_type) {
			return new Response(
				JSON.stringify({ error: "user_id and analysis_type are required" }),
				{
					status: 400,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Get user's content and analytics data
		const timeframeStart = new Date();
		timeframeStart.setDate(timeframeStart.getDate() - timeframe_days);

		let query = supabase
			.from("generated_posts")
			.select(`
        *,
        post_analytics (*)
      `)
			.eq("user_id", user_id)
			.gte("created_at", timeframeStart.toISOString())
			.order("created_at", { ascending: false });

		if (brand_id) {
			query = query.eq("brand_id", brand_id);
		}

		const { data: contentData, error: contentError } = await query;

		if (contentError) {
			console.error("Content fetch error:", contentError);
			return new Response(
				JSON.stringify({ error: "Failed to fetch content data" }),
				{
					status: 500,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		if (!contentData || contentData.length === 0) {
			return new Response(
				JSON.stringify({
					error: "No content found for analysis",
					recommendation: "Create more content to receive performance insights",
				}),
				{
					status: 404,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Process and analyze content data
		const processedData = contentData.map((post) => ({
			id: post.id,
			content: post.content,
			platform: post.target_platforms,
			created_at: post.created_at,
			performance_score: post.post_analytics?.[0]?.performance_score || 0,
			engagement_rate: post.post_analytics?.[0]?.engagement_rate || 0,
			views: post.post_analytics?.[0]?.views_count || 0,
			likes: post.post_analytics?.[0]?.likes_count || 0,
			shares: post.post_analytics?.[0]?.shares_count || 0,
			comments: post.post_analytics?.[0]?.comments_count || 0,
		}));

		// Generate AI analysis
		const aiAnalysis = await analyzeContentWithAI(processedData, analysis_type);

		// Calculate performance patterns
		const patterns = calculatePerformancePatterns(processedData);

		// Generate specific insights
		const insights = generateInsights(processedData, patterns, analysis_type);

		// Store insights in database
		for (const insight of insights) {
			await supabase.from("content_insights").insert({
				user_id,
				brand_id,
				insight_type: insight.type,
				title: insight.title,
				description: insight.description,
				recommendation: insight.recommendation,
				data_points: insight.data_points,
				confidence_score: insight.confidence_score,
			});
		}

		return new Response(
			JSON.stringify({
				success: true,
				analysis: {
					type: analysis_type,
					timeframe_days,
					content_count: processedData.length,
					ai_analysis: aiAnalysis,
					performance_patterns: patterns,
					insights: insights,
				},
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Content analysis error:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to analyze content performance",
				details: error.message,
			}),
			{
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	}
});

function calculatePerformancePatterns(
	contentData: any[],
): PerformancePattern[] {
	const patterns: PerformancePattern[] = [];

	// Group by content characteristics
	const platformGroups = groupBy(contentData, "platform");
	const hourGroups = groupBy(
		contentData.map((item) => ({
			...item,
			hour: new Date(item.created_at).getHours(),
		})),
		"hour",
	);

	// Analyze platform performance
	Object.entries(platformGroups).forEach(([platform, posts]) => {
		if (posts.length >= 3) {
			const avgPerformance =
				posts.reduce((sum, post) => sum + (post.performance_score || 0), 0) /
				posts.length;

			const sortedPosts = posts.sort(
				(a, b) => (b.performance_score || 0) - (a.performance_score || 0),
			);

			patterns.push({
				content_type: `Platform: ${platform}`,
				avg_performance: avgPerformance,
				trend: calculateTrend(posts),
				sample_count: posts.length,
				top_performers: sortedPosts.slice(0, 3),
			});
		}
	});

	return patterns;
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
	return array.reduce(
		(groups, item) => {
			const groupKey = String(item[key]);
			groups[groupKey] = groups[groupKey] || [];
			groups[groupKey].push(item);
			return groups;
		},
		{} as Record<string, T[]>,
	);
}

function calculateTrend(posts: any[]): "improving" | "declining" | "stable" {
	if (posts.length < 2) return "stable";

	const sortedPosts = posts.sort(
		(a, b) =>
			new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
	);

	const firstHalf = sortedPosts.slice(0, Math.floor(sortedPosts.length / 2));
	const secondHalf = sortedPosts.slice(Math.floor(sortedPosts.length / 2));

	const firstAvg =
		firstHalf.reduce((sum, post) => sum + (post.performance_score || 0), 0) /
		firstHalf.length;
	const secondAvg =
		secondHalf.reduce((sum, post) => sum + (post.performance_score || 0), 0) /
		secondHalf.length;

	const change = (secondAvg - firstAvg) / firstAvg;

	if (change > 0.1) return "improving";
	if (change < -0.1) return "declining";
	return "stable";
}

function generateInsights(
	contentData: any[],
	patterns: PerformancePattern[],
	analysisType: string,
): any[] {
	const insights = [];

	// Best performing platform insight
	const bestPlatform = patterns.reduce(
		(best, current) =>
			current.avg_performance > best.avg_performance ? current : best,
		patterns[0],
	);

	if (bestPlatform) {
		insights.push({
			type: "optimization",
			title: "Top Performing Platform",
			description: `${bestPlatform.content_type} shows highest average performance`,
			recommendation: `Focus more content creation on ${bestPlatform.content_type.split(": ")[1]}`,
			data_points: { avg_performance: bestPlatform.avg_performance },
			confidence_score: 0.8,
		});
	}

	// Content timing insight
	const timeGroups = groupBy(
		contentData.map((item) => ({
			...item,
			hour: new Date(item.created_at).getHours(),
		})),
		"hour",
	);

	const bestHour = Object.entries(timeGroups)
		.filter(([_, posts]) => posts.length >= 2)
		.reduce(
			([bestHour, bestPosts], [hour, posts]) => {
				const avgPerformance =
					posts.reduce((sum, post) => sum + (post.performance_score || 0), 0) /
					posts.length;
				const bestAvg =
					bestPosts.reduce(
						(sum, post) => sum + (post.performance_score || 0),
						0,
					) / bestPosts.length;
				return avgPerformance > bestAvg ? [hour, posts] : [bestHour, bestPosts];
			},
			["0", []],
		);

	if (bestHour[1].length > 0) {
		insights.push({
			type: "timing",
			title: "Optimal Posting Time",
			description: `Posts published around ${bestHour[0]}:00 perform better`,
			recommendation: `Schedule more content between ${bestHour[0]}:00-${(parseInt(bestHour[0]) + 1) % 24}:00`,
			data_points: { optimal_hour: parseInt(bestHour[0]) },
			confidence_score: 0.7,
		});
	}

	return insights;
}

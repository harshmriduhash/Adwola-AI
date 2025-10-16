// Phase 11: Advanced AI & Analytics - Optimal Posting Times Calculation Edge Function
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { corsHeaders } from "../_shared/cors.ts";

interface OptimalTimesRequest {
	user_id: string;
	brand_id?: string;
	platform?: string;
	timeframe_days?: number;
	timezone?: string;
}

interface TimeSlotData {
	day_of_week: number;
	hour_of_day: number;
	post_count: number;
	total_engagement: number;
	avg_engagement_rate: number;
	performance_scores: number[];
}

interface OptimalTimeRecommendation {
	day_of_week: number;
	hour_of_day: number;
	avg_engagement_rate: number;
	confidence_score: number;
	recommendation_strength: "low" | "moderate" | "high";
	sample_size: number;
}

// AI-powered time analysis
async function analyzeTimingWithAI(
	timeSlotData: TimeSlotData[],
	platform: string,
): Promise<string> {
	try {
		const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
		if (!openaiApiKey) {
			throw new Error("OpenAI API key not configured");
		}

		const topSlots = timeSlotData
			.sort((a, b) => b.avg_engagement_rate - a.avg_engagement_rate)
			.slice(0, 10);

		const prompt = `Analyze these optimal posting times for ${platform} and provide strategic insights:

TOP PERFORMING TIME SLOTS:
${JSON.stringify(
	topSlots.map((slot) => ({
		day: getDayName(slot.day_of_week),
		hour: slot.hour_of_day,
		engagement_rate: (slot.avg_engagement_rate * 100).toFixed(2) + "%",
		sample_size: slot.post_count,
	})),
	null,
	2,
)}

Provide analysis covering:
1. TIMING PATTERNS: What patterns do you see in the data?
2. AUDIENCE BEHAVIOR: What does this tell us about the audience?
3. PLATFORM INSIGHTS: How does this align with ${platform} best practices?
4. OPTIMIZATION STRATEGY: How to leverage these insights?

Keep recommendations practical and actionable.`;

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
							"You are a social media timing optimization expert. Analyze posting time data to provide strategic scheduling recommendations.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
				max_tokens: 800,
				temperature: 0.3,
			}),
		});

		if (!response.ok) {
			throw new Error(`OpenAI API error: ${response.status}`);
		}

		const data = await response.json();
		return (
			data.choices[0]?.message?.content || "Unable to generate timing analysis"
		);
	} catch (error) {
		console.error("AI timing analysis error:", error);
		return generateBasicTimingAnalysis(timeSlotData, platform);
	}
}

function generateBasicTimingAnalysis(
	timeSlotData: TimeSlotData[],
	platform: string,
): string {
	if (timeSlotData.length === 0) {
		return "Insufficient data for timing analysis. Continue posting to get optimal time recommendations.";
	}

	const bestSlot = timeSlotData.reduce(
		(best, current) =>
			current.avg_engagement_rate > best.avg_engagement_rate ? current : best,
		timeSlotData[0],
	);

	const dayName = getDayName(bestSlot.day_of_week);
	const timeStr = formatHour(bestSlot.hour_of_day);

	return `Timing Analysis for ${platform}:
- Best performing time: ${dayName} at ${timeStr}
- Engagement rate: ${(bestSlot.avg_engagement_rate * 100).toFixed(2)}%
- Based on ${bestSlot.post_count} posts
- Recommendation: Schedule more content around this time for better engagement.`;
}

function getDayName(dayNumber: number): string {
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return days[dayNumber] || "Unknown";
}

function formatHour(hour: number): string {
	if (hour === 0) return "12:00 AM";
	if (hour < 12) return `${hour}:00 AM`;
	if (hour === 12) return "12:00 PM";
	return `${hour - 12}:00 PM`;
}

function calculateConfidenceScore(
	postCount: number,
	avgEngagement: number,
	platformAvg: number,
): number {
	// Base confidence on sample size
	let confidence = Math.min(postCount / 10, 1.0) * 0.6;

	// Boost confidence for significantly better performance
	if (avgEngagement > platformAvg * 1.2) {
		confidence += 0.3;
	} else if (avgEngagement > platformAvg * 1.1) {
		confidence += 0.2;
	} else if (avgEngagement > platformAvg) {
		confidence += 0.1;
	}

	return Math.min(confidence, 1.0);
}

function getRecommendationStrength(
	confidence: number,
): "low" | "moderate" | "high" {
	if (confidence >= 0.8) return "high";
	if (confidence >= 0.6) return "moderate";
	return "low";
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

		const timingRequest: OptimalTimesRequest = await req.json();
		const {
			user_id,
			brand_id,
			platform = "all",
			timeframe_days = 90,
			timezone = "UTC",
		} = timingRequest;

		if (!user_id) {
			return new Response(JSON.stringify({ error: "user_id is required" }), {
				status: 400,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			});
		}

		// Get user's historical post performance data
		const timeframeStart = new Date();
		timeframeStart.setDate(timeframeStart.getDate() - timeframe_days);

		let query = supabase
			.from("post_analytics")
			.select(`
        *,
        generated_posts!inner(user_id, created_at, target_platforms)
      `)
			.eq("generated_posts.user_id", user_id)
			.gte("published_at", timeframeStart.toISOString())
			.not("published_at", "is", null);

		if (platform !== "all") {
			query = query.eq("platform", platform);
		}

		if (brand_id) {
			query = query.eq("generated_posts.brand_id", brand_id);
		}

		const { data: analyticsData, error: fetchError } = await query;

		if (fetchError) {
			console.error("Data fetch error:", fetchError);
			return new Response(
				JSON.stringify({ error: "Failed to fetch analytics data" }),
				{
					status: 500,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		if (!analyticsData || analyticsData.length === 0) {
			return new Response(
				JSON.stringify({
					error: "Insufficient data for timing analysis",
					recommendation:
						"Continue posting content to receive optimal timing insights",
				}),
				{
					status: 404,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Group data by time slots
		const timeSlots: Map<string, TimeSlotData> = new Map();

		analyticsData.forEach((record) => {
			const publishedAt = new Date(record.published_at);
			const dayOfWeek = publishedAt.getDay();
			const hourOfDay = publishedAt.getHours();
			const key = `${record.platform}-${dayOfWeek}-${hourOfDay}`;

			if (!timeSlots.has(key)) {
				timeSlots.set(key, {
					day_of_week: dayOfWeek,
					hour_of_day: hourOfDay,
					post_count: 0,
					total_engagement: 0,
					avg_engagement_rate: 0,
					performance_scores: [],
				});
			}

			const slot = timeSlots.get(key)!;
			slot.post_count += 1;
			slot.total_engagement +=
				record.likes_count + record.shares_count + record.comments_count;
			slot.performance_scores.push(record.performance_score || 0);
		});

		// Calculate averages and recommendations
		const recommendations: OptimalTimeRecommendation[] = [];
		const platformStats: Record<string, any> = {};

		// Group by platform for analysis
		const platformGroups: Record<string, TimeSlotData[]> = {};

		timeSlots.forEach((slot, key) => {
			const [platform] = key.split("-");

			if (!platformGroups[platform]) {
				platformGroups[platform] = [];
			}

			// Calculate averages
			slot.avg_engagement_rate =
				slot.performance_scores.length > 0
					? slot.performance_scores.reduce((sum, score) => sum + score, 0) /
						slot.performance_scores.length /
						100
					: 0;

			platformGroups[platform].push(slot);
		});

		// Generate recommendations for each platform
		for (const [platformName, slots] of Object.entries(platformGroups)) {
			// Calculate platform average
			const platformAvgEngagement =
				slots.reduce((sum, slot) => sum + slot.avg_engagement_rate, 0) /
				slots.length;

			// Get top performing slots
			const topSlots = slots
				.filter((slot) => slot.post_count >= 2) // Minimum sample size
				.sort((a, b) => b.avg_engagement_rate - a.avg_engagement_rate)
				.slice(0, 10);

			// Create recommendations
			const platformRecommendations = topSlots.map((slot) => {
				const confidence = calculateConfidenceScore(
					slot.post_count,
					slot.avg_engagement_rate,
					platformAvgEngagement,
				);

				return {
					day_of_week: slot.day_of_week,
					hour_of_day: slot.hour_of_day,
					avg_engagement_rate: slot.avg_engagement_rate,
					confidence_score: confidence,
					recommendation_strength: getRecommendationStrength(confidence),
					sample_size: slot.post_count,
				};
			});

			recommendations.push(...platformRecommendations);

			// Generate AI analysis for this platform
			const aiAnalysis = await analyzeTimingWithAI(slots, platformName);
			platformStats[platformName] = {
				total_posts: slots.reduce((sum, slot) => sum + slot.post_count, 0),
				avg_engagement_rate: platformAvgEngagement,
				top_recommendations: platformRecommendations.slice(0, 5),
				ai_analysis: aiAnalysis,
			};
		}

		// Store optimal posting times in database
		for (const rec of recommendations) {
			await supabase.from("optimal_posting_times").upsert(
				{
					user_id,
					brand_id,
					platform: Object.keys(platformGroups)[0], // This would need to be more sophisticated for multi-platform
					day_of_week: rec.day_of_week,
					hour_of_day: rec.hour_of_day,
					avg_engagement_rate: rec.avg_engagement_rate,
					confidence_score: rec.confidence_score,
					recommendation_strength: rec.recommendation_strength,
					timezone,
					last_calculated_at: new Date().toISOString(),
				},
				{
					onConflict: "user_id,platform,day_of_week,hour_of_day",
				},
			);
		}

		// Generate timing insights
		const topRecommendation = recommendations.sort(
			(a, b) => b.confidence_score - a.confidence_score,
		)[0];

		if (topRecommendation) {
			await supabase.from("content_insights").insert({
				user_id,
				brand_id,
				insight_type: "timing",
				title: "Optimal Posting Time Identified",
				description: `Your content performs best on ${getDayName(topRecommendation.day_of_week)} at ${formatHour(topRecommendation.hour_of_day)}`,
				recommendation: `Schedule more content during this time window for ${(topRecommendation.avg_engagement_rate * 100).toFixed(1)}% better engagement`,
				confidence_score: topRecommendation.confidence_score,
				data_points: {
					optimal_day: topRecommendation.day_of_week,
					optimal_hour: topRecommendation.hour_of_day,
					engagement_improvement: topRecommendation.avg_engagement_rate,
				},
			});
		}

		return new Response(
			JSON.stringify({
				success: true,
				analysis: {
					timeframe_days,
					total_posts_analyzed: analyticsData.length,
					platforms_analyzed: Object.keys(platformStats),
					recommendations: recommendations.slice(0, 20), // Top 20 recommendations
					platform_insights: platformStats,
				},
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Optimal times calculation error:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to calculate optimal posting times",
				details: error.message,
			}),
			{
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	}
});

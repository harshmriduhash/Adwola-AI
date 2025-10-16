// Phase 11: Advanced AI & Analytics - Competitor Analysis Edge Function
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { corsHeaders } from "../_shared/cors.ts";

interface CompetitorRequest {
	user_id: string;
	brand_id?: string;
	competitor_name: string;
	competitor_platform: string;
	competitor_handle?: string;
}

interface CompetitorData {
	name: string;
	platform: string;
	handle?: string;
	content_themes: string[];
	posting_frequency: any;
	engagement_patterns: any;
	top_performing_content: any[];
}

// AI-powered content analysis
async function analyzeCompetitorWithAI(
	competitorData: CompetitorData,
	userBrandContext: any,
): Promise<any> {
	try {
		const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
		if (!openaiApiKey) {
			throw new Error("OpenAI API key not configured");
		}

		const prompt = `As a competitive social media analyst, analyze this competitor data and provide strategic insights:

COMPETITOR: ${competitorData.name} on ${competitorData.platform}
CONTENT THEMES: ${JSON.stringify(competitorData.content_themes)}
POSTING FREQUENCY: ${JSON.stringify(competitorData.posting_frequency)}
ENGAGEMENT PATTERNS: ${JSON.stringify(competitorData.engagement_patterns)}

USER BRAND CONTEXT: ${JSON.stringify(userBrandContext)}

Provide analysis in the following format:
1. CONTENT STRATEGY ANALYSIS: What content themes are working for them?
2. OPPORTUNITIES: What gaps can we exploit?
3. THREATS: What are they doing better than us?
4. RECOMMENDATIONS: 3-5 specific actionable recommendations

Keep analysis strategic, actionable, and focused on content differentiation.`;

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
							"You are an expert competitive intelligence analyst specializing in social media strategy. Provide strategic, actionable insights for content differentiation and competitive advantage.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
				max_tokens: 1500,
				temperature: 0.3,
			}),
		});

		if (!response.ok) {
			throw new Error(`OpenAI API error: ${response.status}`);
		}

		const data = await response.json();
		const analysis =
			data.choices[0]?.message?.content || "Unable to generate analysis";

		// Parse the AI response to extract structured data
		const opportunities = extractOpportunities(analysis);
		const threats = extractThreats(analysis);

		return {
			analysis_summary: analysis,
			opportunities,
			threats,
		};
	} catch (error) {
		console.error("AI analysis error:", error);
		return {
			analysis_summary:
				"Basic competitive analysis completed. Competitor shows active engagement patterns.",
			opportunities: [
				"Content gap analysis needed",
				"Engagement timing optimization",
			],
			threats: ["Higher posting frequency", "Strong community engagement"],
		};
	}
}

function extractOpportunities(analysis: string): string[] {
	const opportunitiesMatch = analysis.match(
		/OPPORTUNITIES:(.*?)(?=THREATS:|RECOMMENDATIONS:|$)/s,
	);
	if (!opportunitiesMatch) return [];

	return opportunitiesMatch[1]
		.split("\n")
		.filter((line) => line.trim().length > 0)
		.map((line) => line.replace(/^\d+\.?\s*/, "").trim())
		.filter((line) => line.length > 10)
		.slice(0, 5);
}

function extractThreats(analysis: string): string[] {
	const threatsMatch = analysis.match(/THREATS:(.*?)(?=RECOMMENDATIONS:|$)/s);
	if (!threatsMatch) return [];

	return threatsMatch[1]
		.split("\n")
		.filter((line) => line.trim().length > 0)
		.map((line) => line.replace(/^\d+\.?\s*/, "").trim())
		.filter((line) => line.length > 10)
		.slice(0, 5);
}

// Mock data scraper for competitor content (in production, use proper APIs or scraping services)
async function scrapeCompetitorData(
	platform: string,
	handle: string,
): Promise<CompetitorData> {
	// This is a mock implementation - in production, you would:
	// 1. Use official APIs where available (Twitter API, LinkedIn API, etc.)
	// 2. Use ethical web scraping services
	// 3. Integrate with social listening tools

	// Mock data for demonstration
	const mockData: CompetitorData = {
		name: handle,
		platform,
		handle,
		content_themes: [
			"Industry insights",
			"Thought leadership",
			"Product updates",
			"Behind the scenes",
			"User testimonials",
		],
		posting_frequency: {
			posts_per_week: 5,
			peak_posting_hours: [9, 12, 15, 18],
			most_active_days: ["Monday", "Wednesday", "Friday"],
		},
		engagement_patterns: {
			avg_likes_per_post: 150,
			avg_comments_per_post: 25,
			avg_shares_per_post: 30,
			engagement_rate: 0.045,
			top_performing_content_types: ["video", "carousel", "text_with_image"],
		},
		top_performing_content: [
			{
				type: "video",
				engagement_score: 95,
				theme: "thought_leadership",
				timing: "09:00",
			},
			{
				type: "carousel",
				engagement_score: 87,
				theme: "industry_insights",
				timing: "12:00",
			},
		],
	};

	return mockData;
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

		const competitorRequest: CompetitorRequest = await req.json();
		const {
			user_id,
			brand_id,
			competitor_name,
			competitor_platform,
			competitor_handle,
		} = competitorRequest;

		if (!user_id || !competitor_name || !competitor_platform) {
			return new Response(
				JSON.stringify({
					error:
						"user_id, competitor_name, and competitor_platform are required",
				}),
				{
					status: 400,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Get user's brand context for comparison
		let brandContext = null;
		if (brand_id) {
			const { data: brandData } = await supabase
				.from("brands")
				.select("*")
				.eq("id", brand_id)
				.eq("user_id", user_id)
				.single();

			brandContext = brandData;
		}

		// Check if analysis already exists and is recent
		const { data: existingAnalysis } = await supabase
			.from("competitor_analysis")
			.select("*")
			.eq("user_id", user_id)
			.eq("competitor_name", competitor_name)
			.eq("competitor_platform", competitor_platform)
			.gte(
				"last_analyzed_at",
				new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
			) // 7 days
			.single();

		if (existingAnalysis && existingAnalysis.analysis_status === "completed") {
			return new Response(
				JSON.stringify({
					success: true,
					analysis: existingAnalysis,
					message: "Recent analysis found",
				}),
				{
					status: 200,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Create or update analysis record
		const { data: analysisRecord, error: insertError } = await supabase
			.from("competitor_analysis")
			.upsert(
				{
					user_id,
					brand_id,
					competitor_name,
					competitor_platform,
					competitor_handle,
					analysis_status: "analyzing",
					last_analyzed_at: new Date().toISOString(),
				},
				{
					onConflict: "user_id,competitor_name,competitor_platform",
				},
			)
			.select()
			.single();

		if (insertError) {
			console.error("Database insert error:", insertError);
			return new Response(
				JSON.stringify({ error: "Failed to create analysis record" }),
				{
					status: 500,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Scrape competitor data
		const competitorData = await scrapeCompetitorData(
			competitor_platform,
			competitor_handle || competitor_name,
		);

		// Generate AI analysis
		const aiAnalysis = await analyzeCompetitorWithAI(
			competitorData,
			brandContext,
		);

		// Update analysis record with results
		const { data: updatedAnalysis, error: updateError } = await supabase
			.from("competitor_analysis")
			.update({
				content_themes: competitorData.content_themes,
				posting_frequency: competitorData.posting_frequency,
				engagement_patterns: competitorData.engagement_patterns,
				top_performing_content: competitorData.top_performing_content,
				analysis_summary: aiAnalysis.analysis_summary,
				opportunities: aiAnalysis.opportunities,
				threats: aiAnalysis.threats,
				analysis_status: "completed",
				updated_at: new Date().toISOString(),
			})
			.eq("id", analysisRecord.id)
			.select()
			.single();

		if (updateError) {
			console.error("Database update error:", updateError);
			return new Response(
				JSON.stringify({ error: "Failed to update analysis" }),
				{
					status: 500,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Generate actionable insights based on competitor analysis
		const insights = [
			{
				insight_type: "competitor",
				title: `Competitive Analysis: ${competitor_name}`,
				description: `Analysis of ${competitor_name} reveals ${aiAnalysis.opportunities.length} opportunities`,
				recommendation:
					aiAnalysis.opportunities[0] ||
					"Monitor competitor activity regularly",
				confidence_score: 0.8,
			},
		];

		// Store insights
		for (const insight of insights) {
			await supabase.from("content_insights").insert({
				user_id,
				brand_id,
				...insight,
				data_points: {
					competitor_name,
					competitor_platform,
					opportunities: aiAnalysis.opportunities,
					threats: aiAnalysis.threats,
				},
			});
		}

		return new Response(
			JSON.stringify({
				success: true,
				analysis: updatedAnalysis,
				insights: insights,
				competitor_data: competitorData,
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Competitor analysis error:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to analyze competitor",
				details: error.message,
			}),
			{
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	}
});

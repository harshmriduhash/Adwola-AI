// Phase 11: Advanced AI & Analytics - Analytics Collection Edge Function
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { corsHeaders } from "../_shared/cors.ts";

interface AnalyticsData {
	post_id: string;
	platform: "linkedin" | "twitter" | "facebook" | "instagram";
	views_count?: number;
	likes_count?: number;
	shares_count?: number;
	comments_count?: number;
	clicks_count?: number;
	platform_metrics?: Record<string, any>;
}

interface PlatformAPI {
	platform: string;
	fetchMetrics: (postId: string, accessToken: string) => Promise<AnalyticsData>;
}

// LinkedIn Analytics API
const linkedinAPI: PlatformAPI = {
	platform: "linkedin",
	fetchMetrics: async (
		postId: string,
		accessToken: string,
	): Promise<AnalyticsData> => {
		try {
			// LinkedIn Analytics API - UGC Posts
			const response = await fetch(
				`https://api.linkedin.com/v2/socialActions/${postId}?projection=(numLikes,numComments,numShares)`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`LinkedIn API error: ${response.status}`);
			}

			const data = await response.json();

			return {
				post_id: postId,
				platform: "linkedin",
				likes_count: data.numLikes || 0,
				comments_count: data.numComments || 0,
				shares_count: data.numShares || 0,
				views_count: 0, // LinkedIn doesn't provide view counts in free tier
				platform_metrics: {
					linkedin_specific: data,
				},
			};
		} catch (error) {
			console.error("LinkedIn analytics error:", error);
			throw error;
		}
	},
};

// Twitter Analytics API
const twitterAPI: PlatformAPI = {
	platform: "twitter",
	fetchMetrics: async (
		postId: string,
		accessToken: string,
	): Promise<AnalyticsData> => {
		try {
			// Twitter API v2 - Tweet metrics
			const response = await fetch(
				`https://api.twitter.com/2/tweets/${postId}?tweet.fields=public_metrics`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`Twitter API error: ${response.status}`);
			}

			const data = await response.json();
			const metrics = data.data?.public_metrics || {};

			return {
				post_id: postId,
				platform: "twitter",
				views_count: metrics.impression_count || 0,
				likes_count: metrics.like_count || 0,
				shares_count: metrics.retweet_count || 0,
				comments_count: metrics.reply_count || 0,
				clicks_count: metrics.url_link_clicks || 0,
				platform_metrics: {
					twitter_specific: metrics,
				},
			};
		} catch (error) {
			console.error("Twitter analytics error:", error);
			throw error;
		}
	},
};

// Facebook Analytics API
const facebookAPI: PlatformAPI = {
	platform: "facebook",
	fetchMetrics: async (
		postId: string,
		accessToken: string,
	): Promise<AnalyticsData> => {
		try {
			// Facebook Graph API - Post insights
			const response = await fetch(
				`https://graph.facebook.com/v18.0/${postId}?fields=insights.metric(post_impressions,post_engaged_users,post_clicks,post_reactions_like_total,post_comments,post_shares)&access_token=${accessToken}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`Facebook API error: ${response.status}`);
			}

			const data = await response.json();
			const insights = data.insights?.data || [];

			// Parse Facebook insights data
			const metrics: Record<string, number> = {};
			insights.forEach((insight: any) => {
				if (insight.values && insight.values.length > 0) {
					metrics[insight.name] = insight.values[0].value;
				}
			});

			return {
				post_id: postId,
				platform: "facebook",
				views_count: metrics.post_impressions || 0,
				likes_count: metrics.post_reactions_like_total || 0,
				shares_count: metrics.post_shares || 0,
				comments_count: metrics.post_comments || 0,
				clicks_count: metrics.post_clicks || 0,
				platform_metrics: {
					facebook_specific: metrics,
				},
			};
		} catch (error) {
			console.error("Facebook analytics error:", error);
			throw error;
		}
	},
};

// Instagram Analytics API
const instagramAPI: PlatformAPI = {
	platform: "instagram",
	fetchMetrics: async (
		postId: string,
		accessToken: string,
	): Promise<AnalyticsData> => {
		try {
			// Instagram Basic Display API - Media insights
			const response = await fetch(
				`https://graph.instagram.com/${postId}/insights?metric=impressions,reach,likes,comments,shares,saved&access_token=${accessToken}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`Instagram API error: ${response.status}`);
			}

			const data = await response.json();
			const insights = data.data || [];

			// Parse Instagram insights data
			const metrics: Record<string, number> = {};
			insights.forEach((insight: any) => {
				metrics[insight.name] = insight.values?.[0]?.value || 0;
			});

			return {
				post_id: postId,
				platform: "instagram",
				views_count: metrics.impressions || 0,
				likes_count: metrics.likes || 0,
				shares_count: metrics.shares || 0,
				comments_count: metrics.comments || 0,
				clicks_count: 0, // Instagram doesn't provide click data in basic API
				platform_metrics: {
					instagram_specific: metrics,
					reach: metrics.reach || 0,
					saves: metrics.saved || 0,
				},
			};
		} catch (error) {
			console.error("Instagram analytics error:", error);
			throw error;
		}
	},
};

const platformAPIs: Record<string, PlatformAPI> = {
	linkedin: linkedinAPI,
	twitter: twitterAPI,
	facebook: facebookAPI,
	instagram: instagramAPI,
};

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

		const { post_id, platform, manual_data } = await req.json();

		if (!post_id || !platform) {
			return new Response(
				JSON.stringify({ error: "post_id and platform are required" }),
				{
					status: 400,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		let analyticsData: AnalyticsData;

		if (manual_data) {
			// Manual analytics data submission
			analyticsData = {
				post_id,
				platform,
				...manual_data,
			};
		} else {
			// Fetch analytics from platform APIs
			const platformAPI = platformAPIs[platform];
			if (!platformAPI) {
				return new Response(
					JSON.stringify({ error: `Unsupported platform: ${platform}` }),
					{
						status: 400,
						headers: { ...corsHeaders, "Content-Type": "application/json" },
					},
				);
			}

			// Get user's platform access token
			const { data: tokenData, error: tokenError } = await supabase.rpc(
				"decrypt_token",
				{
					encrypted_token: "", // This would come from social_connections
					user_id: "", // This would come from the authenticated user
					platform: platform,
				},
			);

			if (tokenError || !tokenData) {
				return new Response(
					JSON.stringify({ error: "Failed to retrieve platform access token" }),
					{
						status: 401,
						headers: { ...corsHeaders, "Content-Type": "application/json" },
					},
				);
			}

			// Fetch analytics from platform
			analyticsData = await platformAPI.fetchMetrics(
				post_id,
				tokenData.access_token,
			);
		}

		// Store analytics in database
		const { data: result, error: dbError } = await supabase.rpc(
			"update_post_analytics",
			{
				p_post_id: analyticsData.post_id,
				p_platform: analyticsData.platform,
				p_views: analyticsData.views_count || 0,
				p_likes: analyticsData.likes_count || 0,
				p_shares: analyticsData.shares_count || 0,
				p_comments: analyticsData.comments_count || 0,
				p_clicks: analyticsData.clicks_count || 0,
				p_platform_metrics: analyticsData.platform_metrics || {},
			},
		);

		if (dbError) {
			console.error("Database error:", dbError);
			return new Response(
				JSON.stringify({ error: "Failed to store analytics data" }),
				{
					status: 500,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Generate AI insights based on analytics data
		const insights = await generatePerformanceInsights(supabase, analyticsData);

		return new Response(
			JSON.stringify({
				success: true,
				analytics_id: result,
				analytics_data: analyticsData,
				insights: insights,
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Analytics collection error:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to collect analytics",
				details: error.message,
			}),
			{
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	}
});

// Generate AI-powered performance insights
async function generatePerformanceInsights(
	supabase: any,
	analyticsData: AnalyticsData,
): Promise<any[]> {
	try {
		// Get historical performance data for comparison
		const { data: historicalData } = await supabase
			.from("post_analytics")
			.select("*")
			.eq("platform", analyticsData.platform)
			.order("created_at", { ascending: false })
			.limit(50);

		if (!historicalData || historicalData.length === 0) {
			return [];
		}

		const insights = [];

		// Calculate average performance
		const avgEngagement =
			historicalData.reduce(
				(sum, record) => sum + (record.engagement_rate || 0),
				0,
			) / historicalData.length;

		const avgPerformance =
			historicalData.reduce(
				(sum, record) => sum + (record.performance_score || 0),
				0,
			) / historicalData.length;

		// Generate performance insights
		const currentEngagement = analyticsData.views_count
			? ((analyticsData.likes_count || 0) +
					(analyticsData.shares_count || 0) +
					(analyticsData.comments_count || 0)) /
				analyticsData.views_count
			: 0;

		if (currentEngagement > avgEngagement * 1.2) {
			insights.push({
				insight_type: "optimization",
				title: "High Performance Alert",
				description: `This post is performing ${Math.round((currentEngagement / avgEngagement - 1) * 100)}% better than average`,
				recommendation:
					"Consider creating similar content or boosting this post to maximize reach",
				confidence_score: 0.85,
			});
		} else if (currentEngagement < avgEngagement * 0.5) {
			insights.push({
				insight_type: "optimization",
				title: "Underperforming Content",
				description: "This post is underperforming compared to your average",
				recommendation:
					"Review content style, timing, or hashtags for future improvements",
				confidence_score: 0.75,
			});
		}

		return insights;
	} catch (error) {
		console.error("Error generating insights:", error);
		return [];
	}
}

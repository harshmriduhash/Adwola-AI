import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { COPYWRITING_PROMPT } from "../_shared/prompts.ts";
import {
	checkUsageLimits,
	createUsageResponse,
	incrementUsage,
} from "../_shared/usage-tracking.ts";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
	// Handle CORS preflight requests
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		// Initialize Supabase client
		const supabase = createClient(
			Deno.env.get("SUPABASE_URL") ?? "",
			Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
		);

		// Verify user authentication
		const authHeader = req.headers.get("Authorization")!;
		const token = authHeader.replace("Bearer ", "");
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser(token);

		if (authError || !user) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			});
		}

		// Parse request body
		const { post_id } = await req.json();

		if (!post_id) {
			return new Response(
				JSON.stringify({ error: "Missing required field: post_id" }),
				{
					status: 400,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Check usage limits before proceeding
		const usageLimits = await checkUsageLimits(user.id);
		if (usageLimits && !usageLimits.can_generate_post) {
			return createUsageResponse(
				`You've reached your monthly post generation limit. You have ${usageLimits.posts_remaining} posts remaining.`,
				true,
			);
		}

		// Fetch the post and related data
		const { data: post, error: postError } = await supabase
			.from("generated_posts")
			.select(`
        *,
        content_briefs!inner(
          *,
          brands!inner(*)
        )
      `)
			.eq("id", post_id)
			.single();

		if (postError || !post) {
			return new Response(
				JSON.stringify({ error: "Post not found or unauthorized" }),
				{
					status: 404,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Verify user owns this post
		if (post.content_briefs.brands.user_id !== user.id) {
			return new Response(
				JSON.stringify({ error: "Unauthorized access to this post" }),
				{
					status: 403,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		const brand = post.content_briefs.brands;
		const brief = post.content_briefs;

		// Create strategy object for regeneration
		const strategy = {
			platform: post.platform,
			post_type: "text-only",
			key_message: `Regenerated content for ${post.platform}`,
			content_angle: "engaging",
			hashtags: ["#content", "#social", "#marketing"],
		};

		// Generate new content using OpenAI
		console.log(
			`Regenerating content for post ${post_id} on ${post.platform}...`,
		);

		const copywritingPrompt = COPYWRITING_PROMPT(brand, brief, strategy);

		const copyResponse = await fetch(
			"https://api.openai.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "gpt-4o",
					messages: [
						{
							role: "system",
							content:
								"You are an expert social media copywriter. Create engaging, platform-optimized content that is fresh and different from the original.",
						},
						{ role: "user", content: copywritingPrompt },
					],
					temperature: 0.9, // Higher temperature for more variation
					max_tokens: 800,
				}),
			},
		);

		if (!copyResponse.ok) {
			throw new Error(
				`Content regeneration failed: ${copyResponse.statusText}`,
			);
		}

		const copyData = await copyResponse.json();
		const newGeneratedText = copyData.choices[0].message.content;

		// Update the post with new content
		const { error: updateError } = await supabase
			.from("generated_posts")
			.update({
				generated_text: newGeneratedText,
				updated_at: new Date().toISOString(),
			})
			.eq("id", post_id);

		if (updateError) {
			throw new Error(`Failed to update post: ${updateError.message}`);
		}

		// Increment usage counter for post regeneration
		await incrementUsage(user.id, "posts", 1);

		return new Response(
			JSON.stringify({
				success: true,
				message: "Post regenerated successfully",
				new_content: newGeneratedText,
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Error in regenerate-post function:", error);

		return new Response(
			JSON.stringify({
				error: error.message || "An unexpected error occurred",
				details: "Check function logs for more information",
			}),
			{
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	}
});

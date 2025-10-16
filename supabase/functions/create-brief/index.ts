import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
	COPYWRITING_PROMPT,
	type Platform,
	STRATEGY_PROMPT,
} from "../_shared/prompts.ts";
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
		const { brandId, topic, goal, cta } = await req.json();

		if (!brandId || !topic) {
			return new Response(
				JSON.stringify({ error: "Missing required fields: brandId, topic" }),
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

		// Fetch brand information
		const { data: brand, error: brandError } = await supabase
			.from("brands")
			.select("*")
			.eq("id", brandId)
			.eq("user_id", user.id)
			.single();

		if (brandError || !brand) {
			return new Response(
				JSON.stringify({ error: "Brand not found or unauthorized" }),
				{
					status: 404,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Create content brief record
		const { data: brief, error: briefError } = await supabase
			.from("content_briefs")
			.insert({
				user_id: user.id,
				brand_id: brandId,
				topic,
				goal: goal || "Generate engagement",
				cta_text: cta,
				status: "processing",
			})
			.select()
			.single();

		if (briefError) {
			throw new Error(`Failed to create brief: ${briefError.message}`);
		}

		// STEP 1: Generate content strategy using Gemini
		console.log("Generating content strategy...");

		const strategyPrompt = STRATEGY_PROMPT(brand, {
			topic,
			goal,
			cta_text: cta,
		});

		const strategyResponse = await fetch(
			"https://api.openai.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "gpt-4o-mini",
					messages: [
						{
							role: "system",
							content:
								"You are a strategic social media planner. Always respond with valid JSON.",
						},
						{ role: "user", content: strategyPrompt },
					],
					temperature: 0.7,
					max_tokens: 1000,
				}),
			},
		);

		if (!strategyResponse.ok) {
			throw new Error(
				`Strategy generation failed: ${strategyResponse.statusText}`,
			);
		}

		const strategyData = await strategyResponse.json();
		const strategyContent = strategyData.choices[0].message.content;

		let strategies;
		try {
			strategies = JSON.parse(strategyContent);
		} catch (e) {
			throw new Error("Failed to parse strategy response as JSON");
		}

		if (!Array.isArray(strategies) || strategies.length === 0) {
			throw new Error("Invalid strategy response format");
		}

		// STEP 2: Generate actual content for each strategy using parallel processing
		console.log("Generating content for each strategy in parallel...");

		// Helper function to generate content for a single strategy
		const generateContentForStrategy = async (strategy: any) => {
			try {
				const copywritingPrompt = COPYWRITING_PROMPT(
					brand,
					{ topic, goal, cta_text: cta },
					strategy,
				);

				// Generate text content
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
										"You are an expert social media copywriter. Create engaging, platform-optimized content.",
								},
								{ role: "user", content: copywritingPrompt },
							],
							temperature: 0.8,
							max_tokens: 800,
						}),
					},
				);

				if (!copyResponse.ok) {
					throw new Error(
						`Copy generation failed for ${strategy.platform}: ${copyResponse.statusText}`,
					);
				}

				const copyData = await copyResponse.json();
				const generatedText = copyData.choices[0].message.content;

				let generatedMediaUrls = null;

				// Generate image if post type is image+caption (run in parallel with text)
				if (strategy.post_type === "image+caption") {
					console.log(`Generating image for ${strategy.platform}...`);
					const imagePrompt = `Generate a social media image for ${brand.brand_name} about ${topic} with a ${strategy.content_angle} angle. Key message: ${strategy.key_message}`;

					try {
						const imageResponse = await fetch(
							"https://api.openai.com/v1/images/generations",
							{
								method: "POST",
								headers: {
									Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									model: "dall-e-3",
									prompt: imagePrompt,
									n: 1,
									size: "1024x1024",
									response_format: "b64_json",
								}),
							},
						);

						if (imageResponse.ok) {
							const imageData = await imageResponse.json();
							const base64Image = imageData.data[0].b64_json;
							const imageBuffer = Uint8Array.from(atob(base64Image), (c) =>
								c.charCodeAt(0),
							);

							const fileName = `generated-content/${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${strategy.platform}.png`;
							const { data: uploadData, error: uploadError } =
								await supabase.storage
									.from("generated-content")
									.upload(fileName, imageBuffer, {
										contentType: "image/png",
										upsert: true,
									});

							if (!uploadError) {
								const {
									data: { publicUrl },
								} = supabase.storage
									.from("generated-content")
									.getPublicUrl(fileName);
								generatedMediaUrls = [publicUrl];
							}
						}
					} catch (imageError) {
						console.error(
							`Image generation failed for ${strategy.platform}:`,
							imageError,
						);
						// Continue without image - text-only post
					}
				}

				// Save generated post to database
				const { data: post, error: postError } = await supabase
					.from("generated_posts")
					.insert({
						brief_id: brief.id,
						platform: strategy.platform,
						generated_text: generatedText,
						generated_media_urls: generatedMediaUrls,
						status: "draft",
					})
					.select()
					.single();

				if (postError) {
					throw new Error(
						`Failed to save post for ${strategy.platform}: ${postError.message}`,
					);
				}

				console.log(
					`✅ Successfully generated content for ${strategy.platform}`,
				);
				return post;
			} catch (error) {
				console.error(
					`❌ Failed to generate content for ${strategy.platform}:`,
					error.message,
				);
				return null; // Return null for failed generations
			}
		};

		// Process strategies in parallel with controlled concurrency
		const BATCH_SIZE = 3; // Limit concurrent API calls to avoid rate limiting
		const generatedPosts = [];

		for (let i = 0; i < strategies.length; i += BATCH_SIZE) {
			const batch = strategies.slice(i, i + BATCH_SIZE);
			console.log(
				`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(strategies.length / BATCH_SIZE)}...`,
			);

			const batchResults = await Promise.allSettled(
				batch.map((strategy) => generateContentForStrategy(strategy)),
			);

			// Filter out failed generations and add successful ones
			const successfulPosts = batchResults
				.filter(
					(result) => result.status === "fulfilled" && result.value !== null,
				)
				.map((result) => result.value);

			generatedPosts.push(...successfulPosts);
		}

		// Update brief status
		const finalStatus = generatedPosts.length > 0 ? "completed" : "error";
		await supabase
			.from("content_briefs")
			.update({ status: finalStatus })
			.eq("id", brief.id);

		// Increment usage counter for posts generated (only on success)
		if (generatedPosts.length > 0) {
			await incrementUsage(user.id, "posts", generatedPosts.length);
		}

		return new Response(
			JSON.stringify({
				success: true,
				brief_id: brief.id,
				posts_generated: generatedPosts.length,
				message: `Successfully generated ${generatedPosts.length} posts for your campaign!`,
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Error in create-brief function:", error);

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

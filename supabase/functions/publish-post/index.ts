import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	try {
		const supabase = createClient(
			Deno.env.get("SUPABASE_URL") ?? "",
			Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
		);

		// This function will be triggered by a cron job
		const { data: postsToPublish, error } = await supabase
			.from("generated_posts")
			.select(`
        *,
        social_connections(*)
      `)
			.eq("status", "scheduled")
			.lte("schedule_time", new Date().toISOString());

		if (error) {
			throw error;
		}

		for (const post of postsToPublish) {
			const { social_connections, platform, generated_text } = post;
			const connection = social_connections[0];

			if (!connection) {
				// Handle case where there is no social connection for the user
				continue;
			}

			// Decrypt access token
			const { data: decryptedToken, error: decryptError } = await supabase.rpc(
				"decrypt_token",
				{ token: connection.access_token },
			);

			if (decryptError) {
				// Handle decryption error
				continue;
			}

			// Publish to the respective platform
			switch (platform) {
				case "linkedin": {
					// Call LinkedIn API to publish post
					const linkedinBody: any = {
						author: `urn:li:person:${connection.platform_user_id}`,
						lifecycleState: "PUBLISHED",
						specificContent: {
							"com.linkedin.ugc.ShareContent": {
								shareCommentary: {
									text: generated_text,
								},
								shareMediaCategory: "NONE",
							},
						},
						visibility: {
							"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
						},
					};

					if (
						post.generated_media_urls &&
						post.generated_media_urls.length > 0
					) {
						// For simplicity, assuming the first media URL is an image
						linkedinBody.specificContent[
							"com.linkedin.ugc.ShareContent"
						].media = [
							{
								status: "READY",
								media: `urn:li:digitalmediaAsset:${post.generated_media_urls[0].split("/").pop().split(".")[0]}`,
							},
						];
						linkedinBody.specificContent[
							"com.linkedin.ugc.ShareContent"
						].shareMediaCategory = "IMAGE";
					}

					const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${decryptedToken}`,
							"Content-Type": "application/json",
							"X-Restli-Protocol-Version": "2.0.0",
						},
						body: JSON.stringify(linkedinBody),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`LinkedIn API error: ${errorData.message}`);
					}
					break;
				}
				case "twitter":
				case "twitter": {
					const media_ids: string[] = [];
					if (
						post.generated_media_urls &&
						post.generated_media_urls.length > 0
					) {
						// Simplified: In a real scenario, you'd upload media first and get media_id
						// For now, we'll just use a placeholder or skip if not a direct image upload API
						console.log(
							"Twitter media upload is complex and requires separate media API calls.",
						);
						// Example: media_id = await uploadMediaToTwitter(post.generated_media_urls[0], decryptedToken);
						// media_ids.push(media_id);
					}

					const twitterResponse = await fetch(
						"https://api.twitter.com/2/tweets",
						{
							method: "POST",
							headers: {
								Authorization: `Bearer ${decryptedToken}`,
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								text: generated_text,
								// media: { media_ids: media_ids }, // Uncomment if media_ids are obtained
							}),
						},
					);

					if (!twitterResponse.ok) {
						const errorData = await twitterResponse.json();
						throw new Error(`Twitter API error: ${errorData.detail}`);
					}
					break;
					break;
				}
				case "facebook": {
					const facebookBody: any = {
						message: generated_text,
						access_token: decryptedToken,
					};

					if (
						post.generated_media_urls &&
						post.generated_media_urls.length > 0
					) {
						// For simplicity, assuming the first media URL is an image
						facebookBody.url = post.generated_media_urls[0];
					}

					const facebookResponse = await fetch(
						`https://graph.facebook.com/v12.0/${connection.platform_user_id}/photos`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(facebookBody),
						},
					);

					if (!facebookResponse.ok) {
						const errorData = await facebookResponse.json();
						throw new Error(`Facebook API error: ${errorData.error.message}`);
					}
					break;
				}
				case "instagram": {
					// Call Instagram API to publish post
					// This is a simplified example. The Instagram Content Publishing API is more complex.
					const instagramBody: any = {
						caption: generated_text,
						access_token: decryptedToken,
					};

					if (
						post.generated_media_urls &&
						post.generated_media_urls.length > 0
					) {
						instagramBody.image_url = post.generated_media_urls[0];
					}

					const instagramResponse = await fetch(
						`https://graph.facebook.com/v12.0/${connection.platform_user_id}/media`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(instagramBody),
						},
					);

					if (!instagramResponse.ok) {
						const errorData = await instagramResponse.json();
						throw new Error(`Instagram API error: ${errorData.error.message}`);
					}
					break;
				}
			}

			// Update post status to 'published'
			await supabase
				.from("generated_posts")
				.update({ status: "published" })
				.eq("id", post.id);
		}

		return new Response(JSON.stringify({ message: "Published posts" }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
});

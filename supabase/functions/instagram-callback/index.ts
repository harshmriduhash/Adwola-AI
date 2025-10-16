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

		const url = new URL(req.url);
		const code = url.searchParams.get("code");
		const state = url.searchParams.get("state");

		if (!code) {
			return new Response(JSON.stringify({ error: "No code provided" }), {
				status: 400,
			});
		}

		// Exchange code for access token
		const response = await fetch(
			"https://api.instagram.com/oauth/access_token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					client_id: Deno.env.get("INSTAGRAM_CLIENT_ID") ?? "",
					client_secret: Deno.env.get("INSTAGRAM_CLIENT_SECRET") ?? "",
					grant_type: "authorization_code",
					redirect_uri: `${Deno.env.get("SUPABASE_URL")}/functions/v1/instagram-callback`,
					code,
				}),
			},
		);

		const data = await response.json();

		if (data.error_message) {
			throw new Error(data.error_message);
		}

		// Get user from state
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser(state);

		if (userError || !user) {
			throw new Error("Invalid user");
		}

		// Get user profile from Instagram
		const profileResponse = await fetch(
			`https://graph.instagram.com/me?fields=id,username&access_token=${data.access_token}`,
		);
		const profileData = await profileResponse.json();

		// Save the connection to the database
		await supabase.rpc("upsert_social_connection", {
			p_user_id: user.id,
			p_platform: "instagram",
			p_platform_user_id: profileData.id,
			p_platform_user_name: profileData.username,
			p_access_token: data.access_token,
			p_refresh_token: null, // Instagram Basic Display API doesn't provide refresh tokens
			p_expires_at: null, // Long-lived tokens, but should be refreshed
			p_scopes: ["user_profile", "user_media"],
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/dashboard/settings?connection=instagram&status=success",
			},
		});
	} catch (error) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/dashboard/settings?connection=instagram&status=error&message=${encodeURIComponent(error.message)}`,
			},
		});
	}
});

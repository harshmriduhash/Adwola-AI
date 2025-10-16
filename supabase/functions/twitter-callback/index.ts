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
		// This is a simplified example. Twitter's OAuth 2.0 PKCE flow is more involved.
		const response = await fetch("https://api.twitter.com/2/oauth2/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(`${Deno.env.get("TWITTER_CLIENT_ID")}:${Deno.env.get("TWITTER_CLIENT_SECRET")}`)}`,
			},
			body: new URLSearchParams({
				code,
				grant_type: "authorization_code",
				redirect_uri: `${Deno.env.get("SUPABASE_URL")}/functions/v1/twitter-callback`,
				code_verifier: "challenge", // Replace with the real PKCE code verifier
			}),
		});

		const data = await response.json();

		if (data.error) {
			throw new Error(data.error_description);
		}

		// Get user from state
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser(state);

		if (userError || !user) {
			throw new Error("Invalid user");
		}

		// Get user profile from Twitter
		const profileResponse = await fetch("https://api.twitter.com/2/users/me", {
			headers: {
				Authorization: `Bearer ${data.access_token}`,
			},
		});

		const profileData = await profileResponse.json();

		// Save the connection to the database
		await supabase.rpc("upsert_social_connection", {
			p_user_id: user.id,
			p_platform: "twitter",
			p_platform_user_id: profileData.data.id,
			p_platform_user_name: profileData.data.name,
			p_access_token: data.access_token,
			p_refresh_token: data.refresh_token,
			p_expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
			p_scopes: data.scope.split(" "),
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/dashboard/settings?connection=twitter&status=success",
			},
		});
	} catch (error) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/dashboard/settings?connection=twitter&status=error&message=${encodeURIComponent(error.message)}`,
			},
		});
	}
});

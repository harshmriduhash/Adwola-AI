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
			"https://www.linkedin.com/oauth/v2/accessToken",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					code,
					redirect_uri: `${Deno.env.get("SUPABASE_URL")}/functions/v1/linkedin-callback`,
					client_id: Deno.env.get("LINKEDIN_CLIENT_ID") ?? "",
					client_secret: Deno.env.get("LINKEDIN_CLIENT_SECRET") ?? "",
				}),
			},
		);

		const data = await response.json();

		if (data.error) {
			throw new Error(data.error_description);
		}

		const accessToken = data.access_token;

		// Get user profile from LinkedIn
		const profileResponse = await fetch("https://api.linkedin.com/v2/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const profileData = await profileResponse.json();

		// Get user from state
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser(state);

		if (userError || !user) {
			throw new Error("Invalid user");
		}

		// Save the connection to the database
		await supabase.rpc("upsert_social_connection", {
			p_user_id: user.id,
			p_platform: "linkedin",
			p_platform_user_id: profileData.id,
			p_platform_user_name: `${profileData.localizedFirstName} ${profileData.localizedLastName}`,
			p_access_token: accessToken,
			p_refresh_token: data.refresh_token,
			p_expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
			p_scopes: data.scope.split(" "),
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/dashboard/settings?connection=linkedin&status=success",
			},
		});
	} catch (error) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/dashboard/settings?connection=linkedin&status=error&message=${encodeURIComponent(error.message)}`,
			},
		});
	}
});

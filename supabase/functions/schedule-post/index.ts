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

		const { post_id, schedule_time } = await req.json();

		if (!post_id || !schedule_time) {
			return new Response(
				JSON.stringify({
					error: "Missing required fields: post_id, schedule_time",
				}),
				{
					status: 400,
					headers: { ...corsHeaders, "Content-Type": "application/json" },
				},
			);
		}

		// Call the database function to schedule the post
		const { data, error } = await supabase.rpc("schedule_post", {
			post_id,
			schedule_time,
			user_id: user.id,
		});

		if (error) {
			throw new Error(`Database error: ${error.message}`);
		}

		if (!data.success) {
			return new Response(JSON.stringify({ error: data.error }), {
				status: 400,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			});
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: "Post scheduled successfully",
				scheduled_time: schedule_time,
			}),
			{
				status: 200,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Error scheduling post:", error);

		return new Response(
			JSON.stringify({
				error: error.message || "An unexpected error occurred",
			}),
			{
				status: 500,
				headers: { ...corsHeaders, "Content-Type": "application/json" },
			},
		);
	}
});

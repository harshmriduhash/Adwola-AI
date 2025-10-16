// Phase 11: Advanced AI & Analytics - Content Analysis API Route
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
	try {
		const supabase = await createClient();

		// Verify authentication
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();
		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { user_id, brand_id, analysis_type, timeframe_days = 30 } = body;

		// Verify user owns the data being analyzed
		if (user_id !== user.id) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Call the analyze-content-performance Edge Function
		const { data, error } = await supabase.functions.invoke(
			"analyze-content-performance",
			{
				body: {
					user_id,
					brand_id,
					analysis_type,
					timeframe_days,
				},
			},
		);

		if (error) {
			console.error("Edge function error:", error);
			return NextResponse.json(
				{ error: "Failed to analyze content" },
				{ status: 500 },
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error("Content analysis API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

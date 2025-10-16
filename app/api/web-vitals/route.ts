import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		// Log the web vitals data
		console.log("📊 Web Vitals Received:", {
			timestamp: new Date().toISOString(),
			...data,
		});

		// In production, you might want to:
		// 1. Store in database for analysis
		// 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
		// 3. Alert on poor performance metrics

		// Example: Alert on poor Core Web Vitals
		if (data.rating === "poor") {
			const sanitizedName = typeof data.name === "string" ? data.name.replace(/[^a-zA-Z0-9 _-]/g, "") : "unknown";
			console.warn(`⚠️ Poor ${sanitizedName} detected:`, {
				value: data.value,
				url: data.url,
				timestamp: data.timestamp,
			});

			// In a real application, you might send alerts here:
			// await sendSlackAlert(`Poor ${data.name}: ${data.value}ms on ${data.url}`)
			// await logToMonitoringService(data)
		}

		// Example: Store in database (uncomment when ready)
		/*
    await supabase.from('web_vitals').insert({
      metric_name: data.name,
      metric_value: data.value,
      metric_rating: data.rating,
      page_url: data.url,
      user_agent: request.headers.get('user-agent'),
      timestamp: new Date(data.timestamp),
    })
    */

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error processing web vitals:", error);
		return NextResponse.json(
			{ error: "Failed to process web vitals" },
			{ status: 500 },
		);
	}
}

// Handle preflight requests
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}

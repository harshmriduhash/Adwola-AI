import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/config";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
	try {
		if (!stripe) {
			return NextResponse.json(
				{ error: "Stripe not configured" },
				{ status: 500 },
			);
		}

		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user's Stripe customer ID
		const { data: subscription } = await supabase
			.from("subscriptions")
			.select("stripe_customer_id")
			.eq("user_id", user.id)
			.single();

		if (!subscription?.stripe_customer_id) {
			return NextResponse.json(
				{ error: "No subscription found" },
				{ status: 404 },
			);
		}

		const headersList = await headers();
		const origin = headersList.get("origin") || "http://localhost:3000";

		// Create billing portal session
		const portalSession = await stripe.billingPortal.sessions.create({
			customer: subscription.stripe_customer_id,
			return_url: `${origin}/dashboard/settings?tab=billing`,
		});

		return NextResponse.json({
			url: portalSession.url,
		});
	} catch (error) {
		console.error("Error creating portal session:", error);
		return NextResponse.json(
			{ error: "Failed to create portal session" },
			{ status: 500 },
		);
	}
}

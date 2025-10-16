import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { SUBSCRIPTION_PLANS, stripe } from "@/lib/stripe/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
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

		const { planType } = await request.json();

		if (
			!planType ||
			!SUBSCRIPTION_PLANS[planType as keyof typeof SUBSCRIPTION_PLANS]
		) {
			return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
		}

		const plan =
			SUBSCRIPTION_PLANS[planType as keyof typeof SUBSCRIPTION_PLANS];

		if (planType === "free") {
			return NextResponse.json(
				{ error: "Free plan does not require checkout" },
				{ status: 400 },
			);
		}

		// Get or create Stripe customer
		let customerId: string;

		// Check if user already has a Stripe customer ID
		const { data: subscription } = await supabase
			.from("subscriptions")
			.select("stripe_customer_id")
			.eq("user_id", user.id)
			.single();

		if (subscription?.stripe_customer_id) {
			customerId = subscription.stripe_customer_id;
		} else {
			// Create new Stripe customer
			const customer = await stripe.customers.create({
				email: user.email!,
				metadata: {
					userId: user.id,
				},
			});
			customerId = customer.id;

			// Update subscription with customer ID
			await supabase.from("subscriptions").upsert({
				user_id: user.id,
				stripe_customer_id: customerId,
				plan_type: "free",
				status: "active",
				monthly_post_limit: SUBSCRIPTION_PLANS.free.limits.monthlyPosts,
				brand_limit: SUBSCRIPTION_PLANS.free.limits.brands,
				team_member_limit: SUBSCRIPTION_PLANS.free.limits.teamMembers,
			});
		}

		const headersList = await headers();
		const origin = headersList.get("origin") || "http://localhost:3000";

		// Create Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			payment_method_types: ["card"],
			billing_address_collection: "required",
			line_items: [
				{
					price: plan.priceId!,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${origin}/dashboard/settings?tab=billing&success=true`,
			cancel_url: `${origin}/dashboard/settings?tab=billing&canceled=true`,
			metadata: {
				userId: user.id,
				planType,
			},
		});

		return NextResponse.json({
			sessionId: session.id,
			url: session.url,
		});
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{ error: "Failed to create checkout session" },
			{ status: 500 },
		);
	}
}

import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import {
	STRIPE_WEBHOOK_SECRET,
	SUBSCRIPTION_PLANS,
	stripe,
} from "@/lib/stripe/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
	if (!stripe) {
		return NextResponse.json(
			{ error: "Stripe not configured" },
			{ status: 500 },
		);
	}

	const body = await request.text();
	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		console.error("No Stripe signature found");
		return NextResponse.json({ error: "No signature" }, { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			STRIPE_WEBHOOK_SECRET!,
		);
	} catch (error) {
		console.error("Webhook signature verification failed:", error);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	const supabase = await createClient();

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				const userId = session.metadata?.userId;
				const planType = session.metadata?.planType;

				if (!userId || !planType) {
					console.error("Missing metadata in checkout session");
					break;
				}

				const plan =
					SUBSCRIPTION_PLANS[planType as keyof typeof SUBSCRIPTION_PLANS];

				// Update subscription in database
				await supabase.from("subscriptions").upsert({
					user_id: userId,
					stripe_customer_id: session.customer as string,
					stripe_subscription_id: session.subscription as string,
					plan_type: planType,
					status: "active",
					current_period_start: new Date().toISOString(),
					current_period_end: new Date(
						Date.now() + 30 * 24 * 60 * 60 * 1000,
					).toISOString(), // 30 days
					monthly_post_limit: plan.limits.monthlyPosts,
					brand_limit: plan.limits.brands,
					team_member_limit: plan.limits.teamMembers,
				});

				console.log(
					`Subscription activated for user ${userId} with plan ${planType}`,
				);
				break;
			}

			case "customer.subscription.updated": {
				const subscription = event.data.object as Stripe.Subscription;
				const customerId = subscription.customer as string;

				// Get user by customer ID
				const { data: userSub } = await supabase
					.from("subscriptions")
					.select("user_id")
					.eq("stripe_customer_id", customerId)
					.single();

				if (!userSub) {
					console.error("No user found for customer:", customerId);
					break;
				}

				// Update subscription status
				const updateData: Record<string, unknown> = {
					status: subscription.status === "active" ? "active" : "inactive",
					cancel_at_period_end: subscription.cancel_at_period_end,
					updated_at: new Date().toISOString(),
				};

				// Add period dates if they exist (they should for active subscriptions)
				if (
					"current_period_start" in subscription &&
					subscription.current_period_start
				) {
					updateData.current_period_start = new Date(
						(subscription.current_period_start as number) * 1000,
					).toISOString();
				}
				if (
					"current_period_end" in subscription &&
					subscription.current_period_end
				) {
					updateData.current_period_end = new Date(
						(subscription.current_period_end as number) * 1000,
					).toISOString();
				}
				if (subscription.canceled_at) {
					updateData.canceled_at = new Date(
						(subscription.canceled_at as number) * 1000,
					).toISOString();
				}

				await supabase
					.from("subscriptions")
					.update(updateData)
					.eq("user_id", userSub.user_id);

				console.log(`Subscription updated for customer ${customerId}`);
				break;
			}

			case "customer.subscription.deleted": {
				const subscription = event.data.object as Stripe.Subscription;
				const customerId = subscription.customer as string;

				// Get user by customer ID
				const { data: userSub } = await supabase
					.from("subscriptions")
					.select("user_id")
					.eq("stripe_customer_id", customerId)
					.single();

				if (!userSub) {
					console.error("No user found for customer:", customerId);
					break;
				}

				// Downgrade to free plan
				await supabase
					.from("subscriptions")
					.update({
						plan_type: "free",
						status: "active",
						stripe_subscription_id: null,
						current_period_start: null,
						current_period_end: null,
						cancel_at_period_end: false,
						canceled_at: new Date().toISOString(),
						monthly_post_limit: SUBSCRIPTION_PLANS.free.limits.monthlyPosts,
						brand_limit: SUBSCRIPTION_PLANS.free.limits.brands,
						team_member_limit: SUBSCRIPTION_PLANS.free.limits.teamMembers,
						updated_at: new Date().toISOString(),
					})
					.eq("user_id", userSub.user_id);

				console.log(
					`Subscription canceled for customer ${customerId}, downgraded to free`,
				);
				break;
			}

			case "invoice.payment_succeeded": {
				const invoice = event.data.object as Stripe.Invoice;
				const customerId = invoice.customer as string;

				// Get user by customer ID
				const { data: userSub } = await supabase
					.from("subscriptions")
					.select("user_id, plan_type")
					.eq("stripe_customer_id", customerId)
					.single();

				if (!userSub) {
					console.error("No user found for customer:", customerId);
					break;
				}

				// Record payment in billing history
				await supabase.from("billing_history").insert({
					user_id: userSub.user_id,
					amount_cents: invoice.amount_paid,
					currency: invoice.currency,
					status: "paid",
					stripe_payment_intent_id:
						"payment_intent" in invoice
							? (invoice.payment_intent as string)
							: null,
					stripe_invoice_id: invoice.id,
					plan_type: userSub.plan_type,
					billing_period_start: new Date(
						(invoice.period_start as number) * 1000,
					).toISOString(),
					billing_period_end: new Date(
						(invoice.period_end as number) * 1000,
					).toISOString(),
					description: `Payment for ${userSub.plan_type} plan`,
				});

				console.log(`Payment recorded for customer ${customerId}`);
				break;
			}

			case "invoice.payment_failed": {
				const invoice = event.data.object as Stripe.Invoice;
				const customerId = invoice.customer as string;

				// Get user by customer ID
				const { data: userSub } = await supabase
					.from("subscriptions")
					.select("user_id, plan_type")
					.eq("stripe_customer_id", customerId)
					.single();

				if (!userSub) {
					console.error("No user found for customer:", customerId);
					break;
				}

				// Record failed payment
				await supabase.from("billing_history").insert({
					user_id: userSub.user_id,
					amount_cents: invoice.amount_due,
					currency: invoice.currency,
					status: "failed",
					stripe_invoice_id: invoice.id,
					plan_type: userSub.plan_type,
					description: `Failed payment for ${userSub.plan_type} plan`,
				});

				// Update subscription status
				await supabase
					.from("subscriptions")
					.update({
						status: "past_due",
						updated_at: new Date().toISOString(),
					})
					.eq("user_id", userSub.user_id);

				console.log(`Payment failed for customer ${customerId}`);
				break;
			}

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ error: "Webhook processing failed" },
			{ status: 500 },
		);
	}
}

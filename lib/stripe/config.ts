import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
	? new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2025-05-28.basil",
			typescript: true,
		})
	: null;

export const STRIPE_PUBLISHABLE_KEY =
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Subscription plan configuration
export const SUBSCRIPTION_PLANS = {
	free: {
		name: "Free",
		description: "Perfect for getting started",
		price: 0,
		priceId: null, // Free plan has no Stripe price ID
		features: [
			"5 posts per month",
			"1 brand",
			"Basic templates",
			"Standard AI generation",
			"Email support",
		],
		limits: {
			monthlyPosts: 5,
			brands: 1,
			teamMembers: 1,
			apiCalls: 100,
		},
	},
	pro: {
		name: "Pro",
		description: "For content creators and professionals",
		price: 29,
		priceId: process.env.STRIPE_PRO_PRICE_ID,
		features: [
			"100 posts per month",
			"5 brands",
			"All premium templates",
			"Dual AI provider system",
			"Priority generation queue",
			"Advanced analytics",
			"Email + chat support",
		],
		limits: {
			monthlyPosts: 100,
			brands: 5,
			teamMembers: 1,
			apiCalls: 1000,
		},
	},
	agency: {
		name: "Agency",
		description: "For teams and agencies",
		price: 99,
		priceId: process.env.STRIPE_AGENCY_PRICE_ID,
		features: [
			"Unlimited posts",
			"Unlimited brands",
			"Team collaboration (5 users)",
			"White-label options",
			"API access",
			"Advanced scheduling",
			"Priority support + phone",
		],
		limits: {
			monthlyPosts: -1, // -1 means unlimited
			brands: -1,
			teamMembers: 5,
			apiCalls: 10000,
		},
	},
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;

// Webhook endpoint secret for verifying Stripe events
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_WEBHOOK_SECRET) {
	console.warn(
		"STRIPE_WEBHOOK_SECRET is not set - webhook verification will be skipped in development",
	);
}

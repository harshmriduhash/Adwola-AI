"use client";

import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "./config";

export const getStripe = () => {
	if (!STRIPE_PUBLISHABLE_KEY) {
		console.warn("Stripe publishable key not configured");
		return null;
	}
	return loadStripe(STRIPE_PUBLISHABLE_KEY);
};

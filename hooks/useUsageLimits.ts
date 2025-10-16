"use client";

import { useEffect, useState } from "react";
import {
	checkUserLimits,
	type SubscriptionInfo,
	type UsageLimits,
} from "@/lib/subscription/usage-limits";

export function useUsageLimits() {
	const [limits, setLimits] = useState<UsageLimits | null>(null);
	const [subscription, setSubscription] = useState<SubscriptionInfo | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const refreshLimits = async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await checkUserLimits();

			if (result.error) {
				setError(result.error);
			} else {
				setLimits(result.limits);
				setSubscription(result.subscription);
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to check usage limits",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		refreshLimits();
	}, []);

	return {
		limits,
		subscription,
		loading,
		error,
		refreshLimits,
	};
}

export function useCanCreateContent() {
	const { limits, subscription } = useUsageLimits();

	return {
		canGeneratePost: limits?.can_generate_post ?? false,
		canCreateBrand: limits?.can_create_brand ?? false,
		postsRemaining: limits?.posts_remaining ?? 0,
		brandsRemaining: limits?.brands_remaining ?? 0,
		planType: subscription?.plan_type ?? "free",
		monthlyPostLimit: subscription?.monthly_post_limit ?? 5,
		brandLimit: subscription?.brand_limit ?? 1,
	};
}

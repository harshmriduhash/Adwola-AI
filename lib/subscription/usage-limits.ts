import { createClient } from "@/lib/supabase/client";

export interface UsageLimits {
	posts_remaining: number;
	brands_remaining: number;
	can_generate_post: boolean;
	can_create_brand: boolean;
}

export interface SubscriptionInfo {
	plan_type: "free" | "pro" | "agency";
	status: string;
	monthly_post_limit: number;
	brand_limit: number;
	team_member_limit: number;
}

export async function checkUserLimits(): Promise<{
	limits: UsageLimits | null;
	subscription: SubscriptionInfo | null;
	error?: string;
}> {
	try {
		const supabase = createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			return { limits: null, subscription: null, error: "Not authenticated" };
		}

		// Get usage limits
		const { data: limitsData, error: limitsError } = await supabase.rpc(
			"check_usage_limits",
			{ user_uuid: user.id },
		);

		if (limitsError) {
			const errorMessage = limitsError.message || limitsError.details || "Unknown database error";
			console.error("Error checking usage limits:", errorMessage, limitsError);
			return { limits: null, subscription: null, error: errorMessage };
		}

		// Get subscription info
		const { data: subData, error: subError } = await supabase
			.from("subscriptions")
			.select(
				"plan_type, status, monthly_post_limit, brand_limit, team_member_limit",
			)
			.eq("user_id", user.id)
			.single();

		if (subError && subError.code !== "PGRST116") {
			// PGRST116 is "not found"
			const errorMessage = subError.message || subError.details || "Unknown subscription error";
			console.error("Error getting subscription:", errorMessage, subError);
			return { limits: null, subscription: null, error: errorMessage };
		}

		return {
			limits: limitsData && limitsData.length > 0 ? limitsData[0] : null,
			subscription: subData || null,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Failed to check limits";
		console.error("Error in checkUserLimits:", errorMessage, error);
		return {
			limits: null,
			subscription: null,
			error: errorMessage,
		};
	}
}

export function formatLimitMessage(
	action: "post" | "brand",
	limits: UsageLimits,
	subscription: SubscriptionInfo,
): string {
	if (action === "post") {
		if (!limits.can_generate_post) {
			if (subscription.plan_type === "free") {
				return `You've reached your monthly limit of ${subscription.monthly_post_limit} posts. Upgrade to Pro for 100 posts/month or Agency for unlimited posts.`;
			} else {
				return `You've reached your monthly limit of ${subscription.monthly_post_limit} posts. Your limit will reset at the beginning of next month.`;
			}
		} else {
			return `You have ${limits.posts_remaining} posts remaining this month.`;
		}
	} else {
		if (!limits.can_create_brand) {
			if (subscription.plan_type === "free") {
				return `You've reached your limit of ${subscription.brand_limit} brand. Upgrade to Pro for 5 brands or Agency for unlimited brands.`;
			} else {
				return `You've reached your limit of ${subscription.brand_limit} brands.`;
			}
		} else {
			return `You can create ${limits.brands_remaining} more brands.`;
		}
	}
}

export class UsageLimitError extends Error {
	constructor(
		message: string,
		public upgradeRequired: boolean = false,
		public limitType: "post" | "brand" = "post",
	) {
		super(message);
		this.name = "UsageLimitError";
	}
}

export async function enforceUsageLimit(
	action: "post" | "brand",
): Promise<void> {
	const { limits, subscription, error } = await checkUserLimits();

	if (error) {
		throw new Error(`Failed to check usage limits: ${error}`);
	}

	if (!limits || !subscription) {
		throw new Error("Unable to determine usage limits");
	}

	if (action === "post" && !limits.can_generate_post) {
		const message = formatLimitMessage("post", limits, subscription);
		throw new UsageLimitError(
			message,
			subscription.plan_type === "free",
			"post",
		);
	}

	if (action === "brand" && !limits.can_create_brand) {
		const message = formatLimitMessage("brand", limits, subscription);
		throw new UsageLimitError(
			message,
			subscription.plan_type === "free",
			"brand",
		);
	}
}

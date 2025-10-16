"use client";

import {
	BarChart3,
	CreditCard,
	ExternalLink,
	Loader2,
	Receipt,
	Settings,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBSCRIPTION_PLANS, type SubscriptionPlan } from "@/lib/stripe/config";
import { createClient } from "@/lib/supabase/client";
import { BillingHistory } from "./BillingHistory";
import { PricingCard } from "./PricingCard";
import { UsageDisplay } from "./UsageDisplay";

interface SubscriptionData {
	plan_type: SubscriptionPlan;
	status: string;
	current_period_end?: string;
	cancel_at_period_end?: boolean;
}

interface UsageData {
	postsGenerated: number;
	postsRemaining: number;
	brandsCreated: number;
	brandsRemaining: number;
	apiCallsUsed: number;
}

interface BillingRecord {
	id: string;
	created_at: string;
	amount_cents: number;
	currency: string;
	status: "paid" | "failed" | "pending" | "refunded";
	plan_type: string;
	description: string;
	stripe_invoice_id?: string;
	billing_period_start?: string;
	billing_period_end?: string;
}

export function SubscriptionManager() {
	const [subscription, setSubscription] = useState<SubscriptionData | null>(
		null,
	);
	const [usage, setUsage] = useState<UsageData | null>(null);
	const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([]);
	const [loading, setLoading] = useState(true);
	const [upgrading, setUpgrading] = useState(false);
	const supabase = createClient();

	const loadSubscriptionData = useCallback(async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			// Load subscription
			const { data: subData } = await supabase
				.from("subscriptions")
				.select("plan_type, status, current_period_end, cancel_at_period_end")
				.eq("user_id", user.id)
				.single();

			if (subData) {
				setSubscription(subData);
			}

			// Load usage data using the database function
			const { data: usageData } = await supabase.rpc("check_usage_limits", {
				user_uuid: user.id,
			});

			if (usageData && usageData.length > 0) {
				const usage = usageData[0];
				const planType = (subData?.plan_type ||
					"free") as keyof typeof SUBSCRIPTION_PLANS;
				const planLimits = SUBSCRIPTION_PLANS[planType].limits;

				setUsage({
					postsGenerated: planLimits.monthlyPosts - usage.posts_remaining,
					postsRemaining: usage.posts_remaining,
					brandsCreated: planLimits.brands - usage.brands_remaining,
					brandsRemaining: usage.brands_remaining,
					apiCallsUsed: 0, // Will be tracked in Phase 11.2
				});
			}

			// Load billing history
			const { data: billingData } = await supabase
				.from("billing_history")
				.select("*")
				.eq("user_id", user.id)
				.order("created_at", { ascending: false })
				.limit(10);

			if (billingData) {
				setBillingHistory(billingData);
			}
		} catch (error) {
			console.error("Error loading subscription data:", error);
			toast.error("Failed to load subscription data");
		} finally {
			setLoading(false);
		}
	}, [supabase]);

	useEffect(() => {
		loadSubscriptionData();
	}, [loadSubscriptionData]);

	const handleUpgrade = async (planType: SubscriptionPlan) => {
		if (planType === "free") {
			toast.error("Cannot upgrade to free plan");
			return;
		}

		setUpgrading(true);
		try {
			const response = await fetch("/api/stripe/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					planType,
					returnUrl: window.location.href,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to create checkout session");
			}

			// Redirect to Stripe Checkout
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("Upgrade error:", error);
			toast.error("Failed to start upgrade process");
		} finally {
			setUpgrading(false);
		}
	};

	const handleManageBilling = async () => {
		try {
			const response = await fetch("/api/stripe/portal", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to create portal session");
			}

			// Redirect to Stripe Customer Portal
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("Portal error:", error);
			toast.error("Failed to open billing portal");
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center py-8">
				<Loader2 className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Current Subscription Status */}
			{subscription && (
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center">
								<CreditCard className="w-5 h-5 mr-2" />
								Current Subscription
							</CardTitle>
							<div className="flex items-center space-x-2">
								<Badge variant="secondary" className="capitalize">
									{subscription.plan_type}
								</Badge>
								<Badge
									variant={
										subscription.status === "active" ? "default" : "destructive"
									}
									className="capitalize"
								>
									{subscription.status}
								</Badge>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									{subscription.current_period_end && (
										<>
											{subscription.cancel_at_period_end
												? "Cancels on:"
												: "Renews on:"}{" "}
											{new Date(
												subscription.current_period_end,
											).toLocaleDateString()}
										</>
									)}
								</p>
								{subscription.cancel_at_period_end && (
									<Alert className="mt-3">
										<AlertDescription>
											Your subscription will be canceled at the end of the
											current billing period. You&apos;ll still have access to
											all features until then.
										</AlertDescription>
									</Alert>
								)}
							</div>
							{subscription.plan_type !== "free" && (
								<Button variant="outline" onClick={handleManageBilling}>
									<Settings className="w-4 h-4 mr-2" />
									Manage Billing
									<ExternalLink className="w-4 h-4 ml-2" />
								</Button>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Tabs for different sections */}
			<Tabs defaultValue="plans" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="plans" className="flex items-center">
						<CreditCard className="w-4 h-4 mr-2" />
						Plans
					</TabsTrigger>
					<TabsTrigger value="usage" className="flex items-center">
						<BarChart3 className="w-4 h-4 mr-2" />
						Usage
					</TabsTrigger>
					<TabsTrigger value="billing" className="flex items-center">
						<Receipt className="w-4 h-4 mr-2" />
						Billing
					</TabsTrigger>
				</TabsList>

				<TabsContent value="plans" className="space-y-6">
					<div>
						<h3 className="text-lg font-semibold mb-2">Choose Your Plan</h3>
						<p className="text-gray-600 mb-6">
							Upgrade or downgrade your subscription at any time. Changes take
							effect immediately.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{(Object.keys(SUBSCRIPTION_PLANS) as SubscriptionPlan[]).map(
							(plan) => (
								<PricingCard
									key={plan}
									plan={plan}
									currentPlan={subscription?.plan_type}
									onUpgrade={handleUpgrade}
									isLoading={upgrading}
								/>
							),
						)}
					</div>
				</TabsContent>

				<TabsContent value="usage" className="space-y-6">
					{usage && subscription ? (
						<UsageDisplay
							usage={{
								...usage,
								planType: subscription.plan_type,
								billingCycleEnd: subscription.current_period_end,
							}}
						/>
					) : (
						<div className="text-center py-8">
							<BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
							<p className="text-gray-500">No usage data available</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="billing" className="space-y-6">
					<BillingHistory
						billingHistory={billingHistory}
						onDownloadInvoice={(invoiceId) => {
							// Open Stripe invoice URL in new tab
							window.open(
								`https://invoice.stripe.com/i/${invoiceId}`,
								"_blank",
							);
						}}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}

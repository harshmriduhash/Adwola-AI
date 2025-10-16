"use client";

import { Check, Crown, Loader2, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SUBSCRIPTION_PLANS, type SubscriptionPlan } from "@/lib/stripe/config";

interface PricingCardProps {
	plan: SubscriptionPlan;
	currentPlan?: SubscriptionPlan;
	onUpgrade?: (plan: SubscriptionPlan) => Promise<void>;
	isLoading?: boolean;
}

const planIcons = {
	free: Zap,
	pro: Crown,
	agency: Users,
};

const planColors = {
	free: "bg-gray-100 text-gray-800",
	pro: "bg-blue-100 text-blue-800",
	agency: "bg-purple-100 text-purple-800",
};

export function PricingCard({
	plan,
	currentPlan,
	onUpgrade,
	isLoading,
}: PricingCardProps) {
	const [upgrading, setUpgrading] = useState(false);
	const planConfig = SUBSCRIPTION_PLANS[plan];
	const Icon = planIcons[plan];
	const isCurrentPlan = currentPlan === plan;
	const isUpgrade =
		currentPlan &&
		plan !== "free" &&
		((currentPlan === "free" && (plan === "pro" || plan === "agency")) ||
			(currentPlan === "pro" && plan === "agency"));
	const isDowngrade =
		currentPlan &&
		((currentPlan === "pro" && plan === "free") ||
			(currentPlan === "agency" && (plan === "free" || plan === "pro")));

	const handleUpgrade = async () => {
		if (!onUpgrade) return;

		setUpgrading(true);
		try {
			await onUpgrade(plan);
		} catch (error) {
			console.error("Upgrade failed:", error);
		} finally {
			setUpgrading(false);
		}
	};

	const getButtonText = () => {
		if (isCurrentPlan) return "Current Plan";
		if (isUpgrade) return `Upgrade to ${planConfig.name}`;
		if (isDowngrade) return "Manage Subscription";
		return `Get ${planConfig.name}`;
	};

	const getButtonVariant = () => {
		if (isCurrentPlan) return "outline";
		if (plan === "pro") return "default";
		if (plan === "agency") return "default";
		return "outline";
	};

	return (
		<Card
			className={`relative ${plan === "pro" ? "border-2 border-blue-500 shadow-lg" : ""}`}
		>
			{plan === "pro" && (
				<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
					<Badge className="bg-blue-500 text-white">Most Popular</Badge>
				</div>
			)}

			<CardHeader className="text-center">
				<div
					className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${planColors[plan]}`}
				>
					<Icon className="w-6 h-6" />
				</div>

				<CardTitle className="text-2xl">{planConfig.name}</CardTitle>
				<CardDescription>{planConfig.description}</CardDescription>

				<div className="mt-4">
					<span className="text-4xl font-bold">${planConfig.price}</span>
					{planConfig.price > 0 && (
						<span className="text-gray-500">/month</span>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<ul className="space-y-3">
					{planConfig.features.map((feature, index) => (
						<li key={index} className="flex items-center">
							<Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
							<span className="text-sm">{feature}</span>
						</li>
					))}
				</ul>

				{/* Usage Limits Display */}
				<div className="mt-6 pt-6 border-t border-gray-200">
					<h4 className="text-sm font-medium text-gray-900 mb-3">
						Plan Limits
					</h4>
					<div className="space-y-2 text-sm text-gray-600">
						<div className="flex justify-between">
							<span>Monthly Posts:</span>
							<span className="font-medium">
								{planConfig.limits.monthlyPosts === -1
									? "Unlimited"
									: planConfig.limits.monthlyPosts}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Brands:</span>
							<span className="font-medium">
								{planConfig.limits.brands === -1
									? "Unlimited"
									: planConfig.limits.brands}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Team Members:</span>
							<span className="font-medium">
								{planConfig.limits.teamMembers}
							</span>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					className="w-full"
					variant={getButtonVariant()}
					onClick={handleUpgrade}
					disabled={isCurrentPlan || upgrading || isLoading}
				>
					{upgrading ? (
						<>
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							Processing...
						</>
					) : (
						getButtonText()
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}

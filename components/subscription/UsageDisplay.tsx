"use client";

import { Building2, FileText, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SUBSCRIPTION_PLANS } from "@/lib/stripe/config";

interface UsageStats {
	postsGenerated: number;
	postsRemaining: number;
	brandsCreated: number;
	brandsRemaining: number;
	apiCallsUsed: number;
	planType: "free" | "pro" | "agency";
	billingCycleEnd?: string;
}

interface UsageDisplayProps {
	usage: UsageStats;
}

export function UsageDisplay({ usage }: UsageDisplayProps) {
	const plan = SUBSCRIPTION_PLANS[usage.planType];
	const isUnlimited = (limit: number) => limit === -1;

	const getUsagePercentage = (used: number, total: number) => {
		if (total === -1) return 0; // Unlimited
		return Math.min((used / total) * 100, 100);
	};

	const getUsageColor = (percentage: number) => {
		if (percentage >= 90) return "text-red-600";
		if (percentage >= 75) return "text-yellow-600";
		return "text-green-600";
	};

	const postsTotal = plan.limits.monthlyPosts;
	const postsPercentage = getUsagePercentage(usage.postsGenerated, postsTotal);

	const brandsTotal = plan.limits.brands;
	const brandsPercentage = getUsagePercentage(usage.brandsCreated, brandsTotal);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="space-y-6">
			{/* Plan Status */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">Current Plan</CardTitle>
						<Badge variant="secondary" className="capitalize">
							{usage.planType}
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between text-sm text-gray-600">
						<span>Billing cycle ends:</span>
						<span className="font-medium">
							{usage.billingCycleEnd
								? formatDate(usage.billingCycleEnd)
								: "N/A"}
						</span>
					</div>
				</CardContent>
			</Card>

			{/* Usage Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Posts Usage */}
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<FileText className="w-5 h-5 mr-2 text-blue-600" />
								<span className="font-medium">Posts Generated</span>
							</div>
							<Badge
								variant="outline"
								className={getUsageColor(postsPercentage)}
							>
								{isUnlimited(postsTotal)
									? "∞"
									: `${usage.postsGenerated}/${postsTotal}`}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						{!isUnlimited(postsTotal) ? (
							<>
								<Progress value={postsPercentage} className="mb-2" />
								<div className="flex justify-between text-sm text-gray-600">
									<span>{usage.postsRemaining} remaining</span>
									<span>{Math.round(postsPercentage)}% used</span>
								</div>
							</>
						) : (
							<div className="text-center py-4">
								<TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
								<p className="text-sm text-gray-600">Unlimited posts</p>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Brands Usage */}
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<Building2 className="w-5 h-5 mr-2 text-purple-600" />
								<span className="font-medium">Brands Created</span>
							</div>
							<Badge
								variant="outline"
								className={getUsageColor(brandsPercentage)}
							>
								{isUnlimited(brandsTotal)
									? "∞"
									: `${usage.brandsCreated}/${brandsTotal}`}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						{!isUnlimited(brandsTotal) ? (
							<>
								<Progress value={brandsPercentage} className="mb-2" />
								<div className="flex justify-between text-sm text-gray-600">
									<span>{usage.brandsRemaining} remaining</span>
									<span>{Math.round(brandsPercentage)}% used</span>
								</div>
							</>
						) : (
							<div className="text-center py-4">
								<TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
								<p className="text-sm text-gray-600">Unlimited brands</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* API Usage */}
			<Card>
				<CardHeader>
					<div className="flex items-center">
						<Zap className="w-5 h-5 mr-2 text-yellow-600" />
						<CardTitle className="text-lg">API Usage</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600">API calls this month:</span>
						<Badge variant="outline">
							{usage.apiCallsUsed.toLocaleString()}
						</Badge>
					</div>
				</CardContent>
			</Card>

			{/* Usage Warnings */}
			{postsPercentage >= 80 && postsTotal !== -1 && (
				<Card className="border-yellow-200 bg-yellow-50">
					<CardContent className="pt-6">
						<div className="flex items-center">
							<div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
							<p className="text-sm text-yellow-800">
								You&apos;re approaching your monthly post limit. Consider
								upgrading your plan.
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{brandsPercentage >= 80 && brandsTotal !== -1 && (
				<Card className="border-yellow-200 bg-yellow-50">
					<CardContent className="pt-6">
						<div className="flex items-center">
							<div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
							<p className="text-sm text-yellow-800">
								You&apos;re approaching your brand limit. Consider upgrading
								your plan.
							</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

"use client";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
	Calendar,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Clock,
	CreditCard,
	Filter,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusIcon, getStatusColor } from "@/lib/status-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GeneratedPost {
	id: string;
	platform: string;
	generated_text: string;
	status: string;
	created_at: string;
}

interface ContentBrief {
	id: string;
	topic: string;
	goal: string;
	status: string;
	created_at: string;
	brands: { brand_name: string; logo_url?: string };
	generated_posts: GeneratedPost[];
}

interface Subscription {
	id: string;
	plan_name: string;
	status: string;
	created_at: string;
	current_period_end: string;
}

interface Usage {
	id: string;
	action: string;
	metadata: Record<string, unknown>;
	created_at: string;
}

interface ActivityFeedProps {
	briefs: ContentBrief[];
	subscription: Subscription | null;
	usage: Usage[];
	userId: string;
}

export function ActivityFeed({
	briefs,
	subscription,
	usage,
}: ActivityFeedProps) {
	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
	const [filterStatus, setFilterStatus] = useState<string>("all");

	const toggleExpanded = useCallback((id: string) => {
		setExpandedItems(prev => {
			const newExpanded = new Set(prev);
			if (newExpanded.has(id)) {
				newExpanded.delete(id);
			} else {
				newExpanded.add(id);
			}
			return newExpanded;
		});
	}, []);

	const filteredBriefs = useMemo(() => {
		if (filterStatus === "all") return briefs;
		return briefs.filter((brief) => brief.status === filterStatus);
	}, [briefs, filterStatus]);


	// Calculate stats
	const stats = useMemo(() => {
		const totalPosts = briefs.reduce(
			(sum, brief) => sum + brief.generated_posts.length,
			0,
		);
		const completedCampaigns = briefs.filter(
			(b) => b.status === "completed",
		).length;
		const processingCampaigns = briefs.filter(
			(b) => b.status === "processing",
		).length;

		return {
			totalCampaigns: briefs.length,
			completedCampaigns,
			processingCampaigns,
			totalPosts,
		};
	}, [briefs]);

	// Create timeline activities
	const timelineActivities = useMemo(() => {
		const activities = [];

		// Add brief activities
		briefs.forEach((brief) => {
			activities.push({
				id: brief.id,
				type: "campaign",
				title: `Campaign "${brief.topic}" ${brief.status === "completed" ? "completed" : brief.status === "processing" ? "started" : "created"}`,
				description: brief.goal,
				timestamp: brief.created_at,
				status: brief.status,
				metadata: { brief },
			});

			// Add post generation activities
			brief.generated_posts.forEach((post) => {
				activities.push({
					id: post.id,
					type: "post",
					title: `${post.platform} post generated`,
					description: post.generated_text.substring(0, 100) + "...",
					timestamp: post.created_at,
					status: post.status,
					metadata: { post, brief },
				});
			});
		});

		// Add subscription activities
		if (subscription) {
			const title = subscription.plan_name 
				? `Subscribed to ${subscription.plan_name} plan`
				: 'Account created with Free Plan';
			
			activities.push({
				id: subscription.id,
				type: "subscription",
				title,
				description: subscription.plan_name 
					? "Plan activated and billing started"
					: "Welcome to AmplifyAI! Start creating content with your free plan",
				timestamp: subscription.created_at,
				status: "completed",
				metadata: { subscription },
			});
		}

		// Add usage activities
		usage.forEach((use) => {
			activities.push({
				id: use.id,
				type: "usage",
				title: use.action,
				description: JSON.stringify(use.metadata),
				timestamp: use.created_at,
				status: "completed",
				metadata: { usage: use },
			});
		});

		return activities.sort(
			(a, b) =>
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
		);
	}, [briefs, subscription, usage]);

	return (
		<div className="max-w-6xl space-y-8">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="hover:shadow-md transition-shadow duration-200">
					<CardContent className="p-6 space-y-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Total Campaigns
							</p>
							<div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
								<Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-3xl font-bold tracking-tight">{stats.totalCampaigns}</p>
							<p className="text-xs text-muted-foreground">
								{stats.totalCampaigns > 0 ? 'campaigns created' : 'ready to start'}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow duration-200">
					<CardContent className="p-6 space-y-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Completed
							</p>
							<div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
								<CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-400">
								{stats.completedCampaigns}
							</p>
							<p className="text-xs text-muted-foreground">
								successful campaigns
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow duration-200">
					<CardContent className="p-6 space-y-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Processing
							</p>
							<div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
								<Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-3xl font-bold tracking-tight text-orange-600 dark:text-orange-400">
								{stats.processingCampaigns}
							</p>
							<p className="text-xs text-muted-foreground">
								in progress
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow duration-200">
					<CardContent className="p-6 space-y-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-muted-foreground">
								Posts Generated
							</p>
							<div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
								<TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-3xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
								{stats.totalPosts}
							</p>
							<p className="text-xs text-muted-foreground">
								content pieces
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Main Content */}
			<Tabs defaultValue="timeline" className="space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="timeline" className="flex items-center gap-2">
						<Clock className="w-4 h-4" />
						Timeline
					</TabsTrigger>
					<TabsTrigger value="campaigns" className="flex items-center gap-2">
						<Zap className="w-4 h-4" />
						Campaigns
					</TabsTrigger>
					<TabsTrigger value="subscription" className="flex items-center gap-2">
						<CreditCard className="w-4 h-4" />
						Subscription
					</TabsTrigger>
				</TabsList>

				<TabsContent value="timeline" className="space-y-4">
					<Card>
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
								</div>
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							{timelineActivities.length === 0 ? (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
										<Calendar className="w-8 h-8 text-gray-400" />
									</div>
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
										No activity yet
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-4">
										Start creating campaigns to see your activity timeline
									</p>
									<Button asChild>
										<a href="/campaigns">Create First Campaign</a>
									</Button>
								</div>
							) : (
								<div className="space-y-3">
									{timelineActivities.slice(0, 20).map((activity, index) => (
										<motion.div
											key={activity.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.03 }}
											className="flex items-start space-x-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200"
										>
											<div className="flex-shrink-0 mt-1">
												<div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
													{getStatusIcon(activity.status)}
												</div>
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium text-gray-900 dark:text-white leading-5">
															{activity.title}
														</p>
														{activity.description && (
															<p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-5">
																{activity.description}
															</p>
														)}
													</div>
													<div className="flex items-center gap-3 flex-shrink-0">
														<Badge variant="outline" className={getStatusColor(activity.status)}>
															{activity.status}
														</Badge>
													</div>
												</div>
												<p className="text-xs text-muted-foreground mt-2">
													{formatDistanceToNow(new Date(activity.timestamp), {
														addSuffix: true,
													})}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="campaigns" className="space-y-4">
					<Card>
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="flex items-center gap-3">
									<div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
										<Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
									</div>
									Campaign History
								</CardTitle>
								<div className="flex items-center gap-2">
									<Filter className="w-4 h-4 text-muted-foreground" />
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}
										className="text-sm border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										<option value="all">All Status</option>
										<option value="pending">Pending</option>
										<option value="processing">Processing</option>
										<option value="completed">Completed</option>
										<option value="error">Error</option>
									</select>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							{filteredBriefs.length === 0 ? (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
										<Zap className="w-8 h-8 text-gray-400" />
									</div>
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
										No campaigns yet
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-4">
										Create your first campaign to start generating content
									</p>
									<Button asChild>
										<a href="/campaigns">Create Campaign</a>
									</Button>
								</div>
							) : (
								<div className="space-y-4">
									{filteredBriefs.map((brief, index) => (
										<motion.div
											key={brief.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
											className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
										>
											<div className="flex items-start justify-between">
												<div className="flex-1 space-y-3">
													<div className="flex items-center gap-3">
														<div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
															{getStatusIcon(brief.status)}
														</div>
														<div className="flex-1">
															<div className="flex items-center gap-3 mb-1">
																<h3 className="font-semibold text-gray-900 dark:text-white text-lg">
																	{brief.topic}
																</h3>
																<Badge variant="outline" className={getStatusColor(brief.status)}>
																	{brief.status}
																</Badge>
															</div>
															<div className="flex items-center gap-2 text-sm text-muted-foreground">
																<span className="font-medium">{brief.brands.brand_name}</span>
																<span>•</span>
																<span>
																	{formatDistanceToNow(new Date(brief.created_at), {
																		addSuffix: true,
																	})}
																</span>
																<span>•</span>
																<span>{brief.generated_posts.length} posts</span>
															</div>
														</div>
													</div>
													{brief.goal && (
														<p className="text-sm text-muted-foreground leading-relaxed">
															{brief.goal}
														</p>
													)}
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => toggleExpanded(brief.id)}
													className="ml-4 flex-shrink-0"
												>
													{expandedItems.has(brief.id) ? (
														<ChevronUp className="w-4 h-4" />
													) : (
														<ChevronDown className="w-4 h-4" />
													)}
												</Button>
											</div>

											{expandedItems.has(brief.id) &&
												brief.generated_posts.length > 0 && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
													>
														<h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">
															Generated Posts ({brief.generated_posts.length})
														</h4>
														<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
															{brief.generated_posts.map((post) => (
																<div
																	key={post.id}
																	className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
																>
																	<div className="flex items-center justify-between mb-3">
																		<div className="flex items-center gap-2">
																			<div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
																				<span className="text-xs font-medium text-blue-600 dark:text-blue-400">
																					{post.platform.charAt(0).toUpperCase()}
																				</span>
																			</div>
																			<span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
																				{post.platform}
																			</span>
																		</div>
																		<Badge variant="outline" className={`text-xs ${getStatusColor(post.status)}`}>
																			{post.status}
																		</Badge>
																	</div>
																	<p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
																		{post.generated_text}
																	</p>
																</div>
															))}
														</div>
													</motion.div>
												)}
									</motion.div>
								))}
							</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="subscription" className="space-y-4">
					<Card>
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
								</div>
								Subscription Details
							</CardTitle>
						</CardHeader>
						<CardContent>
							{subscription ? (
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
											<div className="flex items-center gap-2 mb-3">
												<div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
													<CreditCard className="w-4 h-4 text-white" />
												</div>
												<h4 className="font-semibold text-blue-900 dark:text-blue-400">
													Current Plan
												</h4>
											</div>
											<p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
												{subscription.plan_name || 'Free Plan'}
											</p>
											<p className="text-sm text-blue-700 dark:text-blue-300">
												Status: <span className="font-medium capitalize">{subscription.status}</span>
											</p>
										</div>
										{subscription.current_period_end && (
											<div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
												<div className="flex items-center gap-2 mb-3">
													<div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
														<Calendar className="w-4 h-4 text-white" />
													</div>
													<h4 className="font-semibold text-green-900 dark:text-green-400">
														Next Billing
													</h4>
												</div>
												<p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
													{new Date(subscription.current_period_end).toLocaleDateString()}
												</p>
												<p className="text-sm text-green-700 dark:text-green-300">
													Auto-renewal enabled
												</p>
											</div>
										)}
									</div>
									
									<div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
										<h4 className="font-semibold text-gray-900 dark:text-white mb-3">
											Subscription History
										</h4>
										<div className="space-y-3">
											<div className="flex items-center justify-between py-2">
												<span className="text-sm text-gray-600 dark:text-gray-400">
													Plan activated
												</span>
												<span className="text-sm font-medium text-gray-900 dark:text-white">
													{formatDistanceToNow(new Date(subscription.created_at), { addSuffix: true })}
												</span>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
										<Users className="w-8 h-8 text-gray-400" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
										No Active Subscription
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
										Upgrade to a paid plan to unlock additional features and higher usage limits
									</p>
									<Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
										View Plans
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

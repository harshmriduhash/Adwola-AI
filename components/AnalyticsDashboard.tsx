"use client";

import {
	Clock,
	Eye,
	Heart,
	Lightbulb,
	Target,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ABTestManager from "@/components/ABTestManager";
import EnhancedAnalyticsDashboard from "@/components/EnhancedAnalyticsDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

interface PostAnalytics {
	id: string;
	post_id: string;
	platform: string;
	views_count: number;
	likes_count: number;
	shares_count: number;
	comments_count: number;
	clicks_count: number;
	engagement_rate: number;
	performance_score: number;
	published_at: string;
	last_updated: string;
}

interface ContentInsight {
	id: string;
	insight_type: string;
	title: string;
	description: string;
	recommendation: string;
	confidence_score: number;
	status: string;
	created_at: string;
}

// interface PerformancePattern {
//   content_type: string
//   avg_performance: number
//   trend: 'improving' | 'declining' | 'stable'
//   sample_count: number
// }

export default function AnalyticsDashboard() {
	const [analytics, setAnalytics] = useState<PostAnalytics[]>([]);
	const [insights, setInsights] = useState<ContentInsight[]>([]);
	// const [patterns, setPatterns] = useState<PerformancePattern[]>([])
	const [loading, setLoading] = useState(true);
	const [timeframe, setTimeframe] = useState("30");
	const [selectedPlatform, setSelectedPlatform] = useState("all");
	const [isAnalyzing, setIsAnalyzing] = useState(false);

	const supabase = createClient();

	// Memoize data fetching functions to prevent unnecessary recreations
	const fetchAnalyticsData = useCallback(async () => {
		try {
			setLoading(true);

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const timeframeStart = new Date();
			timeframeStart.setDate(timeframeStart.getDate() - parseInt(timeframe));

			let query = supabase
				.from("post_analytics")
				.select(`
          *,
          generated_posts!inner(
            id,
            content_briefs!inner(user_id)
          )
        `)
				.eq("generated_posts.content_briefs.user_id", user.id)
				.gte("published_at", timeframeStart.toISOString())
				.order("published_at", { ascending: false });

			if (selectedPlatform !== "all") {
				query = query.eq("platform", selectedPlatform);
			}

			const { data, error } = await query;

			if (error) {
				console.error("Error fetching analytics:", error.message || error);
				toast.error(
					`Failed to fetch analytics data: ${error.message || "Unknown error"}`,
				);
				return;
			}

			setAnalytics(data || []);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to load analytics");
		} finally {
			setLoading(false);
		}
	}, [supabase, timeframe, selectedPlatform]);

	const fetchInsights = useCallback(async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const { data, error } = await supabase
				.from("content_insights")
				.select("*")
				.eq("user_id", user.id)
				.eq("status", "active")
				.order("created_at", { ascending: false })
				.limit(10);

			if (error) {
				console.error("Error fetching insights:", error.message || error);
				toast.error(
					`Failed to fetch insights: ${error.message || "Unknown error"}`,
				);
				return;
			}

			setInsights(data || []);
		} catch (error) {
			console.error("Error:", error);
		}
	}, [supabase]);

	const runContentAnalysis = useCallback(async () => {
		try {
			setIsAnalyzing(true);

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const response = await fetch("/api/analyze-content", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user.id,
					analysis_type: "performance_review",
					timeframe_days: parseInt(timeframe),
				}),
			});

			if (!response.ok) {
				throw new Error("Analysis failed");
			}

			await response.json();

			toast.success("Content analysis completed!");
			await fetchInsights();
		} catch (error) {
			console.error("Analysis error:", error);
			toast.error("Failed to analyze content");
		} finally {
			setIsAnalyzing(false);
		}
	}, [supabase, timeframe, fetchInsights]);

	const dismissInsight = useCallback(
		async (insightId: string) => {
			try {
				const { error } = await supabase
					.from("content_insights")
					.update({ status: "dismissed" })
					.eq("id", insightId);

				if (error) throw error;

				setInsights(insights.filter((insight) => insight.id !== insightId));
				toast.success("Insight dismissed");
			} catch (error) {
				console.error("Error:", error);
				toast.error("Failed to dismiss insight");
			}
		},
		[supabase, insights],
	);

	useEffect(() => {
		fetchAnalyticsData();
		fetchInsights();
	}, [fetchAnalyticsData, fetchInsights]);

	// Memoize expensive calculations to prevent recalculation on every render
	const calculateOverallMetrics = useMemo(() => {
		if (analytics.length === 0) {
			return {
				totalViews: 0,
				totalEngagement: 0,
				avgEngagementRate: 0,
				avgPerformanceScore: 0,
			};
		}

		const totalViews = analytics.reduce(
			(sum, item) => sum + item.views_count,
			0,
		);
		const totalEngagement = analytics.reduce(
			(sum, item) =>
				sum + item.likes_count + item.shares_count + item.comments_count,
			0,
		);
		const avgEngagementRate =
			analytics.reduce((sum, item) => sum + item.engagement_rate, 0) /
			analytics.length;
		const avgPerformanceScore =
			analytics.reduce((sum, item) => sum + item.performance_score, 0) /
			analytics.length;

		return {
			totalViews,
			totalEngagement,
			avgEngagementRate,
			avgPerformanceScore,
		};
	}, [analytics]);

	const getTopPerformingPosts = useMemo(() => {
		return analytics
			.sort((a, b) => b.performance_score - a.performance_score)
			.slice(0, 5);
	}, [analytics]);

	const getPlatformBreakdown = useMemo(() => {
		const platformStats = analytics.reduce(
			(
				acc: Record<
					string,
					{
						count: number;
						totalViews: number;
						totalEngagement: number;
						avgPerformance: number;
					}
				>,
				item,
			) => {
				if (!acc[item.platform]) {
					acc[item.platform] = {
						count: 0,
						totalViews: 0,
						totalEngagement: 0,
						avgPerformance: 0,
					};
				}

				acc[item.platform].count += 1;
				acc[item.platform].totalViews += item.views_count;
				acc[item.platform].totalEngagement +=
					item.likes_count + item.shares_count + item.comments_count;
				acc[item.platform].avgPerformance += item.performance_score;

				return acc;
			},
			{},
		);

		// Calculate averages
		Object.keys(platformStats).forEach((platform) => {
			platformStats[platform].avgPerformance =
				platformStats[platform].avgPerformance / platformStats[platform].count;
		});

		return platformStats;
	}, [analytics]);

	// const getTrendIcon = (trend: string) => {
	//   switch (trend) {
	//     case 'improving':
	//       return <TrendingUp className="h-4 w-4 text-green-500" />
	//     case 'declining':
	//       return <TrendingDown className="h-4 w-4 text-red-500" />
	//     default:
	//       return <BarChart3 className="h-4 w-4 text-yellow-500" />
	//   }
	// }

	const getInsightIcon = (type: string) => {
		switch (type) {
			case "optimization":
				return <Target className="h-4 w-4" />;
			case "timing":
				return <Clock className="h-4 w-4" />;
			case "trend":
				return <TrendingUp className="h-4 w-4" />;
			default:
				return <Lightbulb className="h-4 w-4" />;
		}
	};

	const metrics = calculateOverallMetrics;
	const topPosts = getTopPerformingPosts;
	const platformStats = getPlatformBreakdown;

	if (loading) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header and Controls */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h2 className="text-2xl font-bold">Performance Analytics</h2>
					<p className="text-gray-600">
						AI-powered insights and performance tracking
					</p>
				</div>

				<div className="flex gap-2">
					<Select value={timeframe} onValueChange={setTimeframe}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7">Last 7 days</SelectItem>
							<SelectItem value="30">Last 30 days</SelectItem>
							<SelectItem value="90">Last 90 days</SelectItem>
						</SelectContent>
					</Select>

					<Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Platforms</SelectItem>
							<SelectItem value="linkedin">LinkedIn</SelectItem>
							<SelectItem value="twitter">Twitter</SelectItem>
							<SelectItem value="facebook">Facebook</SelectItem>
							<SelectItem value="instagram">Instagram</SelectItem>
						</SelectContent>
					</Select>

					<Button
						onClick={runContentAnalysis}
						disabled={isAnalyzing}
						className="flex items-center gap-2"
					>
						<Zap className="h-4 w-4" />
						{isAnalyzing ? "Analyzing..." : "Run Analysis"}
					</Button>
				</div>
			</div>

			{/* Overview Metrics */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Views</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{metrics.totalViews.toLocaleString()}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Engagement
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{metrics.totalEngagement.toLocaleString()}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Avg. Engagement Rate
						</CardTitle>
						<Heart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{(metrics.avgEngagementRate * 100).toFixed(1)}%
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Performance Score
						</CardTitle>
						<Target className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{metrics.avgPerformanceScore.toFixed(0)}/100
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="enhanced" className="space-y-4">
				<TabsList>
					<TabsTrigger value="enhanced">Enhanced Analytics</TabsTrigger>
					<TabsTrigger value="insights">AI Insights</TabsTrigger>
					<TabsTrigger value="performance">Top Performing</TabsTrigger>
					<TabsTrigger value="platforms">Platform Breakdown</TabsTrigger>
					<TabsTrigger value="abtesting">A/B Testing</TabsTrigger>
				</TabsList>

				<TabsContent value="enhanced" className="space-y-4">
					<EnhancedAnalyticsDashboard className="p-0 bg-transparent" />
				</TabsContent>

				<TabsContent value="insights" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>AI-Generated Insights</CardTitle>
							<CardDescription>
								Actionable recommendations based on your content performance
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{insights.length === 0 ? (
								<div className="text-center py-6 text-gray-500">
									<Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
									<p>No insights available yet.</p>
									<p className="text-sm">
										Run an analysis to get AI-powered recommendations.
									</p>
								</div>
							) : (
								insights.map((insight) => (
									<div
										key={insight.id}
										className="border rounded-lg p-4 space-y-3"
									>
										<div className="flex items-start justify-between">
											<div className="flex items-start gap-3">
												{getInsightIcon(insight.insight_type)}
												<div className="space-y-1">
													<div className="flex items-center gap-2">
														<h4 className="font-medium">{insight.title}</h4>
														<Badge variant="outline" className="text-xs">
															{Math.round(insight.confidence_score * 100)}%
															confidence
														</Badge>
													</div>
													<p className="text-sm text-gray-600">
														{insight.description}
													</p>
													<p className="text-sm font-medium text-blue-600">
														{insight.recommendation}
													</p>
												</div>
											</div>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => dismissInsight(insight.id)}
											>
												Dismiss
											</Button>
										</div>
									</div>
								))
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="performance" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Top Performing Posts</CardTitle>
							<CardDescription>Your highest scoring content</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{topPosts.map((post, index) => (
								<div
									key={post.id}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex items-center gap-3">
										<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
											{index + 1}
										</div>
										<div>
											<div className="font-medium capitalize">
												{post.platform}
											</div>
											<div className="text-sm text-gray-500">
												{new Date(post.published_at).toLocaleDateString()}
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="font-medium">
											{post.performance_score.toFixed(0)}/100
										</div>
										<div className="text-sm text-gray-500">
											{(post.engagement_rate * 100).toFixed(1)}% engagement
										</div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="platforms" className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Object.entries(platformStats).map(([platform, stats]) => (
							<Card key={platform}>
								<CardHeader>
									<CardTitle className="capitalize">{platform}</CardTitle>
									<CardDescription>
										{stats.count} posts analyzed
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Performance Score</span>
											<span>{stats.avgPerformance.toFixed(0)}/100</span>
										</div>
										<Progress value={stats.avgPerformance} className="h-2" />
									</div>

									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<div className="text-gray-600">Total Views</div>
											<div className="font-medium">
												{stats.totalViews.toLocaleString()}
											</div>
										</div>
										<div>
											<div className="text-gray-600">Total Engagement</div>
											<div className="font-medium">
												{stats.totalEngagement.toLocaleString()}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="abtesting">
					<ABTestManager />
				</TabsContent>
			</Tabs>
		</div>
	);
}

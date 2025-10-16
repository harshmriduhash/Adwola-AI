"use client";

import {
	BarChart3,
	Bookmark,
	Calendar,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Clock,
	Eye,
	Grid,
	List,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { BulkOperations } from "@/components/BulkOperations";
import { ContentCalendar } from "@/components/ContentCalendar";
import { ContentTemplates } from "@/components/ContentTemplates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { getStatusIcon, getStatusColor } from "@/lib/status-utils";

interface GeneratedPost {
	id: string;
	platform: string;
	generated_text: string;
	status: string;
	schedule_time: string | null;
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

interface Brand {
	id: string;
	brand_name: string;
	logo_url?: string;
}

interface RealtimeDashboardProps {
	initialBriefs: ContentBrief[];
	brands: Brand[];
	userId: string;
}

// Enhanced memoized components for performance
const StatsCard = memo(
	({
		title,
		value,
		icon: Icon,
		trend,
		color = "blue",
	}: {
		title: string;
		value: number;
		icon: React.ComponentType<{ className?: string }>;
		trend?: { value: number; label: string };
		color?: "blue" | "green" | "purple" | "orange";
	}) => {
		const colorMap = {
			blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
			green: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
			purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
			orange: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
		};

		return (
			<Card className="hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-700">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
					<CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
						{title}
					</CardTitle>
					<div className={`p-2 rounded-lg ${colorMap[color]}`}>
						<Icon className="h-4 w-4" />
					</div>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
						{value.toLocaleString()}
					</div>
					{trend && (
						<div className="flex items-center text-xs">
							<span className={`font-medium ${trend.value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
								{trend.value >= 0 ? '+' : ''}{trend.value}%
							</span>
							<span className="text-gray-500 dark:text-gray-400 ml-1">
								{trend.label}
							</span>
						</div>
					)}
				</CardContent>
			</Card>
		);
	},
);

const BriefCard = memo(
	({
		brief,
		onView,
	}: {
		brief: ContentBrief;
		onView: (id: string) => void;
	}) => {

		return (
			<Card className="hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
				<CardHeader className="pb-4">
					<div className="flex justify-between items-start gap-4">
						<div className="flex-1 min-w-0">
							<CardTitle className="flex items-center gap-3 mb-2">
								{getStatusIcon(brief.status)}
								<span className="truncate text-lg font-semibold text-gray-900 dark:text-white">
									{brief.topic}
								</span>
							</CardTitle>
							<div className="flex items-center gap-3 text-sm">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									<span className="text-gray-600 dark:text-gray-400 font-medium">
										{brief.brands.brand_name}
									</span>
								</div>
								<span className="text-gray-300 dark:text-gray-600">•</span>
								<span className="text-gray-500 dark:text-gray-400">
									{new Date(brief.created_at).toLocaleDateString()}
								</span>
							</div>
						</div>
						<Badge className={`${getStatusColor(brief.status)} font-medium px-3 py-1`}>
							{brief.status.charAt(0).toUpperCase() + brief.status.slice(1)}
						</Badge>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
						<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
							<span className="font-medium text-gray-900 dark:text-white">Goal:</span> {brief.goal}
						</p>
					</div>

					{brief.generated_posts.length > 0 && (
						<div>
							<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
								<Zap className="h-4 w-4 text-blue-500" />
								Generated Posts ({brief.generated_posts.length})
							</h4>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
								{brief.generated_posts.map((post) => (
									<div
										key={post.id}
										className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:shadow-sm transition-shadow"
									>
										<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
											{post.platform}
										</span>
										<Badge variant="outline" className="text-xs">
											{post.status}
										</Badge>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
						<Button
							size="sm"
							variant="default"
							onClick={() => onView(brief.id)}
							className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
						>
							<Eye className="w-4 h-4 mr-2" />
							View Details
						</Button>
						{brief.status === "completed" && (
							<Button 
								size="sm" 
								variant="outline"
								className="border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
							>
								<Calendar className="w-4 h-4 mr-2" />
								Schedule Posts
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		);
	},
);

// Pagination constants
const BRIEFS_PER_PAGE = 10;

export function RealtimeDashboard({
	initialBriefs,
	userId,
}: RealtimeDashboardProps) {
	const [briefs, setBriefs] = useState<ContentBrief[]>(initialBriefs);
	const [isConnected, setIsConnected] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalBriefs, setTotalBriefs] = useState(initialBriefs.length);
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const router = useRouter();
	const supabase = createClient();

	// Get active tab from URL or default to 'overview'
	const activeTab = searchParams?.get("tab") || "overview";

	// Optimized pagination
	const paginatedBriefs = useMemo(() => {
		const startIndex = (currentPage - 1) * BRIEFS_PER_PAGE;
		const endIndex = startIndex + BRIEFS_PER_PAGE;
		return briefs.slice(startIndex, endIndex);
	}, [briefs, currentPage]);

	const totalPages = useMemo(() => {
		return Math.ceil(totalBriefs / BRIEFS_PER_PAGE);
	}, [totalBriefs]);

	// Optimized brief fetching with pagination
	const fetchBriefsPage = useCallback(
		async (page: number) => {
			setLoading(true);
			try {
				const startIndex = (page - 1) * BRIEFS_PER_PAGE;

				// Optimized query - fetch briefs first, then posts separately
				const {
					data: briefsData,
					error: briefsError,
					count,
				} = await supabase
					.from("content_briefs")
					.select(
						`
          *,
          brands (brand_name, logo_url)
        `,
						{ count: "exact" },
					)
					.eq("user_id", userId)
					.order("created_at", { ascending: false })
					.range(startIndex, startIndex + BRIEFS_PER_PAGE - 1);

				if (briefsError) throw briefsError;

				// Fetch posts separately for better performance
				if (briefsData) {
					const briefIds = briefsData.map((brief) => brief.id);
					const { data: postsData } = await supabase
						.from("generated_posts")
						.select("*")
						.in("brief_id", briefIds);

					// Combine data efficiently
					const briefsWithPosts = briefsData.map((brief) => ({
						...brief,
						generated_posts:
							postsData?.filter((post) => post.brief_id === brief.id) || [],
					}));

					if (page === 1) {
						setBriefs(briefsWithPosts);
					} else {
						setBriefs((prev) => [...prev, ...briefsWithPosts]);
					}

					if (count !== null) {
						setTotalBriefs(count);
					}
				}
			} catch (error) {
				console.error("Error fetching briefs:", error);
			} finally {
				setLoading(false);
			}
		},
		[supabase, userId],
	);

	// Optimized real-time subscription with filtering
	useEffect(() => {
		// Single subscription with better filtering
		const briefsChannel = supabase
			.channel("dashboard_updates")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "content_briefs",
					filter: `user_id=eq.${userId}`,
				},
				(payload) => {
					console.log("Brief change received:", payload);

					// Optimized state updates
					setBriefs((prev) => {
						if (payload.eventType === "INSERT") {
							return [payload.new as ContentBrief, ...prev];
						} else if (payload.eventType === "UPDATE") {
							return prev.map((brief) =>
								brief.id === payload.new.id
									? { ...brief, ...payload.new }
									: brief,
							);
						} else if (payload.eventType === "DELETE") {
							return prev.filter((brief) => brief.id !== payload.old.id);
						}
						return prev;
					});
				},
			)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "generated_posts",
				},
				(payload) => {
					console.log("Post change received:", payload);

					// Optimized post updates
					setBriefs((prev) =>
						prev.map((brief) => {
							const newPost = payload.new as GeneratedPost & {
								brief_id: string;
							};
							if (newPost?.brief_id === brief.id) {
								if (payload.eventType === "INSERT") {
									const exists = brief.generated_posts.find(
										(p) => p.id === newPost.id,
									);
									if (!exists) {
										return {
											...brief,
											generated_posts: [...brief.generated_posts, newPost],
										};
									}
								} else if (payload.eventType === "UPDATE") {
									return {
										...brief,
										generated_posts: brief.generated_posts.map((post) =>
											post.id === newPost.id ? { ...post, ...newPost } : post,
										),
									};
								}
							}
							return brief;
						}),
					);
				},
			)
			.subscribe((status) => {
				setIsConnected(status === "SUBSCRIBED");
			});

		return () => {
			briefsChannel.unsubscribe();
		};
	}, [userId, supabase]);

	// Memoized stats calculation
	const stats = useMemo(() => {
		return {
			totalCampaigns: totalBriefs,
			completedCampaigns: briefs.filter((b) => b.status === "completed").length,
			totalPosts: briefs.reduce(
				(sum, brief) => sum + brief.generated_posts.length,
				0,
			),
			processingCampaigns: briefs.filter((b) => b.status === "processing")
				.length,
		};
	}, [briefs, totalBriefs]);

	const scheduledPostsCount = useMemo(() => {
		return briefs.reduce(
			(sum, brief) =>
				sum +
				brief.generated_posts.filter(
					(post) => post.schedule_time && post.status === "scheduled",
				).length,
			0,
		);
	}, [briefs]);

	// Memoized event handlers
	const handleViewBrief = useCallback(
		(briefId: string) => {
			router.push(`/dashboard/brief/${briefId}`);
		},
		[router],
	);

	const handlePageChange = useCallback(
		(newPage: number) => {
			if (newPage >= 1 && newPage <= totalPages) {
				setCurrentPage(newPage);
				if (newPage * BRIEFS_PER_PAGE > briefs.length) {
					fetchBriefsPage(newPage);
				}
			}
		},
		[totalPages, briefs.length, fetchBriefsPage],
	);

	return (
		<div className="space-y-6">
			{/* Connection Status */}
			<div className="flex items-center gap-2 text-sm">
				<div
					className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
				/>
				<span className={isConnected ? "text-green-600" : "text-red-600"}>
					{isConnected ? "Real-time connected" : "Connecting..."}
				</span>
			</div>

			{/* Enhanced Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<StatsCard
					title="Total Campaigns"
					value={stats.totalCampaigns}
					icon={BarChart3}
					color="blue"
					trend={{ value: 12, label: "vs last month" }}
				/>
				<StatsCard
					title="Completed"
					value={stats.completedCampaigns}
					icon={CheckCircle}
					color="green"
					trend={{ value: 8, label: "vs last month" }}
				/>
				<StatsCard
					title="Posts Generated"
					value={stats.totalPosts}
					icon={Zap}
					color="purple"
					trend={{ value: 23, label: "vs last month" }}
				/>
				<StatsCard
					title="Scheduled Posts"
					value={scheduledPostsCount}
					icon={Calendar}
					color="orange"
					trend={{ value: 15, label: "vs last month" }}
				/>
			</div>

			{/* Main Content Tabs */}
			<Tabs
				value={activeTab}
				onValueChange={(value) => {
					const newUrl =
						value === "overview" ? "/dashboard" : `/dashboard?tab=${value}`;
					router.push(newUrl);
				}}
				className="space-y-4"
			>
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="overview" className="flex items-center gap-2">
						<List className="h-4 w-4" />
						Overview
					</TabsTrigger>
					<TabsTrigger value="calendar" className="flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						Calendar
					</TabsTrigger>
					<TabsTrigger value="bulk" className="flex items-center gap-2">
						<Grid className="h-4 w-4" />
						Bulk Ops
					</TabsTrigger>
					<TabsTrigger value="templates" className="flex items-center gap-2">
						<Bookmark className="h-4 w-4" />
						Templates
					</TabsTrigger>
					<TabsTrigger value="analytics" className="flex items-center gap-2">
						<BarChart3 className="h-4 w-4" />
						Analytics
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold">Recent Campaigns</h2>
						<Button asChild>
							<Link href="/campaigns">Create New Campaign</Link>
						</Button>
					</div>

					{briefs.length === 0 ? (
						<Card className="border-dashed border-2 border-gray-200 dark:border-gray-700">
							<CardContent className="flex flex-col items-center justify-center py-16">
								<div className="max-w-md text-center">
									<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-6">
										<Zap className="h-16 w-16 text-blue-500 mx-auto mb-4" />
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
											Ready to create amazing content?
										</h3>
										<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
											Launch your first AI-powered campaign and watch your social media engagement soar. Create professional content in minutes, not hours.
										</p>
										<div className="space-y-4">
											<Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
												<Link href="/campaigns">
													<Zap className="h-5 w-5 mr-2" />
													Create Your First Campaign
												</Link>
											</Button>
											<div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
												<div className="flex items-center gap-1">
													<CheckCircle className="h-4 w-4 text-green-500" />
													<span>Free to start</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-blue-500" />
													<span>2-min setup</span>
												</div>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-3 gap-4 text-center">
										<div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
											<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1.</div>
											<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Describe your brand</div>
										</div>
										<div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
											<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.</div>
											<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">AI creates content</div>
										</div>
										<div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
											<div className="text-2xl font-bold text-green-600 dark:text-green-400">3.</div>
											<div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Publish & track</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					) : (
						<>
							<div className="grid gap-6">
								{paginatedBriefs.map((brief) => (
									<BriefCard
										key={brief.id}
										brief={brief}
										onView={handleViewBrief}
									/>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex items-center justify-between">
									<p className="text-sm text-gray-700">
										Showing {(currentPage - 1) * BRIEFS_PER_PAGE + 1} to{" "}
										{Math.min(currentPage * BRIEFS_PER_PAGE, totalBriefs)} of{" "}
										{totalBriefs} campaigns
									</p>
									<div className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1 || loading}
										>
											<ChevronLeft className="h-4 w-4" />
											Previous
										</Button>
										<span className="text-sm">
											Page {currentPage} of {totalPages}
										</span>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages || loading}
										>
											Next
											<ChevronRight className="h-4 w-4" />
										</Button>
									</div>
								</div>
							)}
						</>
					)}
				</TabsContent>

				<TabsContent value="calendar">
					<ContentCalendar briefs={briefs} />
				</TabsContent>

				<TabsContent value="bulk">
					<BulkOperations briefs={briefs} />
				</TabsContent>

				<TabsContent value="templates">
					<ContentTemplates />
				</TabsContent>

				<TabsContent value="analytics">
					<AnalyticsDashboard />
				</TabsContent>
			</Tabs>
		</div>
	);
}

StatsCard.displayName = "StatsCard";
BriefCard.displayName = "BriefCard";

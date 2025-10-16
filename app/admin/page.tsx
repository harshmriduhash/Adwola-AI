import { BarChart3, Calendar, Clock, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

interface SchedulingLog {
	id: string;
	posts_processed: number;
	processed_at: string;
}

export default async function AdminPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user || !user.user_metadata?.is_admin) {
		return redirect("/dashboard");
	}

	// Fetch admin statistics
	const [
		{ count: totalUsers },
		{ count: totalBriefs },
		{ count: totalPosts },
		{ count: scheduledPosts },
		{ data: schedulingLogs },
	] = await Promise.all([
		supabase.from("users").select("*", { count: "exact", head: true }),
		supabase.from("content_briefs").select("*", { count: "exact", head: true }),
		supabase
			.from("generated_posts")
			.select("*", { count: "exact", head: true }),
		supabase
			.from("generated_posts")
			.select("*", { count: "exact", head: true })
			.eq("status", "scheduled"),
		supabase
			.from("scheduling_logs")
			.select("*")
			.order("processed_at", { ascending: false })
			.limit(10),
	]);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Admin Dashboard
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Monitor system performance and scheduling activities
					</p>
				</div>

				{/* Statistics */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Users</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalUsers || 0}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Content Briefs
							</CardTitle>
							<BarChart3 className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalBriefs || 0}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Generated Posts
							</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalPosts || 0}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Scheduled Posts
							</CardTitle>
							<Calendar className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{scheduledPosts || 0}</div>
						</CardContent>
					</Card>
				</div>

				{/* Scheduling Logs */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Scheduling Activity</CardTitle>
					</CardHeader>
					<CardContent>
						{schedulingLogs && schedulingLogs.length > 0 ? (
							<div className="space-y-3">
								{schedulingLogs.map((log: SchedulingLog) => (
									<div
										key={log.id}
										className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
									>
										<div>
											<p className="text-sm font-medium">
												Processed {log.posts_processed} posts
											</p>
											<p className="text-xs text-gray-500">
												{new Date(log.processed_at).toLocaleString()}
											</p>
										</div>
										<Badge variant="outline">{log.posts_processed} posts</Badge>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500 text-center py-8">
								No scheduling activity yet
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

"use client";

import {
	ArrowLeft,
	Calendar,
	CheckCircle,
	Clock,
	Copy,
	Edit3,
	ExternalLink,
	Save,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { SchedulePostDialog } from "@/components/SchedulePostDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { getStatusIcon } from "@/lib/status-utils";

interface GeneratedPost {
	id: string;
	platform: string;
	generated_text: string;
	generated_media_urls: string[] | null;
	status: string;
	schedule_time: string | null;
	post_url: string | null;
}

interface Brand {
	id: string;
	brand_name: string;
	brand_description: string;
	tone_of_voice: string;
	logo_url?: string;
}

interface Brief {
	id: string;
	topic: string;
	goal: string;
	cta_text: string;
	status: string;
	created_at: string;
	brands: Brand;
	generated_posts: GeneratedPost[];
}

interface BriefDetailViewProps {
	brief: Brief;
}

export function BriefDetailView({ brief: initialBrief }: BriefDetailViewProps) {
	const [brief] = useState<Brief>(initialBrief);
	const [editingPost, setEditingPost] = useState<string | null>(null);
	const [editedContent, setEditedContent] = useState<string>("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [schedulingPost, setSchedulingPost] = useState<string | null>(null);
	const supabase = createClient();

	const handleEditPost = (post: GeneratedPost) => {
		setEditingPost(post.id);
		setEditedContent(post.generated_text);
	};

	const handleSavePost = async (postId: string) => {
		setIsUpdating(true);

		try {
			const { error } = await supabase
				.from("generated_posts")
				.update({ generated_text: editedContent })
				.eq("id", postId);

			if (error) throw error;

			toast.success("Post updated successfully!");
			setEditingPost(null);

			// Update local state
			// In a real app, you might want to refetch or use optimistic updates
			window.location.reload();
		} catch (error: unknown) {
			toast.error(
				`Failed to update post: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleApprovePost = async (postId: string) => {
		try {
			const { error } = await supabase
				.from("generated_posts")
				.update({ status: "approved" })
				.eq("id", postId);

			if (error) throw error;

			toast.success("Post approved!");
			window.location.reload();
		} catch (error: unknown) {
			toast.error(
				`Failed to approve post: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	};

	const handleCopyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied to clipboard!");
		} catch (error: unknown) {
			toast.error(
				`Failed to copy to clipboard: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	};

	const getPlatformColor = (platform: string) => {
		switch (platform.toLowerCase()) {
			case "linkedin":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
			case "twitter":
				return "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200";
			case "instagram":
				return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
			case "facebook":
				return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
		}
	};


	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="outline" size="sm" asChild>
					<Link href="/dashboard">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Dashboard
					</Link>
				</Button>
				<div className="flex-1">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
						{brief.topic}
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						{brief.brands.brand_name} •{" "}
						{new Date(brief.created_at).toLocaleDateString()}
					</p>
				</div>
				<Badge variant="outline" className="capitalize">
					{brief.status}
				</Badge>
			</div>

			{/* Brief Summary */}
			<Card>
				<CardHeader>
					<CardTitle>Campaign Brief</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-medium mb-1">Topic</h4>
						<p className="text-gray-600 dark:text-gray-400">{brief.topic}</p>
					</div>
					<div>
						<h4 className="font-medium mb-1">Goal</h4>
						<p className="text-gray-600 dark:text-gray-400">{brief.goal}</p>
					</div>
					{brief.cta_text && (
						<div>
							<h4 className="font-medium mb-1">Call to Action</h4>
							<p className="text-gray-600 dark:text-gray-400">
								{brief.cta_text}
							</p>
						</div>
					)}
					<div>
						<h4 className="font-medium mb-1">Brand Guidelines</h4>
						<div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
							<p>
								<strong>Description:</strong> {brief.brands.brand_description}
							</p>
							<p>
								<strong>Tone:</strong> {brief.brands.tone_of_voice}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Generated Posts */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">
					Generated Posts ({brief.generated_posts.length})
				</h2>

				{brief.generated_posts.length === 0 ? (
					<Card>
						<CardContent className="flex items-center justify-center py-12">
							<div className="text-center">
								<Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
									No posts generated yet
								</h3>
								<p className="text-gray-600 dark:text-gray-400">
									Posts will appear here as they are generated by AI
								</p>
							</div>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4">
						{brief.generated_posts.map((post) => (
							<Card key={post.id} className="hover:shadow-md transition-shadow">
								<CardHeader>
									<div className="flex justify-between items-start">
										<div className="flex items-center gap-2">
											<Badge className={getPlatformColor(post.platform)}>
												{post.platform}
											</Badge>
											<div className="flex items-center gap-1">
												{getStatusIcon(post.status)}
												<span className="text-sm capitalize">
													{post.status}
												</span>
											</div>
										</div>
										<div className="flex gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() =>
													handleCopyToClipboard(post.generated_text)
												}
											>
												<Copy className="w-3 h-3" />
											</Button>
											{editingPost === post.id ? (
												<>
													<Button
														size="sm"
														onClick={() => handleSavePost(post.id)}
														disabled={isUpdating}
													>
														<Save className="w-3 h-3" />
													</Button>
													<Button
														size="sm"
														variant="outline"
														onClick={() => setEditingPost(null)}
													>
														<X className="w-3 h-3" />
													</Button>
												</>
											) : (
												<>
													<Button
														size="sm"
														variant="outline"
														onClick={() => handleEditPost(post)}
													>
														<Edit3 className="w-3 h-3" />
													</Button>
													{post.status === "draft" && (
														<Button
															size="sm"
															onClick={() => handleApprovePost(post.id)}
														>
															<CheckCircle className="w-3 h-3 mr-1" />
															Approve
														</Button>
													)}
													{(post.status === "approved" ||
														post.status === "scheduled") && (
														<Button
															size="sm"
															variant="outline"
															onClick={() => setSchedulingPost(post.id)}
														>
															<Calendar className="w-3 h-3 mr-1" />
															{post.status === "scheduled"
																? "Reschedule"
																: "Schedule"}
														</Button>
													)}
												</>
											)}
										</div>
									</div>
								</CardHeader>

								<CardContent>
									{editingPost === post.id ? (
										<Textarea
											value={editedContent}
											onChange={(e) => setEditedContent(e.target.value)}
											rows={8}
											className="w-full"
										/>
									) : (
										<div className="whitespace-pre-wrap text-sm leading-relaxed">
											{post.generated_text}
										</div>
									)}

									{post.schedule_time && (
										<div className="mt-4 pt-4 border-t">
											<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
												<Calendar className="w-4 h-4" />
												Scheduled for{" "}
												{new Date(post.schedule_time).toLocaleString()}
											</div>
										</div>
									)}

									{post.post_url && (
										<div className="mt-4 pt-4 border-t">
											<Button variant="outline" size="sm" asChild>
												<a
													href={post.post_url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<ExternalLink className="w-3 h-3 mr-1" />
													View Live Post
												</a>
											</Button>
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>

			{/* Schedule Post Dialog */}
			{schedulingPost && (
				<SchedulePostDialog
					postId={schedulingPost}
					platform={
						brief.generated_posts.find((p) => p.id === schedulingPost)
							?.platform || ""
					}
					currentScheduleTime={
						brief.generated_posts.find((p) => p.id === schedulingPost)
							?.schedule_time
					}
					onClose={() => setSchedulingPost(null)}
					onScheduled={() => {
						// Refresh the page to get updated data
						window.location.reload();
					}}
				/>
			)}
		</div>
	);
}

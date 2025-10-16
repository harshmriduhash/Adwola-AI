"use client";

import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Edit,
	Eye,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ContentCalendarProps {
	briefs: ContentBrief[];
	onReschedule?: (postId: string, newDate: Date) => void;
}

type ViewMode = "month" | "week" | "day";

export function ContentCalendar({ briefs }: ContentCalendarProps) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [viewMode, setViewMode] = useState<ViewMode>("month");
	const [, setSelectedDate] = useState<Date | null>(null);

	// Get all scheduled posts
	const scheduledPosts = briefs.flatMap((brief) =>
		brief.generated_posts
			.filter((post) => post.schedule_time && post.status === "scheduled")
			.map((post) => ({
				...post,
				brief,
				scheduledDate: new Date(post.schedule_time!),
			})),
	);

	// Group posts by date
	const postsByDate = scheduledPosts.reduce(
		(acc, post) => {
			const dateKey = post.scheduledDate.toISOString().split("T")[0];
			if (!acc[dateKey]) acc[dateKey] = [];
			acc[dateKey].push(post);
			return acc;
		},
		{} as Record<string, typeof scheduledPosts>,
	);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const navigateDate = (direction: "prev" | "next") => {
		const newDate = new Date(currentDate);
		if (viewMode === "month") {
			newDate.setMonth(
				currentDate.getMonth() + (direction === "next" ? 1 : -1),
			);
		} else if (viewMode === "week") {
			newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
		} else {
			newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
		}
		setCurrentDate(newDate);
	};

	const renderMonthView = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		// Get first day of month and number of days
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Add empty cells for days before month starts
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className="h-32 border border-gray-200 dark:border-gray-700"
				></div>,
			);
		}

		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dateKey = date.toISOString().split("T")[0];
			const dayPosts = postsByDate[dateKey] || [];

			days.push(
				<div
					key={day}
					className="h-32 border border-gray-200 dark:border-gray-700 p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
					onClick={() => setSelectedDate(date)}
				>
					<div className="font-medium text-sm mb-1">{day}</div>
					<div className="space-y-1">
						{dayPosts.slice(0, 3).map((post) => (
							<div
								key={post.id}
								className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 truncate"
							>
								{post.platform} - {formatTime(post.scheduledDate)}
							</div>
						))}
						{dayPosts.length > 3 && (
							<div className="text-xs text-gray-500">
								+{dayPosts.length - 3} more
							</div>
						)}
					</div>
				</div>,
			);
		}

		return (
			<div className="grid grid-cols-7 gap-0">
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<div
						key={day}
						className="h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-medium bg-gray-50 dark:bg-gray-800"
					>
						{day}
					</div>
				))}
				{days}
			</div>
		);
	};

	const renderWeekView = () => {
		const startOfWeek = new Date(currentDate);
		startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

		const weekDays = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(startOfWeek);
			date.setDate(startOfWeek.getDate() + i);
			const dateKey = date.toISOString().split("T")[0];
			const dayPosts = postsByDate[dateKey] || [];

			weekDays.push(
				<div
					key={i}
					className="flex-1 border border-gray-200 dark:border-gray-700 p-4"
				>
					<div className="font-medium mb-2">
						{date.toLocaleDateString("en-US", {
							weekday: "short",
							day: "numeric",
						})}
					</div>
					<div className="space-y-2">
						{dayPosts.map((post) => (
							<Card key={post.id} className="p-2">
								<div className="flex items-center justify-between">
									<Badge variant="secondary" className="text-xs">
										{post.platform}
									</Badge>
									<span className="text-xs text-gray-500">
										{formatTime(post.scheduledDate)}
									</span>
								</div>
								<p className="text-xs mt-1 truncate">
									{post.generated_text.substring(0, 60)}...
								</p>
								<div className="flex gap-1 mt-2">
									<Link href={`/dashboard/brief/${post.brief.id}`}>
										<Button size="sm" variant="ghost" className="h-6 w-6 p-0">
											<Eye className="h-3 w-3" />
										</Button>
									</Link>
									<Button size="sm" variant="ghost" className="h-6 w-6 p-0">
										<Edit className="h-3 w-3" />
									</Button>
								</div>
							</Card>
						))}
					</div>
				</div>,
			);
		}

		return <div className="flex gap-0 h-96">{weekDays}</div>;
	};

	const renderDayView = () => {
		const dateKey = currentDate.toISOString().split("T")[0];
		const dayPosts = postsByDate[dateKey] || [];

		return (
			<div className="space-y-4">
				<h3 className="text-lg font-medium">{formatDate(currentDate)}</h3>
				{dayPosts.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						No posts scheduled for this day
					</div>
				) : (
					<div className="space-y-3">
						{dayPosts.map((post) => (
							<Card key={post.id} className="p-4">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<Badge variant="secondary">{post.platform}</Badge>
											<span className="text-sm text-gray-500">
												{formatTime(post.scheduledDate)}
											</span>
										</div>
										<p className="text-sm mb-2">{post.generated_text}</p>
										<div className="text-xs text-gray-500">
											Brief: {post.brief.topic} | Brand:{" "}
											{post.brief.brands?.brand_name}
										</div>
									</div>
									<div className="flex gap-2 ml-4">
										<Link href={`/dashboard/brief/${post.brief.id}`}>
											<Button size="sm" variant="outline">
												<Eye className="h-4 w-4 mr-1" />
												View
											</Button>
										</Link>
										<Button size="sm" variant="outline">
											<Edit className="h-4 w-4 mr-1" />
											Edit
										</Button>
									</div>
								</div>
							</Card>
						))}
					</div>
				)}
			</div>
		);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<CalendarIcon className="h-5 w-5" />
						Content Calendar
					</CardTitle>
					<div className="flex items-center gap-2">
						<div className="flex rounded-md border">
							{(["month", "week", "day"] as ViewMode[]).map((mode) => (
								<Button
									key={mode}
									variant={viewMode === mode ? "default" : "ghost"}
									size="sm"
									onClick={() => setViewMode(mode)}
									className="rounded-none first:rounded-l-md last:rounded-r-md"
								>
									{mode.charAt(0).toUpperCase() + mode.slice(1)}
								</Button>
							))}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => navigateDate("prev")}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<h3 className="text-lg font-medium">
							{viewMode === "month" &&
								currentDate.toLocaleDateString("en-US", {
									month: "long",
									year: "numeric",
								})}
							{viewMode === "week" &&
								`Week of ${currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
							{viewMode === "day" && formatDate(currentDate)}
						</h3>
						<Button
							variant="outline"
							size="sm"
							onClick={() => navigateDate("next")}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setCurrentDate(new Date())}
					>
						Today
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{viewMode === "month" && renderMonthView()}
				{viewMode === "week" && renderWeekView()}
				{viewMode === "day" && renderDayView()}
			</CardContent>
		</Card>
	);
}

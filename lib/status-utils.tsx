import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	Loader2,
} from "lucide-react";

/**
 * Status utility functions for content briefs and generated posts
 * Consolidated from multiple components to ensure consistency
 */

export type ContentStatus = "pending" | "processing" | "completed" | "error" | "approved" | "draft" | "scheduled" | "posted";

/**
 * Get the appropriate icon for a given status
 */
export function getStatusIcon(status: string) {
	switch (status) {
		case "pending":
			return <Clock className="w-4 h-4 text-gray-500" />;
		case "processing":
			return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
		case "completed":
		case "approved":
		case "posted":
			return <CheckCircle className="w-4 h-4 text-green-500" />;
		case "error":
			return <AlertCircle className="w-4 h-4 text-red-500" />;
		case "draft":
			return <Clock className="w-4 h-4 text-yellow-500" />;
		case "scheduled":
			return <Calendar className="w-4 h-4 text-blue-500" />;
		default:
			return <Clock className="w-4 h-4 text-gray-500" />;
	}
}

/**
 * Get the appropriate color classes for a given status
 */
export function getStatusColor(status: string): string {
	switch (status) {
		case "pending":
			return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
		case "processing":
			return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
		case "completed":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		case "error":
			return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
	}
}

/**
 * Get human-readable status text
 */
export function getStatusText(status: string): string {
	switch (status) {
		case "pending":
			return "Pending";
		case "processing":
			return "Processing";
		case "completed":
			return "Completed";
		case "error":
			return "Error";
		default:
			return "Unknown";
	}
}

/**
 * Check if a status represents a final state (completed or error)
 */
export function isFinalStatus(status: string): boolean {
	return status === "completed" || status === "error";
}

/**
 * Check if a status represents an active/in-progress state
 */
export function isActiveStatus(status: string): boolean {
	return status === "processing";
}
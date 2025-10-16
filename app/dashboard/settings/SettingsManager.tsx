"use client";

import { CreditCard, Link2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { SubscriptionManager } from "@/components/subscription/SubscriptionManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialConnectionsManager } from "./SocialConnectionsManager";

interface SocialConnection {
	id: string;
	platform: string;
	platform_user_name: string;
	status: string;
	connected_at: string;
	created_at: string;
}

interface SettingsManagerProps {
	initialConnections: SocialConnection[];
	searchParams: {
		tab?: string;
		connection?: string;
		status?: string;
		message?: string;
		success?: string;
		canceled?: string;
	};
}

export function SettingsManager({
	initialConnections,
	searchParams,
}: SettingsManagerProps) {
	// Handle toast notifications from URL parameters
	useEffect(() => {
		if (searchParams.connection && searchParams.status) {
			const connectionName =
				searchParams.connection.charAt(0).toUpperCase() +
				searchParams.connection.slice(1);
			if (searchParams.status === "success") {
				toast.success(`${connectionName} connected successfully!`);
			} else if (searchParams.status === "error") {
				toast.error(
					`${connectionName} connection failed: ${searchParams.message || "Unknown error"}`,
				);
			}
		}

		// Handle Stripe checkout success/cancel
		if (searchParams.success === "true") {
			toast.success("Subscription updated successfully!");
		} else if (searchParams.canceled === "true") {
			toast.info("Checkout was canceled");
		}
	}, [searchParams]);

	// Determine default tab from URL
	const defaultTab = searchParams.tab || "integrations";

	return (
		<Tabs defaultValue={defaultTab} className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="integrations" className="flex items-center">
					<Link2 className="w-4 h-4 mr-2" />
					Integrations
				</TabsTrigger>
				<TabsTrigger value="billing" className="flex items-center">
					<CreditCard className="w-4 h-4 mr-2" />
					Billing & Plans
				</TabsTrigger>
			</TabsList>

			<TabsContent value="integrations" className="mt-6">
				<div className="space-y-6">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Social Media Integrations
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							Connect your social media accounts to enable automated posting
						</p>
					</div>
					<SocialConnectionsManager initialConnections={initialConnections} />
				</div>
			</TabsContent>

			<TabsContent value="billing" className="mt-6">
				<div className="space-y-6">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Subscription & Billing
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							Manage your subscription plan and billing information
						</p>
					</div>
					<SubscriptionManager />
				</div>
			</TabsContent>
		</Tabs>
	);
}

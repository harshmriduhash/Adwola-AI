"use client";

import {
	Bell,
	Calendar,
	CheckCircle,
	CreditCard,
	Eye,
	EyeOff,
	Globe,
	Link as LinkIcon,
	Loader2,
	Palette,
	Save,
	Settings,
	Shield,
	Smartphone,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { SocialConnectionsManager } from "../dashboard/settings/SocialConnectionsManager";

interface Connection {
	id: string;
	platform: string;
	platform_user_name: string;
	status: string;
	created_at: string;
}

interface User {
	id: string;
	email?: string;
	user_metadata?: {
		full_name?: string;
		avatar_url?: string;
	};
}

interface Profile {
	id?: string;
	notification_email?: boolean;
	notification_browser?: boolean;
	notification_mobile?: boolean;
	privacy_analytics?: boolean;
	privacy_marketing?: boolean;
	security_two_factor?: boolean;
}

interface Subscription {
	id?: string;
	plan_name?: string;
	status?: string;
	current_period_end?: string;
}

interface SettingsManagerProps {
	initialConnections: Connection[];
	searchParams: {
		tab?: string;
		connection?: string;
		status?: string;
		message?: string;
		success?: string;
		canceled?: string;
	};
	user: User;
	profile: Profile | null;
	subscription: Subscription | null;
}

export function SettingsManager({
	initialConnections,
	searchParams,
	user,
	profile,
	subscription,
}: SettingsManagerProps) {
	const [activeTab, setActiveTab] = useState(searchParams.tab || "general");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	// Notification settings
	const [notificationEmail, setNotificationEmail] = useState(
		profile?.notification_email ?? true,
	);
	const [notificationBrowser, setNotificationBrowser] = useState(
		profile?.notification_browser ?? true,
	);
	const [notificationMobile, setNotificationMobile] = useState(
		profile?.notification_mobile ?? false,
	);

	// Privacy settings
	const [privacyAnalytics, setPrivacyAnalytics] = useState(
		profile?.privacy_analytics ?? true,
	);
	const [privacyMarketing, setPrivacyMarketing] = useState(
		profile?.privacy_marketing ?? false,
	);

	// Security settings
	const [securityTwoFactor, setSecurityTwoFactor] = useState(
		profile?.security_two_factor ?? false,
	);

	useEffect(() => {
		if (searchParams.status === "success" && searchParams.connection) {
			toast.success(`Successfully connected to ${searchParams.connection}`);
			router.replace("/settings?tab=integrations");
		} else if (searchParams.status === "error" && searchParams.message) {
			toast.error(searchParams.message);
			router.replace("/settings?tab=integrations");
		}
	}, [searchParams, router]);

	const handleSaveNotifications = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.from("users").upsert({
				id: user.id,
				notification_email: notificationEmail,
				notification_browser: notificationBrowser,
				notification_mobile: notificationMobile,
				updated_at: new Date().toISOString(),
			});

			if (error) throw error;
			toast.success("Notification preferences saved!");
		} catch (error) {
			console.error("Error saving notifications:", error);
			toast.error("Failed to save notification preferences");
		} finally {
			setLoading(false);
		}
	};

	const handleSavePrivacy = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.from("users").upsert({
				id: user.id,
				privacy_analytics: privacyAnalytics,
				privacy_marketing: privacyMarketing,
				updated_at: new Date().toISOString(),
			});

			if (error) throw error;
			toast.success("Privacy settings saved!");
		} catch (error) {
			console.error("Error saving privacy:", error);
			toast.error("Failed to save privacy settings");
		} finally {
			setLoading(false);
		}
	};

	const handleSaveSecurity = async () => {
		setLoading(true);
		try {
			const { error } = await supabase.from("users").upsert({
				id: user.id,
				security_two_factor: securityTwoFactor,
				updated_at: new Date().toISOString(),
			});

			if (error) throw error;
			toast.success("Security settings saved!");
		} catch (error) {
			console.error("Error saving security:", error);
			toast.error("Failed to save security settings");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl space-y-8">
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-6"
			>
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="general" className="flex items-center gap-2">
						<Settings className="w-4 h-4" />
						General
					</TabsTrigger>
					<TabsTrigger
						value="notifications"
						className="flex items-center gap-2"
					>
						<Bell className="w-4 h-4" />
						Notifications
					</TabsTrigger>
					<TabsTrigger value="privacy" className="flex items-center gap-2">
						<Shield className="w-4 h-4" />
						Privacy
					</TabsTrigger>
					<TabsTrigger value="integrations" className="flex items-center gap-2">
						<LinkIcon className="w-4 h-4" />
						Integrations
					</TabsTrigger>
					<TabsTrigger value="billing" className="flex items-center gap-2">
						<CreditCard className="w-4 h-4" />
						Billing
					</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Palette className="w-5 h-5" />
								Appearance
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<Label className="text-base font-medium">Theme</Label>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Choose your preferred color scheme
									</p>
								</div>
								<ThemeSwitcher />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Globe className="w-5 h-5" />
								Preferences
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Language</Label>
									<select className="w-full p-2 border rounded-md bg-white dark:bg-gray-800">
										<option value="en">English</option>
										<option value="es" disabled>
											Spanish (Coming Soon)
										</option>
										<option value="fr" disabled>
											French (Coming Soon)
										</option>
									</select>
								</div>
								<div className="space-y-2">
									<Label>Timezone</Label>
									<select className="w-full p-2 border rounded-md bg-white dark:bg-gray-800">
										<option value="utc">UTC</option>
										<option value="est">Eastern Time</option>
										<option value="pst">Pacific Time</option>
										<option value="cet">Central European Time</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Bell className="w-5 h-5" />
								Notification Preferences
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
									<div className="flex items-center gap-3">
										<Bell className="w-5 h-5 text-blue-500" />
										<div>
											<Label className="text-base font-medium">
												Email Notifications
											</Label>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Receive notifications via email
											</p>
										</div>
									</div>
									<input
										type="checkbox"
										checked={notificationEmail}
										onChange={(e) => setNotificationEmail(e.target.checked)}
										className="w-4 h-4"
									/>
								</div>

								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
									<div className="flex items-center gap-3">
										<Globe className="w-5 h-5 text-green-500" />
										<div>
											<Label className="text-base font-medium">
												Browser Notifications
											</Label>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Receive push notifications in your browser
											</p>
										</div>
									</div>
									<input
										type="checkbox"
										checked={notificationBrowser}
										onChange={(e) => setNotificationBrowser(e.target.checked)}
										className="w-4 h-4"
									/>
								</div>

								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
									<div className="flex items-center gap-3">
										<Smartphone className="w-5 h-5 text-purple-500" />
										<div>
											<Label className="text-base font-medium">
												Mobile Notifications
											</Label>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Receive push notifications on mobile (Coming Soon)
											</p>
										</div>
									</div>
									<input
										type="checkbox"
										checked={notificationMobile}
										onChange={(e) => setNotificationMobile(e.target.checked)}
										className="w-4 h-4"
										disabled
									/>
								</div>
							</div>

							<Button
								onClick={handleSaveNotifications}
								disabled={loading}
								className="flex items-center gap-2"
							>
								{loading ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								Save Notification Settings
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="privacy" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="w-5 h-5" />
								Privacy Controls
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
									<div className="flex items-center gap-3">
										<Eye className="w-5 h-5 text-blue-500" />
										<div>
											<Label className="text-base font-medium">
												Analytics Data
											</Label>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Allow us to collect anonymous usage data to improve the
												platform
											</p>
										</div>
									</div>
									<input
										type="checkbox"
										checked={privacyAnalytics}
										onChange={(e) => setPrivacyAnalytics(e.target.checked)}
										className="w-4 h-4"
									/>
								</div>

								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
									<div className="flex items-center gap-3">
										<EyeOff className="w-5 h-5 text-red-500" />
										<div>
											<Label className="text-base font-medium">
												Marketing Communications
											</Label>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Receive product updates and marketing emails
											</p>
										</div>
									</div>
									<input
										type="checkbox"
										checked={privacyMarketing}
										onChange={(e) => setPrivacyMarketing(e.target.checked)}
										className="w-4 h-4"
									/>
								</div>
							</div>

							<Button
								onClick={handleSavePrivacy}
								disabled={loading}
								className="flex items-center gap-2"
							>
								{loading ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								Save Privacy Settings
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="w-5 h-5" />
								Security
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
									<div className="flex items-center gap-3">
										<Shield className="w-5 h-5 text-green-500" />
										<div>
											<Label className="text-base font-medium">
												Two-Factor Authentication
											</Label>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Add an extra layer of security to your account (Coming
												Soon)
											</p>
										</div>
									</div>
									<input
										type="checkbox"
										checked={securityTwoFactor}
										onChange={(e) => setSecurityTwoFactor(e.target.checked)}
										className="w-4 h-4"
										disabled
									/>
								</div>
							</div>

							<Button
								onClick={handleSaveSecurity}
								disabled={loading || true}
								className="flex items-center gap-2"
							>
								{loading ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								Save Security Settings
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="integrations" className="space-y-6">
					<SocialConnectionsManager initialConnections={initialConnections} />
				</TabsContent>

				<TabsContent value="billing" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CreditCard className="w-5 h-5" />
								Subscription & Billing
							</CardTitle>
						</CardHeader>
						<CardContent>
							{subscription ? (
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
											<div className="flex items-center gap-2 mb-2">
												<CheckCircle className="w-5 h-5 text-blue-500" />
												<Label className="font-medium">Current Plan</Label>
											</div>
											<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
												{subscription.plan_name}
											</p>
											<Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
												{subscription.status}
											</Badge>
										</div>

										<div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
											<div className="flex items-center gap-2 mb-2">
												<Calendar className="w-5 h-5 text-gray-500" />
												<Label className="font-medium">Next Billing Date</Label>
											</div>
											<p className="text-lg font-semibold">
												{subscription.current_period_end
													? new Date(
															subscription.current_period_end,
														).toLocaleDateString()
													: "N/A"}
											</p>
										</div>
									</div>

									<div className="flex gap-3">
										<Button variant="outline">Manage Subscription</Button>
										<Button variant="outline">Download Invoices</Button>
										<Button variant="destructive">Cancel Subscription</Button>
									</div>
								</div>
							) : (
								<div className="text-center py-12">
									<CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
									<h3 className="text-xl font-semibold mb-2">
										No Active Subscription
									</h3>
									<p className="text-gray-600 dark:text-gray-400 mb-6">
										Upgrade to unlock premium features and increase your usage
										limits
									</p>
									<Button className="bg-gradient-to-r from-blue-600 to-purple-600">
										View Plans & Pricing
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

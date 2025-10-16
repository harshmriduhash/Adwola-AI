"use client";

import { motion } from "framer-motion";
import {
	AlertCircle,
	Calendar,
	Camera,
	CheckCircle,
	Loader2,
	Mail,
	Save,
	Shield,
	User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

interface User {
	id: string;
	email?: string;
	created_at?: string;
	user_metadata?: {
		full_name?: string;
		avatar_url?: string;
	};
}

interface Profile {
	id?: string;
	full_name?: string;
	bio?: string;
	website?: string;
	company?: string;
	location?: string;
	avatar_url?: string;
}

interface ProfileManagerProps {
	user: User;
	profile: Profile | null;
}

export function ProfileManager({ user, profile }: ProfileManagerProps) {
	const [loading, setLoading] = useState(false);
	const [fullName, setFullName] = useState(
		user.user_metadata?.full_name || profile?.full_name || "",
	);
	const [bio, setBio] = useState(profile?.bio || "");
	const [website, setWebsite] = useState(profile?.website || "");
	const [company, setCompany] = useState(profile?.company || "");
	const [location, setLocation] = useState(profile?.location || "");

	const supabase = createClient();

	const userDisplayName = fullName || user.email?.split("@")[0] || "User";
	const userInitials = userDisplayName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const handleSaveProfile = async () => {
		setLoading(true);
		try {
			// Update auth metadata
			const { error: authError } = await supabase.auth.updateUser({
				data: {
					full_name: fullName,
				},
			});

			if (authError) throw authError;

			// Update or insert profile data
			const { error: profileError } = await supabase.from("users").upsert({
				id: user.id,
				full_name: fullName,
				bio,
				website,
				company,
				location,
				updated_at: new Date().toISOString(),
			});

			if (profileError) throw profileError;

			toast.success("Profile updated successfully!");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("Failed to update profile");
		} finally {
			setLoading(false);
		}
	};

	const stats = [
		{
			label: "Member Since",
			value: new Date(user.created_at || "").toLocaleDateString(),
			icon: Calendar,
		},
		{
			label: "Email Status",
			value: "Verified",
			icon: CheckCircle,
			valueClass: "text-green-600",
		},
		{
			label: "Account Type",
			value: "Pro",
			icon: Shield,
			valueClass: "text-blue-600",
		},
	];

	return (
		<div className="max-w-4xl space-y-8">
			{/* Profile Header */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<User className="w-5 h-5" />
						Profile Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-8">
						{/* Avatar Section */}
						<div className="flex flex-col items-center space-y-4">
							<div className="relative">
								{user.user_metadata?.avatar_url ? (
									<Image
										src={user.user_metadata.avatar_url}
										alt={userDisplayName}
										width={120}
										height={120}
										className="w-30 h-30 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
									/>
								) : (
									<div className="w-30 h-30 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center border-4 border-gray-200 dark:border-gray-700">
										<span className="text-white text-2xl font-bold">
											{userInitials}
										</span>
									</div>
								)}
								<Button
									size="sm"
									variant="outline"
									className="absolute -bottom-2 -right-2 rounded-full p-2"
									disabled
								>
									<Camera className="w-4 h-4" />
								</Button>
							</div>
							<Badge variant="secondary" className="text-xs">
								Avatar upload coming soon
							</Badge>
						</div>

						{/* Profile Form */}
						<div className="flex-1 space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="fullName">Full Name</Label>
									<Input
										id="fullName"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										placeholder="Enter your full name"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										value={user.email || ""}
										disabled
										className="bg-gray-50 dark:bg-gray-800"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="bio">Bio</Label>
								<Textarea
									id="bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									placeholder="Tell us about yourself..."
									rows={3}
									maxLength={500}
								/>
								<p className="text-xs text-gray-500">
									{bio.length}/500 characters
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="company">Company</Label>
									<Input
										id="company"
										value={company}
										onChange={(e) => setCompany(e.target.value)}
										placeholder="Your company"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="location">Location</Label>
									<Input
										id="location"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										placeholder="Your location"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									placeholder="https://yourwebsite.com"
									type="url"
								/>
							</div>

							<Button
								onClick={handleSaveProfile}
								disabled={loading}
								className="flex items-center gap-2"
							>
								{loading ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								{loading ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Account Stats */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Mail className="w-5 h-5" />
						Account Details
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{stats.map((stat, index) => {
							const Icon = stat.icon;
							return (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
								>
									<Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{stat.label}
										</p>
										<p
											className={`text-sm ${stat.valueClass || "text-gray-600 dark:text-gray-400"}`}
										>
											{stat.value}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Danger Zone */}
			<Card className="border-red-200 dark:border-red-800">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
						<AlertCircle className="w-5 h-5" />
						Danger Zone
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
							<h4 className="font-medium text-red-800 dark:text-red-400 mb-2">
								Delete Account
							</h4>
							<p className="text-sm text-red-600 dark:text-red-400 mb-4">
								Once you delete your account, there is no going back. Please be
								certain.
							</p>
							<Button variant="destructive" size="sm" disabled>
								Delete Account
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

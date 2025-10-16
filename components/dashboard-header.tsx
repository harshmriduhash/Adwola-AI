"use client";

import {
	BarChart3,
	Calendar,
	Home,
	LogOut,
	Menu,
	Settings,
	User,
	Users,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
	id: string;
	email?: string;
	user_metadata?: {
		full_name?: string;
		avatar_url?: string;
	};
}

export default function DashboardHeader() {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		async function getUser() {
			try {
				const {
					data: { user },
					error,
				} = await supabase.auth.getUser();
				if (error) {
					console.error("Error fetching user:", error);
					return;
				}
				setUser(user as UserProfile);
			} catch (error) {
				console.error("Error:", error);
			} finally {
				setLoading(false);
			}
		}

		getUser();
	}, [supabase]);

	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				toast.error("Error signing out");
				return;
			}

			toast.success("Signed out successfully");
			router.push("/");
		} catch (error) {
			console.error("Sign out error:", error);
			toast.error("Failed to sign out");
		}
	};

	const navigationItems = [
		{ name: "Dashboard", href: "/dashboard", icon: Home },
		{ name: "Brands", href: "/brands", icon: Users },
		{ name: "Calendar", href: "/dashboard?tab=calendar", icon: Calendar },
		{ name: "Analytics", href: "/dashboard?tab=analytics", icon: BarChart3 },
	];

	const userDisplayName =
		user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
	const userInitials = userDisplayName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	if (loading) {
		return (
			<header className="bg-white border-b border-gray-200 px-4 py-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
					</div>
					<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
				</div>
			</header>
		);
	}

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="px-4 py-3">
				<div className="flex items-center justify-between">
					{/* Logo and Navigation */}
					<div className="flex items-center space-x-6">
						<Link href="/dashboard" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">AI</span>
							</div>
							<span className="font-bold text-lg text-gray-900">AmplifyAI</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center space-x-1">
							{navigationItems.map((item) => {
								const Icon = item.icon;
								return (
									<Link
										key={item.name}
										href={item.href}
										className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
									>
										<Icon size={16} />
										<span>{item.name}</span>
									</Link>
								);
							})}
						</nav>
					</div>

					{/* User Menu */}
					<div className="flex items-center space-x-4">
						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="sm"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
						</Button>

						{/* User Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full"
								>
									{user?.user_metadata?.avatar_url ? (
										<Image
											src={user.user_metadata.avatar_url}
											alt={userDisplayName}
											width={32}
											height={32}
											className="h-8 w-8 rounded-full object-cover"
										/>
									) : (
										<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
											<span className="text-white text-sm font-medium">
												{userInitials}
											</span>
										</div>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											{userDisplayName}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{user?.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/profile" className="cursor-pointer">
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/settings" className="cursor-pointer">
										<Settings className="mr-2 h-4 w-4" />
										<span>Settings</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleSignOut}
									className="cursor-pointer text-red-600 focus:text-red-600"
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className="md:hidden mt-3 pt-3 border-t border-gray-200">
						<nav className="space-y-1">
							{navigationItems.map((item) => {
								const Icon = item.icon;
								return (
									<Link
										key={item.name}
										href={item.href}
										className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
										onClick={() => setMobileMenuOpen(false)}
									>
										<Icon size={16} />
										<span>{item.name}</span>
									</Link>
								);
							})}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}

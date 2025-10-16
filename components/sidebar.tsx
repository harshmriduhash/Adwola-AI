"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Activity,
	BarChart3,
	Bookmark,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Grid,
	Home,
	LogOut,
	Menu,
	Settings,
	Sparkles,
	User,
	Users,
	X,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
import { cn } from "@/lib/utils";

interface UserProfile {
	id: string;
	email?: string;
	user_metadata?: {
		full_name?: string;
		avatar_url?: string;
	};
}

const navigationItems = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: Home,
		description: "Overview and recent campaigns",
	},
	{
		name: "Brands",
		href: "/brands",
		icon: Users,
		description: "Manage your brand guidelines",
	},
	{
		name: "Calendar",
		href: "/dashboard?tab=calendar",
		icon: Calendar,
		description: "Schedule and view posts",
	},
	{
		name: "Bulk Operations",
		href: "/dashboard?tab=bulk",
		icon: Grid,
		description: "Manage multiple campaigns",
	},
	{
		name: "Templates",
		href: "/dashboard?tab=templates",
		icon: Bookmark,
		description: "Content templates library",
	},
	{
		name: "Analytics",
		href: "/dashboard?tab=analytics",
		icon: BarChart3,
		description: "Performance insights",
	},
];

const bottomNavigationItems = [
	{
		name: "Profile",
		href: "/profile",
		icon: User,
		description: "User profile and preferences",
	},
	{
		name: "Activity",
		href: "/activity",
		icon: Activity,
		description: "Recent activity and history",
	},
	{
		name: "Settings",
		href: "/settings",
		icon: Settings,
		description: "Account and app settings",
	},
];

interface SidebarProps {
	children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const pathname = usePathname();
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

	const userDisplayName =
		user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
	const userInitials = userDisplayName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const isActiveLink = (href: string) => {
		if (!pathname) return false;
		if (href === "/dashboard") {
			return (
				pathname === "/dashboard" ||
				(pathname.startsWith("/dashboard") && !pathname.includes("?"))
			);
		}
		return pathname === href || pathname.startsWith(href);
	};

	const sidebarVariants = {
		expanded: { width: 280 },
		collapsed: { width: 80 },
	};

	const contentVariants = {
		expanded: { marginLeft: 280 },
		collapsed: { marginLeft: 80 },
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Mobile Overlay */}
			<AnimatePresence>
				{isMobileOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsMobileOpen(false)}
						className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					/>
				)}
			</AnimatePresence>

			{/* Mobile Menu Button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<Button
					variant="outline"
					size="sm"
					onClick={() => setIsMobileOpen(!isMobileOpen)}
					className="bg-white dark:bg-gray-800 shadow-lg"
				>
					{isMobileOpen ? <X size={20} /> : <Menu size={20} />}
				</Button>
			</div>

			{/* Sidebar */}
			<motion.aside
				variants={sidebarVariants}
				animate={isCollapsed ? "collapsed" : "expanded"}
				initial="expanded"
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className={cn(
					"fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 flex flex-col shadow-lg",
					"lg:translate-x-0",
					isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
				)}
			>
				{/* Header */}
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<motion.div
							className="flex items-center space-x-3"
							animate={{ opacity: isCollapsed ? 0 : 1 }}
							transition={{ duration: 0.2 }}
						>
							<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<Sparkles className="w-5 h-5 text-white" />
							</div>
							{!isCollapsed && (
								<span className="font-bold text-lg text-gray-900 dark:text-white">
									AmplifyAI
								</span>
							)}
						</motion.div>

						{/* Collapse Toggle - Desktop Only */}
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsCollapsed(!isCollapsed)}
							className="hidden lg:flex p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							{isCollapsed ? (
								<ChevronRight size={16} />
							) : (
								<ChevronLeft size={16} />
							)}
						</Button>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 space-y-2 overflow-y-auto">
					{/* Create Campaign Button */}
					<Link href="/campaigns">
						<Button
							className={cn(
								"w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
								isCollapsed && "justify-center px-0",
							)}
						>
							<Zap size={18} />
							{!isCollapsed && "Create Campaign"}
						</Button>
					</Link>

					<div className="h-4" />

					{/* Main Navigation */}
					{navigationItems.map((item) => {
						const Icon = item.icon;
						const isActive = isActiveLink(item.href);

						return (
							<Link key={item.name} href={item.href}>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className={cn(
										"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
										isActive
											? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
											: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
										isCollapsed && "justify-center px-0",
									)}
								>
									<Icon
										size={18}
										className={cn(
											"flex-shrink-0",
											isActive && "text-blue-600 dark:text-blue-400",
										)}
									/>

									{!isCollapsed && (
										<>
											<div className="flex-1">
												<div className="font-medium text-sm">{item.name}</div>
												<div className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
													{item.description}
												</div>
											</div>
										</>
									)}

									{/* Tooltip for collapsed state */}
									{isCollapsed && (
										<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
											{item.name}
										</div>
									)}
								</motion.div>
							</Link>
						);
					})}
				</nav>

				{/* Bottom Section */}
				<div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
					{/* Bottom Navigation Items */}
					{bottomNavigationItems.map((item) => {
						const Icon = item.icon;
						const isActive = isActiveLink(item.href);

						return (
							<Link key={item.name} href={item.href}>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className={cn(
										"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
										isActive
											? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
											: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
										isCollapsed && "justify-center px-0",
									)}
								>
									<Icon size={18} className="flex-shrink-0" />
									{!isCollapsed && (
										<span className="font-medium text-sm">{item.name}</span>
									)}

									{/* Tooltip for collapsed state */}
									{isCollapsed && (
										<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
											{item.name}
										</div>
									)}
								</motion.div>
							</Link>
						);
					})}

					{/* Theme Switcher */}
					<div
						className={cn(
							"flex",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<ThemeSwitcher />
					</div>

					{/* User Profile */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={cn(
									"flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200",
									isCollapsed && "justify-center px-0",
								)}
							>
								{user?.user_metadata?.avatar_url ? (
									<Image
										src={user.user_metadata.avatar_url}
										alt={userDisplayName}
										width={32}
										height={32}
										className="w-8 h-8 rounded-full object-cover"
									/>
								) : (
									<div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
										<span className="text-white text-xs font-medium">
											{userInitials}
										</span>
									</div>
								)}

								{!isCollapsed && !loading && (
									<div className="flex-1 text-left">
										<div className="font-medium text-sm text-gray-900 dark:text-white truncate">
											{userDisplayName}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400 truncate">
											{user?.email}
										</div>
									</div>
								)}
							</motion.button>
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
			</motion.aside>

			{/* Main Content */}
			<motion.main
				variants={contentVariants}
				animate={isCollapsed ? "collapsed" : "expanded"}
				initial="expanded"
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="min-h-screen lg:ml-0"
				style={{ marginLeft: 0 }}
			>
				<div className="lg:ml-0" style={{ marginLeft: isCollapsed ? 80 : 280 }}>
					<div className="lg:hidden h-16" />{" "}
					{/* Spacer for mobile menu button */}
					{children}
				</div>
			</motion.main>
		</div>
	);
}

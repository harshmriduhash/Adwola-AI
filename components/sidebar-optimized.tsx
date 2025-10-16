"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	Activity,
	BarChart3,
	Bookmark,
	Calendar,
	ChevronLeft,
	ChevronRight,
	HelpCircle,
	Home,
	LogOut,
	Menu,
	Search,
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
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";

const navigationItems = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: Home,
		description: "Overview and recent campaigns",
		badge: undefined,
		shortcut: "⌘D",
	},
	{
		name: "Campaigns",
		href: "/campaigns",
		icon: Zap,
		description: "Create and manage campaigns",
		badge: "Hot",
		shortcut: "⌘C",
	},
	{
		name: "Brands",
		href: "/brands",
		icon: Users,
		description: "Manage your brand guidelines",
		badge: undefined,
		shortcut: "⌘B",
	},
	{
		name: "Calendar",
		href: "/dashboard?tab=calendar",
		icon: Calendar,
		description: "Schedule and view posts",
		badge: undefined,
		shortcut: "⌘K",
	},
	{
		name: "Templates",
		href: "/dashboard?tab=templates",
		icon: Bookmark,
		description: "Content templates library",
		badge: "New",
		shortcut: "⌘T",
	},
	{
		name: "Analytics",
		href: "/dashboard?tab=analytics",
		icon: BarChart3,
		description: "Performance insights",
		badge: undefined,
		shortcut: "⌘A",
	},
];

const bottomNavigationItems = [
	{
		name: "Search",
		href: "/search",
		icon: Search,
		description: "Search across all content",
		shortcut: "⌘/",
	},
	{
		name: "Profile",
		href: "/profile",
		icon: User,
		description: "User profile and preferences",
		shortcut: "⌘P",
	},
	{
		name: "Activity",
		href: "/activity",
		icon: Activity,
		description: "Recent activity and history",
		shortcut: "⌘H",
	},
	{
		name: "Settings",
		href: "/settings",
		icon: Settings,
		description: "Account and app settings",
		shortcut: "⌘,",
	},
];

interface SidebarProps {
	children: React.ReactNode;
}

const UserProfileSection = ({
	user,
	isCollapsed,
	onSignOut,
}: {
	user: {
		user_metadata?: { full_name?: string; avatar_url?: string };
		email?: string;
	};
	isCollapsed: boolean;
	onSignOut: () => void;
}) => {
	const userDisplayName =
		user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
	const userInitials = userDisplayName
		.split(" ")
		.map((n: string) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className={cn(
						"flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group",
						isCollapsed && "justify-center px-0",
					)}
					aria-label={`User menu for ${userDisplayName}`}
				>
					{user?.user_metadata?.avatar_url ? (
						<Image
							src={user.user_metadata.avatar_url}
							alt={userDisplayName}
							width={36}
							height={36}
							className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all duration-200"
						/>
					) : (
						<div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center ring-2 ring-transparent group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all duration-200">
							<span className="text-white text-sm font-medium">
								{userInitials}
							</span>
						</div>
					)}

					{!isCollapsed && (
						<div className="flex-1 text-left min-w-0">
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

			<DropdownMenuContent className="w-64" align="end" forceMount>
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
						<span className="ml-auto text-xs text-muted-foreground">⌘P</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/settings" className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<span className="ml-auto text-xs text-muted-foreground">⌘,</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/help" className="cursor-pointer">
						<HelpCircle className="mr-2 h-4 w-4" />
						<span>Help & Support</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={onSignOut}
					className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const NavigationItem = ({
	item,
	isActive,
	isCollapsed,
	onClick,
}: {
	item: {
		name: string;
		href: string;
		icon: React.ComponentType<{ size?: number; className?: string }>;
		description: string;
		badge?: string;
		shortcut?: string;
	};
	isActive: boolean;
	isCollapsed: boolean;
	onClick?: () => void;
}) => {
	const Icon = item.icon;
	const prefersReducedMotion = useReducedMotion();

	return (
		<Link href={item.href} onClick={onClick}>
			<motion.div
				whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
				whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
				className={cn(
					"flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
					isActive
						? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm"
						: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
					isCollapsed && "justify-center px-2",
				)}
				role="button"
				aria-label={`Navigate to ${item.name}`}
			>
				<Icon
					size={20}
					className={cn(
						"flex-shrink-0 transition-colors duration-200",
						isActive && "text-blue-600 dark:text-blue-400",
					)}
				/>

				{!isCollapsed && (
					<>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2">
								<span className="font-medium text-sm truncate">
									{item.name}
								</span>
								{item.badge && (
									<span
										className={cn(
											"px-1.5 py-0.5 text-xs font-medium rounded-full",
											item.badge === "Hot" &&
												"bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
											item.badge === "New" &&
												"bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
										)}
									>
										{item.badge}
									</span>
								)}
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity truncate">
								{item.description}
							</div>
						</div>
						{item.shortcut && (
							<span className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
								{item.shortcut}
							</span>
						)}
					</>
				)}

				{/* Tooltip for collapsed state */}
				{isCollapsed && (
					<div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
						<div className="font-medium">{item.name}</div>
						<div className="text-xs text-gray-300">{item.shortcut}</div>
					</div>
				)}
			</motion.div>
		</Link>
	);
};

export function Sidebar({ children }: SidebarProps) {
	const [isCollapsed, setIsCollapsed] = useLocalStorage(
		"sidebar-collapsed",
		false,
	);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const { user, loading, signOut } = useUserProfile();
	const pathname = usePathname();
	const router = useRouter();
	const prefersReducedMotion = useReducedMotion();

	const isActiveLink = useCallback(
		(href: string) => {
			if (!pathname) return false;
			if (href === "/dashboard") {
				return (
					pathname === "/dashboard" ||
					(pathname.startsWith("/dashboard") && !pathname.includes("?"))
				);
			}
			return pathname === href || pathname.startsWith(href);
		},
		[pathname],
	);

	const handleSignOut = useCallback(async () => {
		try {
			await signOut();
			toast.success("Signed out successfully");
			router.push("/");
		} catch (error) {
			console.error("Sign out error:", error);
			toast.error("Failed to sign out");
		}
	}, [signOut, router]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey) {
				const shortcuts: Record<string, string> = {
					d: "/dashboard",
					c: "/campaigns",
					b: "/brands",
					k: "/dashboard?tab=calendar",
					t: "/dashboard?tab=templates",
					a: "/dashboard?tab=analytics",
					p: "/profile",
					h: "/activity",
					",": "/settings",
					"/": "/search",
				};

				if (shortcuts[e.key]) {
					e.preventDefault();
					router.push(shortcuts[e.key]);
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [router]);

	const sidebarVariants = useMemo(
		() => ({
			expanded: { width: 280 },
			collapsed: { width: 80 },
		}),
		[],
	);

	const contentVariants = useMemo(
		() => ({
			expanded: { marginLeft: 280 },
			collapsed: { marginLeft: 80 },
		}),
		[],
	);

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
					aria-label="Toggle mobile menu"
				>
					{isMobileOpen ? <X size={20} /> : <Menu size={20} />}
				</Button>
			</div>

			{/* Sidebar */}
			<motion.aside
				variants={!prefersReducedMotion ? sidebarVariants : {}}
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
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<motion.div
							className="flex items-center space-x-3"
							animate={{ opacity: isCollapsed ? 0 : 1 }}
							transition={{ duration: 0.2 }}
						>
							<div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
								<Sparkles className="w-6 h-6 text-white" />
							</div>
							{!isCollapsed && (
								<span className="font-bold text-xl text-gray-900 dark:text-white">
									AmplifyAI
								</span>
							)}
						</motion.div>

						{/* Collapse Toggle - Desktop Only */}
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsCollapsed(!isCollapsed)}
							className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
							aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
				<nav className="flex-1 p-4 space-y-2 overflow-y-auto" role="navigation">
					{/* Create Campaign Button */}
					<Link href="/campaigns">
						<Button
							className={cn(
								"w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200",
								isCollapsed && "justify-center px-0",
							)}
							aria-label="Create new campaign"
						>
							<Zap size={20} />
							{!isCollapsed && "Create Campaign"}
						</Button>
					</Link>

					<div className="h-4" />

					{/* Main Navigation */}
					{navigationItems.map((item) => (
						<NavigationItem
							key={item.name}
							item={item}
							isActive={isActiveLink(item.href)}
							isCollapsed={isCollapsed}
							onClick={() => setIsMobileOpen(false)}
						/>
					))}
				</nav>

				{/* Bottom Section */}
				<div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
					{/* Bottom Navigation Items */}
					{bottomNavigationItems.map((item) => (
						<NavigationItem
							key={item.name}
							item={item}
							isActive={isActiveLink(item.href)}
							isCollapsed={isCollapsed}
							onClick={() => setIsMobileOpen(false)}
						/>
					))}

					{/* Theme Switcher */}
					<div
						className={cn(
							"flex pt-4",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<ThemeSwitcher />
					</div>

					{/* User Profile */}
					{!loading && user && (
						<UserProfileSection
							user={user}
							isCollapsed={isCollapsed}
							onSignOut={handleSignOut}
						/>
					)}
				</div>
			</motion.aside>

			{/* Main Content */}
			<motion.main
				variants={!prefersReducedMotion ? contentVariants : {}}
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

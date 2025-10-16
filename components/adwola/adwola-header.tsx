"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function AdwolaHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigation = [
		{ name: "Features", href: "#features" },
		{ name: "Pricing", href: "#pricing" },
		{ name: "Resources", href: "#resources" },
		{ name: "Company", href: "#company" },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<div className="flex items-center">
					<Link href="/" className="flex items-center space-x-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
							<span className="text-lg font-bold text-white">A</span>
						</div>
						<span className="text-xl font-bold text-gray-900">Adwola</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-8">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
						>
							{item.name}
						</Link>
					))}
				</nav>

				{/* Desktop CTA Buttons */}
				<div className="hidden md:flex items-center space-x-4">
					<Button variant="ghost" size="sm">
						Sign In
					</Button>
					<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
						Get Started
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden">
					<div className="border-t bg-background px-4 py-6 space-y-4">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="block text-base font-medium text-gray-700 hover:text-blue-600"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<div className="flex flex-col space-y-2 pt-4">
							<Button variant="ghost" size="sm" className="justify-start">
								Sign In
							</Button>
							<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
								Get Started
							</Button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
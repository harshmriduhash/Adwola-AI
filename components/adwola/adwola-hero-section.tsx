"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Clock, Headphones, Lock } from "lucide-react";

export function AdwolaHeroSection() {
	const trustIndicators = [
		{
			icon: Shield,
			text: "SOC 2 Compliant",
		},
		{
			icon: Lock,
			text: "GDPR Ready",
		},
		{
			icon: Clock,
			text: "99.9% Uptime",
		},
		{
			icon: Headphones,
			text: "24/7 Support",
		},
	];

	return (
		<section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white"></div>
			
			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					{/* Main Headline */}
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
						Generate Images, Text and Videos with{" "}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							AI
						</span>
					</h1>

					{/* Subheadline */}
					<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
						Transform your content strategy with Adwola&apos;s AI that creates engaging 
						multimedia campaigns in <strong>minutes, not hours</strong>. Join thousands 
						of businesses already using Adwola to generate professional-quality content 
						across all platforms.
					</p>

					{/* CTA Buttons */}
					<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Button 
							size="lg" 
							className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
						>
							Start Creating Now
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
						<Button 
							variant="outline" 
							size="lg"
							className="border-gray-300 px-8 py-4 text-lg"
						>
							<Play className="mr-2 h-5 w-5" />
							Watch Demo
						</Button>
					</div>

					{/* Trust Indicators */}
					<div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8">
						{trustIndicators.map((indicator, index) => {
							const IconComponent = indicator.icon;
							return (
								<div 
									key={index}
									className="flex items-center space-x-2 text-sm text-gray-600"
								>
									<IconComponent className="h-4 w-4 text-green-500" />
									<span>{indicator.text}</span>
								</div>
							);
						})}
					</div>
				</div>

				{/* Dashboard Preview */}
				<div className="mt-16 lg:mt-20">
					<div className="mx-auto max-w-5xl">
						<div className="relative rounded-xl bg-white shadow-2xl ring-1 ring-gray-900/10">
							{/* Dashboard Header */}
							<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
								<div className="flex items-center space-x-4">
									<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
										<span className="text-sm font-bold text-white">A</span>
									</div>
									<span className="text-lg font-semibold text-gray-900">Adwola Dashboard</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="h-3 w-3 rounded-full bg-red-400"></div>
									<div className="h-3 w-3 rounded-full bg-yellow-400"></div>
									<div className="h-3 w-3 rounded-full bg-green-400"></div>
								</div>
							</div>

							{/* Dashboard Content */}
							<div className="p-6">
								<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
									{/* Stats Cards */}
									<div className="lg:col-span-2">
										<div className="grid grid-cols-2 gap-4">
											<div className="rounded-lg border border-gray-200 p-4">
												<div className="text-2xl font-bold text-gray-900">12,345</div>
												<div className="text-sm text-gray-600">Content Generated</div>
												<div className="text-xs text-green-600">↑ 23% vs last month</div>
											</div>
											<div className="rounded-lg border border-gray-200 p-4">
												<div className="text-2xl font-bold text-gray-900">98.7%</div>
												<div className="text-sm text-gray-600">Success Rate</div>
												<div className="text-xs text-green-600">↑ 2.1% vs last month</div>
											</div>
										</div>
									</div>

									{/* Activity Panel */}
									<div className="rounded-lg border border-gray-200 p-4">
										<h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
										<div className="space-y-2">
											<div className="flex items-center space-x-2 text-xs">
												<div className="h-2 w-2 rounded-full bg-blue-400"></div>
												<span className="text-gray-600">Content generated for LinkedIn</span>
											</div>
											<div className="flex items-center space-x-2 text-xs">
												<div className="h-2 w-2 rounded-full bg-green-400"></div>
												<span className="text-gray-600">Post published to Twitter</span>
											</div>
											<div className="flex items-center space-x-2 text-xs">
												<div className="h-2 w-2 rounded-full bg-purple-400"></div>
												<span className="text-gray-600">Image created for Instagram</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
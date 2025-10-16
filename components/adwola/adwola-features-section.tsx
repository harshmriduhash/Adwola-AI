"use client";

import { Brain, Share, Calendar, BarChart, Zap, Shield } from "lucide-react";

export function AdwolaFeaturesSection() {
	const features = [
		{
			title: "Advanced AI Generation",
			description: "GPT-4 and Gemini AI models create engaging, brand-consistent content that converts across all platforms.",
			icon: Brain,
			benefits: [
				"Multi-platform optimization",
				"Brand voice analysis",
				"Tone customization",
				"Content suggestions",
			],
		},
		{
			title: "Multi-Platform Publishing",
			description: "Content automatically optimized and published to LinkedIn, Twitter, Facebook, and Instagram with perfect formatting.",
			icon: Share,
			benefits: [
				"Platform-specific formatting",
				"Optimal posting times",
				"Hashtag suggestions",
				"Visual requirements",
			],
		},
		{
			title: "Smart Scheduling",
			description: "AI-powered posting times for maximum engagement based on audience behavior analysis and historical data.",
			icon: Calendar,
			benefits: [
				"Audience behavior tracking",
				"Performance optimization",
				"Engagement analytics",
				"ROI insights",
			],
		},
		{
			title: "Real-time Analytics",
			description: "Comprehensive analytics dashboard with actionable insights to optimize your content strategy continuously.",
			icon: BarChart,
			benefits: [
				"Performance tracking",
				"Engagement metrics",
				"Conversion analytics",
				"Growth insights",
			],
		},
		{
			title: "Lightning Fast",
			description: "Generate professional content in seconds, not hours. Our optimized AI pipeline ensures rapid content creation.",
			icon: Zap,
			benefits: [
				"Instant generation",
				"Bulk content creation",
				"Template library",
				"Quick editing tools",
			],
		},
		{
			title: "Enterprise Security",
			description: "Bank-level security with SOC 2 compliance, GDPR readiness, and enterprise-grade data protection.",
			icon: Shield,
			benefits: [
				"SOC 2 Type II certified",
				"GDPR compliant",
				"Data encryption",
				"Access controls",
			],
		},
	];

	return (
		<section className="bg-white py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center">
					<div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
						Enterprise Features
					</div>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Everything you need for social media success
					</h2>
					<p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
						Our AI-powered platform combines advanced content generation with enterprise-grade 
						security and team collaboration features to scale your social media strategy.
					</p>
				</div>

				{/* Features Grid */}
				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => {
						const IconComponent = feature.icon;
						return (
							<div
								key={index}
								className="relative group rounded-2xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
							>
								{/* Icon */}
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 group-hover:bg-blue-700 transition-colors">
									<IconComponent className="h-6 w-6 text-white" />
								</div>

								{/* Content */}
								<div className="mt-6">
									<h3 className="text-lg font-semibold text-gray-900">
										{feature.title}
									</h3>
									<p className="mt-2 text-gray-600">
										{feature.description}
									</p>
								</div>

								{/* Benefits List */}
								<div className="mt-6">
									<ul className="space-y-2">
										{feature.benefits.map((benefit, benefitIndex) => (
											<li
												key={benefitIndex}
												className="flex items-center text-sm text-gray-600"
											>
												<div className="mr-3 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
												{benefit}
											</li>
										))}
									</ul>
								</div>

								{/* Hover Effect Overlay */}
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-10 transition-opacity"></div>
							</div>
						);
					})}
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 text-center">
					<p className="text-lg text-gray-600">
						Ready to transform your content strategy?
					</p>
					<div className="mt-6">
						<button className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors">
							Start Your Free Trial
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
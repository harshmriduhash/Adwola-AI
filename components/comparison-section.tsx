"use client";

import { motion } from "framer-motion";
import { Check, Clock, Crown, Users, X, Zap } from "lucide-react";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import {
	ScrollReveal,
	StaggerContainer,
	StaggerItem,
} from "@/components/ui/scroll-reveal";

const comparisonData = [
	{
		feature: "Content Generation Speed",
		amplifyai: "6 minutes",
		competitor1: "2-3 hours",
		competitor2: "4-6 hours",
		manual: "6-8 hours",
	},
	{
		feature: "AI Quality Score",
		amplifyai: "9.7/10",
		competitor1: "7.2/10",
		competitor2: "6.8/10",
		manual: "Variable",
	},
	{
		feature: "Platform Optimization",
		amplifyai: true,
		competitor1: "Limited",
		competitor2: false,
		manual: false,
	},
	{
		feature: "Brand Voice Learning",
		amplifyai: true,
		competitor1: "Basic",
		competitor2: false,
		manual: true,
	},
	{
		feature: "Real-time Analytics",
		amplifyai: true,
		competitor1: true,
		competitor2: "Limited",
		manual: false,
	},
	{
		feature: "Bulk Content Creation",
		amplifyai: true,
		competitor1: false,
		competitor2: "Limited",
		manual: false,
	},
	{
		feature: "Multi-language Support",
		amplifyai: true,
		competitor1: "Limited",
		competitor2: false,
		manual: true,
	},
	{
		feature: "Team Collaboration",
		amplifyai: true,
		competitor1: "Basic",
		competitor2: true,
		manual: "Manual",
	},
	{
		feature: "Customer Support",
		amplifyai: "24/7 Chat",
		competitor1: "Email only",
		competitor2: "Business hours",
		manual: "N/A",
	},
	{
		feature: "Monthly Cost",
		amplifyai: "$29/mo",
		competitor1: "$89/mo",
		competitor2: "$149/mo",
		manual: "$2000+/mo",
	},
];

const alternatives = [
	{
		name: "Traditional Agencies",
		icon: Users,
		problems: [
			"Cost $2000-5000/month",
			"Slow turnaround (weeks)",
			"Limited revisions",
			"Communication delays",
		],
		solution:
			"Get agency-quality content in minutes, not weeks, at 95% less cost",
	},
	{
		name: "In-house Content Team",
		icon: Clock,
		problems: [
			"High salary costs ($60k+/year)",
			"Training and management overhead",
			"Limited scalability",
			"Burnout and turnover",
		],
		solution:
			"Scale infinitely without hiring, training, or managing additional staff",
	},
	{
		name: "DIY Content Creation",
		icon: Zap,
		problems: [
			"Extremely time-consuming",
			"Inconsistent quality",
			"Lack of expertise",
			"Poor performance",
		],
		solution:
			"Professional results without the learning curve or time investment",
	},
];

const ComparisonTable = () => (
	<ScrollReveal direction="up" delay={0.6}>
		<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100 dark:border-gray-700">
							<th className="text-left p-6 font-semibold text-gray-900 dark:text-white">
								Feature
							</th>
							<th className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
								<div className="flex flex-col items-center">
									<Crown className="w-6 h-6 text-yellow-500 mb-2" />
									<span className="font-bold text-blue-600 dark:text-blue-400">
										AmplifyAI
									</span>
									<Badge variant="secondary" className="mt-1 text-xs">
										Recommended
									</Badge>
								</div>
							</th>
							<th className="text-center p-6 text-gray-600 dark:text-gray-400">
								Competitor A
							</th>
							<th className="text-center p-6 text-gray-600 dark:text-gray-400">
								Competitor B
							</th>
							<th className="text-center p-6 text-gray-600 dark:text-gray-400">
								Manual Process
							</th>
						</tr>
					</thead>
					<tbody>
						{comparisonData.map((row, index) => (
							<motion.tr
								key={row.feature}
								className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05 }}
							>
								<td className="p-4 font-medium text-gray-900 dark:text-white">
									{row.feature}
								</td>
								<td className="p-4 text-center bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
									{typeof row.amplifyai === "boolean" ? (
										row.amplifyai ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-500 mx-auto" />
										)
									) : (
										<span className="font-semibold text-blue-600 dark:text-blue-400">
											{row.amplifyai}
										</span>
									)}
								</td>
								<td className="p-4 text-center text-gray-600 dark:text-gray-400">
									{typeof row.competitor1 === "boolean" ? (
										row.competitor1 ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-500 mx-auto" />
										)
									) : (
										row.competitor1
									)}
								</td>
								<td className="p-4 text-center text-gray-600 dark:text-gray-400">
									{typeof row.competitor2 === "boolean" ? (
										row.competitor2 ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-500 mx-auto" />
										)
									) : (
										row.competitor2
									)}
								</td>
								<td className="p-4 text-center text-gray-600 dark:text-gray-400">
									{typeof row.manual === "boolean" ? (
										row.manual ? (
											<Check className="w-5 h-5 text-green-500 mx-auto" />
										) : (
											<X className="w-5 h-5 text-red-500 mx-auto" />
										)
									) : (
										row.manual
									)}
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-t border-gray-100 dark:border-gray-700">
				<div className="text-center">
					<h4 className="font-semibold mb-2">Ready to make the switch?</h4>
					<p className="text-sm text-muted-foreground mb-4">
						Join 1200+ businesses who chose the smarter solution
					</p>
					<AnimatedButton variant="gradient" size="lg" animation="glow" asChild>
						<Link href="/auth/sign-up">
							Choose AmplifyAI <Crown className="ml-2 w-4 h-4" />
						</Link>
					</AnimatedButton>
				</div>
			</div>
		</div>
	</ScrollReveal>
);

export function ComparisonSection() {
	return (
		<section className="py-24 bg-gray-50 dark:bg-gray-800/50" id="comparison">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-20">
					<ScrollReveal direction="up">
						<Badge variant="secondary" className="mb-6 px-4 py-2">
							<Crown className="w-4 h-4 mr-2" />
							Better Than Alternatives
						</Badge>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.2}>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Why choose{" "}
							<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
								AmplifyAI?
							</span>
						</h2>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							See how AmplifyAI stacks up against traditional content creation
							methods and competing AI tools. The choice is clear.
						</p>
					</ScrollReveal>
				</div>

				{/* Alternative Solutions */}
				<StaggerContainer
					staggerDelay={0.2}
					className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
				>
					{alternatives.map((alt) => {
						const Icon = alt.icon;
						return (
							<StaggerItem key={alt.name}>
								<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
									<div className="flex items-center mb-6">
										<Icon className="w-8 h-8 text-red-500 mr-3" />
										<h3 className="text-xl font-semibold">{alt.name}</h3>
									</div>

									<div className="mb-6">
										<h4 className="font-medium text-red-600 dark:text-red-400 mb-3">
											Problems:
										</h4>
										<ul className="space-y-2">
											{alt.problems.map((problem, index) => (
												<li
													key={index}
													className="flex items-start text-sm text-muted-foreground"
												>
													<X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
													{problem}
												</li>
											))}
										</ul>
									</div>

									<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
										<h4 className="font-medium text-green-700 dark:text-green-400 mb-2">
											AmplifyAI Solution:
										</h4>
										<p className="text-sm text-green-600 dark:text-green-300">
											{alt.solution}
										</p>
									</div>
								</div>
							</StaggerItem>
						);
					})}
				</StaggerContainer>

				{/* Detailed Comparison Table */}
				<ComparisonTable />

				{/* Bottom Stats */}
				<ScrollReveal direction="up" delay={0.8}>
					<div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
						{[
							{
								metric: "95%",
								label: "Cost Savings",
								description: "vs. hiring agencies",
							},
							{
								metric: "10x",
								label: "Faster",
								description: "than manual creation",
							},
							{
								metric: "99%",
								label: "Accuracy",
								description: "in brand voice matching",
							},
							{
								metric: "24/7",
								label: "Availability",
								description: "never sleeps or takes breaks",
							},
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								className="text-center group"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 + index * 0.1 }}
							>
								<div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200">
									{stat.metric}
								</div>
								<div className="font-semibold mb-1">{stat.label}</div>
								<div className="text-sm text-muted-foreground">
									{stat.description}
								</div>
							</motion.div>
						))}
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}

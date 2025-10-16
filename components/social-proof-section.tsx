"use client";

import { motion } from "framer-motion";
import { Building2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const companies = [
	{ name: "TechFlow", logo: "/logos/techflow.svg", industry: "SaaS" },
	{ name: "GrowthCorp", logo: "/logos/growthcorp.svg", industry: "E-commerce" },
	{ name: "InnovateLab", logo: "/logos/innovatelab.svg", industry: "Startup" },
	{ name: "MarketPro", logo: "/logos/marketpro.svg", industry: "Agency" },
	{ name: "ScaleUp", logo: "/logos/scaleup.svg", industry: "Consulting" },
	{ name: "BrandForce", logo: "/logos/brandforce.svg", industry: "Enterprise" },
];

const quickWins = [
	{
		metric: "300%",
		description: "Increase in content output",
		company: "TechFlow",
		timeframe: "First month",
	},
	{
		metric: "85%",
		description: "Reduction in content costs",
		company: "GrowthCorp",
		timeframe: "Within 6 weeks",
	},
	{
		metric: "4.2x",
		description: "More engagement per post",
		company: "InnovateLab",
		timeframe: "After 3 months",
	},
];

export function SocialProofSection() {
	return (
		<section className="py-20 bg-gray-50 dark:bg-gray-800/50" id="social-proof">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<ScrollReveal direction="up">
						<Badge variant="secondary" className="mb-4 px-4 py-2">
							<Building2 className="w-4 h-4 mr-2" />
							Trusted by Leading Brands
						</Badge>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.2}>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Join 1200+ brands already{" "}
							<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
								winning with AI
							</span>
						</h2>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							From startups to Fortune 500 companies, businesses trust AmplifyAI
							to transform their content strategy and drive real results.
						</p>
					</ScrollReveal>
				</div>

				{/* Company Logos */}
				<ScrollReveal direction="up" delay={0.6}>
					<div className="mb-20">
						<p className="text-center text-sm text-muted-foreground mb-8">
							Trusted by companies across industries
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
							{companies.map((company, index) => (
								<motion.div
									key={company.name}
									className="group flex flex-col items-center p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
									whileHover={{ y: -2 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									{/* Logo placeholder - in production, replace with actual logos */}
									<div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
										<Building2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
									</div>
									<h4 className="font-semibold text-sm text-center">
										{company.name}
									</h4>
									<p className="text-xs text-muted-foreground">
										{company.industry}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</ScrollReveal>

				{/* Quick Wins */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					{quickWins.map((win, index) => (
						<ScrollReveal
							key={win.company}
							direction="up"
							delay={0.8 + index * 0.2}
						>
							<motion.div
								className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center group hover:shadow-xl transition-all duration-300"
								whileHover={{ y: -5 }}
							>
								<div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200">
									{win.metric}
								</div>
								<h4 className="font-semibold text-lg mb-2">
									{win.description}
								</h4>
								<p className="text-muted-foreground text-sm mb-3">
									{win.company} • {win.timeframe}
								</p>
								<div className="flex justify-center">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="w-4 h-4 text-yellow-400 fill-current"
										/>
									))}
								</div>
							</motion.div>
						</ScrollReveal>
					))}
				</div>

				{/* Rating Summary */}
				<ScrollReveal direction="up" delay={1.4}>
					<div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
						<div className="flex justify-center mb-4">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className="w-6 h-6 text-yellow-400 fill-current"
								/>
							))}
						</div>
						<h3 className="text-2xl font-bold mb-2">4.9/5 Customer Rating</h3>
						<p className="text-muted-foreground mb-4">
							Based on 500+ verified reviews from businesses like yours
						</p>
						<div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
							<div className="text-center">
								<div className="text-lg font-bold text-green-600">98%</div>
								<div className="text-sm text-muted-foreground">
									Would recommend
								</div>
							</div>
							<div className="text-center">
								<div className="text-lg font-bold text-blue-600">4.8/5</div>
								<div className="text-sm text-muted-foreground">Ease of use</div>
							</div>
							<div className="text-center">
								<div className="text-lg font-bold text-purple-600">4.9/5</div>
								<div className="text-sm text-muted-foreground">
									Customer support
								</div>
							</div>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}

"use client";

import { motion } from "framer-motion";
import {
	Check,
	Crown,
	HeadphonesIcon,
	Infinity,
	Rocket,
	Shield,
	Star,
	Users,
	X,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ScrollReveal,
	StaggerContainer,
	StaggerItem,
} from "@/components/ui/scroll-reveal";

const pricingPlans = [
	{
		name: "Free",
		description: "Perfect for getting started",
		price: { monthly: 0, annually: 0 },
		icon: Zap,
		color: "gray",
		features: [
			{ name: "5 posts per month", included: true },
			{ name: "1 brand", included: true },
			{ name: "Basic AI content generation", included: true },
			{ name: "Standard templates", included: true },
			{ name: "Community support", included: true },
			{ name: "Multi-platform posting", included: false },
			{ name: "Analytics dashboard", included: false },
			{ name: "Team collaboration", included: false },
			{ name: "Priority support", included: false },
		],
		cta: "Start Free",
		href: "/auth/sign-up",
	},
	{
		name: "Pro",
		description: "Most popular for growing businesses",
		price: { monthly: 29, annually: 25 },
		icon: Star,
		color: "blue",
		popular: true,
		features: [
			{ name: "100 posts per month", included: true },
			{ name: "5 brands", included: true },
			{ name: "Advanced AI content generation", included: true },
			{ name: "Premium templates", included: true },
			{ name: "Multi-platform posting", included: true },
			{ name: "Analytics dashboard", included: true },
			{ name: "Smart scheduling", included: true },
			{ name: "Email support", included: true },
			{ name: "Team collaboration", included: false },
		],
		cta: "Start Pro Trial",
		href: "/auth/sign-up?plan=pro",
	},
	{
		name: "Agency",
		description: "For teams and agencies",
		price: { monthly: 99, annually: 85 },
		icon: Crown,
		color: "purple",
		features: [
			{ name: "Unlimited posts", included: true },
			{ name: "Unlimited brands", included: true },
			{ name: "Advanced AI content generation", included: true },
			{ name: "All premium templates", included: true },
			{ name: "Multi-platform posting", included: true },
			{ name: "Advanced analytics", included: true },
			{ name: "Team collaboration", included: true },
			{ name: "Priority support", included: true },
			{ name: "Custom integrations", included: true },
		],
		cta: "Contact Sales",
		href: "/contact",
	},
];

const getColorClasses = (color: string, isPopular = false) => {
	if (isPopular) {
		return {
			border: "border-blue-500 ring-2 ring-blue-500/20",
			gradient:
				"bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
			icon: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
			badge: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
		};
	}

	const colors = {
		gray: {
			border: "border-gray-200 dark:border-gray-700",
			gradient: "bg-white dark:bg-gray-800",
			icon: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
			badge: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
		},
		blue: {
			border: "border-blue-200 dark:border-blue-700",
			gradient: "bg-blue-50 dark:bg-blue-900/20",
			icon: "bg-blue-500 text-white",
			badge: "bg-blue-500 text-white",
		},
		purple: {
			border: "border-purple-200 dark:border-purple-700",
			gradient: "bg-purple-50 dark:bg-purple-900/20",
			icon: "bg-purple-500 text-white",
			badge: "bg-purple-500 text-white",
		},
	};

	return colors[color as keyof typeof colors] || colors.gray;
};

export function PricingSection() {
	const [isAnnual, setIsAnnual] = useState(false);

	return (
		<section
			id="pricing"
			className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<ScrollReveal direction="up">
						<Badge variant="secondary" className="mb-4 px-3 py-1">
							<Rocket className="w-4 h-4 mr-2" />
							Simple Pricing
						</Badge>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.2}>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Choose the perfect{" "}
							<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
								plan for you
							</span>
						</h2>
					</ScrollReveal>

					<ScrollReveal direction="up" delay={0.4}>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
							Start free and scale as you grow. All plans include our core AI
							features with enterprise-grade security.
						</p>
					</ScrollReveal>

					{/* Billing Toggle */}
					<ScrollReveal direction="up" delay={0.6}>
						<div className="flex items-center justify-center space-x-4 mb-12">
							<span
								className={`text-sm font-medium ${!isAnnual ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}
							>
								Monthly
							</span>
							<motion.button
								onClick={() => setIsAnnual(!isAnnual)}
								className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
									isAnnual ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
								}`}
								whileTap={{ scale: 0.95 }}
							>
								<motion.div
									className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
									animate={{ x: isAnnual ? 28 : 0 }}
									transition={{ type: "spring", stiffness: 400, damping: 25 }}
								/>
							</motion.button>
							<span
								className={`text-sm font-medium ${isAnnual ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}
							>
								Annual
							</span>
							{isAnnual && (
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
								>
									Save 20%
								</Badge>
							)}
						</div>
					</ScrollReveal>
				</div>

				{/* Pricing Cards */}
				<StaggerContainer staggerDelay={0.15}>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{pricingPlans.map((plan) => {
							const colorClasses = getColorClasses(plan.color, plan.popular);
							const Icon = plan.icon;
							const price = isAnnual ? plan.price.annually : plan.price.monthly;

							return (
								<StaggerItem key={plan.name}>
									<motion.div
										whileHover={{
											y: plan.popular ? -12 : -8,
											transition: { duration: 0.3, ease: "easeOut" },
										}}
										className="h-full relative"
									>
										{plan.popular && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.5 }}
												className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
											>
												<Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-medium">
													Most Popular
												</Badge>
											</motion.div>
										)}

										<Card
											className={`h-full ${colorClasses.border} ${colorClasses.gradient} shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
										>
											{plan.popular && (
												<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
											)}

											<CardHeader className="relative pb-8">
												<div className="flex items-center justify-between mb-4">
													<div
														className={`w-12 h-12 ${colorClasses.icon} rounded-xl flex items-center justify-center`}
													>
														<Icon className="w-6 h-6" />
													</div>
													{plan.name === "Agency" && (
														<Badge
															variant="secondary"
															className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
														>
															Enterprise
														</Badge>
													)}
												</div>

												<CardTitle className="text-2xl font-bold mb-2">
													{plan.name}
												</CardTitle>
												<CardDescription className="text-base mb-6">
													{plan.description}
												</CardDescription>

												<div className="flex items-baseline space-x-2">
													<span className="text-4xl font-bold">${price}</span>
													<span className="text-muted-foreground">
														{price === 0
															? "forever"
															: isAnnual
																? "/month"
																: "/month"}
													</span>
												</div>

												{isAnnual && price > 0 && (
													<p className="text-sm text-muted-foreground mt-1">
														Billed annually (${price * 12}/year)
													</p>
												)}
											</CardHeader>

											<CardContent className="relative space-y-6">
												<AnimatedButton
													variant={plan.popular ? "gradient" : "outline"}
													className="w-full"
													animation={plan.popular ? "glow" : "scale"}
													asChild
												>
													<Link href={plan.href}>{plan.cta}</Link>
												</AnimatedButton>

												<div className="space-y-3">
													<h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
														What&apos;s included:
													</h4>
													<ul className="space-y-3">
														{plan.features.map((feature, featureIndex) => (
															<motion.li
																key={feature.name}
																initial={{ opacity: 0, x: -10 }}
																animate={{ opacity: 1, x: 0 }}
																transition={{ delay: 0.1 * featureIndex }}
																className="flex items-center space-x-3"
															>
																{feature.included ? (
																	<div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
																		<Check className="w-3 h-3 text-white" />
																	</div>
																) : (
																	<div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
																		<X className="w-3 h-3 text-gray-500" />
																	</div>
																)}
																<span
																	className={`text-sm ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-500"}`}
																>
																	{feature.name}
																</span>
															</motion.li>
														))}
													</ul>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								</StaggerItem>
							);
						})}
					</div>
				</StaggerContainer>

				{/* Additional Features */}
				<ScrollReveal direction="up" delay={1.0}>
					<div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
						<motion.div
							className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
							whileHover={{ y: -5 }}
						>
							<Shield className="w-8 h-8 mx-auto mb-3 text-blue-600" />
							<h3 className="font-semibold mb-2">Enterprise Security</h3>
							<p className="text-sm text-muted-foreground">
								SOC 2 compliant with end-to-end encryption
							</p>
						</motion.div>

						<motion.div
							className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
							whileHover={{ y: -5 }}
						>
							<HeadphonesIcon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
							<h3 className="font-semibold mb-2">24/7 Support</h3>
							<p className="text-sm text-muted-foreground">
								Expert support when you need it most
							</p>
						</motion.div>

						<motion.div
							className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
							whileHover={{ y: -5 }}
						>
							<Infinity className="w-8 h-8 mx-auto mb-3 text-green-600" />
							<h3 className="font-semibold mb-2">No Limits</h3>
							<p className="text-sm text-muted-foreground">
								Scale without worrying about usage caps
							</p>
						</motion.div>

						<motion.div
							className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
							whileHover={{ y: -5 }}
						>
							<Users className="w-8 h-8 mx-auto mb-3 text-orange-600" />
							<h3 className="font-semibold mb-2">Team Collaboration</h3>
							<p className="text-sm text-muted-foreground">
								Built for teams of all sizes
							</p>
						</motion.div>
					</div>
				</ScrollReveal>

				{/* FAQ or Additional Info */}
				<ScrollReveal direction="up" delay={1.2}>
					<div className="mt-16 text-center">
						<p className="text-muted-foreground mb-4">
							Need a custom plan for your enterprise?
						</p>
						<AnimatedButton variant="outline" animation="scale" asChild>
							<Link href="/contact">Contact Sales</Link>
						</AnimatedButton>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}

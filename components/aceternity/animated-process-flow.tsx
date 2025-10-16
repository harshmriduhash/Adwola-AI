"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Sparkles, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const processSteps = [
	{
		step: 1,
		title: "Describe Your Vision",
		description:
			"Tell us your brand story, target audience, and campaign goals. Our AI understands context, tone, and industry-specific requirements.",
		details: [
			"Brand voice analysis",
			"Audience targeting", 
			"Goal optimization",
			"Tone customization",
		],
		color: "blue",
		icon: Target,
		gradient: "from-blue-500 to-indigo-600",
		bgGradient: "from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20",
	},
	{
		step: 2,
		title: "AI Creates Magic",
		description:
			"Advanced AI models generate platform-optimized content with captions, hashtags, and visual suggestions in seconds.",
		details: [
			"Multi-platform optimization",
			"SEO-friendly hashtags",
			"Visual suggestions", 
			"A/B test variants",
		],
		color: "purple",
		icon: Sparkles,
		gradient: "from-purple-500 to-pink-600",
		bgGradient: "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20",
	},
	{
		step: 3,
		title: "Publish & Optimize",
		description:
			"Review, schedule, and track performance. Get AI-powered insights to continuously improve your content strategy.",
		details: [
			"Smart scheduling",
			"Performance tracking",
			"Optimization tips",
			"ROI analytics",
		],
		color: "green",
		icon: TrendingUp,
		gradient: "from-green-500 to-emerald-600",
		bgGradient: "from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20",
	},
];

// Enhanced Process Step Component
function ProcessStep({ step, index, isActive, onHover, onLeave }: {
	step: typeof processSteps[0];
	index: number;
	isActive: boolean;
	onHover: () => void;
	onLeave: () => void;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const controls = useAnimation();
	const Icon = step.icon;

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 60,
			scale: 0.9,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.7,
				delay: index * 0.2,
				ease: "easeOut" as const,
			},
		},
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={cardVariants}
			className="relative group"
			onHoverStart={onHover}
			onHoverEnd={onLeave}
		>
			<motion.div
				whileHover={{
					y: -12,
					scale: 1.03,
					transition: { duration: 0.3, ease: "easeOut" },
				}}
				className={cn(
					"relative p-8 rounded-3xl border transition-all duration-500",
					"bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg",
					"border-white/20 dark:border-gray-700/30",
					"shadow-lg hover:shadow-2xl",
					isActive && "shadow-2xl ring-2 ring-blue-500/20",
					`hover:bg-gradient-to-br ${step.bgGradient}`
				)}
			>
				{/* Animated Background */}
				<div className={cn(
					"absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
					`bg-gradient-to-br ${step.bgGradient}`
				)} />

				{/* Glow Effect */}
				<div className={cn(
					"absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500",
					"bg-gradient-to-br from-white/10 to-transparent dark:from-white/5"
				)} />

				{/* Content */}
				<div className="relative z-10">
					{/* Step Number & Icon */}
					<div className="flex items-center justify-between mb-8">
						<motion.div
							className={cn(
								"relative w-20 h-20 rounded-2xl flex items-center justify-center",
								"shadow-lg group-hover:shadow-xl transition-all duration-300",
								`bg-gradient-to-r ${step.gradient} text-white`
							)}
							whileHover={{ 
								rotate: [0, -3, 3, 0],
								scale: 1.1,
								transition: { duration: 0.5 }
							}}
						>
							<span className="text-2xl font-bold">{step.step}</span>
							
							{/* Floating Icon */}
							<motion.div
								className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center"
								animate={{
									y: [0, -4, 0],
									rotate: [0, 5, -5, 0],
								}}
								transition={{
									duration: 3,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<Icon className={cn("w-4 h-4", `text-${step.color}-500`)} />
							</motion.div>
						</motion.div>

						{/* Completion Badge */}
						<motion.div
							initial={{ scale: 0, rotate: -180 }}
							animate={isInView ? { scale: 1, rotate: 0 } : {}}
							transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
							className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
						>
							<CheckCircle className="w-5 h-5 text-white" />
						</motion.div>
					</div>

					{/* Title */}
					<motion.h3
						className={cn(
							"text-2xl font-semibold mb-4 transition-colors duration-300",
							`group-hover:text-${step.color}-600 dark:group-hover:text-${step.color}-400`
						)}
						whileHover={{ x: 5 }}
					>
						{step.title}
					</motion.h3>

					{/* Description */}
					<p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
						{step.description}
					</p>

					{/* Feature List */}
					<ul className="space-y-3">
						{step.details.map((detail, detailIndex) => (
							<motion.li
								key={detailIndex}
								initial={{ opacity: 0, x: -20 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ delay: index * 0.2 + detailIndex * 0.1 + 0.7 }}
								className="flex items-center text-sm"
								whileHover={{ x: 8 }}
							>
								<motion.div
									className={cn(
										"w-2 h-2 rounded-full mr-3 flex-shrink-0",
										`bg-${step.color}-500`
									)}
									animate={{
										scale: [1, 1.3, 1],
									}}
									transition={{
										duration: 2,
										repeat: Number.POSITIVE_INFINITY,
										delay: detailIndex * 0.3,
									}}
								/>
								<span className="text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
									{detail}
								</span>
							</motion.li>
						))}
					</ul>

					{/* Hover Border Effect */}
					<div className={cn(
						"absolute bottom-0 left-8 right-8 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500",
						`bg-gradient-to-r ${step.gradient}`
					)} />
				</div>
			</motion.div>

			{/* Animated Connecting Arrow */}
			{index < processSteps.length - 1 && (
				<div className="hidden lg:flex absolute top-1/2 -right-8 w-16 items-center justify-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ delay: index * 0.2 + 1 }}
						className="relative"
					>
						<motion.div
							animate={{
								x: [0, 8, 0],
							}}
							transition={{
								duration: 2,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						>
							<ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-600" />
						</motion.div>
						
						{/* Flowing Line Effect */}
						<motion.div
							className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
							initial={{ width: 0 }}
							animate={isInView ? { width: "100%" } : {}}
							transition={{ delay: index * 0.2 + 1.2, duration: 1 }}
						/>
					</motion.div>
				</div>
			)}
		</motion.div>
	);
}

export function AnimatedProcessFlow() {
	const [isClient, setIsClient] = useState(false);
	const [activeStep, setActiveStep] = useState<number | null>(null);
	const headerRef = useRef(null);
	const isHeaderInView = useInView(headerRef, { once: true });

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<section className="py-24 bg-gray-50 dark:bg-gray-800/50" id="how-it-works">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20">
						<Badge variant="secondary" className="mb-6 px-4 py-2">
							<Clock className="w-4 h-4 mr-2" />
							Simple 3-Step Process
						</Badge>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							From idea to viral content in minutes
						</h2>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-24 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden" id="how-it-works">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-700/50 bg-[size:32px_32px] opacity-30" />
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				{/* Section Header */}
				<div ref={headerRef} className="text-center mb-20">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6 }}
					>
						<Badge
							variant="secondary"
							className="mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30"
						>
							<Clock className="w-4 h-4 mr-2" />
							Simple 3-Step Process
						</Badge>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-4xl md:text-5xl font-bold mb-6"
					>
						From idea to{" "}
						<span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
							viral content
						</span>{" "}
						in minutes
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
					>
						No design skills, no copywriting experience, no marketing degree
						required. Just describe your vision and let our AI do the heavy
						lifting.
					</motion.p>
				</div>

				{/* Process Steps */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
					{processSteps.map((step, index) => (
						<ProcessStep
							key={step.step}
							step={step}
							index={index}
							isActive={activeStep === index}
							onHover={() => setActiveStep(index)}
							onLeave={() => setActiveStep(null)}
						/>
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 1.2 }}
					className="text-center"
				>
					<div className={cn(
						"bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-3xl",
						"border border-white/20 dark:border-gray-700/30 shadow-lg",
						"max-w-md mx-auto"
					)}>
						<h4 className="text-lg font-semibold mb-4">
							Ready to get started?
						</h4>
						<p className="text-muted-foreground mb-6">
							Join 1200+ businesses already creating better content with AI
						</p>
						<AnimatedButton
							variant="gradient"
							size="lg"
							animation="glow"
							className="w-full"
							asChild
						>
							<Link href="/auth/sign-up">
								Start Creating Content <ArrowRight className="ml-2 w-4 h-4" />
							</Link>
						</AnimatedButton>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
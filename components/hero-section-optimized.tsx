"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Target, Users, Zap } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import {
	ScrollReveal,
	StaggerContainer,
	StaggerItem,
} from "@/components/ui/scroll-reveal";
import {
	CountingAnimation,
	TypingAnimation,
} from "@/components/ui/typing-animation";
import { WaitlistForm } from "@/components/waitlist-form";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const FloatingBackground = memo(function FloatingBackground() {
	const prefersReducedMotion = useReducedMotion();

	if (prefersReducedMotion) {
		return (
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
				<div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
			</div>
		);
	}

	return (
		<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
			{/* Optimized floating elements - reduced from 3 to 2 for better performance */}
			<motion.div
				className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl will-change-transform"
				animate={{
					x: [0, 30, 0],
					y: [0, -20, 0],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl will-change-transform"
				animate={{
					x: [0, -40, 0],
					y: [0, 20, 0],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
});

const StatsSection = memo(function StatsSection() {
	const [, isVisible] = useIntersectionObserver({
		threshold: 0.1,
		triggerOnce: true,
	});

	const stats = useMemo(
		() => [
			{
				value: 95,
				suffix: "%",
				label: "Time Saved",
				icon: Zap,
				color: "text-blue-500",
				description: "Reduce content creation time from hours to minutes",
			},
			{
				value: 10,
				suffix: "x",
				label: "Content Output",
				icon: Target,
				color: "text-purple-500",
				description: "Generate 10x more engaging content",
			},
			{
				value: 1200,
				suffix: "+",
				label: "Happy Customers",
				icon: Users,
				color: "text-green-500",
				description: "Trusted by growing businesses worldwide",
			},
			{
				value: 24,
				suffix: "/7",
				label: "AI Availability",
				icon: Sparkles,
				color: "text-orange-500",
				description: "Round-the-clock AI content generation",
			},
		],
		[],
	);

	return (
		<StaggerContainer
			staggerDelay={0.15}
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
		>
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<StaggerItem key={stat.label}>
						<motion.div
							className="group text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 shadow-lg hover:shadow-xl transition-all duration-300"
							whileHover={{ y: -5, scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							role="region"
							aria-label={`${stat.label}: ${stat.description}`}
						>
							<div
								className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}
							>
								{isVisible ? (
									<CountingAnimation
										from={0}
										to={stat.value}
										suffix={stat.suffix}
										duration={2 + index * 0.2}
									/>
								) : (
									`${stat.value}${stat.suffix}`
								)}
							</div>
							<div className="text-sm font-medium text-muted-foreground mb-2">
								{stat.label}
							</div>
							<Icon
								className={`w-5 h-5 mx-auto ${stat.color} group-hover:scale-110 transition-transform duration-200`}
							/>
							<div className="text-xs text-muted-foreground/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								{stat.description}
							</div>
						</motion.div>
					</StaggerItem>
				);
			})}
		</StaggerContainer>
	);
});

const HeroActions = memo(function HeroActions() {
	return (
		<ScrollReveal direction="up" delay={0.8}>
			<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
				<div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
					<WaitlistForm />
				</div>
				<div className="flex gap-3 flex-wrap justify-center">
					<AnimatedButton
						variant="outline"
						size="lg"
						animation="glow"
						className="min-w-[140px]"
						asChild
					>
						<Link href="/campaigns" aria-label="Try interactive demo">
							<Play className="mr-2 w-4 h-4" />
							Try Demo
						</Link>
					</AnimatedButton>
					<AnimatedButton
						variant="ghost"
						size="lg"
						animation="slide"
						className="min-w-[160px]"
						asChild
					>
						<Link href="/auth/sign-up" aria-label="Start free trial">
							Get Started <ArrowRight className="ml-2 w-4 h-4" />
						</Link>
					</AnimatedButton>
				</div>
			</div>
		</ScrollReveal>
	);
});

const ScrollIndicator = memo(function ScrollIndicator() {
	const prefersReducedMotion = useReducedMotion();

	if (prefersReducedMotion) {
		return (
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
				<div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
				</div>
			</div>
		);
	}

	return (
		<ScrollReveal direction="up" delay={1.2}>
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				role="button"
				aria-label="Scroll down to see more content"
			>
				<div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center cursor-pointer">
					<motion.div
						className="w-1 h-3 bg-gray-400 rounded-full mt-2"
						animate={{ y: [0, 12, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</div>
			</motion.div>
		</ScrollReveal>
	);
});

export function HeroSection() {
	const dynamicWords = useMemo(
		() => ["6 minutes", "AI-powered", "effortless", "professional"],
		[],
	);

	return (
		<section
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
			role="banner"
			aria-label="AmplifyAI hero section"
		>
			<FloatingBackground />

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<ScrollReveal direction="down" delay={0.2}>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{
							delay: 0.5,
							type: "spring",
							stiffness: 200,
							damping: 15,
						}}
					>
						<Badge
							variant="secondary"
							className="mb-8 px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 hover:border-blue-300/50 transition-all duration-300"
							role="status"
							aria-label="New feature announcement"
						>
							<Sparkles className="w-4 h-4 mr-2" />🚀 AI-Powered Content
							Creation Platform
						</Badge>
					</motion.div>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.4}>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
						From 6 hours to{" "}
						<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
							<TypingAnimation
								words={dynamicWords}
								className="inline-block"
								typingSpeed={120}
								deletingSpeed={80}
								pauseDuration={2000}
								aria-label="Dynamic content creation time"
							/>
						</span>
					</h1>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.6}>
					<p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
						Transform your social media strategy with AI that creates engaging
						content campaigns in{" "}
						<span className="font-semibold text-blue-600 dark:text-blue-400">
							minutes, not hours
						</span>
						. Professional-quality posts across all platforms, optimized for
						maximum engagement.
					</p>
				</ScrollReveal>

				<HeroActions />

				<StatsSection />

				<ScrollIndicator />
			</div>
		</section>
	);
}

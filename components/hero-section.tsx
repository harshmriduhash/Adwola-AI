"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Target, Users, Zap } from "lucide-react";
import Link from "next/link";
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

export function HeroSection() {
	const dynamicWords = [
		"6 minutes",
		"AI-powered",
		"effortless",
		"professional",
	];

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20">
				{/* Floating Elements */}
				<motion.div
					className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
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
					className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
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
				<motion.div
					className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-400/5 rounded-full blur-2xl"
					animate={{
						scale: [1, 1.2, 1],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>

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
							className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 hover:border-blue-300/50 transition-all duration-300"
						>
							<Sparkles className="w-4 h-4 mr-2" />🚀 AI-Powered Content
							Creation Platform
						</Badge>
					</motion.div>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.4}>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
						From 6 hours to{" "}
						<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
							<TypingAnimation
								words={dynamicWords}
								className="inline-block"
								typingSpeed={120}
								deletingSpeed={80}
								pauseDuration={2000}
							/>
						</span>
					</h1>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.6}>
					<p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
						Transform your social media strategy with AI that creates engaging
						content campaigns in{" "}
						<span className="font-semibold text-blue-600 dark:text-blue-400">
							minutes, not hours
						</span>
						. Professional-quality posts across all platforms.
					</p>
				</ScrollReveal>

				<ScrollReveal direction="up" delay={0.8}>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
						<WaitlistForm />
						<div className="flex gap-3">
							<AnimatedButton
								variant="outline"
								size="lg"
								animation="glow"
								asChild
							>
								<Link href="/campaigns">
									<Play className="mr-2 w-4 h-4" />
									Try Demo
								</Link>
							</AnimatedButton>
							<AnimatedButton
								variant="ghost"
								size="lg"
								animation="slide"
								asChild
							>
								<Link href="/auth/sign-up">
									Get Started <ArrowRight className="ml-2 w-4 h-4" />
								</Link>
							</AnimatedButton>
						</div>
					</div>
				</ScrollReveal>

				{/* Animated Stats */}
				<StaggerContainer
					staggerDelay={0.15}
					className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
				>
					<StaggerItem>
						<motion.div
							className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
							whileHover={{ y: -5 }}
						>
							<div className="text-4xl font-bold text-blue-500 mb-2">
								<CountingAnimation from={0} to={99} suffix="%" duration={2.5} />
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								Time Saved
							</div>
							<Zap className="w-5 h-5 mx-auto mt-2 text-blue-500" />
						</motion.div>
					</StaggerItem>

					<StaggerItem>
						<motion.div
							className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
							whileHover={{ y: -5 }}
						>
							<div className="text-4xl font-bold text-purple-500 mb-2">
								<CountingAnimation from={0} to={10} suffix="x" duration={2.5} />
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								Content Output
							</div>
							<Target className="w-5 h-5 mx-auto mt-2 text-purple-500" />
						</motion.div>
					</StaggerItem>

					<StaggerItem>
						<motion.div
							className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
							whileHover={{ y: -5 }}
						>
							<div className="text-4xl font-bold text-green-500 mb-2">
								<CountingAnimation
									from={0}
									to={500}
									suffix="+"
									duration={2.5}
								/>
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								Brands Trusting Us
							</div>
							<Users className="w-5 h-5 mx-auto mt-2 text-green-500" />
						</motion.div>
					</StaggerItem>

					<StaggerItem>
						<motion.div
							className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
							whileHover={{ y: -5 }}
						>
							<div className="text-4xl font-bold text-orange-500 mb-2">
								<CountingAnimation
									from={0}
									to={24}
									suffix="/7"
									duration={2.5}
								/>
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								AI Availability
							</div>
							<Sparkles className="w-5 h-5 mx-auto mt-2 text-orange-500" />
						</motion.div>
					</StaggerItem>
				</StaggerContainer>

				{/* Scroll Indicator */}
				<ScrollReveal direction="up" delay={1.2}>
					<motion.div
						className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						<div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
							<motion.div
								className="w-1 h-3 bg-gray-400 rounded-full mt-2"
								animate={{ y: [0, 12, 0] }}
								transition={{ duration: 2, repeat: Infinity }}
							/>
						</div>
					</motion.div>
				</ScrollReveal>
			</div>
		</section>
	);
}

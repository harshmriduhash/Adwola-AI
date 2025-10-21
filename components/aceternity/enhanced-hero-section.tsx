"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";

import { AIProvidersShowcase } from "./ai-providers-showcase";
import { AnimatedBackground } from "./animated-background";
import { EnhancedStats } from "./enhanced-stats";

const HeroActions = memo(function HeroActions() {
  return (
    <ScrollReveal direction="up" delay={0.8}>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        {/* Primary CTA - Start Creating */}
        <AnimatedButton
          variant="default"
          size="lg"
          animation="glow"
          className="min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-lg"
          asChild
        >
          <Link href="/auth/sign-up" aria-label="Start creating content now">
            <Sparkles className="mr-2 w-5 h-5" />
            Start Creating Now
          </Link>
        </AnimatedButton>

        {/* Secondary CTA - Try Demo */}
        <AnimatedButton
          variant="outline"
          size="lg"
          animation="slide"
          className="min-w-[160px] backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/40 dark:border-gray-700/40 hover:bg-white/90 dark:hover:bg-gray-900/90"
          asChild
        >
          <Link href="/campaigns" aria-label="Try interactive demo">
            <Play className="mr-2 w-4 h-4" />
            Try Demo
          </Link>
        </AnimatedButton>
      </div>
    </ScrollReveal>
  );
});

const ScrollIndicator = memo(function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center backdrop-blur-sm bg-white/20 dark:bg-gray-900/20">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    );
  }

  return (
    <ScrollReveal direction="up" delay={1.2}>
      <motion.section
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down to see more content"
      >
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center cursor-pointer backdrop-blur-sm bg-white/20 dark:bg-gray-900/20">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.section>
    </ScrollReveal>
  );
});

const TrustSignals = memo(function TrustSignals() {
  const signals = [
    { label: "SOC 2 Compliant", icon: "🔒" },
    { label: "GDPR Ready", icon: "🛡️" },
    { label: "99.9% Uptime", icon: "⚡" },
    { label: "24/7 Support", icon: "🤝" },
  ];

  return (
    <ScrollReveal direction="up" delay={1.0}>
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {signals.map((signal, index) => (
          <motion.div
            key={signal.label}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-full",
              "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm",
              "border border-white/40 dark:border-gray-700/40",
              "hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300"
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
          >
            <span className="text-lg">{signal.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {signal.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </ScrollReveal>
  );
});

const HeroContent = memo(function HeroContent() {
  const dynamicWords = useMemo(
    () => ["6 minutes", "AI-powered", "effortless", "professional"],
    []
  );

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Badge */}
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
            className={cn(
              "mb-8 px-6 py-3 text-sm font-medium",
              "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
              "border-blue-200/50 hover:border-blue-300/50",
              "backdrop-blur-sm bg-white/60 dark:bg-gray-900/60",
              "transition-all duration-300"
            )}
            aria-label="New feature announcement"
          >
            <Sparkles className="w-4 h-4 mr-2" />✨ Live Platform - Start
            Creating Today
          </Badge>
        </motion.div>
      </ScrollReveal>

      {/* Main Headline */}
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

      {/* Subtitle */}
      <ScrollReveal direction="up" delay={0.6}>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Transform your social media strategy with AI that creates engaging
          content campaigns in{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            minutes, not hours
          </span>
          . Join thousands of businesses already using AmplifyAI to generate
          professional-quality posts across all platforms.
        </p>
      </ScrollReveal>

      {/* Action Buttons */}
      <HeroActions />

      {/* Trust Signals */}
      <TrustSignals />

      {/* AI Providers Showcase */}
      <ScrollReveal direction="up" delay={1.0}>
        <div className="mb-20">
          <AIProvidersShowcase />
        </div>
      </ScrollReveal>

      {/* Enhanced Stats */}
      <ScrollReveal direction="up" delay={1.2}>
        <EnhancedStats
          title="Proven Results That Speak"
          subtitle="Join thousands of businesses transforming their content strategy with AI"
        />
      </ScrollReveal>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </div>
  );
});

export const EnhancedHeroSection = memo(function EnhancedHeroSection({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
      aria-label="AmplifyAI enhanced hero section"
    >
      {/* Animated Background */}
      <AnimatedBackground
        variant="hero"
        showParticles={true}
        showGrid={false}
      />

      {/* Hero Content */}
      <HeroContent />
    </section>
  );
});

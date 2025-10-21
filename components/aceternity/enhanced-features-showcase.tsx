"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  BarChart3,
  Brain,
  Clock,
  Globe,
  Palette,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Generation",
    description:
      "GPT-4 and Gemini AI models create engaging, brand-consistent content that converts.",
    color: "blue",
    badge: "AI-Powered",
    gradient: "from-blue-500/10 to-indigo-500/10",
    glowColor: "bg-blue-500/20",
  },
  {
    icon: Target,
    title: "Multi-Platform Optimization",
    description:
      "Content automatically optimized for LinkedIn, Twitter, Facebook, and Instagram formats.",
    color: "purple",
    badge: "Smart Optimization",
    gradient: "from-purple-500/10 to-pink-500/10",
    glowColor: "bg-purple-500/20",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description:
      "AI-powered posting times for maximum engagement based on audience behavior analysis.",
    color: "green",
    badge: "Automated",
    gradient: "from-green-500/10 to-emerald-500/10",
    glowColor: "bg-green-500/20",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Real-time engagement tracking with AI-powered insights and optimization suggestions.",
    color: "orange",
    badge: "Data-Driven",
    gradient: "from-orange-500/10 to-red-500/10",
    glowColor: "bg-orange-500/20",
  },
  {
    icon: Sparkles,
    title: "Brand Voice Consistency",
    description:
      "Maintain your unique brand voice across all content and platforms automatically.",
    color: "pink",
    badge: "Brand-Safe",
    gradient: "from-pink-500/10 to-rose-500/10",
    glowColor: "bg-pink-500/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Review, approve, and collaborate on content with team workflows and permissions.",
    color: "indigo",
    badge: "Team-Ready",
    gradient: "from-indigo-500/10 to-blue-500/10",
    glowColor: "bg-indigo-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with GDPR compliance and enterprise data protection.",
    color: "red",
    badge: "Secure",
    gradient: "from-red-500/10 to-orange-500/10",
    glowColor: "bg-red-500/20",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Multi-language support with cultural context for international campaigns.",
    color: "teal",
    badge: "Global",
    gradient: "from-teal-500/10 to-cyan-500/10",
    glowColor: "bg-teal-500/20",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Complete content workflows from brief to publish with approval processes.",
    color: "cyan",
    badge: "Automated",
    gradient: "from-cyan-500/10 to-blue-500/10",
    glowColor: "bg-cyan-500/20",
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-600 dark:text-blue-400",
      badge:
        "bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      glow: "shadow-blue-500/20",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/50",
      text: "text-purple-600 dark:text-purple-400",
      badge:
        "bg-purple-100/80 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      glow: "shadow-purple-500/20",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/50",
      text: "text-green-600 dark:text-green-400",
      badge:
        "bg-green-100/80 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
      glow: "shadow-green-500/20",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/50",
      text: "text-orange-600 dark:text-orange-400",
      badge:
        "bg-orange-100/80 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-800",
      glow: "shadow-orange-500/20",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900/50",
      text: "text-pink-600 dark:text-pink-400",
      badge:
        "bg-pink-100/80 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 border-pink-200 dark:border-pink-800",
      glow: "shadow-pink-500/20",
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900/50",
      text: "text-indigo-600 dark:text-indigo-400",
      badge:
        "bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      glow: "shadow-indigo-500/20",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/50",
      text: "text-red-600 dark:text-red-400",
      badge:
        "bg-red-100/80 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
      glow: "shadow-red-500/20",
    },
    teal: {
      bg: "bg-teal-100 dark:bg-teal-900/50",
      text: "text-teal-600 dark:text-teal-400",
      badge:
        "bg-teal-100/80 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300 border-teal-200 dark:border-teal-800",
      glow: "shadow-teal-500/20",
    },
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900/50",
      text: "text-cyan-600 dark:text-cyan-400",
      badge:
        "bg-cyan-100/80 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
      glow: "shadow-cyan-500/20",
    },
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

// Enhanced Feature Card Component
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const colorClasses = getColorClasses(feature.color);
  const Icon = feature.icon;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
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
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="h-full group"
    >
      <Card
        className={cn(
          "h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500",
          "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg",
          "border border-white/20 dark:border-gray-700/30",
          "overflow-hidden relative",
          "group-hover:border-white/40 dark:group-hover:border-gray-600/40",
          colorClasses.glow
        )}
      >
        {/* Animated Background Gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500",
            feature.gradient
          )}
        />

        {/* Glassmorphism Border Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <CardHeader className="relative z-10 p-8">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center relative",
                "bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-700/70",
                "border border-white/30 dark:border-gray-600/30",
                "shadow-lg group-hover:shadow-xl transition-all duration-300"
              )}
              whileHover={{
                rotate: [0, -5, 5, 0],
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
            >
              <Icon className={cn("w-8 h-8", colorClasses.text)} />

              {/* Icon Glow Effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg",
                  feature.glowColor
                )}
              />
            </motion.div>

            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-medium border backdrop-blur-sm transition-all duration-300",
                colorClasses.badge,
                "group-hover:scale-105"
              )}
            >
              {feature.badge}
            </Badge>
          </div>

          <CardTitle className="text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {feature.title}
          </CardTitle>

          <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {feature.description}
          </CardDescription>

          {/* Hover Line Effect */}
          <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </CardHeader>
      </Card>
    </motion.div>
  );
}

// Enhanced Stats Cards
function StatsCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3 },
      }}
      className={cn(
        "text-center p-8 rounded-3xl border border-white/20 dark:border-gray-700/30",
        "bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        "group relative overflow-hidden"
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="inline-flex"
        >
          <Icon className="w-10 h-10 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function EnhancedFeaturesShowcase() {
  const [isClient, setIsClient] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Enterprise Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                social media success
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skeleton loading cards */}
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50 bg-[size:32px_32px] opacity-30" />
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
              className="mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Enterprise Features
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              social media success
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Our AI-powered platform combines advanced content generation with
            enterprise-grade security and team collaboration features to scale
            your social media strategy.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Enhanced Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatsCard
            icon={Palette}
            title="150+ Templates"
            description="Industry-specific content templates for every use case"
            gradient="from-blue-500/10 to-purple-500/10"
            delay={0.1}
          />
          <StatsCard
            icon={Zap}
            title="Lightning Fast"
            description="Generate 30 posts in under 60 seconds with AI acceleration"
            gradient="from-purple-500/10 to-pink-500/10"
            delay={0.2}
          />
          <StatsCard
            icon={Shield}
            title="99.9% Uptime"
            description="Enterprise SLA with 24/7 monitoring and support"
            gradient="from-green-500/10 to-teal-500/10"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

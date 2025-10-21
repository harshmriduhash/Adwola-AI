"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap, Target, Users, Sparkles, TrendingUp, Clock } from "lucide-react";
import { memo } from "react";

import { CountingAnimation } from "@/components/ui/typing-animation";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  description: string;
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
}

const stats: StatItem[] = [
  {
    value: 95,
    suffix: "%",
    label: "Time Saved",
    sublabel: "On Content Creation",
    icon: Zap,
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
    description:
      "Reduce content creation time from hours to minutes with AI automation",
    trend: { direction: "up", percentage: 12 },
  },
  {
    value: 10,
    suffix: "x",
    label: "Content Output",
    sublabel: "Increase Volume",
    icon: Target,
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-pink-500/20",
    description: "Generate 10x more engaging content across all platforms",
    trend: { direction: "up", percentage: 23 },
  },
  {
    value: 1200,
    suffix: "+",
    label: "Happy Customers",
    sublabel: "Worldwide",
    icon: Users,
    color: "text-green-500",
    gradient: "from-green-500/20 to-emerald-500/20",
    description:
      "Trusted by growing businesses and marketing agencies globally",
    trend: { direction: "up", percentage: 18 },
  },
  {
    value: 24,
    suffix: "/7",
    label: "AI Availability",
    sublabel: "Always On",
    icon: Sparkles,
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-yellow-500/20",
    description: "Round-the-clock AI content generation and optimization",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    sublabel: "Reliability",
    icon: TrendingUp,
    color: "text-teal-500",
    gradient: "from-teal-500/20 to-cyan-500/20",
    description:
      "Enterprise-grade infrastructure ensuring consistent availability",
    trend: { direction: "up", percentage: 2 },
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Satisfaction",
    sublabel: "User Rating",
    icon: Clock,
    color: "text-indigo-500",
    gradient: "from-indigo-500/20 to-purple-500/20",
    description:
      "Exceptional user experience with industry-leading satisfaction scores",
    trend: { direction: "up", percentage: 8 },
  },
];

const TrendIndicator = memo(function TrendIndicator({
  trend,
}: {
  trend?: { direction: "up" | "down"; percentage: number };
}) {
  if (!trend) return null;

  return (
    <motion.div
      className="flex items-center space-x-1"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <motion.div
        className={cn(
          "w-0 h-0 border-l-[3px] border-r-[3px] border-l-transparent border-r-transparent",
          trend.direction === "up"
            ? "border-b-[6px] border-b-green-500"
            : "border-t-[6px] border-t-red-500"
        )}
        animate={{
          y: trend.direction === "up" ? [-1, 1, -1] : [1, -1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="text-xs font-medium text-green-600 dark:text-green-400">
        +{trend.percentage}%
      </span>
    </motion.div>
  );
});

const StatCard = memo(function StatCard({
  stat,
  index,
  isVisible,
}: {
  stat: StatItem;
  index: number;
  isVisible: boolean;
}) {
  const Icon = stat.icon;
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden",
        "rounded-2xl p-6 h-48",
        // Glassmorphism effect
        "bg-white/70 dark:bg-gray-900/70",
        "backdrop-blur-md border border-white/20 dark:border-gray-700/20",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        // Interactive states
        "cursor-pointer"
      )}
      role="region"
      aria-label={`${stat.label}: ${stat.description}`}
    >
      {/* Gradient background overlay */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          `bg-gradient-to-br ${stat.gradient}`
        )}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 30px ${stat.color
            .replace("text-", "")
            .replace("-500", "")}`,
          filter: "blur(20px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header with icon and trend */}
        <div className="flex items-start justify-between">
          <motion.div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
              "border border-white/40 dark:border-gray-700/40",
              "group-hover:scale-110 transition-transform duration-300"
            )}
            whileHover={!prefersReducedMotion ? { rotate: 5 } : undefined}
          >
            <Icon className={cn("w-6 h-6", stat.color)} />
          </motion.div>

          <TrendIndicator trend={stat.trend} />
        </div>

        {/* Main stat */}
        <div className="text-center space-y-1">
          <motion.div
            className={cn("text-4xl lg:text-5xl font-bold", stat.color)}
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{
              delay: index * 0.1 + 0.3,
              duration: 0.5,
              ease: "backOut",
            }}
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
          </motion.div>

          <div className="space-y-1">
            <div className="font-semibold text-gray-900 dark:text-white">
              {stat.label}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.sublabel}
            </div>
          </div>
        </div>

        {/* Description (shown on hover) */}
        <motion.div
          className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ height: 0 }}
          whileHover={{ height: "auto" }}
        >
          {stat.description}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
});

export const EnhancedStats = memo(function EnhancedStats({
  className,
  title = "Why Choose AmplifyAI?",
  subtitle = "See the difference AI-powered content creation makes for your business",
}: {
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section ref={ref} className={cn("relative py-20", className)}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Proven Results
          </span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-7xl mx-auto"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </motion.div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
});

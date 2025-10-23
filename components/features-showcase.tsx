"use client";

import { motion } from "framer-motion";
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
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-reveal";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Generation",
    description:
      "GPT-4 and Gemini AI models create engaging, brand-consistent content that converts.",
    color: "blue",
    badge: "AI-Powered",
  },
  {
    icon: Target,
    title: "Multi-Platform Optimization",
    description:
      "Content automatically optimized for LinkedIn, Twitter, Facebook, and Instagram formats.",
    color: "purple",
    badge: "Smart Optimization",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description:
      "AI-powered posting times for maximum engagement based on audience behavior analysis.",
    color: "green",
    badge: "Automated",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Real-time engagement tracking with AI-powered insights and optimization suggestions.",
    color: "orange",
    badge: "Data-Driven",
  },
  {
    icon: Sparkles,
    title: "Brand Voice Consistency",
    description:
      "Maintain your unique brand voice across all content and platforms automatically.",
    color: "pink",
    badge: "Brand-Safe",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Review, approve, and collaborate on content with team workflows and permissions.",
    color: "indigo",
    badge: "Team-Ready",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with GDPR compliance and enterprise data protection.",
    color: "red",
    badge: "Secure",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Multi-language support with cultural context for international campaigns.",
    color: "teal",
    badge: "Global",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Complete content workflows from brief to publish with approval processes.",
    color: "cyan",
    badge: "Automated",
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900",
      text: "text-purple-600 dark:text-purple-400",
      badge:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-600 dark:text-green-400",
      badge:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-600 dark:text-orange-400",
      badge:
        "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },
    pink: {
      bg: "bg-pink-100 dark:bg-pink-900",
      text: "text-pink-600 dark:text-pink-400",
      badge: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900",
      text: "text-indigo-600 dark:text-indigo-400",
      badge:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-600 dark:text-red-400",
      badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
    teal: {
      bg: "bg-teal-100 dark:bg-teal-900",
      text: "text-teal-600 dark:text-teal-400",
      badge: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
    },
    cyan: {
      bg: "bg-cyan-100 dark:bg-cyan-900",
      text: "text-cyan-600 dark:text-cyan-400",
      badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    },
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export function FeaturesShowcase() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal direction="up">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Enterprise Features
            </Badge>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                social media success
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform combines advanced content generation with
              enterprise-grade security and team collaboration features to scale
              your social media strategy.
            </p>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color);
              const Icon = feature.icon;

              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="h-full"
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm group overflow-hidden relative">
                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardHeader className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div
                            className={`w-14 h-14 ${colorClasses.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            whileHover={{ rotate: 5 }}
                          >
                            <Icon className={`w-7 h-7 ${colorClasses.text}`} />
                          </motion.div>
                          <Badge
                            variant="secondary"
                            className={`${colorClasses.badge} text-xs font-medium`}
                          >
                            {feature.badge}
                          </Badge>
                        </div>

                        <CardTitle className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </CardTitle>

                        <CardDescription className="text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        {/* Additional Features Row */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Palette className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">150+ Templates</h3>
              <p className="text-muted-foreground">
                Industry-specific content templates for every use case
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-8 h-8 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Generate 30 posts in under 60 seconds with AI acceleration
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-100 dark:border-green-800"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Shield className="w-8 h-8 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-muted-foreground">
                Enterprise SLA with 24/7 monitoring and support
              </p>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

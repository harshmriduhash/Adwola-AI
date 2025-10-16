"use client";

import { motion } from "framer-motion";
import { Shield, Users, Zap } from "lucide-react";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

interface StatItem {
  metric: string;
  label: string;
  description: string;
  iconName?: 'shield' | 'users' | 'zap';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'accent';
}

interface StatCardProps {
  stat: StatItem;
  index?: number;
  variant?: 'default' | 'compact' | 'featured';
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
}

export const StatCard = memo(function StatCard({
  stat,
  index = 0,
  variant = 'default',
  showIcon = false,
  animated = true,
  className,
}: StatCardProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'shield':
        return Shield;
      case 'users':
        return Users;
      case 'zap':
        return Zap;
      default:
        return null;
    }
  };
  
  const Icon = getIcon(stat.iconName);
  
  const getColorClasses = (color: StatItem['color'] = 'primary') => {
    const colorMap = {
      primary: 'text-blue-600 dark:text-blue-400',
      secondary: 'text-purple-600 dark:text-purple-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-orange-600 dark:text-orange-400',
      accent: 'text-pink-600 dark:text-pink-400',
    };
    return colorMap[color];
  };

  const content = (
    <div className={cn(
      "text-center group",
      variant === 'compact' && "p-4",
      variant === 'featured' && "p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300",
      className
    )}>
      {showIcon && Icon && (
        <div className="flex justify-center mb-3">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
            "border border-blue-200 dark:border-blue-800"
          )}>
            <Icon className={cn("w-6 h-6", getColorClasses(stat.color))} />
          </div>
        </div>
      )}
      
      <motion.div
        className={cn(
          "font-bold mb-2 transition-transform duration-200",
          variant === 'compact' ? "text-2xl lg:text-3xl" : "text-3xl lg:text-4xl",
          getColorClasses(stat.color),
          animated && "group-hover:scale-110"
        )}
        animate={animated ? { scale: [1, 1.05, 1] } : undefined}
        transition={animated ? { duration: 2, repeat: Infinity } : undefined}
      >
        {stat.metric}
      </motion.div>
      
      <div className={cn(
        "font-semibold text-gray-900 dark:text-white mb-1",
        variant === 'compact' ? "text-sm lg:text-base" : "text-base lg:text-lg"
      )}>
        {stat.label}
      </div>
      
      <div className={cn(
        "text-muted-foreground leading-relaxed",
        variant === 'compact' ? "text-xs lg:text-sm" : "text-sm lg:text-base"
      )}>
        {stat.description}
      </div>
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      {content}
    </ScrollReveal>
  );
});

interface StatsGridProps {
  stats: StatItem[];
  title?: string;
  subtitle?: string;
  badge?: {
    text: string;
    iconName?: 'shield' | 'users' | 'zap';
  };
  variant?: 'default' | 'compact' | 'featured';
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
  animated?: boolean;
  className?: string;
  sectionClassName?: string;
}

export const StatsGrid = memo(function StatsGrid({
  stats,
  title,
  subtitle,
  badge,
  variant = 'default',
  columns = 4,
  showIcons = false,
  animated = true,
  className,
  sectionClassName,
}: StatsGridProps) {
  const getBadgeIcon = (iconName?: string) => {
    switch (iconName) {
      case 'shield':
        return Shield;
      case 'users':
        return Users;
      case 'zap':
        return Zap;
      default:
        return Shield; // Default fallback
    }
  };
  
  const BadgeIcon = badge?.iconName ? getBadgeIcon(badge.iconName) : Shield;
  
  const getGridCols = () => {
    const colMap = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 lg:grid-cols-4',
    };
    return colMap[columns];
  };

  return (
    <section className={cn(
      "py-16 bg-white dark:bg-gray-900",
      variant === 'featured' && "border-y border-gray-100 dark:border-gray-800",
      sectionClassName
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || badge) && (
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              {badge && (
                <Badge variant="secondary" className="mb-4 px-4 py-2">
                  {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2" />}
                  {badge.text}
                </Badge>
              )}
              
              {title && (
                <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              
              {subtitle && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          </ScrollReveal>
        )}

        <div className={cn(
          "grid gap-8",
          getGridCols(),
          className
        )}>
          {stats && Array.isArray(stats) && stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              variant={variant}
              showIcon={showIcons}
              animated={animated}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

// Predefined stat sets for different sections
export const statSets = {
  // Main trust signals
  trustSignals: [
    {
      metric: "1200+",
      label: "Happy Customers",
      description: "Businesses trust AmplifyAI for their content needs",
      color: 'primary' as StatItem['color'],
    },
    {
      metric: "95%",
      label: "Time Saved",
      description: "Average time reduction in content creation",
      color: 'success' as StatItem['color'],
    },
    {
      metric: "4.9/5",
      label: "Customer Rating",
      description: "Based on 500+ verified reviews from customers like you",
      color: 'warning' as StatItem['color'],
    },
    {
      metric: "99.9%",
      label: "Uptime",
      description: "Enterprise-grade reliability and performance",
      color: 'accent' as StatItem['color'],
    },
  ] as StatItem[],

  // Performance metrics
  performance: [
    {
      metric: "300%",
      label: "Increase in content output",
      description: "Teams create 3x more content with AI assistance",
      color: 'success' as StatItem['color'],
    },
    {
      metric: "85%",
      label: "Reduction in content costs",
      description: "Lower operational costs with automated workflows",
      color: 'primary' as StatItem['color'],
    },
    {
      metric: "4.2x",
      label: "More engagement per post",
      description: "AI-optimized content performs significantly better",
      color: 'accent' as StatItem['color'],
    },
  ] as StatItem[],

  // Quick wins
  quickWins: [
    {
      metric: "6 min",
      label: "Average setup time",
      description: "From sign-up to first content generation",
      color: 'primary' as StatItem['color'],
    },
    {
      metric: "24/7",
      label: "AI availability",
      description: "Create content anytime, anywhere",
      color: 'success' as StatItem['color'],
    },
    {
      metric: "5+",
      label: "Platforms supported",
      description: "LinkedIn, Twitter, Facebook, Instagram, and more",
      color: 'accent' as StatItem['color'],
    },
  ] as StatItem[],
};
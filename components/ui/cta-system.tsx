"use client";

import { ArrowRight, Play, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

// CTA button variants with consistent styling
interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "lg";
  iconName?: "sparkles" | "arrow-right" | "play";
  iconPosition?: "left" | "right";
  animation?: "glow" | "slide" | "bounce";
  className?: string;
  onClick?: () => void;
}

export const CTAButton = memo(function CTAButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  iconName,
  iconPosition = "right",
  animation = "glow",
  className,
  onClick,
}: CTAButtonProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "sparkles":
        return Sparkles;
      case "arrow-right":
        return ArrowRight;
      case "play":
        return Play;
      default:
        return null;
    }
  };

  const Icon = getIcon(iconName);
  return (
    <AnimatedButton
      variant={variant === "primary" ? "gradient" : variant}
      size={size}
      animation={animation}
      className={cn(
        variant === "primary" && "min-w-[200px] shadow-lg",
        variant === "secondary" && "min-w-[160px]",
        className
      )}
      asChild
    >
      <Link href={href} onClick={onClick}>
        {Icon && iconPosition === "left" && <Icon className="mr-2 w-4 h-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="ml-2 w-4 h-4" />}
      </Link>
    </AnimatedButton>
  );
});

// Predefined CTA sets for different sections
export const ctaSets = {
  // Primary action - for hero and main conversion points
  primary: {
    main: {
      href: "/auth/sign-up",
      text: "Start Creating Now",
      iconName: "sparkles" as const,
      iconPosition: "left" as const,
      variant: "primary" as const,
    },
    secondary: {
      href: "/campaigns",
      text: "Try Demo",
      iconName: "play" as const,
      iconPosition: "left" as const,
      variant: "outline" as const,
    },
  },

  // Secondary actions - for feature sections
  feature: {
    getStarted: {
      href: "/auth/sign-up",
      text: "Get Started Free",
      iconName: "arrow-right" as const,
      variant: "primary" as const,
    },
    learnMore: {
      href: "#features",
      text: "Learn More",
      variant: "ghost" as const,
    },
  },

  // Footer/final conversion
  final: {
    main: {
      href: "/auth/sign-up",
      text: "Start Your Free Trial",
      iconName: "sparkles" as const,
      variant: "primary" as const,
    },
    demo: {
      href: "/campaigns",
      text: "Try Demo",
      iconName: "play" as const,
      variant: "outline" as const,
    },
  },
} as const;

// CTA section component for standalone conversion sections
interface CTASectionProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    iconName?: "users" | "zap" | "sparkles";
  };
  primaryCTA: {
    href: string;
    text: string;
    iconName?: "sparkles" | "arrow-right" | "play";
  };
  secondaryCTA?: {
    href: string;
    text: string;
    iconName?: "sparkles" | "arrow-right" | "play";
  };
  trustSignals?: string[];
  backgroundVariant?: "default" | "gradient" | "primary" | "accent";
  className?: string;
}

export const CTASection = memo(function CTASection({
  title,
  subtitle,
  badge,
  primaryCTA,
  secondaryCTA,
  trustSignals,
  backgroundVariant = "gradient",
  className,
}: CTASectionProps) {
  const getBadgeIcon = (iconName?: string) => {
    switch (iconName) {
      case "users":
        return Users;
      case "zap":
        return Zap;
      case "sparkles":
        return Sparkles;
      default:
        return Users; // Default fallback
    }
  };

  const BadgeIcon = badge?.iconName ? getBadgeIcon(badge.iconName) : null;

  const getPrimaryIcon = (iconName?: string) => {
    switch (iconName) {
      case "sparkles":
        return Sparkles;
      case "arrow-right":
        return ArrowRight;
      case "play":
        return Play;
      default:
        return null;
    }
  };

  const PrimaryIcon = primaryCTA.iconName
    ? getPrimaryIcon(primaryCTA.iconName)
    : null;
  const SecondaryIcon = secondaryCTA?.iconName
    ? getPrimaryIcon(secondaryCTA.iconName)
    : null;

  const getBackgroundClasses = () => {
    const variants = {
      default: "bg-white dark:bg-gray-900",
      gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
      primary: "bg-gradient-to-r from-blue-600 to-purple-600",
      accent: "bg-gradient-to-r from-purple-600 to-pink-600",
    };
    return variants[backgroundVariant];
  };

  const isGradientBg = backgroundVariant !== "default";
  const textColor = isGradientBg
    ? "text-white"
    : "text-gray-900 dark:text-white";
  const subtitleColor = isGradientBg
    ? "text-blue-100"
    : "text-muted-foreground";

  return (
    <section
      className={cn(
        "py-24 relative overflow-hidden",
        getBackgroundClasses(),
        className
      )}
    >
      {isGradientBg && <div className="absolute inset-0 bg-black/20" />}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up">
          {badge && (
            <Badge
              variant="secondary"
              className={cn(
                "mb-6 px-4 py-2",
                isGradientBg && "bg-white/20 text-white border-white/30"
              )}
            >
              {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2" />}
              {badge.text}
            </Badge>
          )}
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              textColor
            )}
          >
            {title}
          </h2>
        </ScrollReveal>

        {subtitle && (
          <ScrollReveal direction="up" delay={0.4}>
            <p className={cn("text-xl mb-8 max-w-2xl mx-auto", subtitleColor)}>
              {subtitle}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal direction="up" delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <AnimatedButton
              variant={isGradientBg ? "outline" : "gradient"}
              size="lg"
              animation="glow"
              className={cn(
                "min-w-[200px]",
                isGradientBg &&
                  "bg-white text-blue-600 hover:bg-blue-50 border-white"
              )}
              asChild
            >
              <Link href={primaryCTA.href}>
                {PrimaryIcon && <PrimaryIcon className="mr-2 w-5 h-5" />}
                {primaryCTA.text}
              </Link>
            </AnimatedButton>

            {secondaryCTA && (
              <AnimatedButton
                variant="ghost"
                size="lg"
                animation="slide"
                className={cn(
                  "min-w-[160px]",
                  isGradientBg
                    ? "text-white hover:bg-white/10 border border-white/30"
                    : "text-gray-700 dark:text-gray-300"
                )}
                asChild
              >
                <Link href={secondaryCTA.href}>
                  {SecondaryIcon && <SecondaryIcon className="mr-2 w-4 h-4" />}
                  {secondaryCTA.text}
                </Link>
              </AnimatedButton>
            )}
          </div>
        </ScrollReveal>

        {trustSignals &&
          Array.isArray(trustSignals) &&
          trustSignals.length > 0 && (
            <ScrollReveal direction="up" delay={0.8}>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {trustSignals.map((signal) => (
                  <div
                    key={signal}
                    className={cn(
                      "flex items-center",
                      isGradientBg ? "text-blue-100" : "text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        isGradientBg ? "bg-green-400" : "bg-green-500"
                      )}
                    />
                    {signal}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}
      </div>
    </section>
  );
});

// Inline CTA component for use within other sections
interface InlineCTAProps {
  primaryCTA: {
    href: string;
    text: string;
    iconName?: "sparkles" | "arrow-right" | "play";
  };
  secondaryCTA?: {
    href: string;
    text: string;
    iconName?: "sparkles" | "arrow-right" | "play";
  };
  layout?: "horizontal" | "vertical";
  size?: "sm" | "lg";
  className?: string;
}

export const InlineCTA = memo(function InlineCTA({
  primaryCTA,
  secondaryCTA,
  layout = "horizontal",
  size = "lg",
  className,
}: InlineCTAProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "sparkles":
        return Sparkles;
      case "arrow-right":
        return ArrowRight;
      case "play":
        return Play;
      default:
        return null;
    }
  };

  const PrimaryIcon = getIcon(primaryCTA.iconName);
  const SecondaryIcon = getIcon(secondaryCTA?.iconName);

  return (
    <div
      className={cn(
        "flex gap-4 justify-center items-center",
        layout === "vertical" && "flex-col",
        className
      )}
    >
      <AnimatedButton variant="gradient" size={size} animation="glow" asChild>
        <Link href={primaryCTA.href}>
          {PrimaryIcon && <PrimaryIcon className="mr-2 w-4 h-4" />}
          {primaryCTA.text}
        </Link>
      </AnimatedButton>

      {secondaryCTA && (
        <AnimatedButton variant="outline" size={size} animation="slide" asChild>
          <Link href={secondaryCTA.href}>
            {SecondaryIcon && <SecondaryIcon className="mr-2 w-4 h-4" />}
            {secondaryCTA.text}
          </Link>
        </AnimatedButton>
      )}
    </div>
  );
});

// Predefined CTA sections for common use cases
export const CTASections = {
  // Final conversion section
  final: (
    <CTASection
      title="Ready to 10x your content output?"
      subtitle="Join the AI content revolution today. Create professional campaigns in minutes, save 95% of your time, and watch your engagement soar."
      badge={{
        text: "Join 1200+ Successful Brands",
        iconName: "users",
      }}
      primaryCTA={{
        href: "/auth/sign-up",
        text: "Start Free Trial",
        iconName: "sparkles",
      }}
      secondaryCTA={{
        href: "/campaigns",
        text: "Try Demo",
        iconName: "play",
      }}
      trustSignals={[
        "No credit card required",
        "Setup in 60 seconds",
        "Cancel anytime",
      ]}
      backgroundVariant="gradient"
    />
  ),

  // Feature section CTA
  feature: (
    <CTASection
      title="Experience the power of AI content creation"
      subtitle="Join thousands of businesses already saving time and improving their content quality with AmplifyAI."
      primaryCTA={{
        href: "/auth/sign-up",
        text: "Get Started Free",
        iconName: "arrow-right",
      }}
      secondaryCTA={{
        href: "#features",
        text: "Explore Features",
      }}
      backgroundVariant="default"
    />
  ),

  // Urgency section
  urgency: (
    <CTASection
      title="Get 50% off your first 3 months"
      subtitle="Join before the end of this month and save big. Over 200 businesses signed up this week alone."
      badge={{
        text: "Limited Time Offer",
        iconName: "zap",
      }}
      primaryCTA={{
        href: "/auth/sign-up",
        text: "Claim 50% Discount",
        iconName: "arrow-right",
      }}
      trustSignals={["Offer expires in 6 days", "No credit card required"]}
      backgroundVariant="accent"
    />
  ),
} as const;

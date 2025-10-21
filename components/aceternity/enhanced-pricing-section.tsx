"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Check,
  Crown,
  HeadphonesIcon,
  Infinity,
  Rocket,
  Shield,
  Star,
  X,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: { monthly: 0, annually: 0 },
    icon: Zap,
    color: "gray",
    gradient: "from-gray-400 to-gray-600",
    bgGradient:
      "from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50",
    features: [
      { name: "5 posts per month", included: true, highlight: false },
      { name: "1 brand", included: true, highlight: false },
      { name: "Basic AI content generation", included: true, highlight: false },
      { name: "Standard templates", included: true, highlight: false },
      { name: "Community support", included: true, highlight: false },
      { name: "Multi-platform posting", included: false, highlight: false },
      { name: "Analytics dashboard", included: false, highlight: false },
      { name: "Team collaboration", included: false, highlight: false },
      { name: "Priority support", included: false, highlight: false },
    ],
    cta: "Start Free",
    href: "/auth/sign-up",
    savings: null,
  },
  {
    name: "Pro",
    description: "Most popular for growing businesses",
    price: { monthly: 29, annually: 25 },
    icon: Star,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient:
      "from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20",
    popular: true,
    features: [
      { name: "100 posts per month", included: true, highlight: true },
      { name: "5 brands", included: true, highlight: false },
      {
        name: "Advanced AI content generation",
        included: true,
        highlight: true,
      },
      { name: "Premium templates", included: true, highlight: false },
      { name: "Multi-platform posting", included: true, highlight: true },
      { name: "Analytics dashboard", included: true, highlight: true },
      { name: "Smart scheduling", included: true, highlight: false },
      { name: "Email support", included: true, highlight: false },
      { name: "Team collaboration", included: false, highlight: false },
    ],
    cta: "Start Pro Trial",
    href: "/auth/sign-up?plan=pro",
    savings: "Save $48/year",
  },
  {
    name: "Agency",
    description: "For teams and agencies",
    price: { monthly: 99, annually: 85 },
    icon: Crown,
    color: "purple",
    gradient: "from-purple-500 to-pink-600",
    bgGradient:
      "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20",
    features: [
      { name: "Unlimited posts", included: true, highlight: true },
      { name: "Unlimited brands", included: true, highlight: true },
      {
        name: "Advanced AI content generation",
        included: true,
        highlight: false,
      },
      { name: "All premium templates", included: true, highlight: false },
      { name: "Multi-platform posting", included: true, highlight: false },
      { name: "Advanced analytics", included: true, highlight: true },
      { name: "Team collaboration", included: true, highlight: true },
      { name: "Priority support", included: true, highlight: true },
      { name: "Custom integrations", included: true, highlight: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    savings: "Save $168/year",
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption",
    color: "blue",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock expert assistance",
    color: "green",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast content delivery worldwide",
    color: "purple",
  },
  {
    icon: Infinity,
    title: "99.9% Uptime",
    description: "Enterprise-grade reliability guarantee",
    color: "orange",
  },
];

// Enhanced Pricing Card Component
function PricingCard({
  plan,
  index,
  isAnnual,
  isComparing,
  onCompare,
}: {
  plan: (typeof pricingPlans)[0];
  index: number;
  isAnnual: boolean;
  isComparing: boolean;
  onCompare: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const Icon = plan.icon;
  const price = isAnnual ? plan.price.annually : plan.price.monthly;

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
      whileHover={{
        y: plan.popular ? -16 : -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="h-full relative group"
      onHoverStart={onCompare}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </Badge>
        </motion.div>
      )}

      <Card
        className={cn(
          "h-full shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden",
          "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg",
          "border-white/20 dark:border-gray-700/30",
          plan.popular && "ring-2 ring-blue-500/20 border-blue-500/30",
          isComparing && "ring-2 ring-purple-500/30 scale-105"
        )}
      >
        {/* Background Gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            `bg-gradient-to-br ${plan.bgGradient}`
          )}
        />

        {/* Glow Effect */}
        {plan.popular && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        )}

        {/* Header */}
        <CardHeader className="relative pb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                `bg-gradient-to-r ${plan.gradient} text-white`
              )}
              whileHover={{
                rotate: [0, -5, 5, 0],
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
            >
              <Icon className="w-8 h-8" />
            </motion.div>

            {plan.name === "Agency" && (
              <Badge
                variant="secondary"
                className="bg-purple-100/80 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 backdrop-blur-sm"
              >
                Enterprise
              </Badge>
            )}
          </div>

          <CardTitle className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {plan.name}
          </CardTitle>
          <CardDescription className="text-base mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {plan.description}
          </CardDescription>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <motion.span
                className="text-5xl font-bold"
                key={`${price}-${isAnnual}`}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${price}
              </motion.span>
              <span className="text-muted-foreground">
                {price === 0 ? "forever" : "/month"}
              </span>
            </div>

            <AnimatePresence>
              {isAnnual && price > 0 && plan.savings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <p className="text-sm text-muted-foreground">
                    Billed annually (${price * 12}/year)
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                  >
                    {plan.savings}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="relative space-y-6">
          {/* CTA Button */}
          <AnimatedButton
            variant={plan.popular ? "gradient" : "outline"}
            className="w-full"
            animation={plan.popular ? "glow" : "scale"}
            asChild
          >
            <Link href={plan.href}>
              {plan.cta}
              {plan.popular && <Sparkles className="w-4 h-4 ml-2" />}
            </Link>
          </AnimatedButton>

          {/* Features List */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              What&apos;s included:
            </h4>
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <motion.li
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: index * 0.2 + featureIndex * 0.05 + 0.5,
                  }}
                  className="flex items-center space-x-3 group/feature"
                  whileHover={{ x: 4 }}
                >
                  {feature.included ? (
                    <motion.div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                        feature.highlight
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-green-500"
                      )}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-gray-500" />
                    </div>
                  )}
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      feature.included
                        ? "text-gray-700 dark:text-gray-300 group-hover/feature:text-gray-900 dark:group-hover/feature:text-gray-100"
                        : "text-gray-500 dark:text-gray-500",
                      feature.highlight && "font-semibold"
                    )}
                  >
                    {feature.name}
                    {feature.highlight && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block ml-1"
                      >
                        ✨
                      </motion.span>
                    )}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Hover Effect */}
          <div
            className={cn(
              "absolute bottom-0 left-6 right-6 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500",
              `bg-gradient-to-r ${plan.gradient}`
            )}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function EnhancedPricingSection() {
  const [isClient, setIsClient] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [comparingPlan, setComparingPlan] = useState<string | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section
        id="pricing"
        className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <Rocket className="w-4 h-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose the perfect plan for you
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/50 bg-[size:32px_32px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Simple Pricing
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Choose the perfect{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              plan for you
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Start free and scale as you grow. All plans include our core AI
            features with enterprise-grade security.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center space-x-4 mb-12"
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !isAnnual
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              )}
            >
              Monthly
            </span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative w-16 h-8 rounded-full transition-all duration-300 shadow-lg",
                isAnnual
                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                  : "bg-gray-300 dark:bg-gray-600"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </motion.button>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isAnnual
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              )}
            >
              Annual
            </span>
            <AnimatePresence>
              {isAnnual && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                  >
                    Save up to 20%
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              isAnnual={isAnnual}
              isComparing={comparingPlan === plan.name}
              onCompare={() => setComparingPlan(plan.name)}
            />
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className={cn(
                  "text-center p-6 rounded-2xl border transition-all duration-300 group",
                  "bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg",
                  "border-white/20 dark:border-gray-700/30",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex"
                >
                  <Icon
                    className={cn(
                      "w-10 h-10 mx-auto mb-4",
                      feature.color === "blue" && "text-blue-600",
                      feature.color === "green" && "text-green-600",
                      feature.color === "purple" && "text-purple-600",
                      feature.color === "orange" && "text-orange-600"
                    )}
                  />
                </motion.div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

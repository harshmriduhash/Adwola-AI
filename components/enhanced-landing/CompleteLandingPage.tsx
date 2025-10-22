"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  Wand2,
  TrendingUp,
  Shield,
  Clock,
  Award,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Zap,
} from "lucide-react";
import { AdwolaFooter } from "./AdwolaFooter";

interface FAQItem {
  question: string;
  answer: string;
}

interface StatItem {
  number: string;
  description: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

interface MetricItem {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonStyle: string;
}

export default function CompleteLandingPage() {
  const [selectedProvider, setSelectedProvider] = useState<"openai" | "vertex">(
    "openai"
  );
  const [selectedPlatform, setSelectedPlatform] = useState<
    "linkedin" | "twitter" | "facebook" | "instagram"
  >("linkedin");
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);

  // Demo data for AI Content Studio
  const demoTopics = [
    {
      input: "Launch our new eco-friendly product line",
      openai: {
        linkedin:
          "🌱 Exciting news! We're revolutionizing sustainability with our new eco-friendly product line. Join us in making a positive impact on our planet while enjoying premium quality. What sustainable changes are you making in your life? #Sustainability #EcoFriendly #Innovation",
        twitter:
          "🌍 Big announcement! Our new eco-friendly line is here. Premium quality meets sustainability. What's your favorite eco-swap? #EcoFriendly #Sustainable #GreenLiving",
        facebook:
          "We're thrilled to introduce our new eco-friendly product line! 🌱 After months of research and development, we've created products that don't compromise on quality while being kind to our planet. Share this post to spread awareness about sustainable living!",
        instagram:
          "🌿 NEW LAUNCH ALERT 🌿 Our eco-friendly collection is finally here! Swipe to see how we're making sustainability stylish and accessible. Tag a friend who loves eco-conscious products! ✨ #EcoFriendly #Sustainable #NewLaunch #GreenLiving",
      },
      vertex: {
        linkedin:
          "🌱 Proud to unveil our latest innovation: a comprehensive eco-friendly product line designed for conscious consumers. Our commitment to sustainability drives every decision we make. How is your organization contributing to environmental responsibility? #CorporateSustainability #GreenBusiness",
        twitter:
          "🌿 Innovation meets responsibility. Our new eco-friendly line proves that sustainable choices don't mean sacrificing quality. Join the movement! #SustainableBusiness #EcoInnovation",
        facebook:
          "Today marks a significant milestone in our sustainability journey! 🌍 Our new eco-friendly product line represents our commitment to creating positive change. Every purchase supports environmental initiatives. What sustainable practices inspire you most?",
        instagram:
          "✨ SUSTAINABLE LUXURY ✨ Introducing our eco-friendly collection where style meets responsibility. Every product tells a story of conscious creation. Which piece speaks to you? 🌱 #SustainableLuxury #EcoChic #ConsciousLiving",
      },
    },
  ];

  const metrics: MetricItem[] = [
    {
      title: "Engagement Boost",
      value: "250%",
      trend: "+127% from last month",
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Creation Speed",
      value: "15x",
      trend: "From hours to minutes",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Time Saved",
      value: "24hrs",
      trend: "Per week average",
      icon: <Clock className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "ROI Increase",
      value: "340%",
      trend: "Average customer ROI",
      icon: <Award className="w-8 h-8 text-orange-500" />,
    },
  ];

  const features: FeatureItem[] = [
    {
      icon: <Brain className="w-12 h-12 text-blue-500" />,
      title: "Dual AI Powerhouse",
      description:
        "Choose between OpenAI GPT-4 and Google Vertex AI for the perfect content tone and style",
      badge: "NEW",
    },
    {
      icon: <Wand2 className="w-12 h-12 text-purple-500" />,
      title: "One-Click Generation",
      description:
        "Transform your ideas into engaging posts across all major social platforms instantly",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: "Performance Analytics",
      description:
        "Track engagement, optimize content, and maximize your social media ROI with real-time insights",
    },
    {
      icon: <Shield className="w-12 h-12 text-red-500" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with SOC 2 compliance, ensuring your content and data stay protected",
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: isYearly ? "$25" : "$29",
      period: "/month",
      description: "Perfect for individuals and small teams",
      features: [
        "100 AI-generated posts per month",
        "5 social media platforms",
        "Basic analytics dashboard",
        "Email support",
        "Content templates library",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      name: "Professional",
      price: isYearly ? "$83" : "$99",
      period: "/month",
      description: "For growing businesses and agencies",
      features: [
        "Unlimited AI-generated posts",
        "All social media platforms",
        "Advanced analytics & insights",
        "Priority support",
        "Custom content templates",
        "Team collaboration tools",
        "Brand voice customization",
      ],
      isPopular: true,
      buttonText: "Start Free Trial",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Professional",
        "Custom AI model training",
        "Dedicated account manager",
        "99.9% SLA guarantee",
        "Single sign-on (SSO)",
        "Custom integrations",
        "White-label solutions",
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gray-600 text-white hover:bg-gray-700",
    },
  ];

  const stats: StatItem[] = [
    {
      number: "10,000+",
      description:
        "Active creators using Adwola to transform their social media presence and drive engagement",
    },
    {
      number: "2.5M+",
      description:
        "Posts generated and published across all major social media platforms worldwide",
    },
    {
      number: "98.7%",
      description:
        "Customer satisfaction rate based on independent surveys and product reviews",
    },
    {
      number: "50+",
      description:
        "Countries where Adwola is actively helping businesses grow their social presence",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "How does Adwola's dual AI system work?",
      answer:
        "Adwola integrates both OpenAI GPT-4 and Google Vertex AI, allowing you to choose the best AI model for your content needs. OpenAI excels at creative, engaging content, while Vertex AI is perfect for professional, data-driven posts.",
    },
    {
      question: "Can I try Adwola before committing to a plan?",
      answer:
        "Absolutely! We offer a 14-day free trial with full access to our Professional plan features. No credit card required to start your trial.",
    },
    {
      question: "Which social media platforms does Adwola support?",
      answer:
        "Adwola supports all major platforms including LinkedIn, Twitter, Facebook, Instagram, TikTok, YouTube, and Pinterest. We're constantly adding new platforms based on user demand.",
    },
    {
      question: "Is my content and data secure with Adwola?",
      answer:
        "Yes, security is our top priority. We're SOC 2 certified with bank-level encryption, and we never store or share your content. All data is processed securely and deleted after generation.",
    },
    {
      question: "Can I customize the AI-generated content?",
      answer:
        "Definitely! You can edit, refine, and customize all generated content. Adwola also learns your brand voice over time to create more personalized content that matches your style.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer email support for all plans, priority support for Professional users, and dedicated account management for Enterprise customers. Our team typically responds within 4 hours during business days.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemoIndex((prev) => (prev + 1) % demoTopics.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [demoTopics.length]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const currentDemo = demoTopics[currentDemoIndex];
  const currentContent = currentDemo[selectedProvider][selectedPlatform];

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold">Adwola</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#resources"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Resources
              </a>
              <a
                href="#company"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Company
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main id="main-content">
        <section className="relative min-h-screen bg-white pt-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8">
                {/* Trust Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-700">
                    Trusted by 10,000+ creators worldwide
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl lg:text-6xl font-black leading-none">
                  Create{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    VIRAL
                  </span>{" "}
                  Content
                </h1>

                {/* Subheading */}
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Transform ideas into engaging posts with AI power in seconds,
                  not hours. Join thousands of creators maximizing their social
                  media impact.
                </p>

                {/* Pricing Teaser */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-orange-700">
                        Launch Special - 50% OFF
                      </p>
                      <p className="text-2xl font-bold text-orange-900">
                        $29{" "}
                        <span className="text-sm text-gray-600">/month</span>
                      </p>
                    </div>
                    <div className="text-orange-600">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="gradient-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    🚀 Start Free 14-Day Trial
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                    Watch 2-Min Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-green-500" />
                    Enterprise Security
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-blue-500" />
                    99.9% Uptime
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-purple-500" />
                    SOC 2 Certified
                  </div>
                </div>
              </div>

              {/* Right Side - AI Content Studio Demo */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      AI Content Studio
                    </h3>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-green-700">
                        Live Demo
                      </span>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content Brief
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <p className="text-gray-900">{currentDemo.input}</p>
                    </div>
                  </div>

                  {/* AI Provider Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose AI Provider
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedProvider("openai")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedProvider === "openai"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="text-2xl mb-2">🧠</div>
                        <div className="text-sm font-bold text-gray-900">
                          OpenAI GPT-4
                        </div>
                        <div className="text-xs text-gray-600">
                          Creative & Engaging
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedProvider("vertex")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedProvider === "vertex"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-sm font-bold text-gray-900">
                          Vertex AI
                        </div>
                        <div className="text-xs text-gray-600">
                          Professional & Strategic
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Platform Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Target Platform
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(
                        [
                          "linkedin",
                          "twitter",
                          "facebook",
                          "instagram",
                        ] as const
                      ).map((platform) => (
                        <button
                          key={platform}
                          onClick={() => setSelectedPlatform(platform)}
                          className={`p-3 rounded-lg border transition-all ${
                            selectedPlatform === platform
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-sm font-medium capitalize">
                            {platform}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generated Content */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        Generated Content
                      </h4>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-900 leading-relaxed text-sm mb-4">
                      {currentContent}
                    </p>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          94%
                        </div>
                        <div className="text-xs text-gray-600">
                          Engagement Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          127K
                        </div>
                        <div className="text-xs text-gray-600">Est. Reach</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          8.7%
                        </div>
                        <div className="text-xs text-gray-600">Click Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                      {isGenerating ? "Generating..." : "Regenerate"}
                    </button>
                    <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Proven Results That Speak Volumes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join thousands of content creators who&apos;ve transformed their
                social media presence with measurable results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    {metric.icon}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {metric.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        {metric.title}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {metric.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Content Creation Reimagined
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Powerful AI-driven features designed to elevate your social
                media strategy and maximize engagement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  {feature.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {feature.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl inline-block">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose the plan that suits your needs
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Pick a plan that suits your needs and get started instantly.
              </p>

              {/* Monthly/Yearly Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    !isYearly
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    isYearly
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Yearly
                  <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Save 30%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative bg-gray-100 rounded-xl p-8 ${
                    tier.isPopular ? "ring-2 ring-blue-500 scale-105" : ""
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tier.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      <span className="text-lg text-gray-600">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-gray-600">{tier.description}</p>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${tier.buttonStyle}`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section with Purple Gradient */}
        <section className="py-20 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by content creators all over the world
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-16">
              We are a team of experienced AI experts and content strategists
              dedicated to helping creators and businesses maximize their social
              media impact through intelligent automation.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-5xl font-bold text-white mb-4">
                    {stat.number}
                  </div>
                  <p className="text-purple-100 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently asked questions
              </h2>
              <p className="text-gray-600">
                We are here to help you with any questions you may have. If you
                don&apos;t find what you need, please contact us at{" "}
                <a
                  href="mailto:support@adwola.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  support@adwola.com
                </a>
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      {expandedFAQ === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <AdwolaFooter variant="full" showNewsletter={true} />
      </main>
    </div>
  );
}

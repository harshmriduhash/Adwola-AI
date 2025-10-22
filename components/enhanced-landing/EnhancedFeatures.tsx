"use client";

import React, { useState } from "react";
import {
  Brain,
  Globe,
  Calendar,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function EnhancedFeatures() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Dual AI Powerhouse",
      description:
        "Harness the combined intelligence of OpenAI GPT-4 and Vertex AI for unmatched content quality",
      icon: Brain,
      gradient: "from-blue-500 to-purple-600",
      badge: "NEW",
      badgeColor: "bg-blue-500",
      preview:
        "Switch between AI providers instantly for optimized results. GPT-4 excels at creative writing while Vertex AI provides strategic insights.",
      benefits: [
        "Intelligent provider selection",
        "Automatic failover",
        "Cost optimization",
        "Performance comparison",
      ],
    },
    {
      title: "Multi-Platform Mastery",
      description:
        "Optimize content automatically for LinkedIn, Twitter, Facebook, and Instagram with platform-specific strategies",
      icon: Globe,
      gradient: "from-green-500 to-teal-500",
      badge: "POPULAR",
      badgeColor: "bg-green-500",
      preview:
        "Each platform has unique algorithms and audience preferences. Our AI adapts your message for maximum impact across all channels.",
      benefits: [
        "Platform-specific optimization",
        "Character limit handling",
        "Hashtag strategies",
        "Audience targeting",
      ],
    },
    {
      title: "Smart Scheduling",
      description:
        "AI-powered scheduling that finds optimal posting times and automates your content calendar",
      icon: Calendar,
      gradient: "from-orange-500 to-red-500",
      badge: "ESSENTIAL",
      badgeColor: "bg-orange-500",
      preview:
        "Never miss the perfect posting moment. Our AI analyzes your audience activity patterns to schedule posts when engagement peaks.",
      benefits: [
        "Optimal timing analysis",
        "Automated publishing",
        "Content calendar",
        "Timezone optimization",
      ],
    },
    {
      title: "Performance Analytics",
      description:
        "Deep insights and real-time analytics to track performance and optimize your content strategy",
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-500",
      badge: "ADVANCED",
      badgeColor: "bg-purple-500",
      preview:
        "Track engagement, reach, and conversion metrics across all platforms. Get AI-powered recommendations for improvement.",
      benefits: [
        "Real-time metrics",
        "Performance insights",
        "AI recommendations",
        "ROI tracking",
      ],
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">
              Powered by Dual AI
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Content Creation{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI technology that transforms how you create,
            optimize, and publish content across all social media platforms
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Background Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span
                  className={`${feature.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}
                >
                  {feature.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} p-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                {/* Animated glow effect */}
                <div
                  className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-30 blur-lg group-hover:blur-xl transition-all duration-300`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Preview Content - Shows on Hover */}
                <div
                  className={`transition-all duration-500 ${
                    hoveredFeature === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div
                    className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-l-4 border-gradient-to-b ${feature.gradient}`}
                  >
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {feature.preview}
                    </p>

                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}
                          ></div>
                          <span className="text-gray-700 text-sm font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learn More Button */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    className={`flex items-center space-x-2 text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text font-semibold group-hover:scale-105 transition-transform duration-300`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-xl`}
                ></div>
              </div>

              {/* Bottom shine effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Explore All Features</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: calc(var(--animation-order, 0) * 0.1s);
        }

        @media (prefers-reduced-motion: reduce) {
          .group {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

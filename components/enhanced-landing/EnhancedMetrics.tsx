"use client";

import React from 'react';
import { TrendingUp, Zap, Clock, DollarSign } from 'lucide-react';

export default function EnhancedMetrics() {
  const metrics = [
    {
      title: "Average Engagement Boost",
      value: "250%",
      change: "+47%",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
      description: "Higher engagement across all platforms"
    },
    {
      title: "Content Creation Speed",
      value: "15x",
      change: "+1,400%",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      description: "Faster than traditional methods"
    },
    {
      title: "Time Saved Weekly",
      value: "24hrs",
      change: "+89%",
      icon: Clock,
      gradient: "from-green-500 to-emerald-500",
      description: "More time for strategic planning"
    },
    {
      title: "ROI Improvement",
      value: "340%",
      change: "+156%",
      icon: DollarSign,
      gradient: "from-orange-500 to-red-500",
      description: "Better return on marketing investment"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Results That Speak for Themselves
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who&apos;ve transformed their content strategy with AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon with gradient background */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.gradient} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-full h-full text-white" />
                </div>
                {/* Animated glow effect */}
                <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.gradient} opacity-50 blur-lg group-hover:blur-xl transition-all duration-300`}></div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {metric.title}
                </h3>
                
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                    {metric.value}
                  </span>
                  <span className="text-green-600 font-semibold text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {metric.change}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {metric.description}
                </p>
              </div>

              {/* Hover animation elements */}
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${metric.gradient} opacity-10 blur-xl`}></div>
              </div>
              
              {/* Bottom shine effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">2.5M+</div>
              <div className="text-gray-600">Posts Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">98.7%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
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
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
          animation-fill-mode: both;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .group {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
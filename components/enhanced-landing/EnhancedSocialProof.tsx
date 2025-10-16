"use client";

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';

export default function EnhancedSocialProof() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Adwola completely transformed our content strategy. We went from struggling to post consistently to having a month's worth of high-quality content ready in just one afternoon. The AI understands our brand voice perfectly.",
      verified: true,
      metric: {
        label: "Engagement Boost",
        value: "347%",
        icon: TrendingUp
      }
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      company: "Digital Nomad",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "As a solo creator managing multiple clients, Adwola is a game-changer. The dual AI system gives me the creative edge I need while the scheduling feature handles the grunt work. My clients love the consistent quality.",
      verified: true,
      metric: {
        label: "Time Saved",
        value: "30hrs/week",
        icon: Target
      }
    },
    {
      name: "Emily Foster",
      role: "Social Media Manager",
      company: "GrowthLab Agency",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The analytics and performance insights are incredible. We can now predict which content will perform best before we even publish it. Our clients' ROI has improved dramatically since we started using Adwola.",
      verified: true,
      metric: {
        label: "Client Retention",
        value: "95%",
        icon: Users
      }
    }
  ];

  const ratings = {
    overall: 4.9,
    total: 2847,
    breakdown: [
      { stars: 5, percentage: 87 },
      { stars: 4, percentage: 11 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ]
  };

  const companies = [
    { name: "TechFlow", logo: "🚀" },
    { name: "GrowthLab", logo: "📈" },
    { name: "CreativeHub", logo: "🎨" },
    { name: "DigitalNest", logo: "🌐" },
    { name: "InnovateCorp", logo: "💡" },
    { name: "BrandForge", logo: "⚡" }
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by Content Creators{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <StarRating rating={5} />
            <span className="text-2xl font-bold text-gray-900">{ratings.overall}/5</span>
            <span className="text-gray-600">from {ratings.total.toLocaleString()} reviews</span>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who&apos;ve transformed their content strategy and achieved remarkable results
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Rating Breakdown</h3>
          <div className="space-y-3">
            {ratings.breakdown.map((rating) => (
              <div key={rating.stars} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm font-medium text-gray-700">{rating.stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-12">{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background Blur Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Header */}
              <div className="relative flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="relative mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Content */}
              <div className="relative">
                <blockquote className="text-gray-700 leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                
                {/* Metric Highlight */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-blue-500">
                  <div className="flex items-center space-x-3">
                    <testimonial.metric.icon className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{testimonial.metric.value}</div>
                      <div className="text-sm text-gray-600">{testimonial.metric.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted Companies */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600 mb-8">
            Trusted by companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-2xl">{company.logo}</span>
                <span className="font-semibold text-gray-700">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group {
          animation: slideInFromBottom 0.6s ease-out forwards;
          animation-delay: calc(var(--animation-order, 0) * 0.2s);
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
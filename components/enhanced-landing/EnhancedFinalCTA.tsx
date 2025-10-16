"use client";

import React, { useState, useEffect } from 'react';
import { Rocket, Phone, Shield, Clock, Zap, CheckCircle, Star } from 'lucide-react';

export default function EnhancedFinalCTA() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes--;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours--;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays--;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    { text: "50% OFF", highlight: true },
    { text: "14 Days Free", highlight: false },
    { text: "∞ Content", highlight: false }
  ];

  const trustIndicators = [
    { icon: Shield, text: "No credit card required" },
    { icon: Clock, text: "Cancel anytime" },
    { icon: Zap, text: "Setup in 60 seconds" }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Radial Gradients for Depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Limited Time Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-6 py-3 shadow-lg animate-bounce">
            <Star className="w-5 h-5 animate-spin" />
            <span className="font-bold text-lg">Limited Time Launch Offer</span>
            <Star className="w-5 h-5 animate-spin" />
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-7xl font-bold leading-none">
              <span className="text-white">Ready to Go </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Viral?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of creators who&apos;ve transformed their content strategy with AI-powered tools
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-white text-xl font-semibold mb-6">Offer expires in:</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 shadow-lg mb-2">
                    <span className="text-3xl font-bold text-white">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Offer Highlights */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-lg mx-auto">
            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-xl ${
                    feature.highlight 
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 shadow-lg scale-110' 
                      : 'bg-white/10'
                  }`}
                >
                  <div className={`text-2xl font-bold ${
                    feature.highlight ? 'text-white' : 'text-blue-300'
                  }`}>
                    {feature.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <button className="group relative overflow-hidden px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3">
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              <span className="relative z-10">Start Creating Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button className="flex items-center space-x-3 px-12 py-6 border-2 border-white/30 text-white font-semibold text-xl rounded-2xl hover:border-white/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <Phone className="w-6 h-6" />
              <span>Book a Demo Call</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-300">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-3">
                <indicator.icon className="w-5 h-5 text-green-400" />
                <span className="font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>

          {/* Success Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">10,000+</div>
                <div className="text-gray-300">Creators Trust Us</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">2.5M+</div>
                <div className="text-gray-300">Posts Generated</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">98.7%</div>
                <div className="text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Final Assurance */}
          <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">Risk-Free Guarantee</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Try Adwola for 14 days absolutely free. If you&apos;re not completely satisfied with the results, 
              we&apos;ll refund every penny. No questions asked. Your success is our priority.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce,
          .animate-spin {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
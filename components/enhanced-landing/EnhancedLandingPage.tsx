"use client";

import React, { useEffect } from 'react';
import EnhancedHeader from './EnhancedHeader';
import EnhancedHero from './EnhancedHero';
import EnhancedMetrics from './EnhancedMetrics';
import EnhancedFeatures from './EnhancedFeatures';
import EnhancedSocialProof from './EnhancedSocialProof';
import EnhancedFinalCTA from './EnhancedFinalCTA';

export default function EnhancedLandingPage() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('.observe-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Custom Global Styles */}
      <style jsx global>{`
        /* Custom Animation Keyframes */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
          }
          50% {
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }

        /* Animation Classes */
        .animate-slide-up {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fade-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Scroll Animation Base State */
        .observe-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .observe-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Custom Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Enhanced Button Styles */
        .btn-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        /* Card Hover Effects */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Glass Effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Responsive Design Utilities */
        @media (max-width: 768px) {
          .text-responsive-xl {
            font-size: 2.5rem;
            line-height: 1.2;
          }
          
          .text-responsive-lg {
            font-size: 1.5rem;
            line-height: 1.3;
          }
          
          .py-responsive {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
          
          .px-responsive {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (min-width: 769px) {
          .text-responsive-xl {
            font-size: 4rem;
            line-height: 1.1;
          }
          
          .text-responsive-lg {
            font-size: 2rem;
            line-height: 1.3;
          }
          
          .py-responsive {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          
          .px-responsive {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Performance Optimizations */
        * {
          box-sizing: border-box;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        /* Reduce Motion for Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }

        /* Focus Styles for Accessibility */
        .focus-ring {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .focus-ring:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }

        /* Loading States */
        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .gradient-text {
            background: none;
            -webkit-text-fill-color: currentColor;
            color: #000;
          }
          
          .btn-primary {
            background: #000;
            border: 2px solid #000;
            color: #fff;
          }
        }
      `}</style>

      {/* Header */}
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="observe-scroll">
        <EnhancedHero />
      </section>

      {/* Metrics Section */}
      <section className="observe-scroll">
        <EnhancedMetrics />
      </section>

      {/* Features Section */}
      <section className="observe-scroll">
        <EnhancedFeatures />
      </section>

      {/* Social Proof Section */}
      <section className="observe-scroll">
        <EnhancedSocialProof />
      </section>

      {/* Final CTA Section */}
      <section className="observe-scroll">
        <EnhancedFinalCTA />
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus-ring z-50 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
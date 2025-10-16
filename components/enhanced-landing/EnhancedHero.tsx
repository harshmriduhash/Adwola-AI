"use client";

import React, { useState, useEffect } from 'react';
import { Brain, Wand2, TrendingUp, Eye, MousePointer, Shield, Clock, Award } from 'lucide-react';

export default function EnhancedHero() {
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'vertex'>('openai');
  const [selectedPlatform, setSelectedPlatform] = useState<'linkedin' | 'twitter' | 'facebook' | 'instagram'>('linkedin');
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const demoTopics = [
    {
      input: "Launch our new eco-friendly product line",
      openai: {
        linkedin: "🌱 Exciting news! We're revolutionizing sustainability with our new eco-friendly product line. Join us in making a positive impact on our planet while enjoying premium quality. What sustainable changes are you making in your life? #Sustainability #EcoFriendly #Innovation",
        twitter: "🌍 Big announcement! Our new eco-friendly line is here. Premium quality meets sustainability. What's your favorite eco-swap? #EcoFriendly #Sustainable #GreenLiving",
        facebook: "We're thrilled to introduce our new eco-friendly product line! 🌱 After months of research and development, we've created products that don't compromise on quality while being kind to our planet. Share this post to spread awareness about sustainable living! What eco-friendly products do you love?",
        instagram: "🌿 NEW LAUNCH ALERT 🌿 Our eco-friendly collection is finally here! Swipe to see how we're making sustainability stylish and accessible. Tag a friend who loves eco-conscious products! ✨ #EcoFriendly #Sustainable #NewLaunch #GreenLiving"
      },
      vertex: {
        linkedin: "🌱 Proud to unveil our latest innovation: a comprehensive eco-friendly product line designed for conscious consumers. Our commitment to sustainability drives every decision we make. How is your organization contributing to environmental responsibility? #CorporateSustainability #GreenBusiness",
        twitter: "🌿 Innovation meets responsibility. Our new eco-friendly line proves that sustainable choices don't mean sacrificing quality. Join the movement! #SustainableBusiness #EcoInnovation",
        facebook: "Today marks a significant milestone in our sustainability journey! 🌍 Our new eco-friendly product line represents our commitment to creating positive change. Every purchase supports environmental initiatives. What sustainable practices inspire you most?",
        instagram: "✨ SUSTAINABLE LUXURY ✨ Introducing our eco-friendly collection where style meets responsibility. Every product tells a story of conscious creation. Which piece speaks to you? 🌱 #SustainableLuxury #EcoChic #ConsciousLiving"
      }
    },
    {
      input: "Share our customer success story",
      openai: {
        linkedin: "💪 Customer spotlight: Sarah increased her team's productivity by 300% using our platform. 'The AI-powered insights transformed how we work,' she says. Ready to unlock your team's potential? #CustomerSuccess #ProductivityHacks #TeamWork",
        twitter: "🎉 Sarah's team saw 300% productivity boost with our platform! 'Game-changing AI insights,' she says. What tools have transformed your workflow? #CustomerWin #Productivity",
        facebook: "We love celebrating our customers! 🌟 Sarah and her team achieved incredible results - 300% productivity increase! Her secret? Our AI-powered platform that streamlines workflows. Curious about how it works? Drop a comment below!",
        instagram: "🚀 SUCCESS STORY SUNDAY 🚀 Meet Sarah! Her team achieved 300% productivity growth using our platform. Swipe to see her journey and results! What's your biggest productivity win? 💪 #SuccessStory #CustomerWin #Productivity"
      },
      vertex: {
        linkedin: "📈 Case Study: Sarah's organization achieved remarkable 300% productivity enhancement through strategic implementation of our AI-driven solutions. Her insights: 'The platform's intelligence capabilities revolutionized our operational efficiency.' How can we help optimize your workflows? #CaseStudy #AITransformation",
        twitter: "📊 Results speak volumes: 300% productivity increase for Sarah's team. Strategic AI implementation drives measurable outcomes. #DataDriven #AISuccess",
        facebook: "Celebrating exceptional results! 📈 Sarah's team demonstrates the transformative power of our platform - 300% productivity enhancement through intelligent automation. Their success story inspires us to continue innovating. What challenges is your team facing?",
        instagram: "⭐ CLIENT SPOTLIGHT ⭐ Sarah's incredible journey: from efficiency challenges to 300% productivity growth. See how our platform transformed her team's performance! Tag someone who needs this transformation 📈 #ClientSpotlight #TransformationTuesday"
      }
    },
    {
      input: "Announce our company milestone",
      openai: {
        linkedin: "🎉 Incredible milestone: We've just reached 100,000 satisfied customers! This achievement belongs to our amazing community who trusted us on this journey. Thank you for making our vision a reality. What milestone are you celebrating today? #Milestone #Community #Gratitude",
        twitter: "🔥 100K customers strong! This journey has been amazing thanks to YOU. Here's to the next milestone together! What are you celebrating today? #100K #Community #Grateful",
        facebook: "WOW! 100,000 customers! 🎊 We're overwhelmed with gratitude for this incredible community. Every single customer has been part of our story. To celebrate, we're sharing exclusive behind-the-scenes content all week! What milestone should we hit next?",
        instagram: "🎉 100K MILESTONE 🎉 Our hearts are full! This incredible achievement is thanks to our amazing community. Swipe to see our journey highlights! What's your favorite memory with us? 💙 #100K #Milestone #Community #Grateful"
      },
      vertex: {
        linkedin: "🏆 Significant achievement unlocked: 100,000 customers milestone reached! This extraordinary growth reflects our commitment to delivering exceptional value and our community's trust in our vision. We're honored to serve such an engaged user base. What strategies drive your customer growth? #GrowthMilestone #CustomerSuccess",
        twitter: "📈 Major milestone: 100K customers! Exponential growth driven by exceptional value delivery and community trust. #GrowthStrategy #Milestone",
        facebook: "Extraordinary achievement: 100,000 customers! 🌟 This milestone represents countless hours of innovation, dedication, and most importantly, the trust our community places in us. We're committed to continuing this journey of excellence. How do you measure success in your business?",
        instagram: "✨ ACHIEVEMENT UNLOCKED ✨ 100,000 customers trust our vision! This milestone celebrates our community's belief in innovation and excellence. See our growth story in highlights! Who's been with us since the beginning? 🚀 #Achievement #GrowthStory #Innovation"
      }
    }
  ];

  const platformDescriptions = {
    linkedin: "Professional networking optimized for B2B engagement and thought leadership",
    twitter: "Concise, engaging content designed for viral potential and quick consumption",
    facebook: "Community-focused messaging that encourages interaction and sharing",
    instagram: "Visual storytelling with hashtag optimization for maximum discovery"
  };

  const metrics = {
    openai: { engagement: "94%", reach: "127K", ctr: "8.7%" },
    vertex: { engagement: "91%", reach: "134K", ctr: "9.2%" }
  };

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
  const currentMetrics = metrics[selectedProvider];

  return (
    <section className="relative min-h-screen bg-white pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-green-700 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Trusted by 10,000+ creators worldwide</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none">
                <span className="text-gray-900">Create </span>
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    VIRAL
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent blur-sm opacity-50"></span>
                </span>
                <span className="text-gray-900"> Content</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Transform ideas into engaging posts with AI power in seconds, not hours
              </p>
            </div>

            {/* Pricing Teaser */}
            <div className="relative bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 shadow-lg">
              <div className="absolute -top-3 left-6">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold animate-bounce">
                  🔥 Launch Special
                </span>
              </div>
              <div className="pt-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">$29</span>
                  <span className="text-lg text-gray-500 line-through">$58</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-bold">50% OFF</span>
                </div>
                <p className="text-gray-600 mt-1">Limited time offer - Get started today!</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGenerate}
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>🚀</span>
                  <span>Start Free 14-Day Trial</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center justify-center space-x-2">
                  <span>▶️</span>
                  <span>Watch 2-Min Demo</span>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 items-center text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive AI Demo */}
          <div className="relative">
            <div className="ai-demo bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 space-y-6">
              {/* Demo Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
                  <h3 className="demo-title text-xl font-bold">AI Content Studio</h3>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>

              {/* AI Provider Selection */}
              <div className="space-y-3">
                <label className="demo-label block text-sm font-medium">AI Provider</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedProvider('openai')}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedProvider === 'openai'
                        ? 'ai-provider-selected-openai'
                        : 'ai-provider-unselected hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">🤖</span>
                      <span className="demo-title font-semibold">OpenAI GPT-4</span>
                    </div>
                    <p className="demo-description text-xs">Creative & conversational</p>
                  </button>
                  <button
                    onClick={() => setSelectedProvider('vertex')}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedProvider === 'vertex'
                        ? 'ai-provider-selected-vertex'
                        : 'ai-provider-unselected hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">🧠</span>
                      <span className="demo-title font-semibold">Vertex AI</span>
                    </div>
                    <p className="demo-description text-xs">Strategic & analytical</p>
                  </button>
                </div>
              </div>

              {/* Content Input */}
              <div className="space-y-3">
                <label className="demo-label block text-sm font-medium">Content Brief</label>
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                  <p className="demo-content text-sm">{currentDemo.input}</p>
                </div>
              </div>

              {/* Generation Animation */}
              {isGenerating && (
                <div className="flex items-center justify-center space-x-3 py-4">
                  <Wand2 className="w-5 h-5 text-purple-600 animate-spin" />
                  <span className="demo-title text-sm font-medium">AI is crafting content...</span>
                </div>
              )}

              {/* Generated Content Output */}
              {!isGenerating && (
                <div className="space-y-3">
                  <label className="demo-label block text-sm font-medium">Generated Content</label>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <p className="demo-content text-sm leading-relaxed">{currentContent}</p>
                    
                    {/* Performance Metrics */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-blue-600" />
                          <span className="font-medium text-blue-600">Reach: {currentMetrics.reach}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="font-medium text-green-600">Engagement: {currentMetrics.engagement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MousePointer className="w-3 h-3 text-purple-600" />
                          <span className="font-medium text-purple-600">CTR: {currentMetrics.ctr}</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleGenerate}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-lg shadow hover:shadow-md transition-all duration-300"
                      >
                        Optimize
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Platform Selection */}
              <div className="space-y-3">
                <label className="demo-label block text-sm font-medium">Platform Optimization</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(platformDescriptions) as Array<keyof typeof platformDescriptions>).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                        selectedPlatform === platform
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="demo-title text-sm font-semibold capitalize">{platform}</div>
                      <p className="demo-description text-xs mt-1">{platformDescriptions[platform]}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
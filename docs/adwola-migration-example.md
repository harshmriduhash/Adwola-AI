// =============================================
// ADWOLA LANDING PAGE - DESIGN SYSTEM MIGRATION
// Before and After Examples
// =============================================

// === 1. UPDATED STYLE TAG ===
// Replace the current dangerouslySetInnerHTML with proper CSS import

// BEFORE:
/*
<style dangerouslySetInnerHTML={{
  __html: `
    @keyframes float { ... }
    .animate-float { ... }
    // ... basic keyframes only
  `
}} />
*/

// AFTER:
// Import the complete design system CSS file
// <link rel="stylesheet" href="./adwola-design-system.css" />
// OR include the CSS in your bundle

// === 2. COMPONENT REPLACEMENTS ===

// BUTTON COMPONENT - BEFORE vs AFTER
const ButtonExamples = {
  // BEFORE: Ad-hoc Tailwind classes
  before: `
    <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl duration-normal px-8 py-4 rounded-2xl text-lg transform hover:scale-105 overflow-hidden">
      <span className="relative z-10 flex items-center justify-center">
        🚀 Start with Adwola
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 duration-fast" />
      </span>
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] duration-slow skew-x-12"></div>
    </button>
  `,
  
  // AFTER: Clean design system class
  after: `
    <button className="adwola-btn-primary adwola-btn-primary--lg">
      🚀 Start with Adwola
      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 adwola-transition-fast" />
    </button>
  `
};

// CARD COMPONENT - BEFORE vs AFTER  
const CardExamples = {
  // BEFORE: Long Tailwind class string
  before: `
    <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      <div className="relative z-10">
        {/* Card content */}
      </div>
    </div>
  `,
  
  // AFTER: Simple design system class
  after: `
    <div className="adwola-card adwola-hover-lift">
      {/* Card content */}
    </div>
  `
};

// BADGE COMPONENT - BEFORE vs AFTER
const BadgeExamples = {
  // BEFORE: Multiple Tailwind classes
  before: `
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
      50% OFF
    </div>
  `,
  
  // AFTER: Systematic badge class
  after: `
    <div className="adwola-badge adwola-badge--success">
      50% OFF
    </div>
  `
};

// === 3. COMPLETE LANDING PAGE COMPONENT WITH DESIGN SYSTEM ===

export const AdwolaLandingPageUpdated = () => {
  // ... existing state and logic remains the same ...
  
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Include the design system CSS */}
      <link rel="stylesheet" href="./adwola-design-system.css" />
      
      {/* Header */}
      <header className="relative z-50 bg-black/95 backdrop-blur-lg text-white py-4 border-b border-gray-800">
        <div className="adwola-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 group">
                <div className="relative w-10 h-10">
                  <div className="adwola-animate-glow opacity-20"></div>
                  <div className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Logo SVG - keep as is */}
                  </div>
                </div>
                <span className="text-2xl font-bold adwola-gradient-text">Adwola</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-300 hover:text-white adwola-transition-colors relative group">
                  Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full adwola-transition-normal"></span>
                </a>
                {/* ... other nav items ... */}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white adwola-transition-colors font-medium">
                Sign In
              </button>
              <button className="adwola-btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        <div className="relative z-10 adwola-container pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="flex items-center space-x-3 adwola-animate-pulse-glow">
                <div className="adwola-badge adwola-badge--primary">
                  <div className="relative">
                    <Users className="w-5 h-5 text-green-600" />
                    <div className="absolute inset-0 animate-ping">
                      <Users className="w-5 h-5 text-green-400 opacity-75" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold adwola-gradient-text">
                    Trusted by <span className="font-bold">10,000+</span> creators worldwide
                  </span>
                </div>
                <div className="adwola-badge adwola-badge--live">
                  <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-green-600">Live</span>
                </div>
              </div>

              {/* Hero Title */}
              <div className="space-y-6">
                <h1 className="adwola-hero-title">
                  Create
                  <span className="relative inline-block mx-4">
                    <span className="adwola-gradient-text adwola-animate-pulse-glow">
                      Viral
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur opacity-30 animate-pulse"></div>
                  </span>
                  Content
                </h1>
                <div className="relative">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 leading-relaxed">
                    Transform your social media strategy with Adwola. Create engaging content campaigns with 
                    <span className="relative inline-block mx-2">
                      <span className="adwola-gradient-text font-bold">
                        AI power
                      </span>
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-orange-400 animate-bounce" />
                    </span>
                    in minutes, not hours
                  </h2>
                </div>
              </div>
              
              {/* Hero Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Powered by the world's most advanced AI models. Adwola creates 
                <span className="font-semibold text-blue-600"> professional-quality content that converts</span> and 
                drives real engagement across all platforms. From concept to campaign – 
                <span className="font-semibold text-purple-600"> scale without scaling your team</span>.
              </p>

              {/* Pricing Card */}
              <div className="adwola-card adwola-hover-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Rocket className="w-5 h-5 text-orange-600" />
                      <span className="adwola-badge adwola-badge--new">Launch Special</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900">
                      Start at <span className="text-orange-600">$29</span>
                      <span className="text-lg text-gray-500 line-through ml-2">$58</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="adwola-badge adwola-badge--new">
                      <Timer className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm font-bold">50% OFF</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="adwola-btn-primary adwola-btn-primary--lg">
                  🚀 Start with Adwola
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 adwola-transition-fast" />
                </button>
                
                <button className="adwola-btn-secondary adwola-btn-secondary--lg">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 adwola-transition-fast" />
                  Try Adwola Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="adwola-badge adwola-badge--success">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">99.9% Uptime Guarantee</span>
                </div>
                <div className="adwola-badge adwola-badge--primary">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">4.9/5 Customer Satisfaction</span>
                </div>
                <div className="adwola-badge adwola-badge--primary">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">95% Time Reduction</span>
                </div>
              </div>
            </div>

            {/* Interactive Demo - Keep existing structure but update classes */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="adwola-card-interactive">
                {/* Demo content - keep existing logic, update styling classes */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="relative py-20 bg-white">
        <div className="adwola-container">
          <div className="text-center mb-16">
            <h2 className="adwola-section-title mb-4">
              Real Results from Real Users
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of creators who've transformed their content strategy with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Replace MetricCard with design system classes */}
            <div className="adwola-card-interactive">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Average Engagement Boost</p>
                  <p className="text-3xl font-bold text-gray-900">250%</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm font-semibold text-green-600">+45%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            {/* ... other metric cards ... */}
          </div>
        </div>
      </section>

      {/* ... Continue with other sections using design system classes ... */}
      
    </div>
  );
};

// === 4. MIGRATION CHECKLIST ===

export const MigrationChecklist = {
  immediate: [
    "✅ Add design system CSS file",
    "✅ Replace button classes with .adwola-btn-primary",
    "✅ Replace card classes with .adwola-card",
    "✅ Replace badge classes with .adwola-badge variants",
    "✅ Update animation classes to .adwola-animate-*",
    "✅ Fix font loading by including Inter CSS import"
  ],
  
  week1: [
    "🔄 Implement CSS custom properties",
    "🔄 Update all button components",
    "🔄 Convert all card components",
    "🔄 Standardize badge usage",
    "🔄 Fix typography classes"
  ],
  
  week2: [
    "🔄 Add focus states for accessibility",
    "🔄 Implement dark mode variants",
    "🔄 Create component documentation",
    "🔄 Add reduced motion support"
  ],
  
  testing: [
    "🧪 Test font loading in all browsers",
    "🧪 Verify all animations work smoothly",
    "🧪 Check responsive behavior",
    "🧪 Test accessibility with screen readers",
    "🧪 Validate color contrast ratios",
    "🧪 Test dark mode functionality"
  ]
};

// === 5. PERFORMANCE BENEFITS ===

export const PerformanceBenefits = {
  before: {
    css_size: "Large Tailwind bundle with unused classes",
    maintenance: "Update classes in multiple files when design changes",
    consistency: "Inconsistent spacing and colors across components",
    developer_experience: "Long className strings, hard to read"
  },
  
  after: {
    css_size: "Optimized CSS with only needed styles",
    maintenance: "Update CSS variables in one place",
    consistency: "Systematic design tokens ensure consistency",
    developer_experience: "Clean, readable component classes"
  }
};

export default AdwolaLandingPageUpdated;
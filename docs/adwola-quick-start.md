/* =============================================
   ADWOLA DESIGN SYSTEM - QUICK START
   Copy this into your main CSS file to instantly fix the gaps
   ============================================= */

/* === FONT LOADING (FIXES MISSING INTER) === */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* === CSS CUSTOM PROPERTIES === */
:root {
  /* Brand Colors (from your logo) */
  --adwola-logo-primary: #10b981;
  --adwola-logo-light: #a7f3d0;
  --adwola-logo-dark: #047857;

  /* Primary Blue Scale */
  --adwola-blue-50: #eff6ff;
  --adwola-blue-500: #3b82f6;
  --adwola-blue-600: #2563eb;
  --adwola-blue-700: #1d4ed8;

  /* Purple Scale */
  --adwola-purple-500: #8b5cf6;
  --adwola-purple-600: #7c3aed;
  --adwola-purple-700: #6d28d9;

  /* Semantic Colors */
  --adwola-success: #22c55e;
  --adwola-warning: #f59e0b;
  --adwola-error: #ef4444;

  /* Typography */
  --adwola-font: 'Inter', system-ui, sans-serif;

  /* Transitions */
  --adwola-fast: 150ms ease;
  --adwola-normal: 300ms ease;
  --adwola-slow: 500ms ease;

  /* Gradients */
  --adwola-gradient-primary: linear-gradient(to right, var(--adwola-blue-600), var(--adwola-purple-600));
  --adwola-gradient-success: linear-gradient(to right, var(--adwola-success), var(--adwola-logo-primary));
}

/* === ANIMATIONS (FIXES MISSING KEYFRAMES) === */
@keyframes adwola-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes adwola-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
}

@keyframes adwola-pulse-glow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes adwola-shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

/* === UTILITY CLASSES === */
.adwola-animate-float { animation: adwola-float 6s ease-in-out infinite; }
.adwola-animate-glow { animation: adwola-glow 2s ease-in-out infinite; }
.adwola-animate-pulse-glow { animation: adwola-pulse-glow 2s ease-in-out infinite; }

.adwola-gradient-text {
  background: var(--adwola-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.adwola-transition-fast { transition: all var(--adwola-fast); }
.adwola-transition-normal { transition: all var(--adwola-normal); }
.adwola-transition-slow { transition: all var(--adwola-slow); }

/* === COMPONENT FIXES === */

/* Primary Button with CSS Variables */
.adwola-btn-primary {
  font-family: var(--adwola-font);
  background: var(--adwola-gradient-primary);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all var(--adwola-normal);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.adwola-btn-primary:hover {
  background: linear-gradient(to right, var(--adwola-blue-700), var(--adwola-purple-700));
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.adwola-btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 700ms ease;
  transform: skewX(-12deg);
}

.adwola-btn-primary:hover::before {
  left: 100%;
}

/* Card Component with CSS Variables */
.adwola-card {
  font-family: var(--adwola-font);
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(229, 231, 235, 1);
  transition: all var(--adwola-normal);
}

.adwola-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-4px);
}

/* Badge Component */
.adwola-badge {
  font-family: var(--adwola-font);
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.adwola-badge--primary {
  background: var(--adwola-blue-50);
  color: var(--adwola-blue-700);
}

.adwola-badge--success {
  background: var(--adwola-gradient-success);
  color: white;
}

.adwola-badge--new {
  background: linear-gradient(to right, #f97316, var(--adwola-error));
  color: white;
  animation: adwola-pulse-glow 2s ease-in-out infinite;
}

/* Typography Fixes */
body {
  font-family: var(--adwola-font);
}

.adwola-hero-title {
  font-family: var(--adwola-font);
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: #111827;
}

.adwola-section-title {
  font-family: var(--adwola-font);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
}

/* Focus States for Accessibility */
.adwola-focus:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .adwola-animate-float,
  .adwola-animate-glow,
  .adwola-animate-pulse-glow {
    animation: none;
  }
  
  * {
    transition-duration: 0.01ms !important;
  }
}

/* Dark Mode Foundation */
@media (prefers-color-scheme: dark) {
  .adwola-card {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .adwola-hero-title,
  .adwola-section-title {
    color: #f9fafb;
  }
}

/* =============================================
   QUICK REPLACEMENT CLASSES
   Use these to replace your current Tailwind combinations
   ============================================= */

/* Replace: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl duration-normal px-8 py-4 rounded-2xl text-lg transform hover:scale-105" */
.adwola-btn-hero {
  font-family: var(--adwola-font);
  background: var(--adwola-gradient-primary);
  color: white;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: all var(--adwola-normal);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.adwola-btn-hero:hover {
  background: linear-gradient(to right, var(--adwola-blue-700), var(--adwola-purple-700));
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Replace: "bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" */
.adwola-card-feature {
  font-family: var(--adwola-font);
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  transition: all var(--adwola-slow);
}

.adwola-card-feature:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-4px);
}

/* Replace: "bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold" */
.adwola-badge-success {
  font-family: var(--adwola-font);
  background: var(--adwola-gradient-success);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

/* =============================================
   USAGE INSTRUCTIONS
   ============================================= */

/*
IMMEDIATE FIXES YOU CAN APPLY:

1. Replace your current button:
   OLD: className="bg-gradient-to-r from-blue-600 to-purple-600..."
   NEW: className="adwola-btn-primary"

2. Replace your current cards:
   OLD: className="bg-white rounded-2xl p-8 shadow-lg..."
   NEW: className="adwola-card"

3. Replace your current badges:
   OLD: className="bg-gradient-to-r from-green-500 to-emerald-600..."
   NEW: className="adwola-badge adwola-badge--success"

4. Fix typography:
   OLD: No font-family specified
   NEW: Add className="font-inter" or use CSS variables

5. Fix animations:
   OLD: className="animate-float"
   NEW: className="adwola-animate-float"

BENEFITS:
- ✅ Consistent design across all components
- ✅ Easy maintenance through CSS variables
- ✅ Better accessibility with focus states
- ✅ Proper font loading
- ✅ Dark mode foundation
- ✅ Reduced motion support
*/
/*=============================================
   ADWOLA THEME LAYER FOR EXISTING SHADCN/UI SYSTEM
   Add this to your existing globals.css
   =============================================*/

/*=== FONT IMPORT (if not already included) ===*/
@import url('<https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap>');

/*=== ADWOLA COLOR SYSTEM (HSL FORMAT) === */
:root {
  /* === ADWOLA BRAND COLORS (converted to HSL) === */
  --adwola-brand-primary: 160 84% 39%;        /* #10b981 */
  --adwola-brand-light: 151 83% 74%;          /* #a7f3d0 */
  --adwola-brand-medium: 158 64% 52%;         /* #34d399 */
  --adwola-brand-blue: 166 71% 69%;           /* #6ee7b7 */
  --adwola-brand-dark: 166 94% 30%;           /* #059669 */
  --adwola-brand-deep: 162 92% 26%;           /* #047857*/

  /*=== ADWOLA PRIMARY SYSTEM (Blues) === */
  --adwola-primary-50: 214 100% 97%;          /* #eff6ff */
  --adwola-primary-100: 214 95% 93%;          /* #dbeafe */
  --adwola-primary-200: 213 97% 87%;          /* #bfdbfe */
  --adwola-primary-300: 212 96% 78%;          /* #93c5fd */
  --adwola-primary-400: 213 93% 68%;          /* #60a5fa */
  --adwola-primary-500: 217 91% 60%;          /* #3b82f6 */
  --adwola-primary-600: 221 83% 53%;          /* #2563eb */
  --adwola-primary-700: 224 76% 48%;          /* #1d4ed8 */
  --adwola-primary-800: 226 71% 40%;          /* #1e40af */
  --adwola-primary-900: 224 64% 33%;          /* #1e3a8a*/

  /*=== ADWOLA SECONDARY SYSTEM (Purples) === */
  --adwola-secondary-50: 250 100% 98%;        /* #f5f3ff */
  --adwola-secondary-100: 251 91% 95%;        /* #ede9fe */
  --adwola-secondary-200: 251 95% 92%;        /* #ddd6fe */
  --adwola-secondary-300: 252 94% 85%;        /* #c4b5fd */
  --adwola-secondary-400: 255 92% 76%;        /* #a78bfa */
  --adwola-secondary-500: 258 90% 66%;        /* #8b5cf6 */
  --adwola-secondary-600: 262 83% 58%;        /* #7c3aed */
  --adwola-secondary-700: 263 70% 50%;        /* #6d28d9 */
  --adwola-secondary-800: 263 69% 42%;        /* #5b21b6 */
  --adwola-secondary-900: 263 80% 31%;        /* #4c1d95*/

  /*=== SEMANTIC COLORS === */
  --adwola-success: 142 76% 36%;              /* #16a34a */
  --adwola-success-foreground: 138 76% 97%;   /* #f0fdf4 */
  --adwola-warning: 32 95% 44%;               /* #d97706 */
  --adwola-warning-foreground: 48 100% 96%;   /* #fffbeb */
  --adwola-error: 0 84% 60%;                  /* #ef4444 */
  --adwola-error-foreground: 0 86% 97%;       /* #fef2f2*/

  /*=== UPDATE YOUR EXISTING TOKENS WITH ADWOLA VALUES ===*/
  
  /*Primary color system - map to Adwola blues*/
  --primary: var(--adwola-primary-600);
  --primary-foreground: 210 40% 98%;
  
  /*Secondary color system - map to Adwola purples*/
  --secondary: var(--adwola-secondary-100);
  --secondary-foreground: var(--adwola-secondary-800);
  
  /*Accent color system - use Adwola brand green*/
  --accent: var(--adwola-brand-primary);
  --accent-foreground: 0 0% 98%;
  
  /*Destructive - map to Adwola error*/
  --destructive: var(--adwola-error);
  --destructive-foreground: var(--adwola-error-foreground);
  
  /*Muted colors - keep existing or adjust*/
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  
  /*Border and input colors - subtle adjustments*/
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: var(--adwola-primary-600);
  
  /*Background colors*/
  --background: 0 0% 100%;
  --foreground: 222 84% 5%;
  
  /*Card colors*/
  --card: 0 0% 100%;
  --card-foreground: 222 84% 5%;
  
  /*Popover colors*/
  --popover: 0 0% 100%;
  --popover-foreground: 222 84% 5%;

  /*=== ADWOLA GRADIENTS ===*/
  --adwola-gradient-primary: linear-gradient(to right, hsl(var(--adwola-primary-600)), hsl(var(--adwola-secondary-600)));
  --adwola-gradient-success: linear-gradient(to right, hsl(var(--adwola-success)), hsl(var(--adwola-brand-primary)));
  --adwola-gradient-warm: linear-gradient(to right, hsl(32 95% 44%), hsl(var(--adwola-error)));
}

/*=== DARK MODE ADWOLA THEME === */
.dark {
  /* Update dark mode colors to match Adwola brand*/
  --primary: var(--adwola-primary-500);
  --primary-foreground: var(--adwola-primary-50);
  
  --secondary: var(--adwola-secondary-800);
  --secondary-foreground: var(--adwola-secondary-100);
  
  --accent: var(--adwola-brand-primary);
  --accent-foreground: var(--adwola-brand-light);
  
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
  
  --card: 222 84% 5%;
  --card-foreground: 210 40% 98%;
  
  --border: 217 32% 17%;
  --input: 217 32% 17%;
  --ring: var(--adwola-primary-500);
}

/*=== ADWOLA SPECIFIC UTILITY CLASSES ===*/
.adwola-gradient-text {
  background: var(--adwola-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.adwola-gradient-bg {
  background: var(--adwola-gradient-primary);
}

.adwola-success-gradient {
  background: var(--adwola-gradient-success);
}

.adwola-warm-gradient {
  background: var(--adwola-gradient-warm);
}

/*=== ADWOLA ANIMATIONS (keep your existing ones, add these) ===*/
@keyframes adwola-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes adwola-glow {
  0%, 100% { box-shadow: 0 0 20px hsl(var(--adwola-primary-600) / 0.3); }
  50% { box-shadow: 0 0 40px hsl(var(--adwola-primary-600) / 0.6); }
}

@keyframes adwola-pulse-glow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.adwola-animate-float { animation: adwola-float 6s ease-in-out infinite; }
.adwola-animate-glow { animation: adwola-glow 2s ease-in-out infinite; }
.adwola-animate-pulse-glow { animation: adwola-pulse-glow 2s ease-in-out infinite; }

/*=== ADWOLA COMPONENT ENHANCEMENTS ===*/

/*Enhanced button hover effects for Adwola brand*/
.adwola-btn-shimmer {
  position: relative;
  overflow: hidden;
}

.adwola-btn-shimmer::before {
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

.adwola-btn-shimmer:hover::before {
  left: 100%;
}

/*Enhanced card styles for Adwola brand*/
.adwola-card-glow {
  transition: all 300ms ease;
}

.adwola-card-glow:hover {
  box-shadow: 0 0 30px hsl(var(--adwola-primary-600) / 0.2);
  transform: translateY(-4px);
}

/*Adwola-specific focus states*/
.adwola-focus:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--adwola-primary-600) / 0.3);
}

/*=== TYPOGRAPHY ENHANCEMENTS ===*/
.adwola-font {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

.adwola-heading {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

/*=== RESPONSIVE ADWOLA PATTERNS ===*/
.adwola-hero-text {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
}

.adwola-section-text {
  font-size: clamp(1.875rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
}

/*=== ADWOLA SPACING ===*/
.adwola-section-padding {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

@media (min-width: 768px) {
  .adwola-section-padding {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

@media (min-width: 1024px) {
  .adwola-section-padding {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}

/*=== BRAND CONSISTENCY HELPERS ===*/
.adwola-brand-primary { color: hsl(var(--adwola-brand-primary)); }
.adwola-brand-bg { background-color: hsl(var(--adwola-brand-primary)); }

.adwola-primary { color: hsl(var(--adwola-primary-600)); }
.adwola-primary-bg { background-color: hsl(var(--adwola-primary-600)); }

.adwola-secondary { color: hsl(var(--adwola-secondary-600)); }
.adwola-secondary-bg { background-color: hsl(var(--adwola-secondary-600)); }

/*=== COMPONENT OVERRIDE EXAMPLES ===*/

/*Update your existing button component to support Adwola variants*/
.btn-adwola-primary {
  background: var(--adwola-gradient-primary);
  color: hsl(var(--primary-foreground));
  border: none;
}

.btn-adwola-primary:hover {
  background: linear-gradient(to right, hsl(var(--adwola-primary-700)), hsl(var(--adwola-secondary-700)));
  transform: translateY(-2px);
}

.btn-adwola-success {
  background: var(--adwola-gradient-success);
  color: white;
}

/*Enhanced card for Adwola landing pages*/
.card-adwola {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 300ms ease;
}

.card-adwola:hover {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  transform: translateY(-4px);
}

/*Badge variants for Adwola brand*/
.badge-adwola-new {
  background: var(--adwola-gradient-warm);
  color: white;
  animation: adwola-pulse-glow 2s ease-in-out infinite;
}

.badge-adwola-success {
  background: var(--adwola-gradient-success);
  color: white;
}

/*=== ACCESSIBILITY ENHANCEMENTS ===*/
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

/*High contrast mode support*/
@media (prefers-contrast: high) {
  :root {
    --primary: 221 83% 45%;
    --secondary: 262 83% 50%;
    --border: 220 13% 18%;
  }
}

/* === INTEGRATION NOTES === */
/*
This theme layer works with your existing:
✅ shadcn/ui components
✅ CVA (class-variance-authority)
✅ Tailwind CSS
✅ Radix UI primitives
✅ Your current component architecture

Simply add this CSS to your globals.css and your existing
components will automatically get Adwola branding!
*/

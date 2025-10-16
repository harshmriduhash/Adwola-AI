// =============================================
// 1. CSS CUSTOM PROPERTIES & FONT LOADING
// =============================================

export const adwolaDesignTokensCSS = `
/* Import Inter Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

:root {
  /* === BRAND COLORS === */
  --adwola-brand-logo-light: #a7f3d0;
  --adwola-brand-logo-medium: #34d399;
  --adwola-brand-logo-blue: #6ee7b7;
  --adwola-brand-logo-dark: #059669;
  --adwola-brand-logo-primary: #10b981;
  --adwola-brand-logo-deep: #047857;

  /* === PRIMARY COLORS === */
  --adwola-primary-50: #eff6ff;
  --adwola-primary-100: #dbeafe;
  --adwola-primary-200: #bfdbfe;
  --adwola-primary-300: #93c5fd;
  --adwola-primary-400: #60a5fa;
  --adwola-primary-500: #3b82f6;
  --adwola-primary-600: #2563eb;
  --adwola-primary-700: #1d4ed8;
  --adwola-primary-800: #1e40af;
  --adwola-primary-900: #1e3a8a;

  /* === SECONDARY COLORS (Purple) === */
  --adwola-secondary-50: #f5f3ff;
  --adwola-secondary-100: #ede9fe;
  --adwola-secondary-200: #ddd6fe;
  --adwola-secondary-300: #c4b5fd;
  --adwola-secondary-400: #a78bfa;
  --adwola-secondary-500: #8b5cf6;
  --adwola-secondary-600: #7c3aed;
  --adwola-secondary-700: #6d28d9;
  --adwola-secondary-800: #5b21b6;
  --adwola-secondary-900: #4c1d95;

  /* === ACCENT COLORS (Pink) === */
  --adwola-accent-50: #fdf4ff;
  --adwola-accent-100: #fae8ff;
  --adwola-accent-200: #f5d0fe;
  --adwola-accent-300: #f0abfc;
  --adwola-accent-400: #e879f9;
  --adwola-accent-500: #d946ef;
  --adwola-accent-600: #c026d3;
  --adwola-accent-700: #a21caf;
  --adwola-accent-800: #86198f;
  --adwola-accent-900: #701a75;

  /* === SEMANTIC COLORS === */
  --adwola-success-50: #f0fdf4;
  --adwola-success-100: #dcfce7;
  --adwola-success-500: #22c55e;
  --adwola-success-600: #16a34a;
  --adwola-success-700: #15803d;
  --adwola-success-900: #14532d;

  --adwola-warning-50: #fffbeb;
  --adwola-warning-100: #fef3c7;
  --adwola-warning-500: #f59e0b;
  --adwola-warning-600: #d97706;
  --adwola-warning-700: #b45309;
  --adwola-warning-900: #92400e;

  --adwola-error-50: #fef2f2;
  --adwola-error-100: #fee2e2;
  --adwola-error-500: #ef4444;
  --adwola-error-600: #dc2626;
  --adwola-error-700: #b91c1c;
  --adwola-error-900: #991b1b;

  /* === NEUTRAL COLORS === */
  --adwola-neutral-50: #fafafa;
  --adwola-neutral-100: #f4f4f5;
  --adwola-neutral-200: #e4e4e7;
  --adwola-neutral-300: #d4d4d8;
  --adwola-neutral-400: #a1a1aa;
  --adwola-neutral-500: #71717a;
  --adwola-neutral-600: #52525b;
  --adwola-neutral-700: #3f3f46;
  --adwola-neutral-800: #27272a;
  --adwola-neutral-900: #18181b;
  --adwola-neutral-950: #09090b;

  /* === TYPOGRAPHY === */
  --adwola-font-display: 'Inter', system-ui, sans-serif;
  --adwola-font-body: 'Inter', system-ui, sans-serif;
  --adwola-font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;

  /* === SPACING === */
  --adwola-spacing-xs: 0.5rem;    /* 8px */
  --adwola-spacing-sm: 1rem;      /* 16px */
  --adwola-spacing-md: 1.5rem;    /* 24px */
  --adwola-spacing-lg: 2rem;      /* 32px */
  --adwola-spacing-xl: 3rem;      /* 48px */
  --adwola-spacing-2xl: 4rem;     /* 64px */
  --adwola-spacing-3xl: 6rem;     /* 96px */
  --adwola-spacing-4xl: 8rem;     /* 128px */

  /* === BORDER RADIUS === */
  --adwola-radius-sm: 0.375rem;   /* 6px */
  --adwola-radius-md: 0.5rem;     /* 8px */
  --adwola-radius-lg: 0.75rem;    /* 12px */
  --adwola-radius-xl: 1rem;       /* 16px */
  --adwola-radius-2xl: 1.5rem;    /* 24px */
  --adwola-radius-3xl: 2rem;      /* 32px */
  --adwola-radius-full: 9999px;

  /* === SHADOWS === */
  --adwola-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --adwola-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --adwola-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --adwola-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --adwola-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* === TRANSITIONS === */
  --adwola-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --adwola-transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --adwola-transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --adwola-transition-slowest: 700ms cubic-bezier(0.4, 0, 0.2, 1);

  /* === GRADIENTS === */
  --adwola-gradient-primary: linear-gradient(to right, var(--adwola-primary-600), var(--adwola-secondary-600));
  --adwola-gradient-secondary: linear-gradient(to right, var(--adwola-secondary-600), var(--adwola-accent-600));
  --adwola-gradient-accent: linear-gradient(to right, var(--adwola-primary-500), var(--adwola-secondary-500), var(--adwola-accent-500));
  --adwola-gradient-success: linear-gradient(to right, var(--adwola-success-500), #10b981);
  --adwola-gradient-warm: linear-gradient(to right, #f97316, var(--adwola-error-500));
  --adwola-gradient-hero: linear-gradient(to bottom right, var(--adwola-neutral-50), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
}

/* === KEYFRAME ANIMATIONS === */
@keyframes adwola-float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(1deg); 
  }
}

@keyframes adwola-glow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); 
  }
}

@keyframes adwola-pulse-glow {
  0%, 100% { 
    transform: scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: scale(1.05); 
    opacity: 0.8; 
  }
}

@keyframes adwola-fade-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes adwola-slide-in-left {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes adwola-scale-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes adwola-shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

/* === DARK MODE === */
@media (prefers-color-scheme: dark) {
  :root {
    --adwola-neutral-50: #09090b;
    --adwola-neutral-100: #18181b;
    --adwola-neutral-200: #27272a;
    --adwola-neutral-300: #3f3f46;
    --adwola-neutral-400: #52525b;
    --adwola-neutral-500: #71717a;
    --adwola-neutral-600: #a1a1aa;
    --adwola-neutral-700: #d4d4d8;
    --adwola-neutral-800: #e4e4e7;
    --adwola-neutral-900: #f4f4f5;
    --adwola-neutral-950: #fafafa;
  }
}

/* === REDUCED MOTION === */
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
`;

// =============================================
// 2. UTILITY CLASSES
// =============================================

export const adwolaUtilityClasses = `
/* === ANIMATION UTILITIES === */
.adwola-animate-float {
  animation: adwola-float 6s ease-in-out infinite;
}

.adwola-animate-glow {
  animation: adwola-glow 2s ease-in-out infinite;
}

.adwola-animate-pulse-glow {
  animation: adwola-pulse-glow 2s ease-in-out infinite;
}

.adwola-animate-fade-up {
  animation: adwola-fade-up 0.6s ease-out;
}

.adwola-animate-slide-in {
  animation: adwola-slide-in-left 0.5s ease-out;
}

.adwola-animate-scale-in {
  animation: adwola-scale-in 0.4s ease-out;
}

/* === TEXT UTILITIES === */
.adwola-gradient-text {
  background: var(--adwola-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.adwola-gradient-text-accent {
  background: var(--adwola-gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === GLASSMORPHISM === */
.adwola-glass {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.adwola-glass-dark {
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* === TRANSITION UTILITIES === */
.adwola-transition-fast {
  transition: all var(--adwola-transition-fast);
}

.adwola-transition-normal {
  transition: all var(--adwola-transition-normal);
}

.adwola-transition-slow {
  transition: all var(--adwola-transition-slow);
}

.adwola-transition-colors {
  transition: color var(--adwola-transition-normal), background-color var(--adwola-transition-normal), border-color var(--adwola-transition-normal);
}

.adwola-transition-transform {
  transition: transform var(--adwola-transition-normal);
}

/* === HOVER EFFECTS === */
.adwola-hover-lift {
  transform: translateY(0);
  transition: transform var(--adwola-transition-normal), box-shadow var(--adwola-transition-normal);
}

.adwola-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--adwola-shadow-xl);
}

.adwola-hover-scale {
  transform: scale(1);
  transition: transform var(--adwola-transition-normal);
}

.adwola-hover-scale:hover {
  transform: scale(1.05);
}

.adwola-hover-glow {
  transition: box-shadow var(--adwola-transition-normal);
}

.adwola-hover-glow:hover {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
}

/* === FOCUS UTILITIES === */
.adwola-focus-ring {
  outline: none;
  transition: box-shadow var(--adwola-transition-fast);
}

.adwola-focus-ring:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.adwola-focus-ring:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
`;

// =============================================
// 3. COMPONENT LIBRARY
// =============================================

export const AdwolaComponents = {
  // Button Components
  Button: {
    primary: `
      /* Primary Button */
      .adwola-btn-primary {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--adwola-gradient-primary);
        color: white;
        font-weight: 600;
        font-family: var(--adwola-font-body);
        padding: 1rem 2rem;
        border-radius: var(--adwola-radius-xl);
        box-shadow: var(--adwola-shadow-lg);
        border: none;
        cursor: pointer;
        overflow: hidden;
        transition: all var(--adwola-transition-normal);
        text-decoration: none;
        font-size: 1rem;
        line-height: 1.5;
      }

      .adwola-btn-primary:hover {
        background: linear-gradient(to right, var(--adwola-primary-700), var(--adwola-secondary-700));
        box-shadow: var(--adwola-shadow-xl);
        transform: scale(1.02) translateY(-2px);
      }

      .adwola-btn-primary:focus {
        outline: none;
        box-shadow: var(--adwola-shadow-xl), 0 0 0 3px rgba(59, 130, 246, 0.3);
      }

      .adwola-btn-primary:active {
        transform: scale(0.98);
      }

      /* Shimmer Effect */
      .adwola-btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left var(--adwola-transition-slowest);
        transform: skewX(-12deg);
      }

      .adwola-btn-primary:hover::before {
        left: 100%;
      }

      /* Size Variants */
      .adwola-btn-primary--sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        border-radius: var(--adwola-radius-lg);
      }

      .adwola-btn-primary--lg {
        padding: 1.25rem 2.5rem;
        font-size: 1.125rem;
        border-radius: var(--adwola-radius-2xl);
      }

      .adwola-btn-primary--xl {
        padding: 1.5rem 3rem;
        font-size: 1.25rem;
        border-radius: var(--adwola-radius-2xl);
      }
    `,

    secondary: `
      /* Secondary Button */
      .adwola-btn-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: white;
        color: var(--adwola-primary-600);
        font-weight: 500;
        font-family: var(--adwola-font-body);
        padding: 1rem 2rem;
        border-radius: var(--adwola-radius-xl);
        border: 2px solid var(--adwola-primary-600);
        cursor: pointer;
        transition: all var(--adwola-transition-normal);
        text-decoration: none;
        font-size: 1rem;
        line-height: 1.5;
      }

      .adwola-btn-secondary:hover {
        background: var(--adwola-primary-50);
        box-shadow: var(--adwola-shadow-lg);
        transform: translateY(-2px);
      }

      .adwola-btn-secondary:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      }

      .adwola-btn-secondary:active {
        transform: scale(0.98);
      }
    `,

    ghost: `
      /* Ghost Button */
      .adwola-btn-ghost {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        color: var(--adwola-neutral-700);
        font-weight: 500;
        font-family: var(--adwola-font-body);
        padding: 1rem 2rem;
        border-radius: var(--adwola-radius-xl);
        border: none;
        cursor: pointer;
        transition: all var(--adwola-transition-normal);
        text-decoration: none;
        font-size: 1rem;
        line-height: 1.5;
      }

      .adwola-btn-ghost:hover {
        background: var(--adwola-primary-50);
        color: var(--adwola-primary-600);
      }

      .adwola-btn-ghost:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
      }
    `
  },

  // Card Components
  Card: {
    default: `
      /* Default Card */
      .adwola-card {
        background: white;
        border-radius: var(--adwola-radius-2xl);
        padding: 2rem;
        box-shadow: var(--adwola-shadow-lg);
        border: 1px solid var(--adwola-neutral-200);
        transition: all var(--adwola-transition-normal);
      }

      .adwola-card:hover {
        box-shadow: var(--adwola-shadow-2xl);
        transform: translateY(-4px);
      }

      /* Card Header */
      .adwola-card__header {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--adwola-neutral-200);
      }

      .adwola-card__title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--adwola-neutral-900);
        margin: 0;
        font-family: var(--adwola-font-body);
      }

      .adwola-card__subtitle {
        font-size: 0.875rem;
        color: var(--adwola-neutral-600);
        margin: 0.25rem 0 0 0;
        font-family: var(--adwola-font-body);
      }

      /* Card Body */
      .adwola-card__body {
        color: var(--adwola-neutral-700);
        line-height: 1.6;
        font-family: var(--adwola-font-body);
      }

      /* Card Footer */
      .adwola-card__footer {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--adwola-neutral-200);
      }
    `,

    interactive: `
      /* Interactive Card */
      .adwola-card-interactive {
        background: white;
        border-radius: var(--adwola-radius-2xl);
        padding: 2rem;
        box-shadow: var(--adwola-shadow-lg);
        border: 1px solid var(--adwola-neutral-200);
        transition: all var(--adwola-transition-normal);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .adwola-card-interactive::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--adwola-primary-500), var(--adwola-secondary-500));
        opacity: 0;
        transition: opacity var(--adwola-transition-normal);
        z-index: 0;
      }

      .adwola-card-interactive:hover {
        box-shadow: var(--adwola-shadow-2xl);
        transform: translateY(-8px) scale(1.02);
      }

      .adwola-card-interactive:hover::before {
        opacity: 0.05;
      }

      .adwola-card-interactive > * {
        position: relative;
        z-index: 1;
      }
    `,

    pricing: `
      /* Pricing Card */
      .adwola-card-pricing {
        background: white;
        border-radius: var(--adwola-radius-3xl);
        padding: 2rem;
        box-shadow: var(--adwola-shadow-lg);
        border: 1px solid var(--adwola-neutral-200);
        transition: all var(--adwola-transition-slow);
        position: relative;
        text-align: center;
      }

      .adwola-card-pricing:hover {
        box-shadow: var(--adwola-shadow-2xl);
        transform: translateY(-8px) scale(1.02);
      }

      .adwola-card-pricing--popular {
        background: linear-gradient(135deg, var(--adwola-primary-50), var(--adwola-secondary-50));
        border: 2px solid var(--adwola-primary-300);
        transform: scale(1.05);
        z-index: 10;
      }

      .adwola-card-pricing--popular::before {
        content: 'Most Popular';
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--adwola-gradient-primary);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: var(--adwola-radius-full);
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: var(--adwola-shadow-lg);
      }

      .adwola-pricing__price {
        font-size: 3rem;
        font-weight: 900;
        color: var(--adwola-neutral-900);
        margin: 1rem 0;
        font-family: var(--adwola-font-body);
      }

      .adwola-pricing__period {
        font-size: 1rem;
        color: var(--adwola-neutral-500);
        font-weight: 500;
      }

      .adwola-pricing__features {
        list-style: none;
        padding: 0;
        margin: 2rem 0;
      }

      .adwola-pricing__feature {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1rem;
        text-align: left;
      }

      .adwola-pricing__feature::before {
        content: '✓';
        color: var(--adwola-success-500);
        font-weight: bold;
        margin-right: 0.75rem;
        flex-shrink: 0;
        margin-top: 0.125rem;
      }
    `
  },

  // Badge Components
  Badge: {
    base: `
      /* Base Badge */
      .adwola-badge {
        display: inline-flex;
        align-items: center;
        font-family: var(--adwola-font-body);
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: var(--adwola-radius-full);
        border: 1px solid transparent;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        line-height: 1;
      }

      .adwola-badge--primary {
        background: var(--adwola-primary-100);
        color: var(--adwola-primary-800);
        border-color: var(--adwola-primary-200);
      }

      .adwola-badge--success {
        background: var(--adwola-success-100);
        color: var(--adwola-success-800);
        border-color: var(--adwola-success-200);
      }

      .adwola-badge--warning {
        background: var(--adwola-warning-100);
        color: var(--adwola-warning-800);
        border-color: var(--adwola-warning-200);
      }

      .adwola-badge--error {
        background: var(--adwola-error-100);
        color: var(--adwola-error-800);
        border-color: var(--adwola-error-200);
      }

      .adwola-badge--gradient {
        background: var(--adwola-gradient-primary);
        color: white;
        border: none;
      }

      .adwola-badge--new {
        background: var(--adwola-gradient-warm);
        color: white;
        border: none;
        animation: adwola-pulse-glow 2s ease-in-out infinite;
      }

      .adwola-badge--live {
        background: var(--adwola-success-100);
        color: var(--adwola-success-700);
        border-color: var(--adwola-success-200);
      }

      .adwola-badge--live::before {
        content: '';
        width: 6px;
        height: 6px;
        background: var(--adwola-success-500);
        border-radius: 50%;
        margin-right: 0.5rem;
        animation: pulse 2s infinite;
      }
    `
  },

  // Form Components
  Form: {
    input: `
      /* Form Input */
      .adwola-input {
        width: 100%;
        font-family: var(--adwola-font-body);
        font-size: 1rem;
        padding: 0.75rem 1rem;
        border: 2px solid var(--adwola-neutral-300);
        border-radius: var(--adwola-radius-lg);
        background: white;
        color: var(--adwola-neutral-900);
        transition: all var(--adwola-transition-normal);
      }

      .adwola-input:focus {
        outline: none;
        border-color: var(--adwola-primary-500);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .adwola-input:disabled {
        background: var(--adwola-neutral-100);
        color: var(--adwola-neutral-500);
        cursor: not-allowed;
      }

      .adwola-input--error {
        border-color: var(--adwola-error-500);
      }

      .adwola-input--error:focus {
        border-color: var(--adwola-error-500);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      .adwola-input--success {
        border-color: var(--adwola-success-500);
      }
    `,

    label: `
      /* Form Label */
      .adwola-label {
        display: block;
        font-family: var(--adwola-font-body);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--adwola-neutral-700);
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }

      .adwola-label--required::after {
        content: ' *';
        color: var(--adwola-error-500);
      }
    `
  }
};

// =============================================
// 4. REACT HOOKS & UTILITIES
// =============================================

export const AdwolaReactUtils = `
// Custom Hooks for Adwola Design System

import { useState, useEffect, useRef } from 'react';

// Hook for intersection observer animations
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  
  const animationClass = isVisible 
    ? 'adwola-animate-fade-up' 
    : 'opacity-0 translate-y-4';
    
  return [ref, animationClass];
};

// Hook for theme management
export const useAdwolaTheme = () => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('adwola-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('adwola-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  return { theme, toggleTheme };
};

// Hook for responsive breakpoints
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('lg');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else setBreakpoint('xl');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};

// React Component Examples
export const AdwolaButton = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClass = 'adwola-btn-' + variant;
  const sizeClass = size !== 'md' ? 'adwola-btn-' + variant + '--' + size : '';
  
  return (
    <button 
      className={\`\${baseClass} \${sizeClass} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};

export const AdwolaCard = ({ 
  variant = 'default', 
  children, 
  className = '', 
  ...props 
}) => {
  const cardClass = variant === 'default' ? 'adwola-card' : \`adwola-card-\${variant}\`;
  
  return (
    <div 
      className={\`\${cardClass} \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AdwolaBadge = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <span 
      className={\`adwola-badge adwola-badge--\${variant} \${className}\`}
      {...props}
    >
      {children}
    </span>
  );
};

// Animated wrapper component
export const AdwolaAnimated = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  className = '' 
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={\`\${isVisible ? \`adwola-animate-\${animation}\` : 'opacity-0'} \${className}\`}
      style={{ animationDelay: \`\${delay}s\` }}
    >
      {children}
    </div>
  );
};
`;

// =============================================
// 5. IMPLEMENTATION GUIDE
// =============================================

export const ImplementationGuide = `
# Adwola Design System Implementation Guide

## Step 1: Install CSS
Add the CSS custom properties and utility classes to your project:

\`\`\`css
/* Add to your main CSS file or create adwola-design-system.css */
${adwolaDesignTokensCSS}
${adwolaUtilityClasses}
\`\`\`

## Step 2: Add Component Styles
Choose which components you need and add their styles:

\`\`\`css
/* Add component styles as needed */
${AdwolaComponents.Button.primary}
${AdwolaComponents.Card.default}
${AdwolaComponents.Badge.base}
\`\`\`

## Step 3: Update Your HTML/JSX
Replace existing classes with Adwola design system classes:

### Before:
\`\`\`jsx
<button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl duration-normal px-8 py-4 rounded-2xl text-lg transform hover:scale-105">
  Get Started
</button>
\`\`\`

### After:
\`\`\`jsx
<button className="adwola-btn-primary adwola-btn-primary--lg">
  Get Started
</button>
\`\`\`

## Step 4: Use React Components (Optional)
For React projects, use the provided components:

\`\`\`jsx
import { AdwolaButton, AdwolaCard, AdwolaBadge } from './adwola-components';

function MyComponent() {
  return (
    <AdwolaCard variant="interactive">
      <AdwolaBadge variant="new">New Feature</AdwolaBadge>
      <h3>Amazing Feature</h3>
      <p>Description of the feature...</p>
      <AdwolaButton variant="primary" size="lg">
        Learn More
      </AdwolaButton>
    </AdwolaCard>
  );
}
\`\`\`

## Step 5: Testing Checklist
- [ ] Inter font is loading correctly
- [ ] CSS custom properties are applied
- [ ] Component hover states work
- [ ] Animations are smooth
- [ ] Responsive behavior is correct
- [ ] Dark mode works (if implemented)
- [ ] Accessibility features function
- [ ] Focus states are visible

## Step 6: Migration Strategy
1. **Week 1**: Add CSS custom properties and utility classes
2. **Week 2**: Migrate buttons and basic components
3. **Week 3**: Migrate cards and complex components
4. **Week 4**: Polish animations and accessibility

## Maintenance
- Update CSS custom properties to change colors globally
- Add new component variants by extending existing patterns
- Use design tokens for consistent spacing and sizing
- Regular accessibility audits using the built-in focus utilities
`;

export default {
  css: adwolaDesignTokensCSS,
  utilities: adwolaUtilityClasses,
  components: AdwolaComponents,
  reactUtils: AdwolaReactUtils,
  guide: ImplementationGuide
};
`;

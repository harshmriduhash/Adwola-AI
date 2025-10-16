/**
 * AmplifyAI Design System
 * Centralized design tokens for consistent UI/UX across the platform
 */

export const designTokens = {
  // Spacing scale (based on 4px grid)
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
  },

  // Typography scale
  typography: {
    display: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
    h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
    h3: 'text-xl md:text-2xl font-semibold tracking-tight',
    h4: 'text-lg md:text-xl font-semibold',
    body: 'text-base md:text-lg',
    small: 'text-sm',
    caption: 'text-xs',
  },

  // Color palette
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    accent: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
  },

  // Border radius
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Animation durations
  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Component style presets
export const componentStyles = {
  // Button variants
  button: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300',
    secondary: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-300',
    outline: 'border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300',
    ghost: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300',
  },

  // Card variants
  card: {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
    elevated: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300',
    interactive: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
  },

  // Badge variants
  badge: {
    primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800',
    warning: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800',
  },

  // Layout containers
  container: {
    section: 'py-16 md:py-20 lg:py-24',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    text: 'max-w-4xl mx-auto text-center',
  },

  // Common gradients
  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600',
    accent: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
    warm: 'bg-gradient-to-r from-orange-500 to-red-500',
    cool: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
} as const;

// Animation presets
export const animationPresets = {
  // Entrance animations
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },

  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  // Hover animations
  hover: {
    scale: { scale: 1.05 },
    lift: { y: -5, scale: 1.02 },
    glow: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
  },

  // Tap animations
  tap: {
    scale: { scale: 0.95 },
    press: { scale: 0.98 },
  },

  // Loading animations
  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity },
  },

  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 1.5, repeat: Infinity },
  },
} as const;

// Utility functions
export const spacing = (size: keyof typeof designTokens.spacing) => designTokens.spacing[size];
export const color = (colorName: keyof typeof designTokens.colors, shade: number = 500) => {
  const colorObj = designTokens.colors[colorName];
  if (typeof colorObj === 'object' && shade in colorObj) {
    return colorObj[shade as keyof typeof colorObj];
  }
  return colorObj;
};

// Responsive utilities
export const responsive = {
  // Mobile-first responsive grid
  grid: {
    '1-2-3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '1-2-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    '1-3-4': 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
    '2-3-4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    '1-2-3-4-5': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  },

  // Responsive gaps
  gaps: {
    sm: 'gap-4 md:gap-6',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  },

  // Responsive padding
  padding: {
    section: 'py-12 md:py-16 lg:py-20',
    container: 'px-4 sm:px-6 lg:px-8',
  },

  // Responsive text sizes
  text: {
    hero: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    heading: 'text-2xl md:text-3xl lg:text-4xl',
    subheading: 'text-lg md:text-xl lg:text-2xl',
    body: 'text-base md:text-lg',
  },
};

// Accessibility utilities
export const accessibility = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
  srOnly: 'sr-only',
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50',
  highContrast: 'text-gray-900 dark:text-white',
  reducedMotion: 'motion-reduce:transition-none motion-reduce:transform-none',
};

export default designTokens;
/**
 * Adwola Design System Configuration
 * Extracted from screenshot reference and optimized for modern web standards
 */

export const adwolaDesignSystem = {
  brand: {
    name: "Adwola",
    tagline: "AI-Powered Social Media Content Creation",
    domain: "adwola.com"
  },
  
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe", 
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554"
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0", 
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617"
    },
    accent: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75"
    },
    neutral: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b"
    },
    semantic: {
      success: {
        50: "#f0fdf4",
        500: "#22c55e",
        600: "#16a34a",
        900: "#14532d"
      },
      warning: {
        50: "#fffbeb",
        500: "#f59e0b",
        600: "#d97706",
        900: "#92400e"
      },
      error: {
        50: "#fef2f2",
        500: "#ef4444",
        600: "#dc2626",
        900: "#991b1b"
      },
      info: {
        50: "#eff6ff",
        500: "#3b82f6",
        600: "#2563eb",
        900: "#1e3a8a"
      }
    }
  },
  
  typography: {
    fontFamily: {
      display: ["'Inter'", "system-ui", "sans-serif"],
      body: ["'Inter'", "system-ui", "sans-serif"],
      mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"]
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }]
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    }
  },
  
  spacing: {
    px: "1px",
    0: "0px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem"
  },
  
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
  },
  
  animation: {
    duration: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms"
    },
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  },
  
  breakpoints: {
    sm: "640px",
    md: "768px", 
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
} as const;

export type AdwolaDesignSystem = typeof adwolaDesignSystem;

// Brand messaging configuration
export const adwolaMessaging = {
  tagline: "AI-Powered Social Media Content Creation",
  valueProposition: "Transform your social media strategy with Adwola. Create engaging content campaigns in minutes, not hours.",
  
  keyMessages: {
    speed: "From 6 hours to effortless with Adwola",
    quality: "Professional-quality content that converts",
    scale: "Scale your content strategy without scaling your team", 
    ai: "Powered by the world's most advanced AI models"
  },
  
  socialProof: {
    customers: "1200+ businesses trust Adwola",
    satisfaction: "4.9/5 customer satisfaction rating",
    efficiency: "95% average time reduction",
    reliability: "99.9% uptime guarantee"
  },
  
  callsToAction: {
    primary: "Start with Adwola",
    secondary: "Try Adwola Demo",
    tertiary: "Join Adwola Today"
  }
} as const;

export type AdwolaMessaging = typeof adwolaMessaging;
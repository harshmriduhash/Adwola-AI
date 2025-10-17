import { useEffect, useState } from "react";

/**
 * Hook to detect user's motion preferences
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for accessible animation variants
 * Returns appropriate animation variants based on user's motion preferences
 */
export function useAccessibleAnimation() {
  const prefersReducedMotion = useReducedMotion();

  const getVariants = (normalVariants: any, reducedVariants?: any) => {
    return prefersReducedMotion ? reducedVariants || {} : normalVariants;
  };

  const getTransition = (normalTransition: any, reducedTransition?: any) => {
    return prefersReducedMotion
      ? reducedTransition || { duration: 0 }
      : normalTransition;
  };

  return {
    prefersReducedMotion,
    getVariants,
    getTransition,
  };
}

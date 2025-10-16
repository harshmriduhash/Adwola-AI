import type React from "react";
import { useCallback, useEffect, useState } from "react";

// Breakpoint definitions matching Tailwind CSS defaults
const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;
type BreakpointValues<T> = Partial<Record<Breakpoint | "default", T>>;

/**
 * Hook to detect current screen size and breakpoint
 */
export function useBreakpoint() {
	const [currentBreakpoint, setCurrentBreakpoint] = useState<
		Breakpoint | "default"
	>("default");
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 0,
		height: typeof window !== "undefined" ? window.innerHeight : 0,
	});

	const getBreakpoint = useCallback((width: number): Breakpoint | "default" => {
		if (width >= breakpoints["2xl"]) return "2xl";
		if (width >= breakpoints.xl) return "xl";
		if (width >= breakpoints.lg) return "lg";
		if (width >= breakpoints.md) return "md";
		if (width >= breakpoints.sm) return "sm";
		return "default";
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			setWindowSize({ width, height });
			setCurrentBreakpoint(getBreakpoint(width));
		};

		// Set initial values
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [getBreakpoint]);

	const isBreakpoint = useCallback(
		(bp: Breakpoint) => {
			return windowSize.width >= breakpoints[bp];
		},
		[windowSize.width],
	);

	const isMobile = !isBreakpoint("md");
	const isTablet = isBreakpoint("md") && !isBreakpoint("lg");
	const isDesktop = isBreakpoint("lg");

	return {
		currentBreakpoint,
		windowSize,
		isBreakpoint,
		isMobile,
		isTablet,
		isDesktop,
		breakpoints,
	};
}

/**
 * Hook to get responsive values based on current breakpoint
 */
export function useResponsiveValue<T>(
	values: BreakpointValues<T>,
): T | undefined {
	const { currentBreakpoint, isBreakpoint } = useBreakpoint();

	// Find the most appropriate value for current breakpoint
	const getValue = useCallback((): T | undefined => {
		// Check if there's a direct match for current breakpoint
		if (values[currentBreakpoint] !== undefined) {
			return values[currentBreakpoint];
		}

		// Fall back to smaller breakpoints
		const orderedBreakpoints: (Breakpoint | "default")[] = [
			"2xl",
			"xl",
			"lg",
			"md",
			"sm",
			"default",
		];

		for (const bp of orderedBreakpoints) {
			if (bp === "default" || isBreakpoint(bp as Breakpoint)) {
				if (values[bp] !== undefined) {
					return values[bp];
				}
			}
		}

		return undefined;
	}, [currentBreakpoint, isBreakpoint, values]);

	return getValue();
}

/**
 * Hook for responsive grid columns
 */
export function useResponsiveColumns(
	columns: BreakpointValues<number>,
): number {
	return useResponsiveValue(columns) || 1;
}

/**
 * Hook to detect touch device
 */
export function useTouch() {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkTouch = () => {
			setIsTouch(
				"ontouchstart" in window ||
					navigator.maxTouchPoints > 0 ||
					(navigator as any).msMaxTouchPoints > 0,
			);
		};

		checkTouch();

		// Re-check on resize (for devices that can switch between touch/non-touch)
		window.addEventListener("resize", checkTouch);
		return () => window.removeEventListener("resize", checkTouch);
	}, []);

	return isTouch;
}

/**
 * Hook to detect device orientation
 */
export function useOrientation() {
	const [orientation, setOrientation] = useState<"portrait" | "landscape">(
		"portrait",
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkOrientation = () => {
			setOrientation(
				window.innerHeight > window.innerWidth ? "portrait" : "landscape",
			);
		};

		checkOrientation();

		window.addEventListener("resize", checkOrientation);
		window.addEventListener("orientationchange", checkOrientation);

		return () => {
			window.removeEventListener("resize", checkOrientation);
			window.removeEventListener("orientationchange", checkOrientation);
		};
	}, []);

	return orientation;
}

/**
 * Hook for responsive spacing/sizing
 */
export function useResponsiveSpacing() {
	const { isMobile, isTablet, isDesktop } = useBreakpoint();

	const getSpacing = useCallback(
		(mobile: number, tablet?: number, desktop?: number) => {
			if (isDesktop && desktop !== undefined) return desktop;
			if (isTablet && tablet !== undefined) return tablet;
			return mobile;
		},
		[isMobile, isTablet, isDesktop],
	);

	const getSizing = useCallback(
		(mobile: string, tablet?: string, desktop?: string) => {
			if (isDesktop && desktop !== undefined) return desktop;
			if (isTablet && tablet !== undefined) return tablet;
			return mobile;
		},
		[isMobile, isTablet, isDesktop],
	);

	return { getSpacing, getSizing };
}

/**
 * Hook for responsive font sizes
 */
export function useResponsiveFontSize() {
	const value = useResponsiveValue({
		default: "text-sm",
		sm: "text-base",
		md: "text-lg",
		lg: "text-xl",
		xl: "text-2xl",
	});

	return value || "text-base";
}

/**
 * Hook to handle safe area insets for mobile devices
 */
export function useSafeArea() {
	const [safeArea, setSafeArea] = useState({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		const updateSafeArea = () => {
			const style = getComputedStyle(document.documentElement);
			setSafeArea({
				top: parseInt(style.getPropertyValue("--safe-area-inset-top") || "0"),
				right: parseInt(
					style.getPropertyValue("--safe-area-inset-right") || "0",
				),
				bottom: parseInt(
					style.getPropertyValue("--safe-area-inset-bottom") || "0",
				),
				left: parseInt(style.getPropertyValue("--safe-area-inset-left") || "0"),
			});
		};

		updateSafeArea();

		// Update on orientation change
		window.addEventListener("orientationchange", updateSafeArea);
		return () =>
			window.removeEventListener("orientationchange", updateSafeArea);
	}, []);

	return safeArea;
}

/**
 * Hook for viewport height that accounts for mobile browser bars
 */
export function useViewportHeight() {
	const [viewportHeight, setViewportHeight] = useState(
		typeof window !== "undefined" ? window.innerHeight : 0,
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const updateHeight = () => {
			// Use visualViewport API if available (better for mobile)
			const height = window.visualViewport?.height || window.innerHeight;
			setViewportHeight(height);

			// Set CSS custom property for use in styles
			document.documentElement.style.setProperty("--vh", `${height * 0.01}px`);
		};

		updateHeight();

		// Listen to both resize and visual viewport changes
		window.addEventListener("resize", updateHeight);
		window.visualViewport?.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
			window.visualViewport?.removeEventListener("resize", updateHeight);
		};
	}, []);

	return viewportHeight;
}

/**
 * Responsive component wrapper
 */
export interface ResponsiveComponentProps {
	children: React.ReactNode;
	mobile?: React.ReactNode;
	tablet?: React.ReactNode;
	desktop?: React.ReactNode;
	showOn?: Breakpoint[];
	hideOn?: Breakpoint[];
}

export function ResponsiveComponent({
	children,
	mobile,
	tablet,
	desktop,
	showOn,
	hideOn,
}: ResponsiveComponentProps) {
	const { currentBreakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();

	// Check if component should be hidden
	if (hideOn && hideOn.includes(currentBreakpoint as Breakpoint)) {
		return null;
	}

	// Check if component should be shown only on specific breakpoints
	if (showOn && !showOn.includes(currentBreakpoint as Breakpoint)) {
		return null;
	}

	// Return specific component for breakpoint
	if (isDesktop && desktop) return <>{desktop}</>;
	if (isTablet && tablet) return <>{tablet}</>;
	if (isMobile && mobile) return <>{mobile}</>;

	return <>{children}</>;
}

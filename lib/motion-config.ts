// Performance optimization for Framer Motion

export const motionConfig = {
	// Reduce animations for users who prefer reduced motion
	respectPrefersReducedMotion: true,

	// Optimize performance
	layoutScroll: false,

	// Global transition defaults
	transition: {
		duration: 0.3,
		ease: "easeOut",
	},
};

// Reduced motion variants for accessibility
export const reducedMotionVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

// Performance-optimized animation presets
export const performancePresets = {
	fadeIn: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.3 },
	},
	slideUp: {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.4, ease: "easeOut" },
	},
	slideDown: {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.4, ease: "easeOut" },
	},
	scaleIn: {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.3, ease: "easeOut" },
	},
};

// Viewport configuration for intersection observer
export const viewportConfig = {
	once: true,
	margin: "-100px",
	amount: 0.3,
};

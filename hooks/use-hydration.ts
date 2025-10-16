"use client";

import type React from "react";
import { useEffect, useState } from "react";

/**
 * Hook to handle client-side hydration safely
 * Prevents hydration mismatches by ensuring consistent server/client rendering
 */
export function useHydration() {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return isHydrated;
}

/**
 * Component wrapper for hydration-safe rendering
 * Shows fallback content during SSR, then actual content after hydration
 */
export function HydrationSafe({ 
	children, 
	fallback 
}: { 
	children: React.ReactNode; 
	fallback?: React.ReactNode;
}): React.ReactElement | null {
	const isHydrated = useHydration();

	if (!isHydrated) {
		return fallback as React.ReactElement || null;
	}

	return children as React.ReactElement;
}
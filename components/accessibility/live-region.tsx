"use client";

import { useEffect, useRef } from "react";

interface LiveRegionProps {
  message: string;
  politeness?: "polite" | "assertive" | "off";
  atomic?: boolean;
  relevant?: "additions" | "removals" | "text" | "all";
  className?: string;
}

export function LiveRegion({
  message,
  politeness = "polite",
  atomic = true,
  relevant = "all",
  className = "sr-only",
}: LiveRegionProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (regionRef.current && message) {
      // Clear the region first to ensure screen readers announce the new message
      regionRef.current.textContent = "";

      // Use a timeout to ensure the clearing is processed before setting new content
      const timeoutId = setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = message;
        }
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div
      ref={regionRef}
      className={className}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      role="status"
    />
  );
}

// Hook for managing live region messages
export function useLiveRegion() {
  const announce = (
    message: string,
    politeness: "polite" | "assertive" = "polite"
  ) => {
    // Create a temporary live region for one-off announcements
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", politeness);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";

    document.body.appendChild(liveRegion);

    // Announce the message
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 10);

    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 2000);
  };

  return { announce };
}

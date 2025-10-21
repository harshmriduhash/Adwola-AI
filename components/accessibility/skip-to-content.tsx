"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SkipToContentProps {
  targetId?: string;
  className?: string;
}

export function SkipToContent({
  targetId = "main-content",
  className,
}: SkipToContentProps) {
  const handleSkip = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={handleSkip}
      className={cn(
        "absolute top-4 left-4 z-[9999] opacity-0 focus:opacity-100 transform -translate-y-full focus:translate-y-0 transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg",
        "sr-only focus:not-sr-only",
        className
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSkip();
        }
      }}
    >
      Skip to main content
    </Button>
  );
}

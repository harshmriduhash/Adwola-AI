"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, useRef, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface BackgroundParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const FloatingParticle = memo(function FloatingParticle({
  particle,
  containerRef,
}: {
  particle: BackgroundParticle;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!particleRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newY = (particle.y + particle.speed) % (rect.height + 100);
      
      particleRef.current.style.transform = `translate(${particle.x}px, ${newY}px)`;
      
      // Update particle position for next frame
      particle.y = newY;
    };

    const intervalId = setInterval(updatePosition, 50);
    return () => clearInterval(intervalId);
  }, [particle, containerRef]);

  return (
    <motion.div
      ref={particleRef}
      className={cn(
        "absolute rounded-full blur-sm opacity-20",
        particle.color
      )}
      style={{
        width: particle.size,
        height: particle.size,
        left: particle.x,
        top: particle.y,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
});

const GradientOrb = memo(function GradientOrb({
  className,
  size = "large",
  position,
  colors,
  animationDelay = 0,
}: {
  className?: string;
  size?: "small" | "medium" | "large";
  position: { x: string; y: string };
  colors: string;
  animationDelay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-64 h-64",
    large: "w-96 h-96",
  };

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "absolute rounded-full blur-3xl",
          sizeClasses[size],
          colors,
          className
        )}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl will-change-transform",
        sizeClasses[size],
        colors,
        className
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 20 + animationDelay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: animationDelay,
      }}
    />
  );
});

const GridPattern = memo(function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-200/20 dark:text-gray-700/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
});

const RadialGradient = memo(function RadialGradient() {
  return (
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-gray-900/50" />
  );
});

export const AnimatedBackground = memo(function AnimatedBackground({
  className,
  showParticles = true,
  showGrid = false,
  variant = "default",
}: {
  className?: string;
  showParticles?: boolean;
  showGrid?: boolean;
  variant?: "default" | "hero" | "minimal";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<BackgroundParticle[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    if (showParticles && !prefersReducedMotion) {
      const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        size: Math.random() * 8 + 4,
        color: [
          "bg-blue-400/30",
          "bg-purple-400/30",
          "bg-pink-400/30",
          "bg-indigo-400/30",
          "bg-teal-400/30",
        ][Math.floor(Math.random() * 5)],
        speed: Math.random() * 2 + 0.5,
      }));
      setParticles(generatedParticles);
    }
  }, [showParticles, prefersReducedMotion]);

  const getBackgroundConfig = () => {
    switch (variant) {
      case "hero":
        return {
          baseGradient: "bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20",
          orbs: [
            {
              size: "large" as const,
              position: { x: "10%", y: "20%" },
              colors: "bg-gradient-to-br from-blue-400/20 to-cyan-400/20",
              delay: 0,
            },
            {
              size: "medium" as const,
              position: { x: "70%", y: "60%" },
              colors: "bg-gradient-to-br from-purple-400/20 to-pink-400/20",
              delay: 5,
            },
            {
              size: "small" as const,
              position: { x: "50%", y: "10%" },
              colors: "bg-gradient-to-br from-indigo-400/15 to-blue-400/15",
              delay: 10,
            },
          ],
        };
      case "minimal":
        return {
          baseGradient: "bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
          orbs: [
            {
              size: "medium" as const,
              position: { x: "80%", y: "80%" },
              colors: "bg-gradient-to-br from-gray-300/10 to-gray-400/10",
              delay: 0,
            },
          ],
        };
      default:
        return {
          baseGradient: "bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
          orbs: [
            {
              size: "large" as const,
              position: { x: "20%", y: "30%" },
              colors: "bg-gradient-to-br from-slate-400/10 to-slate-500/10",
              delay: 0,
            },
          ],
        };
    }
  };

  const config = getBackgroundConfig();

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        config.baseGradient,
        className
      )}
    >
      {/* Grid pattern */}
      {showGrid && <GridPattern />}

      {/* Gradient orbs */}
      {config.orbs.map((orb, index) => (
        <GradientOrb
          key={index}
          size={orb.size}
          position={orb.position}
          colors={orb.colors}
          animationDelay={orb.delay}
        />
      ))}

      {/* Floating particles */}
      {isClient && showParticles && !prefersReducedMotion && particles.length > 0 && (
        <>
          {particles.map((particle) => (
            <FloatingParticle
              key={particle.id}
              particle={particle}
              containerRef={containerRef}
            />
          ))}
        </>
      )}

      {/* Radial gradient overlay */}
      <RadialGradient />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
});
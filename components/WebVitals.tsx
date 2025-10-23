"use client";

import { useEffect } from "react";
import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

interface WebVitalsProps {
  enabled?: boolean;
}

// Performance thresholds (based on Google's recommendations)
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint replaces FID
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 600, poor: 1500 },
};

function getPerformanceRating(
  metric: Metric
): "good" | "needs-improvement" | "poor" {
  const threshold = THRESHOLDS[metric.name as keyof typeof THRESHOLDS];
  if (!threshold) return "good";

  if (metric.value <= threshold.good) return "good";
  if (metric.value <= threshold.poor) return "needs-improvement";
  return "poor";
}

function logMetric(metric: Metric) {
  const rating = getPerformanceRating(metric);
  const roundedValue = Math.round(metric.value);

  console.log(`🚀 Web Vitals - ${metric.name}:`, {
    value: roundedValue,
    rating,
    delta: Math.round(metric.delta),
    entries: metric.entries,
  });

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    // Send to your analytics service
    sendToAnalytics({
      name: metric.name,
      value: roundedValue,
      rating,
      delta: Math.round(metric.delta),
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now(),
    });
  }
}

function sendToAnalytics(data: Record<string, unknown>) {
  // Example: Send to Google Analytics
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (
      window as typeof window & { gtag: (...args: unknown[]) => void }
    ).gtag;
    gtag("event", "web_vitals", {
      event_category: "Web Vitals",
      event_label: data.name,
      value: data.value,
      custom_map: {
        metric_rating: data.rating,
        metric_delta: data.delta,
      },
    });
  }

  // Example: Send to custom endpoint
  if (navigator.sendBeacon) {
    const body = JSON.stringify(data);
    navigator.sendBeacon("/api/web-vitals", body);
  }

  // Example: Send to console in development
  if (process.env.NODE_ENV === "development") {
    console.table(data);
  }
}

export default function WebVitals({ enabled = true }: WebVitalsProps) {
  useEffect(() => {
    if (!enabled) return;

    // Measure all Core Web Vitals
    onCLS(logMetric);
    onINP(logMetric); // Interaction to Next Paint (replaces FID)
    onFCP(logMetric);
    onLCP(logMetric);
    onTTFB(logMetric);

    // Additional performance monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor navigation timing
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;

        if (navigation) {
          const timingMetrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            domInteractive: navigation.domInteractive - navigation.fetchStart,
            domComplete: navigation.domComplete - navigation.fetchStart,
            loadComplete: navigation.loadEventEnd - navigation.fetchStart,
          };

          console.log("📊 Navigation Timing:", timingMetrics);

          if (process.env.NODE_ENV === "production") {
            sendToAnalytics({
              type: "navigation-timing",
              ...timingMetrics,
              url: window.location.href,
              timestamp: Date.now(),
            });
          }
        }
      });

      // Monitor resource loading performance
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "resource") {
            const resource = entry as PerformanceResourceTiming;

            // Log slow resources (> 1s)
            if (resource.duration > 1000) {
              console.warn("🐌 Slow Resource:", {
                name: resource.name,
                duration: Math.round(resource.duration),
                type: resource.initiatorType,
                size: resource.transferSize,
              });
            }
          }
        }
      });

      observer.observe({ type: "resource", buffered: true });

      // Monitor long tasks (performance bottlenecks)
      if ("PerformanceObserver" in window) {
        try {
          const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.warn("⚠️ Long Task Detected:", {
                duration: Math.round(entry.duration),
                startTime: Math.round(entry.startTime),
              });

              if (process.env.NODE_ENV === "production") {
                sendToAnalytics({
                  type: "long-task",
                  duration: Math.round(entry.duration),
                  startTime: Math.round(entry.startTime),
                  url: window.location.href,
                  timestamp: Date.now(),
                });
              }
            }
          });

          longTaskObserver.observe({ type: "longtask", buffered: true });
        } catch {
          // Long task observer not supported
        }
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [enabled]);

  return null; // This component doesn't render anything
}

// Export function for manual metric reporting
export function reportWebVitals(metric: Metric) {
  logMetric(metric);
}

// Export function for custom performance marks
export function markPerformance(name: string) {
  if (typeof window !== "undefined" && "performance" in window) {
    performance.mark(name);
  }
}

// Export function for measuring performance between marks
export function measurePerformance(
  name: string,
  startMark: string,
  endMark?: string
) {
  if (typeof window !== "undefined" && "performance" in window) {
    try {
      const measure = performance.measure(name, startMark, endMark);
      console.log(
        `📏 Performance Measure - ${name}:`,
        Math.round(measure.duration),
        "ms"
      );
      return measure.duration;
    } catch (e) {
      console.warn("Failed to measure performance:", e);
    }
  }
  return 0;
}

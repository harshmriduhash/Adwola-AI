// Performance measurement utilities for AmplifyAI
import React from "react";

export class PerformanceMonitor {
	private static instance: PerformanceMonitor;
	private measurements: Map<string, number> = new Map();
	private enabled: boolean =
		typeof window !== "undefined" && "performance" in window;

	static getInstance(): PerformanceMonitor {
		if (!PerformanceMonitor.instance) {
			PerformanceMonitor.instance = new PerformanceMonitor();
		}
		return PerformanceMonitor.instance;
	}

	// Start measuring an operation
	startMeasurement(name: string): void {
		if (!this.enabled) return;

		const startTime = performance.now();
		this.measurements.set(name, startTime);
		performance.mark(`${name}-start`);
	}

	// End measuring an operation and log the result
	endMeasurement(name: string): number {
		if (!this.enabled) return 0;

		const startTime = this.measurements.get(name);
		if (!startTime) {
			console.warn(`No start time found for measurement: ${name}`);
			return 0;
		}

		const endTime = performance.now();
		const duration = endTime - startTime;

		performance.mark(`${name}-end`);
		performance.measure(name, `${name}-start`, `${name}-end`);

		this.measurements.delete(name);

		// Log the measurement
		console.log(`⏱️ Performance: ${name} took ${duration.toFixed(2)}ms`);

		// Send to analytics in production
		if (process.env.NODE_ENV === "production") {
			this.sendToAnalytics("custom-timing", {
				name,
				duration: Math.round(duration),
				timestamp: Date.now(),
				url: window.location.href,
			});
		}

		return duration;
	}

	// Measure an async operation
	async measureAsync<T>(name: string, operation: () => Promise<T>): Promise<T> {
		this.startMeasurement(name);
		try {
			const result = await operation();
			this.endMeasurement(name);
			return result;
		} catch (error) {
			this.endMeasurement(name);
			throw error;
		}
	}

	// Measure a synchronous operation
	measureSync<T>(name: string, operation: () => T): T {
		this.startMeasurement(name);
		try {
			const result = operation();
			this.endMeasurement(name);
			return result;
		} catch (error) {
			this.endMeasurement(name);
			throw error;
		}
	}

	// Send measurement to analytics
	private sendToAnalytics(type: string, data: Record<string, unknown>): void {
		if (typeof navigator !== "undefined" && navigator.sendBeacon) {
			const payload = JSON.stringify({ type, ...data });
			navigator.sendBeacon("/api/web-vitals", payload);
		}
	}

	// Get all performance entries
	getPerformanceEntries(type?: string): PerformanceEntry[] {
		if (!this.enabled) return [];

		if (type) {
			return performance.getEntriesByType(type);
		}
		return performance.getEntries();
	}

	// Clear performance entries
	clearPerformanceEntries(): void {
		if (!this.enabled) return;
		performance.clearMarks();
		performance.clearMeasures();
	}
}

// Convenience functions
export const perf = PerformanceMonitor.getInstance();

// Decorator for measuring method execution time
export function measureMethod(
	target: { constructor: { name: string } },
	propertyName: string,
	descriptor: PropertyDescriptor,
) {
	const method = descriptor.value;

	descriptor.value = function (...args: unknown[]) {
		const className = target.constructor.name;
		const methodName = `${className}.${propertyName}`;

		return perf.measureSync(methodName, () => method.apply(this, args));
	};

	return descriptor;
}

// Higher-order component for measuring component render time
export function withPerformanceMonitoring<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	componentName?: string,
) {
	return function PerformanceMonitoredComponent(props: P) {
		const name =
			componentName || WrappedComponent.displayName || WrappedComponent.name;

		React.useEffect(() => {
			perf.startMeasurement(`${name}-mount`);
			return () => {
				perf.endMeasurement(`${name}-mount`);
			};
		}, [name]);

		React.useEffect(() => {
			perf.startMeasurement(`${name}-render`);
			perf.endMeasurement(`${name}-render`);
		});

		return React.createElement(WrappedComponent, props);
	};
}

// Hook for measuring custom operations
export function usePerformanceMonitor() {
	const measureAsync = React.useCallback(
		async <T>(name: string, operation: () => Promise<T>): Promise<T> => {
			return perf.measureAsync(name, operation);
		},
		[],
	);

	const measureSync = React.useCallback(
		<T>(name: string, operation: () => T): T => {
			return perf.measureSync(name, operation);
		},
		[],
	);

	const startMeasurement = React.useCallback((name: string) => {
		perf.startMeasurement(name);
	}, []);

	const endMeasurement = React.useCallback((name: string) => {
		return perf.endMeasurement(name);
	}, []);

	return {
		measureAsync,
		measureSync,
		startMeasurement,
		endMeasurement,
	};
}

// Specific measurement functions for AmplifyAI operations
export const AmplifyAIMetrics = {
	// AI Content Generation
	measureContentGeneration: async <T>(
		operation: () => Promise<T>,
	): Promise<T> => {
		return perf.measureAsync("ai-content-generation", operation);
	},

	// Database Operations
	measureDatabaseQuery: async <T>(
		queryName: string,
		operation: () => Promise<T>,
	): Promise<T> => {
		return perf.measureAsync(`db-query-${queryName}`, operation);
	},

	// Component Rendering
	measureComponentRender: <T>(componentName: string, operation: () => T): T => {
		return perf.measureSync(`component-render-${componentName}`, operation);
	},

	// API Calls
	measureApiCall: async <T>(
		endpoint: string,
		operation: () => Promise<T>,
	): Promise<T> => {
		return perf.measureAsync(`api-call-${endpoint}`, operation);
	},

	// Real-time Updates
	measureRealtimeUpdate: <T>(updateType: string, operation: () => T): T => {
		return perf.measureSync(`realtime-${updateType}`, operation);
	},
};

// Performance budget alerts
export const PerformanceBudget = {
	// Define performance budgets (in milliseconds)
	budgets: {
		"ai-content-generation": 20000, // 20 seconds max
		"db-query": 1000, // 1 second max
		"component-render": 16, // 16ms for 60fps
		"api-call": 5000, // 5 seconds max
		"realtime-update": 100, // 100ms max
	},

	// Check if measurement exceeds budget
	checkBudget(name: string, duration: number): boolean {
		const budget = this.budgets[name as keyof typeof this.budgets];
		if (!budget) return true;

		const exceeds = duration > budget;
		if (exceeds) {
			console.warn(
				`🚨 Performance Budget Exceeded: ${name} took ${duration.toFixed(2)}ms (budget: ${budget}ms)`,
			);

			// In production, send alert
			if (process.env.NODE_ENV === "production") {
				perf["sendToAnalytics"]("budget-exceeded", {
					name,
					duration: Math.round(duration),
					budget,
					timestamp: Date.now(),
				});
			}
		}

		return !exceeds;
	},
};

export default perf;

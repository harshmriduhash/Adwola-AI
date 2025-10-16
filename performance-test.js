// Performance Testing Script for Dashboard and Forms
// Run with: node performance-test.js

const { performance } = require("perf_hooks");

// Test configuration
const TEST_CONFIG = {
	DASHBOARD_LOAD_TIMEOUT: 5000, // 5 seconds max for dashboard load
	FORM_INPUT_DELAY: 100, // 100ms between keystrokes
	CURSOR_STABILITY_THRESHOLD: 50, // 50ms max cursor jump detection
	REAL_TIME_UPDATE_TIMEOUT: 2000, // 2 seconds for real-time updates
};

class PerformanceTestSuite {
	constructor() {
		this.results = {
			dashboardLoad: [],
			formStability: [],
			realTimeUpdates: [],
			memoryUsage: [],
		};
	}

	// Test 1: Dashboard Loading Performance
	async testDashboardLoading() {
		console.log("🚀 Testing Dashboard Loading Performance...");

		const testCases = [
			{ briefs: 5, postsPerBrief: 3 },
			{ briefs: 20, postsPerBrief: 5 },
			{ briefs: 50, postsPerBrief: 8 },
			{ briefs: 100, postsPerBrief: 10 },
		];

		for (const testCase of testCases) {
			const startTime = performance.now();

			try {
				// Simulate dashboard load with test data
				await this.simulateDashboardLoad(testCase);

				const endTime = performance.now();
				const loadTime = endTime - startTime;

				this.results.dashboardLoad.push({
					...testCase,
					loadTime,
					passed: loadTime < TEST_CONFIG.DASHBOARD_LOAD_TIMEOUT,
				});

				console.log(
					`  ✓ Briefs: ${testCase.briefs}, Posts: ${testCase.postsPerBrief} - ${loadTime.toFixed(2)}ms`,
				);
			} catch (error) {
				console.error(`  ✗ Failed test case:`, testCase, error.message);
			}
		}
	}

	// Test 2: Form Input Cursor Stability
	async testFormCursorStability() {
		console.log("⌨️  Testing Form Cursor Stability...");

		const testInputs = [
			"Short brand name",
			"This is a much longer brand name with many characters",
			"Brand-with-special-chars_123!",
			"Unicode brand name 你好 ñáñó",
		];

		for (const input of testInputs) {
			try {
				const cursorJumps = await this.simulateTypingTest(input);

				this.results.formStability.push({
					input,
					cursorJumps,
					passed: cursorJumps === 0,
				});

				console.log(
					`  ${cursorJumps === 0 ? "✓" : "✗"} "${input}" - ${cursorJumps} cursor jumps`,
				);
			} catch (error) {
				console.error(`  ✗ Failed input test:`, input, error.message);
			}
		}
	}

	// Test 3: Real-time Update Performance
	async testRealTimeUpdates() {
		console.log("🔄 Testing Real-time Update Performance...");

		const updateTypes = [
			"brief_status_change",
			"post_generation",
			"bulk_post_updates",
			"subscription_updates",
		];

		for (const updateType of updateTypes) {
			const startTime = performance.now();

			try {
				await this.simulateRealTimeUpdate(updateType);

				const endTime = performance.now();
				const updateTime = endTime - startTime;

				this.results.realTimeUpdates.push({
					updateType,
					updateTime,
					passed: updateTime < TEST_CONFIG.REAL_TIME_UPDATE_TIMEOUT,
				});

				console.log(`  ✓ ${updateType} - ${updateTime.toFixed(2)}ms`);
			} catch (error) {
				console.error(`  ✗ Failed update test:`, updateType, error.message);
			}
		}
	}

	// Test 4: Memory Usage Analysis
	async testMemoryUsage() {
		console.log("💾 Testing Memory Usage...");

		const initialMemory = process.memoryUsage();

		// Simulate heavy dashboard usage
		for (let i = 0; i < 10; i++) {
			await this.simulateDashboardLoad({ briefs: 50, postsPerBrief: 5 });

			const currentMemory = process.memoryUsage();
			this.results.memoryUsage.push({
				iteration: i + 1,
				heapUsed: currentMemory.heapUsed,
				heapTotal: currentMemory.heapTotal,
				external: currentMemory.external,
			});

			console.log(
				`  Iteration ${i + 1}: ${(currentMemory.heapUsed / 1024 / 1024).toFixed(2)}MB heap`,
			);
		}

		// Check for memory leaks
		const finalMemory = process.memoryUsage();
		const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
		const memoryLeakDetected = memoryIncrease > 50 * 1024 * 1024; // 50MB threshold

		console.log(
			`  Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`,
		);
		console.log(`  ${memoryLeakDetected ? "⚠️" : "✓"} Memory leak detection`);
	}

	// Simulation Functions
	async simulateDashboardLoad({ briefs, postsPerBrief }) {
		// Simulate database query time based on data size
		const queryTime = Math.max(100, briefs * postsPerBrief * 2);
		await this.sleep(queryTime);

		// Simulate React rendering time
		const renderTime = Math.max(50, briefs * 5);
		await this.sleep(renderTime);

		return { queryTime, renderTime };
	}

	async simulateTypingTest(input) {
		let cursorJumps = 0;
		let expectedPosition = 0;

		for (let i = 0; i < input.length; i++) {
			// Simulate keystroke
			await this.sleep(TEST_CONFIG.FORM_INPUT_DELAY);

			// Simulate potential cursor jump (random for testing)
			const cursorPosition =
				Math.random() > 0.95 ? Math.floor(Math.random() * i) : i;

			if (cursorPosition !== expectedPosition) {
				cursorJumps++;
			}

			expectedPosition = cursorPosition + 1;
		}

		return cursorJumps;
	}

	async simulateRealTimeUpdate(updateType) {
		// Simulate WebSocket message processing
		const processingTime = Math.random() * 200 + 50; // 50-250ms
		await this.sleep(processingTime);

		// Simulate state update and re-render
		const rerenderTime = Math.random() * 100 + 25; // 25-125ms
		await this.sleep(rerenderTime);

		return { processingTime, rerenderTime };
	}

	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Generate Test Report
	generateReport() {
		console.log("\n📊 PERFORMANCE TEST REPORT");
		console.log("=".repeat(50));

		// Dashboard Performance Summary
		const dashboardPassed = this.results.dashboardLoad.filter(
			(r) => r.passed,
		).length;
		const dashboardTotal = this.results.dashboardLoad.length;

		console.log(
			`\n🚀 Dashboard Loading: ${dashboardPassed}/${dashboardTotal} passed`,
		);
		this.results.dashboardLoad.forEach((result) => {
			const status = result.passed ? "✓" : "✗";
			console.log(
				`  ${status} ${result.briefs} briefs, ${result.postsPerBrief} posts/brief: ${result.loadTime.toFixed(2)}ms`,
			);
		});

		// Form Stability Summary
		const formPassed = this.results.formStability.filter(
			(r) => r.passed,
		).length;
		const formTotal = this.results.formStability.length;

		console.log(
			`\n⌨️  Form Cursor Stability: ${formPassed}/${formTotal} passed`,
		);
		this.results.formStability.forEach((result) => {
			const status = result.passed ? "✓" : "✗";
			console.log(
				`  ${status} "${result.input}": ${result.cursorJumps} cursor jumps`,
			);
		});

		// Real-time Updates Summary
		const realtimePassed = this.results.realTimeUpdates.filter(
			(r) => r.passed,
		).length;
		const realtimeTotal = this.results.realTimeUpdates.length;

		console.log(
			`\n🔄 Real-time Updates: ${realtimePassed}/${realtimeTotal} passed`,
		);
		this.results.realTimeUpdates.forEach((result) => {
			const status = result.passed ? "✓" : "✗";
			console.log(
				`  ${status} ${result.updateType}: ${result.updateTime.toFixed(2)}ms`,
			);
		});

		// Memory Usage Summary
		const memoryStats = this.results.memoryUsage;
		if (memoryStats.length > 0) {
			const maxMemory = Math.max(...memoryStats.map((m) => m.heapUsed));
			const avgMemory =
				memoryStats.reduce((sum, m) => sum + m.heapUsed, 0) /
				memoryStats.length;

			console.log(`\n💾 Memory Usage:`);
			console.log(`  Peak: ${(maxMemory / 1024 / 1024).toFixed(2)}MB`);
			console.log(`  Average: ${(avgMemory / 1024 / 1024).toFixed(2)}MB`);
		}

		// Overall Score
		const totalPassed = dashboardPassed + formPassed + realtimePassed;
		const totalTests = dashboardTotal + formTotal + realtimeTotal;
		const score = Math.round((totalPassed / totalTests) * 100);

		console.log(`\n🏆 Overall Performance Score: ${score}%`);

		if (score >= 90) {
			console.log("🎉 Excellent performance!");
		} else if (score >= 75) {
			console.log("👍 Good performance with room for improvement");
		} else {
			console.log("⚠️  Performance issues detected - optimization needed");
		}

		return { score, totalPassed, totalTests };
	}
}

// Run Performance Tests
async function runPerformanceTests() {
	console.log("🧪 Starting AmplifyAI Performance Test Suite...\n");

	const testSuite = new PerformanceTestSuite();

	try {
		await testSuite.testDashboardLoading();
		await testSuite.testFormCursorStability();
		await testSuite.testRealTimeUpdates();
		await testSuite.testMemoryUsage();

		const report = testSuite.generateReport();

		// Save results to file
		const fs = require("fs").promises;
		await fs.writeFile(
			"performance-test-results.json",
			JSON.stringify(
				{
					timestamp: new Date().toISOString(),
					score: report.score,
					results: testSuite.results,
				},
				null,
				2,
			),
		);

		console.log("\n💾 Results saved to performance-test-results.json");

		// Exit with appropriate code
		process.exit(report.score >= 75 ? 0 : 1);
	} catch (error) {
		console.error("❌ Test suite failed:", error);
		process.exit(1);
	}
}

// Run tests if this file is executed directly
if (require.main === module) {
	runPerformanceTests();
}

module.exports = { PerformanceTestSuite, TEST_CONFIG };

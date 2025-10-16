# Performance Monitoring & Prevention Guide

## 🔍 **Monitoring Setup**

### **React DevTools Profiler Integration**

```typescript
// components/PerformanceMonitor.tsx
"use client";

import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime // when React committed this update
) => {
  // Log slow renders (> 100ms)
  if (actualDuration > 100) {
    console.warn(`Slow render detected in ${id}:`, {
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    });
    
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'slow_render', {
        component_id: id,
        duration: actualDuration,
        phase: phase
      });
    }
  }
};

export function PerformanceMonitor({ children, id }: { 
  children: React.ReactNode; 
  id: string; 
}) {
  return (
    <Profiler id={id} onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
}
```

### **Database Query Performance Tracking**

```typescript
// lib/performance/query-monitor.ts
export class QueryPerformanceMonitor {
  private static instance: QueryPerformanceMonitor;
  private slowQueries: Array<{
    query: string;
    duration: number;
    timestamp: Date;
    userId?: string;
  }> = [];

  static getInstance() {
    if (!QueryPerformanceMonitor.instance) {
      QueryPerformanceMonitor.instance = new QueryPerformanceMonitor();
    }
    return QueryPerformanceMonitor.instance;
  }

  async trackQuery<T>(
    queryName: string,
    queryFn: () => Promise<T>,
    userId?: string
  ): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await queryFn();
      const duration = performance.now() - startTime;
      
      // Log slow queries (> 1000ms)
      if (duration > 1000) {
        this.slowQueries.push({
          query: queryName,
          duration,
          timestamp: new Date(),
          userId
        });
        
        console.warn(`Slow query detected: ${queryName} (${duration.toFixed(2)}ms)`);
        
        // Send to Supabase for analysis
        if (userId) {
          await this.logSlowQueryToDatabase(userId, queryName, Math.round(duration));
        }
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`Query failed: ${queryName} (${duration.toFixed(2)}ms)`, error);
      throw error;
    }
  }

  private async logSlowQueryToDatabase(userId: string, queryType: string, duration: number) {
    // This would call the SQL function we created
    try {
      await fetch('/api/log-slow-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, queryType, duration })
      });
    } catch (error) {
      console.error('Failed to log slow query:', error);
    }
  }

  getSlowQueries() {
    return this.slowQueries;
  }

  clearLogs() {
    this.slowQueries = [];
  }
}
```

### **Real-time Subscription Performance**

```typescript
// lib/performance/subscription-monitor.ts
export class SubscriptionPerformanceMonitor {
  private subscriptionMetrics = new Map<string, {
    messageCount: number;
    lastMessageTime: Date;
    totalLatency: number;
    avgLatency: number;
  }>();

  trackMessage(channelName: string, messageTimestamp: number) {
    const now = Date.now();
    const latency = now - messageTimestamp;
    
    const existing = this.subscriptionMetrics.get(channelName) || {
      messageCount: 0,
      lastMessageTime: new Date(),
      totalLatency: 0,
      avgLatency: 0
    };
    
    existing.messageCount++;
    existing.lastMessageTime = new Date();
    existing.totalLatency += latency;
    existing.avgLatency = existing.totalLatency / existing.messageCount;
    
    this.subscriptionMetrics.set(channelName, existing);
    
    // Alert on high latency
    if (latency > 2000) { // 2 seconds
      console.warn(`High subscription latency: ${channelName} (${latency}ms)`);
    }
  }

  getMetrics() {
    return Object.fromEntries(this.subscriptionMetrics);
  }
}
```

## 🛡️ **Prevention Strategies**

### **ESLint Rules for Performance**

```json
// .eslintrc.js additions
{
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/jsx-key": "error",
    "react/no-array-index-key": "warn"
  },
  "plugins": ["react-hooks"]
}
```

### **Performance Budget Configuration**

```json
// performance-budget.json
{
  "dashboard": {
    "loadTime": 3000,
    "renderTime": 100,
    "memoryUsage": 50,
    "bundleSize": 500
  },
  "forms": {
    "inputLatency": 50,
    "cursorStability": 0,
    "validationTime": 200
  },
  "realtime": {
    "subscriptionLatency": 1000,
    "updateFrequency": 100,
    "messageSize": 10
  }
}
```

### **Code Review Checklist**

```markdown
## Performance Review Checklist

### React Components
- [ ] useCallback for event handlers
- [ ] useMemo for expensive calculations
- [ ] React.memo for stable components
- [ ] Proper key props for lists
- [ ] No inline object/function creation in render

### Database Queries
- [ ] Proper indexing for query patterns
- [ ] Pagination for large datasets
- [ ] Separate queries for optimization
- [ ] Avoid N+1 query patterns

### Real-time Subscriptions
- [ ] Minimal payload size
- [ ] Proper subscription cleanup
- [ ] Debounced state updates
- [ ] Error handling and reconnection

### Forms
- [ ] Stable component references
- [ ] Controlled input patterns
- [ ] Proper event handler memoization
- [ ] Input validation optimization
```

## 📊 **Automated Performance Testing**

### **CI/CD Integration**

```yaml
# .github/workflows/performance.yml
name: Performance Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run performance tests
        run: node performance-test.js
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: performance-results
          path: performance-test-results.json
      
      - name: Performance regression check
        run: |
          if [ -f performance-test-results.json ]; then
            SCORE=$(cat performance-test-results.json | jq '.score')
            if [ $SCORE -lt 75 ]; then
              echo "Performance regression detected: $SCORE%"
              exit 1
            fi
          fi
```

### **Performance Regression Detection**

```typescript
// scripts/performance-regression.ts
import { readFileSync, existsSync } from 'fs';

interface PerformanceResult {
  timestamp: string;
  score: number;
  results: any;
}

function detectRegression() {
  const currentFile = 'performance-test-results.json';
  const baselineFile = 'performance-baseline.json';
  
  if (!existsSync(currentFile) || !existsSync(baselineFile)) {
    console.log('Missing performance files for comparison');
    return;
  }
  
  const current: PerformanceResult = JSON.parse(readFileSync(currentFile, 'utf8'));
  const baseline: PerformanceResult = JSON.parse(readFileSync(baselineFile, 'utf8'));
  
  const scoreDiff = current.score - baseline.score;
  const regressionThreshold = -10; // 10% drop
  
  if (scoreDiff < regressionThreshold) {
    console.error(`Performance regression detected: ${scoreDiff}%`);
    console.error(`Current: ${current.score}%, Baseline: ${baseline.score}%`);
    process.exit(1);
  }
  
  console.log(`Performance check passed: ${current.score}% (${scoreDiff > 0 ? '+' : ''}${scoreDiff}%)`);
}

detectRegression();
```

## 🚨 **Alerting & Monitoring**

### **Performance Alerts**

```typescript
// lib/performance/alerts.ts
export class PerformanceAlerts {
  static async sendSlowQueryAlert(query: string, duration: number, userId: string) {
    if (duration > 5000) { // 5 seconds
      await fetch('/api/alerts/slack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: '#performance',
          text: `🚨 Critical slow query detected: ${query} (${duration}ms) for user ${userId}`,
          priority: 'high'
        })
      });
    }
  }

  static async sendMemoryAlert(usage: number) {
    if (usage > 100 * 1024 * 1024) { // 100MB
      await fetch('/api/alerts/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'dev-team@company.com',
          subject: 'Memory usage alert',
          body: `Memory usage exceeded threshold: ${(usage / 1024 / 1024).toFixed(2)}MB`
        })
      });
    }
  }
}
```

### **Dashboard Health Monitoring**

```typescript
// components/HealthMonitor.tsx
"use client";

import { useEffect, useState } from 'react';

export function HealthMonitor() {
  const [health, setHealth] = useState({
    dashboard: 'healthy',
    database: 'healthy',
    realtime: 'healthy'
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Check dashboard responsiveness
        const dashboardStart = performance.now();
        await fetch('/api/health/dashboard');
        const dashboardTime = performance.now() - dashboardStart;
        
        // Check database connectivity
        const dbStart = performance.now();
        await fetch('/api/health/database');
        const dbTime = performance.now() - dbStart;
        
        setHealth({
          dashboard: dashboardTime > 3000 ? 'slow' : 'healthy',
          database: dbTime > 2000 ? 'slow' : 'healthy',
          realtime: 'healthy' // Add WebSocket health check
        });
        
      } catch (error) {
        console.error('Health check failed:', error);
        setHealth({
          dashboard: 'error',
          database: 'error',
          realtime: 'error'
        });
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    checkHealth(); // Initial check
    
    return () => clearInterval(interval);
  }, []);

  const hasIssues = Object.values(health).some(status => status !== 'healthy');
  
  if (!hasIssues) return null;
  
  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 rounded p-3">
      <h4 className="font-semibold text-yellow-800">System Health</h4>
      {Object.entries(health).map(([service, status]) => (
        <div key={service} className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            status === 'healthy' ? 'bg-green-500' : 
            status === 'slow' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-sm">{service}: {status}</span>
        </div>
      ))}
    </div>
  );
}
```

## 📈 **Performance Metrics Dashboard**

### **Key Performance Indicators (KPIs)**

1. **Dashboard Load Time** - Target: < 3 seconds
2. **Form Input Latency** - Target: < 50ms
3. **Real-time Update Latency** - Target: < 1 second
4. **Memory Usage** - Target: < 100MB heap
5. **Cursor Stability** - Target: 0 jumps
6. **Database Query Time** - Target: < 1 second
7. **Bundle Size** - Target: < 500KB gzipped

### **Weekly Performance Review**

```bash
# scripts/weekly-performance-review.sh
#!/bin/bash

echo "📊 Weekly Performance Review"
echo "=========================="

# Analyze slow query logs
echo "🐌 Slow Query Analysis:"
node scripts/analyze-slow-queries.js

# Check memory usage trends
echo "💾 Memory Usage Trends:"
node scripts/memory-analysis.js

# Review performance test results
echo "🧪 Performance Test Trends:"
node scripts/test-trend-analysis.js

# Generate recommendations
echo "💡 Performance Recommendations:"
node scripts/performance-recommendations.js
```

This comprehensive monitoring and prevention strategy ensures early detection of performance issues and provides automated tools for maintaining optimal performance.
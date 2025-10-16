#!/bin/bash

# Adwola Project - Custom Claude Code Commands Setup
# Author: Sayem Abdullah Rihan (@code-craka)
# Repository: https://github.com/code-craka/adwola

# Create the commands directory in project-local .claude folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "$SCRIPT_DIR/commands/adwola"

echo "Creating Adwola-specific custom commands..."

# 1. Development Server Setup Command
cat > $SCRIPT_DIR/commands/adwola/dev-setup.md << 'EOF'
---
allowed-tools: Bash(git pull:*), Bash(pnpm:*), Bash(supabase:*)
description: Complete Adwola development server setup following project requirements
---

# Adwola Development Server Setup

Execute the complete development setup sequence for the Adwola project:

## Current Directory Check
!`pwd`

## Git Status Check
!`git status`

## Development Setup Sequence

Following the Adwola project requirements, execute these commands in order:

1. **Pull Latest Changes**
   ```bash
   git pull
   ```

2. **Install Dependencies (pnpm only)**
   ```bash
   pnpm install
   ```

3. **Start Supabase CLI**
   ```bash
   supabase start
   ```

4. **Reset Database**
   ```bash
   supabase db reset
   ```

5. **Deploy Edge Functions**
   ```bash
   supabase functions deploy
   ```

6. **Start Next.js Development Server**
   ```bash
   pnpm dev
   ```

Execute each step and report the status. If any step fails, stop and provide troubleshooting guidance.

**Project Requirements:**
- Package Manager: pnpm only (never npm/yarn)
- Database: Supabase CLI only (never Docker)
- Always pull first before development
EOF

# 2. Conventional Commit Command
cat > $SCRIPT_DIR/commands/adwola/commit.md << 'EOF'
---
allowed-tools: Bash(git:*), Bash(pnpm:*)
description: Smart commit with Adwola conventional commit patterns
---

# Adwola Smart Commit

Create a conventional commit following Adwola project standards:

## Current Status
!`git status`

## Recent Commits (for context)
!`git log --oneline -5`

## Commit Message Template
Arguments provided: $ARGUMENTS

## Task
1. **Quality Check First**
   - Run `pnpm lint` to ensure zero ESLint warnings/errors
   - Run `pnpm build` to verify build success

2. **Stage Appropriate Files**
   - Review changed files and stage relevant ones
   - Exclude any non-essential files

3. **Create Conventional Commit**
   - Format: `type(scope): description`
   - Types: feat, fix, docs, style, refactor, test, chore, perf
   - Scopes: ui, api, auth, dashboard, analytics, landing, components
   - Include "[Adwola]" prefix for project identification

4. **Attribution**
   - Ensure commit author is "Sayem Abdullah Rihan <codecraka@gmail.com>"

**Example formats:**
- `feat(dashboard): add enhanced analytics visualization`
- `fix(auth): resolve Supabase auth flow issue`
- `docs(readme): update development setup instructions`

Use the provided arguments as the basis for the commit message.
EOF

# 3. Feature Branch Command
cat > $SCRIPT_DIR/commands/adwola/feature-branch.md << 'EOF'
---
allowed-tools: Bash(git:*)
description: Create and manage feature branches following Adwola conventions
---

# Adwola Feature Branch Management

Manage feature branches following Adwola project conventions:

## Current Branch Status
!`git branch -v`

## Remote Branches
!`git branch -r`

## Arguments
Action and details: $ARGUMENTS

## Branch Naming Convention
- Format: `feature/phase-X-description`
- Examples:
  - `feature/phase-15-enterprise-sso`
  - `feature/phase-16-advanced-analytics`
  - `feature/hotfix-dashboard-performance`

## Available Actions

### Create New Feature Branch
1. Ensure you're on main branch
2. Pull latest changes: `git pull origin main`
3. Create and switch to new branch: `git checkout -b feature/[name]`
4. Push branch to remote: `git push -u origin feature/[name]`

### Switch to Existing Branch
1. Fetch latest remote branches: `git fetch`
2. Switch to branch: `git checkout [branch-name]`
3. Pull latest changes: `git pull`

### List All Feature Branches
1. Show local branches: `git branch`
2. Show remote feature branches: `git branch -r | grep feature`

## Branch Management Rules
- **FUTURE Phases (11+)**: MUST use feature branches
- **Never implement FUTURE phases directly on main**
- **Workflow**: main → feature branch → implement → test → PR → merge

Process the provided arguments and execute the appropriate branch operation.
EOF

# 4. Supabase Operations Command
cat > $SCRIPT_DIR/commands/adwola/supabase.md << 'EOF'
---
allowed-tools: Bash(supabase:*), Bash(pnpm:*)
description: Adwola Supabase operations and management
---

# Adwola Supabase Operations

Manage Supabase operations for the Adwola project:

## Current Supabase Status
!`supabase status`

## Operation Request
Operation: $ARGUMENTS

## Available Operations

### Database Operations
- **reset**: Reset database with migrations (`supabase db reset`)
- **migrate**: Apply new migrations (`supabase db push`)
- **generate**: Generate TypeScript types (`supabase gen types typescript`)

### Function Operations
- **deploy**: Deploy all edge functions (`supabase functions deploy`)
- **deploy-single**: Deploy specific function (`supabase functions deploy [function-name]`)
- **logs**: View function logs (`supabase functions logs [function-name]`)

### Development Operations
- **start**: Start Supabase stack (`supabase start`)
- **stop**: Stop Supabase stack (`supabase stop`)
- **restart**: Restart services (`supabase stop && supabase start`)

### Production Operations
- **link**: Link to production project (`supabase link`)
- **push**: Push schema to production (`supabase db push --linked`)

## Edge Functions in Adwola
Current functions (13 total):
- create-brief (AI content generation)
- regenerate-post (Content regeneration)
- publish-post (Social media publishing)
- collect-analytics (Real-time metrics)
- analyze-content-performance (AI optimization)

## Project Requirements
- Supabase CLI v2.26.9
- Never use Docker (CLI only)
- Always reset DB during development setup

Execute the requested operation and provide status feedback.
EOF

# 5. Quality Assurance Command
cat > $SCRIPT_DIR/commands/adwola/qa.md << 'EOF'
---
allowed-tools: Bash(pnpm:*), Bash(git:*)
description: Comprehensive quality assurance checks for Adwola
---

# Adwola Quality Assurance

Run comprehensive quality checks following Adwola standards:

## Current Status
!`git status`

## Quality Check Sequence

### 1. Dependency Check
```bash
pnpm install
```

### 2. Linting (Zero warnings/errors required)
```bash
pnpm lint
```

### 3. TypeScript Check
```bash
pnpm type-check
```

### 4. Build Verification
```bash
pnpm build
```

### 5. Test Suite (if available)
```bash
pnpm test
```

## Quality Standards
- **Zero ESLint warnings/errors requirement**
- **Zero TypeScript errors**
- **Successful production build**
- **All tests passing**

## Code Quality Metrics
- Files: 108+ files, 23,000+ lines of TypeScript
- Components: 59+ React components
- Security: 100% compliance, zero vulnerabilities
- Performance: 83% score target

## If Issues Found
1. **Linting Issues**: Fix ESLint warnings/errors
2. **TypeScript Issues**: Resolve type errors
3. **Build Issues**: Address compilation problems
4. **Test Failures**: Fix failing tests

Execute all quality checks and report results. Stop at first failure and provide guidance for resolution.

**Project Requirement**: Zero warnings/errors before any commit.
EOF

# 6. Analytics Dashboard Command
cat > $SCRIPT_DIR/commands/adwola/analytics.md << 'EOF'
---
allowed-tools: Bash(supabase:*), Edit, Read
description: Adwola analytics and performance monitoring
---

# Adwola Analytics & Performance

Monitor and analyze Adwola platform performance:

## Request
Focus area: $ARGUMENTS

## Analytics Components

### Enhanced Analytics Dashboard (v2.10.0)
- **Interactive Visualizations**: Recharts integration
- **Multi-Platform Overview**: LinkedIn, Twitter, Facebook, Instagram
- **AI Provider Comparison**: OpenAI vs Vertex AI performance
- **Engagement Heatmaps**: Optimal posting time analysis
- **Content Type Distribution**: Images, Videos, Carousels, Text

### Key Performance Metrics
- **Performance Score**: 83% target
- **Loading Time**: Sub-3s requirement
- **Memory Usage**: 4.31MB average optimal
- **Database Performance**: 80% faster with indexes
- **Bundle Size**: 30% reduction achieved

### Analytics Tables
```sql
-- Key analytics tables
SELECT * FROM post_analytics LIMIT 5;
SELECT * FROM content_insights LIMIT 5;
SELECT * FROM ab_tests WHERE status = 'active';
```

## Available Analysis

### Performance Analysis
1. **Dashboard Performance**: Loading times, component render speed
2. **Database Performance**: Query optimization, index usage
3. **AI Performance**: Generation speed, provider comparison
4. **User Experience**: Engagement metrics, conversion rates

### Content Analysis
1. **Content Performance**: Engagement by type, platform, time
2. **AI Analysis**: GPT-4 vs Gemini effectiveness
3. **Optimization Opportunities**: A/B testing results
4. **ROI Analysis**: Subscription conversion metrics

### Technical Analysis
1. **Bundle Analysis**: Code splitting effectiveness
2. **Memory Analysis**: Leak detection, heap usage
3. **Real-time Analysis**: WebSocket performance
4. **Security Analysis**: Vulnerability assessment

## Implementation Files
- `components/AnalyticsDashboard.tsx`
- `components/EnhancedAnalyticsDashboard.tsx`
- `supabase/functions/collect-analytics/`
- `supabase/functions/analyze-content-performance/`

Analyze the specified area and provide actionable insights based on Adwola's analytics infrastructure.
EOF

# 7. Deployment Command
cat > $SCRIPT_DIR/commands/adwola/deploy.md << 'EOF'
---
allowed-tools: Bash(git:*), Bash(pnpm:*), Bash(supabase:*)
description: Adwola production deployment workflow
---

# Adwola Production Deployment

Execute production deployment following Adwola workflows:

## Pre-Deployment Status
!`git status`

## Current Branch
!`git branch --show-current`

## Deployment Type
Target: $ARGUMENTS

## Pre-Deployment Checklist

### 1. Quality Assurance
- [ ] All tests passing (`pnpm test`)
- [ ] Zero ESLint warnings (`pnpm lint`)
- [ ] Production build successful (`pnpm build`)
- [ ] TypeScript compilation clean

### 2. Version Control
- [ ] All changes committed
- [ ] On main branch (for production)
- [ ] Latest changes pulled (`git pull`)
- [ ] Branch is ahead of remote

### 3. Environment Verification
- [ ] Environment variables configured
- [ ] Supabase project linked (`supabase link`)
- [ ] Database schema up to date

## Deployment Sequence

### Database Deployment
1. **Schema Push**
   ```bash
   supabase db push --linked
   ```

2. **Functions Deployment**
   ```bash
   supabase functions deploy
   ```

### Application Deployment
1. **Build Verification**
   ```bash
   pnpm build
   ```

2. **Production Push** (if using Vercel/deployment platform)
   ```bash
   git push origin main
   ```

## Post-Deployment Verification
- [ ] Application loads successfully
- [ ] Database connections working
- [ ] Edge functions responding
- [ ] Analytics tracking active
- [ ] Authentication flow working

## Rollback Plan
If deployment fails:
1. Revert git commit: `git revert HEAD`
2. Redeploy previous version
3. Check error logs: `supabase functions logs`

## Production Environment
- **Frontend**: Next.js 15 + React 19
- **Backend**: Supabase v2.26.9
- **AI**: Dual provider (OpenAI + Vertex AI)
- **Performance**: 83% score target
- **Security**: Enterprise-grade with 100% compliance

Execute deployment for the specified target and provide status updates.
EOF

# 8. Project Status Command
cat > $SCRIPT_DIR/commands/adwola/status.md << 'EOF'
---
allowed-tools: Bash(git:*), Bash(pnpm:*), Bash(supabase:*), Read
description: Comprehensive Adwola project status overview
---

# Adwola Project Status Overview

Comprehensive status check for the Adwola project:

## Git Repository Status
!`git status`

## Current Branch & Recent Activity
!`git log --oneline -5`

## Development Environment

### Package Manager Status
!`pnpm --version`

### Supabase Status
!`supabase status`

## Project Information
- **Repository**: https://github.com/code-craka/adwola
- **Author**: Sayem Abdullah Rihan (@code-craka)
- **Current Version**: v2.11.1 - Footer Enhancement
- **Tech Stack**: Next.js 15, React 19, Supabase v2.26.9, TypeScript

## Completed Phases Status
✅ **Phase 1-14**: Core platform through Landing Page Redesign  
✅ **Hotfixes**: v2.2.1, v2.2.2, v2.3.1, v2.3.2  
✅ **Major Releases**: v2.3 Deep Debug, v2.4.0 Dashboard Modernization  
✅ **Complete Optimization**: v2.5.0 through v2.11.1  

## Current Architecture Overview
- **Frontend**: Next.js 15 + React 19 + TypeScript + shadcn/ui
- **Backend**: Supabase v2.26.9 (PostgreSQL, Auth, Realtime, Storage)
- **AI**: Dual Provider System (OpenAI GPT-4 + Vertex AI Gemini)
- **Analytics**: Enhanced dashboard with interactive charts
- **Security**: Enterprise-grade RLS policies, 100% compliance
- **Performance**: 83% score, 60-80% improvement achieved

## Key Metrics
- **Files**: 108+ files, 23,000+ lines of TypeScript
- **Components**: 59+ React components
- **Edge Functions**: 13 functions deployed
- **Database**: 15 migrations, comprehensive RLS policies
- **Security**: Zero vulnerabilities, enterprise-grade hardening

## Development Commands Available
- `/user:adwola:dev-setup` - Complete development setup
- `/user:adwola:commit` - Conventional commits
- `/user:adwola:feature-branch` - Branch management
- `/user:adwola:supabase` - Supabase operations
- `/user:adwola:qa` - Quality assurance
- `/user:adwola:analytics` - Performance monitoring
- `/user:adwola:deploy` - Production deployment

## Quick Development Workflow
```bash
git pull
pnpm install
supabase start
supabase db reset
supabase functions deploy
pnpm dev
```

## Focus Areas
Arguments: $ARGUMENTS

Provide detailed status for any specific areas requested, or complete overview if no arguments provided.

**Last Updated**: July 2, 2025
**Status**: Production-ready with enhanced footer architecture and unified navigation design
EOF

echo "✅ Adwola custom commands created successfully!"
echo ""
echo "📋 Available Commands:"
echo "  /user:adwola:dev-setup        - Complete development server setup"
echo "  /user:adwola:commit <message> - Smart conventional commits"
echo "  /user:adwola:feature-branch <action> - Feature branch management"
echo "  /user:adwola:supabase <operation> - Supabase operations"
echo "  /user:adwola:qa               - Quality assurance checks"
echo "  /user:adwola:analytics <area> - Analytics and performance"
echo "  /user:adwola:deploy <target>  - Production deployment"
echo "  /user:adwola:status [focus]   - Project status overview"
echo ""
echo "💡 Usage Examples:"
echo "  /user:adwola:dev-setup"
echo "  /user:adwola:commit feat(dashboard): add analytics heatmap"
echo "  /user:adwola:feature-branch create phase-15-enterprise"
echo "  /user:adwola:supabase deploy"
echo "  /user:adwola:qa"
echo "  /user:adwola:analytics performance"
echo "  /user:adwola:deploy production"
echo "  /user:adwola:status analytics"
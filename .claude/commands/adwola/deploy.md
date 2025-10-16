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

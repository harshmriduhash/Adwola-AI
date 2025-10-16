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

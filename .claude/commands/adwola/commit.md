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

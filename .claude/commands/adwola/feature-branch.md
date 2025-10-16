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

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

# AmplifyAI Development Guide

## Quick Start

### Development Environment Setup

```bash
# 1. Clone and setup
git clone https://github.com/code-craka/amplifyai.git
cd amplifyai

# 2. Install dependencies (pnpm only)
pnpm install

# 3. Start Supabase (NOT Docker)
supabase start
supabase db reset
supabase functions deploy

# 4. Start development server
pnpm dev

# 5. Verify services
# Frontend: http://localhost:3000
# Supabase: http://localhost:54321
```

### Daily Development Workflow

```bash
# Always start with latest changes
git pull
pnpm install  # Update dependencies if needed
supabase start && supabase db reset
pnpm dev
```

## Project Structure

```bash
amplifyai/
├── app/                     # Next.js 15 App Router
│   ├── dashboard/           # Main dashboard interface
│   ├── brands/              # Brand management
│   ├── auth/                # Authentication pages
│   └── api/                 # API routes
├── components/              # Reusable React components
│   ├── ui/                  # shadcn/ui components + animations
│   ├── *-section.tsx        # Landing page components
│   └── *.tsx                # Feature components
├── lib/                     # Utility libraries
│   ├── supabase.ts          # Supabase client
│   ├── utils.ts             # General utilities
│   └── performance.ts       # Performance monitoring
├── supabase/
│   ├── functions/           # Edge Functions
│   ├── migrations/          # Database migrations
│   └── config.toml          # Supabase configuration
├── docs/                    # Project documentation
└── types/                   # TypeScript type definitions
```

## Development Rules

### Package Management

- **Use pnpm exclusively** - Never use npm or yarn
- Commands: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`
- Lock file: `pnpm-lock.yaml` (commit this file)

### Database Management

- **Use Supabase CLI only** - Never attempt Docker operations
- Reset database: `supabase db reset`
- New migration: `supabase migration new migration_name`
- Deploy functions: `supabase functions deploy`

### Code Style & Quality

- **Zero ESLint warnings/errors** - Fix all before committing
- **TypeScript strict mode** - All code must be properly typed
- **React Server Components** - Compatible patterns for Next.js 15
- **Individual state variables** - Avoid complex form objects

## Modern ESLint Configuration for Next.js 15.3.4 + React 19

### Current ESLint Setup (eslint.config.mjs) - Modern Flat Config

```javascript
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
 baseDirectory: __dirname,
});

const eslintConfig = [
 ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

### Biome.js Integration (biome.json) - Additional Code Quality

```json
{
 "$schema": "https://biomejs.dev/schemas/2.0.6/schema.json",
 "vcs": {
  "enabled": false,
  "clientKind": "git",
  "useIgnoreFile": false
 },
 "files": {
  "ignoreUnknown": false
 },
 "formatter": {
  "enabled": true,
  "indentStyle": "tab"
 },
 "linter": {
  "enabled": true,
  "rules": {
   "recommended": true
  }
 },
 "javascript": {
  "formatter": {
   "quoteStyle": "double"
  }
 },
 "assist": {
  "enabled": true,
  "actions": {
   "source": {
    "organizeImports": "on"
   }
  }
 }
}
```

### Package.json Dependencies & Scripts (Current)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "devDependencies": {
    "@biomejs/biome": "2.0.6",
    "@eslint/eslintrc": "^3.3.1",
    "@tanstack/eslint-plugin-query": "^5.81.2",
    "@types/node": "^20.19.1",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@typescript-eslint/eslint-plugin": "^8.35.0",
    "@typescript-eslint/parser": "^8.35.0",
    "eslint": "^9.30.0",
    "eslint-config-next": "^15.3.4",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-unused-imports": "^4.1.4",
    "typescript": "^5.8.3"
  },
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=22.16.0",
    "pnpm": ">=10.0.0"
  }
}
```

### Why This Modern Setup is Better

1. **ESLint 9 Flat Config**: More performant and modern than legacy `.eslintrc.json`
2. **Simplified Rules**: Next.js core-web-vitals handles most best practices automatically
3. **Biome.js Integration**: Fast formatter and additional linting with native performance
4. **Turbopack**: Faster development builds with `--turbopack` flag
5. **Updated Dependencies**: Latest React 19 and TypeScript 5.8 compatibility
6. **Cleaner Configuration**: Less configuration overhead, better maintainability

### VSCode Settings (.vscode/settings.json)

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

### Prettier Configuration (.prettierrc)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "jsxSingleQuote": true,
  "bracketSameLine": false
}
```

### PNPM Configuration (.npmrc)

```ini
# Performance optimizations
shamefully-hoist=false
strict-peer-dependencies=false
auto-install-peers=true

# Security
audit-level=moderate

# Node version enforcement
engine-strict=true

# Registry configuration
registry=https://registry.npmjs.org/

# Cache settings
store-dir=~/.pnpm-store
cache-dir=~/.pnpm-cache

# Install behavior
prefer-frozen-lockfile=true
```

### Component Structure Standards

```typescript
// ✅ Preferred component structure
interface ComponentProps {
  title: string
  children?: React.ReactNode
  className?: string
}

export default function Component({ title, children, className }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState<string>('')
  
  // Event handlers
  const handleClick = useCallback(() => {
    setState('clicked')
  }, [])
  
  // Early returns
  if (!title) return null
  
  // Main render
  return (
    <div className={cn('base-class', className)}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

### File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useUserData.ts`)
- Utils: `kebab-case.ts` (e.g., `format-date.ts`)
- Pages: `kebab-case/page.tsx` (Next.js App Router)
- Types: `PascalCase.types.ts` (e.g., `User.types.ts`)

### Import Order (Enforced by ESLint)

```typescript
// 1. Node modules
import React from 'react'
import { NextPage } from 'next'

// 2. Internal imports (absolute paths)
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

// 3. Relative imports
import './component.css'
import type { ComponentProps } from './types'
```

## Commit Convention

```bash
# Format: type(scope): description
git commit -m "feat(dashboard): add real-time content updates"
git commit -m "fix(auth): resolve login redirect issue"
git commit -m "perf(db): add indexes for faster queries"
git commit -m "docs(readme): update installation instructions"
```

## Branch Management

### Current Development (Phases 1-13 Complete)

- **Main branch**: Production-ready code
- **Direct commits**: Only for hot fixes and minor updates
- **Pull latest**: Always `git pull` before starting work

### Future Features (Phase 14+)

- **Feature branches required**: `feature/phase-X-description`
- **Workflow**:
  1. `git checkout main && git pull`
  2. `git checkout -b feature/phase-14-api-integrations`
  3. Implement feature following all development rules
  4. Test thoroughly with complete dev setup
  5. `git commit -m "feat(phase14): description"`
  6. Create Pull Request to main
  7. Merge only after testing and documentation

## Testing Strategy

### Before Every Commit

```bash
# Quality checks (required)
pnpm lint          # Must show zero warnings/errors
pnpm build         # Must complete successfully

# Manual testing
1. Start dev server and verify all features work
2. Test new functionality thoroughly
3. Check console for errors
4. Verify responsive design
```

### Component Testing

- Test all user interactions
- Verify real-time updates work
- Check error handling and loading states
- Test on different screen sizes

## Performance Guidelines

### React Best Practices

```tsx
// Use memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateComplexData(data)
}, [data])

// Use callbacks for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency])

// Debounce real-time updates
const debouncedUpdate = useMemo(
  () => debounce((data) => updateState(data), 100),
  []
)
```

### Animation Best Practices

```tsx
// Use Framer Motion with proper types
const motionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
}

// Optimize animations with reduced motion support
const shouldReduceMotion = useReducedMotion()
const animationProps = shouldReduceMotion ? {} : motionProps

// Use scroll-reveal for performance
<ScrollReveal direction="up" delay={0.2}>
  <Component />
</ScrollReveal>

// Animation components pattern
const AnimatedComponent = ({ children, ...props }) => {
  if (props.asChild) {
    return (
      <Slot>
        <motion.div {...animationProps}>
          {children}
        </motion.div>
      </Slot>
    )
  }
  
  return (
    <motion.div {...animationProps}>
      <Component {...props}>
        {children}
      </Component>
    </motion.div>
  )
}
```

### Database Query Optimization

```sql
-- Use indexed columns in WHERE clauses
SELECT * FROM content_briefs 
WHERE user_id = $1 AND status = $2  -- Uses idx_content_briefs_user_status
ORDER BY created_at DESC LIMIT 10

-- Avoid SELECT * in production
SELECT id, title, status, created_at 
FROM content_briefs
WHERE user_id = $1
```

### AI Function Performance

```typescript
// Use parallel processing for multiple API calls
const results = await Promise.allSettled([
  generateContent(prompt1),
  generateContent(prompt2),
  generateContent(prompt3)
])

// Handle failures gracefully
const successful = results
  .filter(result => result.status === 'fulfilled')
  .map(result => result.value)
```

## Common Development Tasks

### Adding a New Feature

1. **Research existing patterns** - Check similar components/functions
2. **Follow established conventions** - Naming, structure, styling
3. **Update type definitions** - Add TypeScript types in `/types`
4. **Test thoroughly** - All user flows and edge cases
5. **Update documentation** - Add to relevant docs

### Database Schema Changes

```bash
# Create new migration
supabase migration new add_new_feature_table

# Edit the migration file
# Apply changes
supabase db reset

# Update TypeScript types if needed
```

### Adding New Edge Function

```bash
# Create function
supabase functions new function-name

# Develop in TypeScript
# Test locally
supabase functions serve

# Deploy
supabase functions deploy function-name
```

### Dashboard Navigation Patterns

#### URL-Based Tab Navigation

```tsx
// In dashboard components, use URL search params for navigation
const searchParams = useSearchParams();
const router = useRouter();
const activeTab = searchParams?.get('tab') || 'overview';

// Handle tab changes with URL updates
<Tabs value={activeTab} onValueChange={(value) => {
  const newUrl = value === 'overview' ? '/dashboard' : `/dashboard?tab=${value}`;
  router.push(newUrl);
}}>
```

#### Dashboard Header Integration

```tsx
// Add dashboard header to authenticated pages
import DashboardHeader from '@/components/dashboard-header'

export default function AuthenticatedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      {/* Page content */}
    </div>
  )
}
```

#### User Profile Management

```tsx
// Handle user profile with proper TypeScript interfaces
interface UserProfile {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

// Use Next.js Image for avatars
<Image
  src={user.user_metadata.avatar_url}
  alt={userDisplayName}
  width={32}
  height={32}
  className="h-8 w-8 rounded-full object-cover"
/>
```

#### React 19 TypeScript Patterns

##### Modern Component Ref Typing

```tsx
// ✅ Correct - Use ComponentRef (React 19+)
const MyComponent = React.forwardRef<
  React.ComponentRef<typeof SomePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SomePrimitive.Root>
>(({ className, ...props }, ref) => (
  <SomePrimitive.Root
    ref={ref}
    className={className}
    {...props}
  />
))

// ❌ Deprecated - Don't use ElementRef
const OldComponent = React.forwardRef<
  React.ElementRef<typeof SomePrimitive.Root>, // Deprecated!
  React.ComponentPropsWithoutRef<typeof SomePrimitive.Root>
>
```

##### UI Component Best Practices

```tsx
// Always use ComponentRef for UI components
import * as React from "react"
import * as RadixPrimitive from "@radix-ui/react-primitive"

const UIComponent = React.forwardRef<
  React.ComponentRef<typeof RadixPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadixPrimitive.Root
    ref={ref}
    className={cn("default-styles", className)}
    {...props}
  />
))
UIComponent.displayName = RadixPrimitive.Root.displayName
```

## Security Guidelines

### Environment Variables

- Store sensitive data in Supabase Vault
- Never commit API keys or secrets
- Use GitHub push protection

### Database Security

- Always use Row Level Security (RLS) policies
- Test user access permissions
- Validate all user inputs

### API Security

- Implement rate limiting
- Validate request parameters
- Use proper CORS configuration

## Error Handling

### Frontend Error Handling

```tsx
try {
  const data = await supabase
    .from('table')
    .select('*')
    .single()
    
  if (error) throw error
  // Handle success
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly error message
  toast.error('Something went wrong. Please try again.')
}
```

### Edge Function Error Handling

```typescript
export default async function handler(req: Request) {
  try {
    // Function logic
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
```

## Debugging Tips

### Development Issues

```bash
# Supabase connection issues
supabase status
supabase logs

# Clear Supabase cache
supabase db reset

# Next.js build issues
rm -rf .next
pnpm build

# Package issues
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Common Solutions

- **Cursor jumping in forms**: Use individual state variables
- **React hydration errors**: Ensure SSR/client state matches
- **Supabase RLS errors**: Check user authentication and policies
- **Animation TypeScript errors**: Use `as const` for animation types
- **Motion component errors**: Ensure proper asChild handling with Slot
- **Framer Motion hydration**: Use conditional rendering for animations
- **AI function timeouts**: Verify API keys and implement retries
- **Analytics empty error objects**: Use `error.message || error` for proper error logging
- **Dashboard navigation issues**: Ensure proper URL-based navigation with search params
- **User profile not displaying**: Check Supabase auth user metadata and avatar_url
- **TypeScript interface conflicts**: Use unique interface names (e.g., `UserProfile` vs `User`)
- **React.ElementRef deprecation**: Use `React.ComponentRef<T>` instead of deprecated `React.ElementRef<T>`
- **TypeScript component refs**: Always use modern React 19 typing patterns for forwardRef components

## Performance Monitoring

### Using Performance Tools

```typescript
import { AmplifyAIMetrics } from '@/lib/performance'

// Measure AI operations
const result = await AmplifyAIMetrics.measureContentGeneration(async () => {
  return await generateContent(prompt)
})

// Measure database queries
const data = await AmplifyAIMetrics.measureDatabaseQuery('fetch-briefs', async () => {
  return await supabase.from('content_briefs').select('*')
})
```

### Production Monitoring

- Enable Web Vitals tracking in production
- Monitor Core Web Vitals (CLS, INP, FCP, LCP, TTFB)
- Track custom performance metrics
- Set up performance budget alerts

## Documentation Updates

### Required Updates for New Features

1. **CLAUDE.md** - Update project status and completed phases
2. **README.md** - Update feature list and installation if needed
3. **CHANGELOG.md** - Add entry for new feature
4. **TECHNICAL_SPECS.md** - Update architecture if significant changes

### Documentation Standards

- Use clear, concise language
- Include code examples
- Update version numbers
- Maintain consistent formatting

## Development Commands

### ESLint & Code Quality

```bash
# All ESLint dependencies are already installed with modern versions
# Current setup uses ESLint 9 + Biome.js for optimal performance

# Run linting (uses modern flat config)
pnpm lint

# Type checking (built into Next.js build)
pnpm build

# Clean install (if needed)
pnpm install --frozen-lockfile

# Development with Turbopack (faster builds)
pnpm dev
```

### Development Server

```bash
# Development
pnpm dev && supabase start

# Quality checks
pnpm lint && pnpm build

# Git workflow
git pull && git add . && git commit -m "feat(scope): description" && git push

# Roadmap management
npm run roadmap:update
npm run roadmap:complete [phase]
```

---

**Last Updated**: June 28, 2025
**Maintainer**: Sayem Abdullah Rihan (@code-craka)
**Repository**: <https://github.com/code-craka/amplifyai>
**Status**: World-Class SaaS Platform with Complete Performance & UX Optimization ✅
**Questions?** Check existing code patterns or ask for clarifications in the CLAUDE.md file

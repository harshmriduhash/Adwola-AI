# Optimized Biome.js Configuration for Next.js 15 + React 19 TypeScript Projects

Biome.js emerges as a revolutionary toolchain that replaces ESLint + Prettier with a **single, Rust-based solution delivering 15x faster linting and 25x faster formatting**. For your Next.js 15 + React 19 TypeScript project with pnpm, Supabase, and shadcn/ui, Biome offers **unified tooling, type-aware linting without TypeScript compiler dependency, and seamless integration** with your existing workflow. The tool provides 331+ rules across multiple domains, automatic React/Next.js detection, and zero-configuration setup that scales efficiently with large codebases.

## Complete Optimized Configuration

### Primary biome.json Configuration

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "root": true,
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true,
    "defaultBranch": "main"
  },
  "files": {
    "include": [
      "src/**/*",
      "app/**/*",
      "components/**/*",
      "lib/**/*",
      "utils/**/*",
      "hooks/**/*",
      "types/**/*",
      "*.{js,jsx,ts,tsx,json,jsonc}",
      "*.config.{js,ts}",
      "tailwind.config.{js,ts}",
      "next.config.{js,ts}"
    ],
    "ignore": [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "out/**",
      "coverage/**",
      ".turbo/**",
      "**/*.min.{js,css}",
      "public/**",
      "supabase/migrations/**",
      "**/*.generated.{ts,js}",
      ".env*"
    ],
    "ignoreUnknown": true,
    "maxSize": 2097152
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf",
    "attributePosition": "auto",
    "bracketSpacing": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "useExhaustiveDependencies": "error",
        "noUndeclaredVariables": "error",
        "noUnusedVariables": "warn",
        "noUnusedImports": "error",
        "noChildrenProp": "error",
        "noVoidElementsWithChildren": "error",
        "noConstructorReturn": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInvalidConstructorSuper": "error",
        "noInvalidNewBuiltin": "error",
        "noNonoctalDecimalEscape": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUnnecessaryContinue": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      },
      "style": {
        "useImportType": "error",
        "useConst": "error",
        "useForOf": "warn",
        "useFragmentSyntax": "error",
        "useSelfClosingElements": "error",
        "useShorthandPropertyAssignment": "warn",
        "useTemplate": "warn",
        "noImplicitBoolean": "error",
        "noNegationElse": "warn",
        "noShoutyConstants": "warn",
        "noUnusedTemplateLiteral": "warn",
        "noVar": "error",
        "useExponentiationOperator": "warn",
        "useOptionalChain": "warn",
        "useNullishCoalescing": "warn"
      },
      "complexity": {
        "noExcessiveCognitiveComplexity": "warn",
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noUselessConstructor": "error",
        "noUselessLoneBlockStatements": "error",
        "noUselessRename": "error",
        "noUselessTernary": "error",
        "noWith": "error",
        "useFlatMap": "warn",
        "useLiteralKeys": "warn",
        "useOptionalChain": "warn",
        "useRegexLiterals": "warn",
        "useSimpleNumberKeys": "warn",
        "useSimplifiedLogicExpression": "warn"
      },
      "security": {
        "noDangerouslySetInnerHtml": "error",
        "noDangerouslySetInnerHtmlWithChildren": "error",
        "noGlobalEval": "error"
      },
      "performance": {
        "noAccumulatingSpread": "warn",
        "noBarrelFile": "warn",
        "noDelete": "warn",
        "noReExportAll": "warn"
      },
      "suspicious": {
        "noApproximativeNumericConstant": "warn",
        "noArrayIndexKey": "warn",
        "noAssignInExpressions": "error",
        "noAsyncPromiseExecutor": "error",
        "noCatchAssign": "error",
        "noClassAssign": "error",
        "noCommentText": "error",
        "noCompareNegZero": "error",
        "noConfusingLabels": "error",
        "noConfusingVoidType": "warn",
        "noConsoleLog": "warn",
        "noConstAssign": "error",
        "noControlCharactersInRegex": "error",
        "noDebugger": "error",
        "noDoubleEquals": "error",
        "noDuplicateCase": "error",
        "noDuplicateClassMembers": "error",
        "noDuplicateObjectKeys": "error",
        "noDuplicateParameters": "error",
        "noEmptyBlockStatements": "warn",
        "noExplicitAny": "warn",
        "noExtraNonNullAssertion": "error",
        "noFallthroughSwitchClause": "error",
        "noFunctionAssign": "error",
        "noGlobalAssign": "error",
        "noImplicitAnyLet": "error",
        "noImportAssign": "error",
        "noLabelVar": "error",
        "noMisleadingCharacterClass": "error",
        "noMisleadingInstantiator": "error",
        "noPrototypeBuiltins": "error",
        "noRedeclare": "error",
        "noSelfAssign": "error",
        "noShadowRestrictedNames": "error",
        "noSparseArray": "warn",
        "noUnsafeDeclarationMerging": "error",
        "noUnsafeNegation": "error",
        "useValidTypeof": "error"
      },
      "nursery": {
        "noFloatingPromises": "warn",
        "useSortedClasses": "warn",
        "useErrorMessage": "warn",
        "noEvolvingTypes": "warn"
      }
    }
  },
  "organizeImports": {
    "enabled": true
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "semicolons": "asNeeded",
      "trailingCommas": "es5",
      "arrowParentheses": "always",
      "bracketSameLine": false,
      "bracketSpacing": true,
      "attributePosition": "auto"
    },
    "parser": {
      "jsxEverywhere": true
    },
    "globals": [
      "React",
      "JSX",
      "NodeJS",
      "console",
      "process",
      "Buffer",
      "globalThis",
      "window",
      "document",
      "navigator",
      "fetch"
    ]
  },
  "json": {
    "parser": {
      "allowComments": true,
      "allowTrailingCommas": true
    },
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2,
      "lineWidth": 100
    },
    "linter": {
      "enabled": true
    }
  },
  "css": {
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2,
      "lineWidth": 100,
      "quoteStyle": "double"
    },
    "linter": {
      "enabled": true
    }
  },
  "overrides": [
    {
      "include": ["**/*.config.{js,ts}", "**/*.config.*.{js,ts}"],
      "linter": {
        "rules": {
          "style": {
            "useImportType": "off"
          },
          "suspicious": {
            "noConsoleLog": "off"
          }
        }
      }
    },
    {
      "include": ["**/*.test.{js,ts,jsx,tsx}", "**/*.spec.{js,ts,jsx,tsx}"],
      "linter": {
        "rules": {
          "suspicious": {
            "noConsoleLog": "off",
            "noExplicitAny": "off"
          },
          "complexity": {
            "noExcessiveCognitiveComplexity": "off"
          }
        }
      }
    },
    {
      "include": ["**/*.d.ts"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "off"
          },
          "style": {
            "useImportType": "off"
          }
        }
      }
    },
    {
      "include": ["**/middleware.ts", "**/instrumentation.ts"],
      "linter": {
        "rules": {
          "suspicious": {
            "noConsoleLog": "off"
          }
        }
      }
    }
  ]
}
```

## ESLint 9 Flat Config Integration Strategy

### Automated Migration Process

**Step 1: Install Biome and migrate existing configuration**
```bash
pnpm add -D @biomejs/biome
npx @biomejs/biome migrate eslint --write
```

**Step 2: Create complementary ESLint configuration**
```javascript
// eslint.config.js
import biome from 'eslint-config-biome'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...biome,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Rules that Biome doesn't cover but you want to keep
      '@typescript-eslint/no-explicit-any': 'off', // Handled by Biome
      'prettier/prettier': 'off', // Replaced by Biome formatter
      'react-hooks/exhaustive-deps': 'off', // Handled by Biome
    },
  },
]
```

### Rule Mapping and Conflict Resolution

**Key differences and complementary rules:**
- **Biome handles**: Formatting, import organization, React hooks dependencies
- **ESLint can handle**: Plugin-specific rules (accessibility, testing-library)
- **Biome advantage**: Type-aware rules without TypeScript compiler dependency

## Performance Optimization Configuration

### Large codebase tuning strategies

**Memory and processing optimizations:**
```json
{
  "files": {
    "maxSize": 2097152,
    "ignoreUnknown": true
  },
  "linter": {
    "rules": {
      "recommended": true,
      "nursery": false
    }
  }
}
```

**pnpm-specific optimizations:**
```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --write --files-ignore-unknown=true",
    "format": "biome format --write .",
    "check": "biome check --write .",
    "ci": "biome ci --diagnostic-level=error"
  }
}
```

## Development Environment Integration

### VSCode Settings Configuration

**Complete settings.json for optimal experience:**
```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit",
    "source.fixAll.biome": "explicit",
    "quickfix.biome": "explicit"
  },
  "biome.enabled": true,
  "biome.requireConfiguration": false,
  "biome.rename": true,
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[css]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

### Pre-commit Hook Setup

**Lefthook configuration (recommended):**
```yaml
# lefthook.yml
pre-commit:
  commands:
    biome-check:
      glob: "*.{js,ts,tsx,jsx,json,jsonc,css}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true {staged_files}
```

## CI/CD Pipeline Integration

### GitHub Actions Configuration

**Complete workflow for Next.js + pnpm + Biome:**
```yaml
name: CI
on: [push, pull_request]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm biome ci --diagnostic-level=error
      - run: pnpm build
```

### Renovate Integration

**Automated dependency updates:**
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base",
    "customManagers:biomeVersions"
  ],
  "packageRules": [
    {
      "matchPackageNames": ["@biomejs/biome"],
      "rangeStrategy": "pin"
    }
  ]
}
```

## Technology Stack Integration

### Next.js 15 specific adjustments

**Disable Next.js built-in ESLint:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.{js,jsx,ts,tsx}': ['biome-check'],
      },
    },
  },
}

module.exports = nextConfig
```

### Tailwind CSS and shadcn/ui compatibility

**Key advantages:**
- **`useSortedClasses`** rule automatically organizes Tailwind classes
- **`noUnknownProperty`** catches CSS property typos
- **No conflicts** with shadcn/ui component generation
- **Automatic formatting** of component props and className attributes

### Supabase integration considerations

**GraphQL and JSON handling:**
- **JSON linting** for Supabase configuration files
- **Basic GraphQL validation** for queries (schema validation requires additional tooling)
- **TypeScript integration** works seamlessly with generated Supabase types

## Migration Timeline and Strategy

### Phase 1: Installation and Basic Setup (Week 1)
1. Install Biome alongside existing tools
2. Create initial `biome.json` configuration
3. Test formatting and basic linting on subset of files
4. Configure VSCode integration

### Phase 2: Rule Migration and Conflict Resolution (Week 2)
1. Use automated migration tools for ESLint rules
2. Address any conflicts with existing code
3. Fine-tune rule severity levels
4. Update pre-commit hooks

### Phase 3: Full Integration and Optimization (Week 3)
1. Remove ESLint and Prettier dependencies
2. Update CI/CD pipelines
3. Configure Renovate for automated updates
4. Implement performance optimizations

### Phase 4: Advanced Features and Monitoring (Week 4)
1. Enable experimental rules (nursery)
2. Add custom domain-specific rules if needed
3. Monitor performance impact and adjust
4. Train team on new workflow

## Key Benefits for Your Stack

**Performance improvements:**
- **15x faster linting** compared to ESLint
- **25x faster formatting** compared to Prettier
- **Unified toolchain** eliminates configuration complexity
- **Type-aware rules** without TypeScript compiler dependency

**Modern React development:**
- **Automatic React detection** and rule activation
- **Hooks dependency validation** (equivalent to react-hooks/exhaustive-deps)
- **JSX optimization** and fragment simplification
- **Import organization** with TypeScript awareness

**Developer experience:**
- **Zero configuration** setup with automatic domain detection
- **Real-time feedback** through LSP integration
- **Unified command interface** replacing multiple tools
- **Consistent code style** across the entire stack

This configuration provides a production-ready Biome.js setup that **maximizes performance, maintains code quality, and integrates seamlessly** with your Next.js 15 + React 19 + TypeScript 5.8.3 stack while avoiding conflicts with existing tools and workflows.
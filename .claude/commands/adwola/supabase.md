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

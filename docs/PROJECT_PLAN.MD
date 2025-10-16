# AmplifyAI: Phased Project Plan

This document outlines the development roadmap, broken down into sprints.

### Phase 1: Foundation & Validation (Weeks 1-3)
*Objective: Establish a secure, scalable foundation and a live landing page to capture leads.*

| Task ID | Task Description | Lead | Technology | Status |
|---|---|---|---|---|
| P1-01 | Business/Legal Setup (ABN, Bank) | Founder | - | **DONE** |
| P1-02 | Set up Supabase & Clerk Projects | Architect | Supabase, Clerk | **DONE** |
| P1-03 | Finalize DB Schema and create migration file | Architect | Supabase CLI | **DONE** |
| P1-04 | Configure RLS Policies for all tables | Architect | Supabase SQL | **DONE** |
| P1-05 | Develop & Deploy Landing Page with Waitlist | Tech Lead | Next.js, Vercel | **To Do** |

### Phase 2: MVP Core Functionality (Weeks 4-10)
*Objective: Build the end-to-end user journey from brand setup to content generation and review.*

| Task ID | Task Description | Lead | Technology | Status |
|---|---|---|---|---|
| P2-01 | Implement Clerk Auth UI & Sync Webhook | Tech Lead | Clerk, Supabase Functions | **To Do** |
| P2-02 | Build Brand Hub UI (Create, Read, Update Brands) | Tech Lead | Next.js, SupabaseJS | **To Do** |
| P2-03 | **Develop `create-brief` Edge Function (Core AI Logic)** | Architect | Deno, Gemini, Claude | **To Do** |
| P2-04 | Build "New Campaign" Brief Submission Form | Tech Lead | Next.js | **To Do** |
| P2-05 | Build Review Dashboard with Supabase Realtime | Tech Lead | Next.js, SupabaseJS | **To Do** |
| P2-06 | Implement Basic Scheduling Logic (using `pg_cron`) | Architect | Supabase SQL | **To Do** |

### Phase 3: Beta Launch & Iteration (Weeks 11-14)
*Objective: Onboard initial users, gather feedback, and refine the AI output.*

| Task ID | Task Description | Lead | Technology | Status |
|---|---|---|---|---|
| P3-01 | Onboard Waitlist Users to Closed Beta | Product | - | **To Do** |
| P3-02 | Implement User Feedback Tool (e.g., Canny) | Product | - | **To Do** |
| P3-03 | Refine AI Prompt Chains based on Beta Feedback | Architect | Gemini, Claude | **To Do** |
| P3-04 | Set up Billing Integration (Stripe) | Tech Lead | Stripe API, Supabase | **To Do** |
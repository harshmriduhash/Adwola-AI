# AmplifyAI: User & Data Flow

This document describes the primary user journey.

### Journey 1: Onboarding

1.  **Action:** User lands on the Vercel-hosted app and clicks "Sign Up."
2.  **System:** The Clerk Sign-Up component is rendered. User authenticates.
3.  **Data Flow:**
    * Clerk creates a user record and issues a JWT to the browser session.
    * Clerk fires a `user.created` webhook.
    * A Supabase Edge Function (`/clerk-webhook`) catches this and creates a profile in our public `users` table.
4.  **Action:** User is redirected to `/brands` and prompted to create their first brand (name, description, tone).
5.  **Data Flow:** The Next.js client calls `supabase.from('brands').insert(...)`. Supabase RLS policies verify the user is allowed to perform this action.

### Journey 2: The Core Loop (Content Creation)

1.  **Action:** User navigates to `/campaigns` and clicks "New Campaign", filling out the brief form (topic, goal, CTA).
2.  **System:** The client **does not** call AI APIs. It invokes a secure Supabase Edge Function.
3.  **Data Flow:**
    * `supabase.functions.invoke('create-brief', { body: { ... } })` is called.
    * The Edge Function immediately creates a `content_briefs` record with `status: 'processing'`.
    * The function retrieves AI keys from Supabase Vault.
    * **Prompt Chaining:** It calls Gemini for strategy, then Claude for copywriting, and an image model for visuals.
    * As content is created, it's saved to the `generated_posts` table and media is uploaded to Supabase Storage.
    * The brief status is updated to `completed`.
4.  **System:** The user's Review Dashboard, which has been open, is subscribed to database changes via Supabase Realtime.
5.  **Data Flow:** The `INSERT` events on the `generated_posts` table are pushed to the client in real-time. The UI populates with the new content automatically, no refresh needed.

### Journey 3: Review & Schedule

1.  **Action:** User reviews the generated posts. They edit one post's text and approve all of them via checkboxes.
2.  **Data Flow:** `supabase.from('generated_posts').update(...)` calls are made to change text or update the `status` to `'approved'`.
3.  **Action:** User clicks "Schedule All".
4.  **System:** A function updates the `schedule_time` for all approved posts. Supabase's `pg_cron` extension will be used to run a daily job that checks for posts to be published.
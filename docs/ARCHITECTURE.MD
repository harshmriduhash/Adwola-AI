# AmplifyAI: System Architecture

This architecture uses a modern, composable stack designed for rapid development and scalability. Supabase serves as our core backend, simplifying infrastructure.

### Architectural Flow Diagram

```
[ User @ Browser (Next.js on Vercel) ]
       │
       │ 1. Signs Up / Logs In
       ▼
[ Clerk Hosted UI ]
       │
       │ 2. Authenticates user, issues JWT
       ├───────────────────────────────────┐
       │                                   │ 3. Webhook on new user
       ▼                                   ▼
[ Browser Session with JWT ]         [ Supabase Edge Function: /clerk-webhook ]
       │                                   │ 4. Syncs user to `users` table
       │ 5. Makes authenticated calls      │
       │    (e.g., fetch brands)           ▼
       │                               [ Supabase DB ]
       ▼
[ Supabase API Gateway ]
       │
       ├─► [ Postgres DB ]  (Verifies JWT & RLS policies on every request)
       │
       ├─► [ Storage ]      (Verifies JWT & Storage policies)
       │
       └─► [ Edge Functions ] (e.g., user invokes `create-brief`)
               │
               │ 6. Securely executes server-side logic
               ├─► [ Supabase Vault ] (Retrieves AI API Keys)
               │
               ├─► [ Vertex AI API (Gemini 1.5 Pro) ]
               │
               └─► [ Anthropic API (Claude 3.5 Sonnet) ]
```
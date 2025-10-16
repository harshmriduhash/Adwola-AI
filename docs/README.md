# AmplifyAI - Official Project README

AmplifyAI is a next-generation, AI-native social media management platform designed to automate the entire content lifecycle.

## Tech Stack

- **Framework:** Next.js 15
- **Authentication:** Clerk
- **Backend/DB:** Supabase
- **AI Models:** Gemini 1.5 Pro & Claude 3.5 Sonnet

## Getting Started

Follow these steps to set up the development environment.

### 1. Prerequisites

- Node.js v18+
- JetBrains WebStorm (or your preferred IDE)
- Supabase Account
- Clerk Account
- Vercel Account

### 2. Environment Setup

1.  Clone the repository:
    `git clone <your-repo-url>`

2.  Install dependencies:
    `npm install`

3.  Set up Supabase CLI and link the project:
    `supabase login`
    `supabase link --project-ref <your-project-ref>`
    `supabase db push` (This runs the migrations)

4.  Create a `.env.local` file in the root directory and add the following variables. These values can be found in your Supabase and Clerk project dashboards.

    ```bash
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # AI APIs (Store these in Supabase Vault, not here, for production)
    ANTHROPIC_API_KEY=sk-ant-...
    GOOGLE_VERTEX_AI_KEY=...
    ```

### 3. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
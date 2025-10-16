-- 3. CONTENT BRIEFS TABLE
-- The initial user input that kicks off a campaign.
CREATE TABLE public.content_briefs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  brand_id uuid NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  topic text NOT NULL,
  goal text,
  cta_text text,
  status text DEFAULT 'pending' NOT NULL -- pending, processing, completed, error
);

-- 4. GENERATED POSTS TABLE
-- Stores each individual piece of AI-generated content.
CREATE TABLE public.generated_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brief_id uuid NOT NULL REFERENCES public.content_briefs(id) ON DELETE CASCADE,
  platform text NOT NULL, -- e.g., 'LinkedIn', 'Twitter'
  generated_text text,
  generated_media_urls jsonb,
  status text DEFAULT 'draft' NOT NULL, -- draft, approved, scheduled, posted, error
  schedule_time timestamptz,
  post_url text -- The URL of the live post after publishing
);

-- RLS Policies for content_briefs
ALTER TABLE public.content_briefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD their own briefs." ON public.content_briefs
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for generated_posts
ALTER TABLE public.generated_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view posts from their own briefs." ON public.generated_posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM content_briefs
      WHERE content_briefs.id = generated_posts.brief_id AND content_briefs.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can update posts from their own briefs." ON public.generated_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM content_briefs
      WHERE content_briefs.id = generated_posts.brief_id AND content_briefs.user_id = auth.uid()
    )
  );
  
-- Allow inserting posts for user's own briefs (for AI generation)
CREATE POLICY "Users can insert posts for their own briefs." ON public.generated_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM content_briefs
      WHERE content_briefs.id = generated_posts.brief_id AND content_briefs.user_id = auth.uid()
    )
  );
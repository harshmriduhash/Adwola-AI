-- 1. USERS TABLE
CREATE TABLE public.users ( id uuid NOT NULL PRIMARY KEY, full_name text, avatar_url text );
-- RLS Policies for users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. BRANDS TABLE
CREATE TABLE public.brands ( id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY, user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, created_at timestamptz DEFAULT now(), brand_name text NOT NULL, brand_description text, tone_of_voice text, logo_url text );
-- RLS Policies for brands
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD their own brands." ON public.brands FOR ALL USING (auth.uid() = user_id);

-- And so on for all other tables (content_briefs, generated_posts) and their policies...
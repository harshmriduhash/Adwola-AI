-- Phase 11: Subscription System Database Schema
-- This migration adds the core subscription and billing infrastructure

-- 1. SUBSCRIPTION PLANS ENUM
CREATE TYPE subscription_plan AS ENUM ('free', 'pro', 'agency');

-- 2. SUBSCRIPTION STATUS ENUM  
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'past_due', 'canceled', 'unpaid');

-- 3. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Plan details
  plan_type subscription_plan NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  
  -- Stripe integration
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  
  -- Billing cycle
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  
  -- Plan limits (cached for performance)
  monthly_post_limit integer NOT NULL DEFAULT 5,
  brand_limit integer NOT NULL DEFAULT 1,
  team_member_limit integer NOT NULL DEFAULT 1,
  
  UNIQUE(user_id)
);

-- 4. USAGE TRACKING TABLE
CREATE TABLE public.usage_tracking (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Billing period tracking
  billing_cycle_start timestamptz NOT NULL,
  billing_cycle_end timestamptz NOT NULL,
  
  -- Usage counters
  posts_generated integer NOT NULL DEFAULT 0,
  brands_created integer NOT NULL DEFAULT 0,
  api_calls_made integer NOT NULL DEFAULT 0,
  
  -- Metadata
  last_updated timestamptz DEFAULT now(),
  
  UNIQUE(user_id, billing_cycle_start)
);

-- 5. BILLING HISTORY TABLE
CREATE TABLE public.billing_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Payment details
  amount_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  status text NOT NULL, -- paid, failed, pending, refunded
  
  -- Stripe integration
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  
  -- Plan context
  plan_type subscription_plan NOT NULL,
  billing_period_start timestamptz,
  billing_period_end timestamptz,
  
  -- Metadata
  description text,
  metadata jsonb
);

-- 6. TEAM MEMBERS TABLE (for Agency plan)
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  
  -- Team structure
  team_owner_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  member_user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Permissions
  role text NOT NULL DEFAULT 'member', -- owner, admin, editor, viewer
  permissions jsonb DEFAULT '{}',
  
  -- Status
  status text NOT NULL DEFAULT 'active', -- active, pending, inactive
  invited_at timestamptz DEFAULT now(),
  joined_at timestamptz,
  
  UNIQUE(team_owner_id, member_user_id)
);

-- 7. RLS POLICIES FOR SUBSCRIPTIONS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (true);

-- 8. RLS POLICIES FOR USAGE TRACKING
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage" ON public.usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert/update usage" ON public.usage_tracking
  FOR ALL WITH CHECK (true);

-- 9. RLS POLICIES FOR BILLING HISTORY
ALTER TABLE public.billing_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own billing history" ON public.billing_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert billing records" ON public.billing_history
  FOR INSERT WITH CHECK (true);

-- 10. RLS POLICIES FOR TEAM MEMBERS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team owners can manage their team" ON public.team_members
  FOR ALL USING (auth.uid() = team_owner_id);

CREATE POLICY "Team members can view their team info" ON public.team_members
  FOR SELECT USING (auth.uid() = member_user_id OR auth.uid() = team_owner_id);

-- 11. HELPER FUNCTIONS

-- Function to get current user's subscription
CREATE OR REPLACE FUNCTION get_user_subscription(user_uuid uuid)
RETURNS TABLE (
  plan_type subscription_plan,
  status subscription_status,
  monthly_post_limit integer,
  brand_limit integer,
  team_member_limit integer,
  current_period_end timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.plan_type, s.status, s.monthly_post_limit, s.brand_limit, s.team_member_limit, s.current_period_end
  FROM subscriptions s
  WHERE s.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has reached usage limits
CREATE OR REPLACE FUNCTION check_usage_limits(user_uuid uuid)
RETURNS TABLE (
  posts_remaining integer,
  brands_remaining integer,
  can_generate_post boolean,
  can_create_brand boolean
) AS $$
DECLARE
  user_sub RECORD;
  current_usage RECORD;
  cycle_start timestamptz;
  cycle_end timestamptz;
BEGIN
  -- Get user subscription
  SELECT * INTO user_sub FROM get_user_subscription(user_uuid);
  
  IF user_sub IS NULL THEN
    -- No subscription found, create default free subscription
    INSERT INTO subscriptions (user_id, plan_type, status, monthly_post_limit, brand_limit, team_member_limit)
    VALUES (user_uuid, 'free', 'active', 5, 1, 1);
    
    SELECT * INTO user_sub FROM get_user_subscription(user_uuid);
  END IF;
  
  -- Calculate current billing cycle
  cycle_start := date_trunc('month', now());
  cycle_end := cycle_start + interval '1 month';
  
  -- Get current usage
  SELECT * INTO current_usage 
  FROM usage_tracking u
  WHERE u.user_id = user_uuid 
    AND u.billing_cycle_start = cycle_start;
  
  IF current_usage IS NULL THEN
    -- Create usage record for this cycle
    INSERT INTO usage_tracking (user_id, billing_cycle_start, billing_cycle_end, posts_generated, brands_created)
    VALUES (user_uuid, cycle_start, cycle_end, 0, 0);
    
    current_usage.posts_generated := 0;
    current_usage.brands_created := 0;
  END IF;
  
  -- Count current brands
  DECLARE
    current_brands_count integer;
  BEGIN
    SELECT COUNT(*) INTO current_brands_count
    FROM brands b
    WHERE b.user_id = user_uuid;
    
    current_usage.brands_created := current_brands_count;
  END;
  
  -- Return usage limits check
  RETURN QUERY
  SELECT 
    GREATEST(0, user_sub.monthly_post_limit - current_usage.posts_generated) as posts_remaining,
    GREATEST(0, user_sub.brand_limit - current_usage.brands_created) as brands_remaining,
    (current_usage.posts_generated < user_sub.monthly_post_limit) as can_generate_post,
    (current_usage.brands_created < user_sub.brand_limit) as can_create_brand;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage counters
CREATE OR REPLACE FUNCTION increment_usage(user_uuid uuid, usage_type text, increment_by integer DEFAULT 1)
RETURNS void AS $$
DECLARE
  cycle_start timestamptz;
  cycle_end timestamptz;
BEGIN
  cycle_start := date_trunc('month', now());
  cycle_end := cycle_start + interval '1 month';
  
  -- Upsert usage tracking record
  INSERT INTO usage_tracking (user_id, billing_cycle_start, billing_cycle_end, posts_generated, brands_created, api_calls_made, last_updated)
  VALUES (
    user_uuid, 
    cycle_start, 
    cycle_end,
    CASE WHEN usage_type = 'posts' THEN increment_by ELSE 0 END,
    CASE WHEN usage_type = 'brands' THEN increment_by ELSE 0 END,
    CASE WHEN usage_type = 'api_calls' THEN increment_by ELSE 0 END,
    now()
  )
  ON CONFLICT (user_id, billing_cycle_start)
  DO UPDATE SET
    posts_generated = usage_tracking.posts_generated + CASE WHEN usage_type = 'posts' THEN increment_by ELSE 0 END,
    brands_created = usage_tracking.brands_created + CASE WHEN usage_type = 'brands' THEN increment_by ELSE 0 END,
    api_calls_made = usage_tracking.api_calls_made + CASE WHEN usage_type = 'api_calls' THEN increment_by ELSE 0 END,
    last_updated = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. INDEXES FOR PERFORMANCE
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_stripe_subscription ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_usage_tracking_user_cycle ON usage_tracking(user_id, billing_cycle_start);
CREATE INDEX idx_billing_history_user_id ON billing_history(user_id);
CREATE INDEX idx_team_members_owner ON team_members(team_owner_id);
CREATE INDEX idx_team_members_member ON team_members(member_user_id);

-- 13. CREATE DEFAULT SUBSCRIPTION FOR EXISTING USERS
INSERT INTO subscriptions (user_id, plan_type, status, monthly_post_limit, brand_limit, team_member_limit)
SELECT id, 'free', 'active', 5, 1, 1
FROM users
WHERE id NOT IN (SELECT user_id FROM subscriptions);

-- 14. TRIGGER TO AUTO-CREATE SUBSCRIPTION FOR NEW USERS
CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (user_id, plan_type, status, monthly_post_limit, brand_limit, team_member_limit)
  VALUES (NEW.id, 'free', 'active', 5, 1, 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_create_default_subscription
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_subscription();

-- 15. UPDATE TRIGGER FOR SUBSCRIPTIONS
CREATE OR REPLACE FUNCTION update_subscription_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_subscription_timestamp
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_subscription_timestamp();
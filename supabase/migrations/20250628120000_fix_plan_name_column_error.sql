-- Fix multiple issues in usage limits system:
-- 1. plan_name column doesn't exist in subscriptions table
-- 2. check_usage_limits function signature changed but TypeScript code still uses old format
-- 3. Return types don't match expectations

-- ============================================================================
-- FIX CHECK_USAGE_LIMITS FUNCTION
-- ============================================================================

-- Drop all variants of check_usage_limits function
DROP FUNCTION IF EXISTS public.check_usage_limits(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.check_usage_limits(text) CASCADE;
DROP FUNCTION IF EXISTS public.check_usage_limits(uuid) CASCADE;

-- Recreate check_usage_limits function with original signature and return format to match TypeScript
CREATE OR REPLACE FUNCTION public.check_usage_limits(user_uuid uuid)
RETURNS TABLE (
  posts_remaining integer,
  brands_remaining integer,
  can_generate_post boolean,
  can_create_brand boolean
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $$
DECLARE
  user_sub RECORD;
  current_posts_usage integer := 0;
  current_brands_count integer := 0;
  cycle_start timestamptz;
BEGIN
  -- Calculate current billing cycle
  cycle_start := date_trunc('month', now());
  
  -- Get user's current subscription (use existing safe function)
  SELECT s.plan_type, s.monthly_post_limit, s.brand_limit, s.status
  INTO user_sub
  FROM subscriptions s
  WHERE s.user_id = user_uuid AND s.status = 'active'
  ORDER BY s.created_at DESC 
  LIMIT 1;
  
  IF user_sub IS NULL THEN
    -- No subscription found, create default free subscription
    INSERT INTO subscriptions (user_id, plan_type, status, monthly_post_limit, brand_limit, team_member_limit)
    VALUES (user_uuid, 'free', 'active', 5, 1, 1);
    
    -- Set default limits for free plan
    user_sub.monthly_post_limit := 5;
    user_sub.brand_limit := 1;
  END IF;
  
  -- Get current posts usage from usage_tracking
  SELECT COALESCE(SUM(posts_generated), 0)
  INTO current_posts_usage
  FROM usage_tracking
  WHERE user_id = user_uuid 
    AND billing_cycle_start = cycle_start;
  
  -- Count current brands
  SELECT COUNT(*)
  INTO current_brands_count
  FROM brands
  WHERE user_id = user_uuid;
  
  -- Return usage limits check
  RETURN QUERY
  SELECT 
    GREATEST(0, user_sub.monthly_post_limit - current_posts_usage) as posts_remaining,
    GREATEST(0, user_sub.brand_limit - current_brands_count) as brands_remaining,
    (current_posts_usage < user_sub.monthly_post_limit) as can_generate_post,
    (current_brands_count < user_sub.brand_limit) as can_create_brand;
END;
$$;

-- ============================================================================
-- FIX GET_USER_SUBSCRIPTION FUNCTION
-- ============================================================================

-- Drop the problematic function
DROP FUNCTION IF EXISTS public.get_user_subscription(uuid) CASCADE;

-- Recreate with correct column names matching the actual schema
CREATE OR REPLACE FUNCTION public.get_user_subscription(user_uuid uuid)
RETURNS TABLE (
  plan_type text,
  stripe_subscription_id text,
  status text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  monthly_post_limit integer,
  brand_limit integer,
  team_member_limit integer
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.plan_type::text,
    s.stripe_subscription_id,
    s.status::text,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    s.monthly_post_limit,
    s.brand_limit,
    s.team_member_limit
  FROM subscriptions s
  WHERE s.user_id = user_uuid AND s.status = 'active'
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.check_usage_limits(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_subscription(uuid) TO authenticated;

-- ============================================================================
-- SECURITY COMMENTS
-- ============================================================================

COMMENT ON FUNCTION public.check_usage_limits(uuid) IS 'Secure usage limit checking with correct signature and immutable search_path';
COMMENT ON FUNCTION public.get_user_subscription(uuid) IS 'Secure subscription lookup with correct column names and immutable search_path';
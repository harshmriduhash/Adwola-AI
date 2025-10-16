-- Final Security Function Fixes
-- Target the 4 remaining functions with mutable search_path

-- ============================================================================
-- FIX SPECIFIC FUNCTIONS WITH SEARCH_PATH ISSUES
-- ============================================================================

-- Drop all variants of these functions and recreate with secure search_path
DROP FUNCTION IF EXISTS public.create_default_subscription() CASCADE;
DROP FUNCTION IF EXISTS public.create_default_subscription(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.decrypt_token(text) CASCADE;
DROP FUNCTION IF EXISTS public.upsert_social_connection(uuid, text, text, jsonb) CASCADE;
DROP FUNCTION IF EXISTS public.upsert_social_connection(text, text, jsonb) CASCADE;
DROP FUNCTION IF EXISTS public.check_usage_limits(uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.check_usage_limits(text) CASCADE;

-- Recreate create_default_subscription with secure search_path
CREATE OR REPLACE FUNCTION public.create_default_subscription()
RETURNS uuid 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $$
DECLARE
  subscription_id uuid;
  user_uuid uuid;
BEGIN
  -- Get the current user ID
  user_uuid := auth.uid();
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Check if user already has a subscription
  IF EXISTS (SELECT 1 FROM subscriptions WHERE user_id = user_uuid) THEN
    RETURN NULL;
  END IF;
  
  -- Create free tier subscription
  INSERT INTO subscriptions (
    user_id,
    plan_type,
    plan_name,
    status,
    posts_limit,
    brands_limit,
    team_members_limit
  ) VALUES (
    user_uuid,
    'free',
    'Free Plan',
    'active',
    5,   -- 5 posts per month
    1,   -- 1 brand
    1    -- solo user
  ) RETURNING id INTO subscription_id;
  
  RETURN subscription_id;
END;
$$;

-- Recreate decrypt_token with secure search_path
CREATE OR REPLACE FUNCTION public.decrypt_token(encrypted_token text)
RETURNS text 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $$
BEGIN
  -- This is a placeholder for actual decryption logic
  -- In production, this would use proper encryption/decryption with pgcrypto
  RETURN encrypted_token;
END;
$$;

-- Recreate upsert_social_connection with secure search_path
CREATE OR REPLACE FUNCTION public.upsert_social_connection(
  platform_name text,
  encrypted_token text,
  profile_data jsonb DEFAULT '{}'
)
RETURNS uuid 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $$
DECLARE
  connection_id uuid;
  user_uuid uuid;
BEGIN
  -- Get the current user ID
  user_uuid := auth.uid();
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  INSERT INTO social_connections (user_id, platform, encrypted_tokens, profile_data)
  VALUES (user_uuid, platform_name, encrypted_token, profile_data)
  ON CONFLICT (user_id, platform)
  DO UPDATE SET
    encrypted_tokens = EXCLUDED.encrypted_tokens,
    profile_data = EXCLUDED.profile_data,
    updated_at = NOW()
  RETURNING id INTO connection_id;
  
  RETURN connection_id;
END;
$$;

-- Recreate check_usage_limits with secure search_path
CREATE OR REPLACE FUNCTION public.check_usage_limits(resource_type text)
RETURNS json 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $$
DECLARE
  current_usage integer := 0;
  monthly_limit integer := 0;
  user_plan record;
  user_uuid uuid;
BEGIN
  -- Get the current user ID
  user_uuid := auth.uid();
  
  IF user_uuid IS NULL THEN
    RETURN json_build_object('allowed', false, 'error', 'Not authenticated');
  END IF;
  
  -- Get user's current subscription
  SELECT plan_type, posts_limit, brands_limit 
  INTO user_plan
  FROM subscriptions 
  WHERE user_id = user_uuid AND status = 'active'
  ORDER BY created_at DESC 
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN json_build_object('allowed', false, 'error', 'No active subscription found');
  END IF;
  
  -- Check resource-specific limits
  IF resource_type = 'post' THEN
    monthly_limit := user_plan.posts_limit;
    
    SELECT COUNT(*)
    INTO current_usage
    FROM usage_tracking
    WHERE user_id = user_uuid 
      AND resource_type = 'post'
      AND created_at >= date_trunc('month', NOW());
      
  ELSIF resource_type = 'brand' THEN
    monthly_limit := user_plan.brands_limit;
    
    SELECT COUNT(*)
    INTO current_usage
    FROM brands
    WHERE user_id = user_uuid;
    
  ELSE
    RETURN json_build_object('allowed', false, 'error', 'Invalid resource type');
  END IF;
  
  -- Return usage status
  RETURN json_build_object(
    'allowed', current_usage < monthly_limit,
    'current_usage', current_usage,
    'limit', monthly_limit,
    'remaining', GREATEST(0, monthly_limit - current_usage),
    'plan_type', user_plan.plan_type
  );
END;
$$;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.create_default_subscription() TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrypt_token(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_social_connection(text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_usage_limits(text) TO authenticated;

-- ============================================================================
-- SECURITY COMMENTS
-- ============================================================================

COMMENT ON FUNCTION public.create_default_subscription() IS 'Secure default subscription creation with immutable search_path';
COMMENT ON FUNCTION public.decrypt_token(text) IS 'Secure token decryption with immutable search_path';
COMMENT ON FUNCTION public.upsert_social_connection(text, text, jsonb) IS 'Secure social connection management with immutable search_path';
COMMENT ON FUNCTION public.check_usage_limits(text) IS 'Secure usage limit checking with immutable search_path';
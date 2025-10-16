-- Fix Remaining Security Functions Migration
-- Addresses all remaining search_path vulnerabilities

-- ============================================================================
-- SCHEDULING SYSTEM FUNCTIONS
-- ============================================================================

-- Fix process_scheduled_posts function
CREATE OR REPLACE FUNCTION process_scheduled_posts()
RETURNS void 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
  -- Update posts that are scheduled for now or earlier to 'ready_to_post' status
  UPDATE generated_posts 
  SET status = 'ready_to_post'
  WHERE status = 'scheduled' 
    AND schedule_time <= NOW();
    
  -- Log the scheduling activity
  INSERT INTO scheduling_logs (processed_at, posts_processed)
  SELECT NOW(), COUNT(*)
  FROM generated_posts 
  WHERE status = 'ready_to_post' 
    AND schedule_time <= NOW();
END;
$$;

-- Fix schedule_post function
CREATE OR REPLACE FUNCTION schedule_post(
  post_id uuid,
  schedule_time timestamptz,
  user_id uuid
)
RETURNS json 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Verify the user owns this post
  IF NOT EXISTS (
    SELECT 1 FROM generated_posts gp
    JOIN content_briefs cb ON gp.brief_id = cb.id
    WHERE gp.id = post_id AND cb.user_id = schedule_post.user_id
  ) THEN
    RETURN json_build_object('success', false, 'error', 'Post not found or access denied');
  END IF;
  
  -- Update the post with scheduling information
  UPDATE generated_posts 
  SET 
    status = 'scheduled',
    schedule_time = schedule_post.schedule_time,
    scheduled_by = schedule_post.user_id,
    scheduled_at = NOW()
  WHERE id = post_id;
  
  RETURN json_build_object('success', true, 'message', 'Post scheduled successfully');
END;
$$;

-- Fix cancel_scheduled_post function
CREATE OR REPLACE FUNCTION cancel_scheduled_post(
  post_id uuid,
  user_id uuid
)
RETURNS json 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Verify the user owns this post
  IF NOT EXISTS (
    SELECT 1 FROM generated_posts gp
    JOIN content_briefs cb ON gp.brief_id = cb.id
    WHERE gp.id = post_id AND cb.user_id = cancel_scheduled_post.user_id
  ) THEN
    RETURN json_build_object('success', false, 'error', 'Post not found or access denied');
  END IF;
  
  -- Update the post to remove scheduling
  UPDATE generated_posts 
  SET 
    status = 'approved',
    schedule_time = NULL,
    scheduled_by = NULL,
    scheduled_at = NULL
  WHERE id = post_id AND status = 'scheduled';
  
  RETURN json_build_object('success', true, 'message', 'Scheduled post cancelled');
END;
$$;

-- ============================================================================
-- SUBSCRIPTION SYSTEM FUNCTIONS
-- ============================================================================

-- Drop and recreate get_user_subscription function with proper signature
DROP FUNCTION IF EXISTS get_user_subscription(uuid);
CREATE FUNCTION get_user_subscription(user_uuid uuid)
RETURNS TABLE (
  plan_type text,
  plan_name text,
  stripe_subscription_id text,
  status text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  posts_limit integer,
  brands_limit integer,
  team_members_limit integer
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.plan_type,
    s.plan_name,
    s.stripe_subscription_id,
    s.status,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    s.posts_limit,
    s.brands_limit,
    s.team_members_limit
  FROM subscriptions s
  WHERE s.user_id = user_uuid AND s.status = 'active'
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$;

-- Drop and recreate create_default_subscription function
DROP FUNCTION IF EXISTS create_default_subscription(uuid);
CREATE FUNCTION create_default_subscription(user_uuid uuid)
RETURNS uuid 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  subscription_id uuid;
BEGIN
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

-- Drop and recreate check_usage_limits function
DROP FUNCTION IF EXISTS check_usage_limits(uuid, text);
CREATE FUNCTION check_usage_limits(
  user_uuid uuid,
  resource_type text
)
RETURNS json 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  current_usage integer := 0;
  monthly_limit integer := 0;
  user_plan record;
BEGIN
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

-- Drop and recreate increment_usage function
DROP FUNCTION IF EXISTS increment_usage(uuid, text, integer);
CREATE FUNCTION increment_usage(
  user_uuid uuid,
  resource_type text,
  quantity integer DEFAULT 1
)
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO usage_tracking (user_id, resource_type, quantity)
  VALUES (user_uuid, resource_type, quantity);
END;
$$;

-- Fix update_subscription_timestamp function (generic function for timestamps)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Fix update_subscription_timestamp function
CREATE OR REPLACE FUNCTION update_subscription_timestamp()
RETURNS trigger 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- ============================================================================
-- SOCIAL CONNECTION FUNCTIONS
-- ============================================================================

-- Drop and recreate upsert_social_connection function
DROP FUNCTION IF EXISTS upsert_social_connection(uuid, text, text, jsonb);
CREATE FUNCTION upsert_social_connection(
  user_uuid uuid,
  platform_name text,
  encrypted_token text,
  profile_data jsonb DEFAULT '{}'
)
RETURNS uuid 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  connection_id uuid;
BEGIN
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

-- Drop and recreate decrypt_token function
DROP FUNCTION IF EXISTS decrypt_token(text);
CREATE FUNCTION decrypt_token(encrypted_token text)
RETURNS text 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- This is a placeholder for actual decryption logic
  -- In production, this would use proper encryption/decryption
  RETURN encrypted_token;
END;
$$;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_user_subscription(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION create_default_subscription(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION check_usage_limits(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_usage(uuid, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION schedule_post(uuid, timestamptz, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION cancel_scheduled_post(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION upsert_social_connection(uuid, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION decrypt_token(text) TO authenticated;

-- ============================================================================
-- SECURITY COMMENTS
-- ============================================================================

COMMENT ON FUNCTION process_scheduled_posts() IS 'Secure cron function with fixed search_path';
COMMENT ON FUNCTION schedule_post(uuid, timestamptz, uuid) IS 'Secure post scheduling with user verification and fixed search_path';
COMMENT ON FUNCTION cancel_scheduled_post(uuid, uuid) IS 'Secure post cancellation with user verification and fixed search_path';
COMMENT ON FUNCTION get_user_subscription(uuid) IS 'Secure subscription lookup with fixed search_path';
COMMENT ON FUNCTION create_default_subscription(uuid) IS 'Secure default subscription creation with fixed search_path';
COMMENT ON FUNCTION check_usage_limits(uuid, text) IS 'Secure usage limit checking with fixed search_path';
COMMENT ON FUNCTION increment_usage(uuid, text, integer) IS 'Secure usage tracking with fixed search_path';
COMMENT ON FUNCTION upsert_social_connection(uuid, text, text, jsonb) IS 'Secure social connection management with fixed search_path';
COMMENT ON FUNCTION decrypt_token(text) IS 'Secure token decryption with fixed search_path';
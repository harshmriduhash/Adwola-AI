-- Security Fixes Migration
-- Addresses Supabase linter security warnings

-- ============================================================================
-- FIX 1: ENABLE RLS ON QUERY_PERFORMANCE_LOG TABLE
-- ============================================================================

-- Enable RLS on the performance monitoring table
ALTER TABLE public.query_performance_log ENABLE ROW LEVEL SECURITY;

-- Only allow users to view their own performance logs
CREATE POLICY "Users can view their own performance logs" ON public.query_performance_log
    FOR SELECT USING (user_id = auth.uid());

-- Allow system to insert performance logs
CREATE POLICY "System can insert performance logs" ON public.query_performance_log
    FOR INSERT WITH CHECK (true);

-- ============================================================================
-- FIX 2: SECURE FUNCTION SEARCH PATHS
-- ============================================================================

-- Fix search_path for all functions to prevent SQL injection

-- Performance functions
CREATE OR REPLACE FUNCTION get_user_briefs_paginated(
  user_uuid uuid,
  page_limit integer DEFAULT 10,
  page_offset integer DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  topic text,
  goal text,
  status text,
  created_at timestamptz,
  brand_name text,
  brand_logo_url text,
  posts_count bigint,
  total_count bigint
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH brief_data AS (
    SELECT 
      cb.id,
      cb.topic,
      cb.goal,
      cb.status,
      cb.created_at,
      b.brand_name,
      b.logo_url as brand_logo_url,
      COUNT(gp.id) as posts_count
    FROM content_briefs cb
    LEFT JOIN brands b ON cb.brand_id = b.id
    LEFT JOIN generated_posts gp ON cb.id = gp.brief_id
    WHERE cb.user_id = user_uuid
    GROUP BY cb.id, cb.topic, cb.goal, cb.status, cb.created_at, b.brand_name, b.logo_url
    ORDER BY cb.created_at DESC
    LIMIT page_limit OFFSET page_offset
  ),
  total_counter AS (
    SELECT COUNT(*) as total_count
    FROM content_briefs cb
    WHERE cb.user_id = user_uuid
  )
  SELECT 
    bd.*,
    tc.total_count
  FROM brief_data bd
  CROSS JOIN total_counter tc;
END;
$$;

CREATE OR REPLACE FUNCTION get_posts_for_briefs(brief_ids uuid[])
RETURNS TABLE (
  id uuid,
  brief_id uuid,
  platform text,
  generated_text text,
  status text,
  schedule_time timestamptz
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gp.id,
    gp.brief_id,
    gp.platform,
    gp.generated_text,
    gp.status,
    gp.schedule_time
  FROM generated_posts gp
  WHERE gp.brief_id = ANY(brief_ids)
  ORDER BY gp.id;
END;
$$;

CREATE OR REPLACE FUNCTION refresh_user_dashboard_stats(user_uuid uuid)
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Refresh only specific user's stats
  DELETE FROM user_dashboard_stats WHERE user_id = user_uuid;
  
  INSERT INTO user_dashboard_stats
  SELECT 
    cb.user_id,
    COUNT(cb.id) as total_campaigns,
    COUNT(CASE WHEN cb.status = 'completed' THEN 1 END) as completed_campaigns,
    COUNT(CASE WHEN cb.status = 'processing' THEN 1 END) as processing_campaigns,
    COUNT(gp.id) as total_posts,
    COUNT(CASE WHEN gp.status = 'scheduled' AND gp.schedule_time IS NOT NULL THEN 1 END) as scheduled_posts,
    MAX(cb.created_at) as last_activity
  FROM content_briefs cb
  LEFT JOIN generated_posts gp ON cb.id = gp.brief_id
  WHERE cb.user_id = user_uuid
  GROUP BY cb.user_id;
END;
$$;

CREATE OR REPLACE FUNCTION log_slow_query(
  user_uuid uuid,
  query_type_name text,
  execution_time integer
)
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Only log queries slower than 1 second
  IF execution_time > 1000 THEN
    INSERT INTO query_performance_log (user_id, query_type, execution_time_ms)
    VALUES (user_uuid, query_type_name, execution_time);
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION cleanup_performance_logs()
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- Keep only last 30 days of performance logs
  DELETE FROM query_performance_log 
  WHERE created_at < now() - interval '30 days';
END;
$$;

CREATE OR REPLACE FUNCTION notify_dashboard_change()
RETURNS trigger 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
  -- Only notify for relevant changes
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    -- Limit notification payload - handle different table structures
    IF TG_TABLE_NAME = 'content_briefs' THEN
      PERFORM pg_notify(
        'dashboard_changes', 
        json_build_object(
          'table', TG_TABLE_NAME,
          'operation', TG_OP,
          'id', NEW.id,
          'user_id', NEW.user_id,
          'status', NEW.status
        )::text
      );
    ELSIF TG_TABLE_NAME = 'generated_posts' THEN
      PERFORM pg_notify(
        'dashboard_changes', 
        json_build_object(
          'table', TG_TABLE_NAME,
          'operation', TG_OP,
          'id', NEW.id,
          'brief_id', NEW.brief_id,
          'status', NEW.status
        )::text
      );
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM pg_notify(
      'dashboard_changes',
      json_build_object(
        'table', TG_TABLE_NAME,
        'operation', TG_OP,
        'id', OLD.id
      )::text
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Fix analytics functions
CREATE OR REPLACE FUNCTION calculate_engagement_rate(
    p_likes BIGINT,
    p_shares BIGINT,
    p_comments BIGINT,
    p_views BIGINT
) RETURNS DECIMAL(5,4) 
LANGUAGE plpgsql 
IMMUTABLE 
SET search_path = public
AS $$
BEGIN
    IF p_views = 0 THEN
        RETURN 0.0;
    END IF;
    
    RETURN LEAST(((p_likes + p_shares + p_comments)::DECIMAL / p_views::DECIMAL), 1.0);
END;
$$;

CREATE OR REPLACE FUNCTION calculate_performance_score(
    p_engagement_rate DECIMAL(5,4),
    p_views BIGINT,
    p_platform TEXT
) RETURNS DECIMAL(5,2) 
LANGUAGE plpgsql 
IMMUTABLE 
SET search_path = public
AS $$
DECLARE
    base_score DECIMAL(5,2);
    view_bonus DECIMAL(5,2);
    platform_multiplier DECIMAL(3,2);
BEGIN
    -- Base score from engagement rate (0-70 points)
    base_score := p_engagement_rate * 70;
    
    -- View count bonus (0-20 points)
    view_bonus := LEAST((p_views::DECIMAL / 1000) * 2, 20);
    
    -- Platform-specific multiplier
    platform_multiplier := CASE p_platform
        WHEN 'linkedin' THEN 1.1
        WHEN 'twitter' THEN 1.0
        WHEN 'facebook' THEN 0.9
        WHEN 'instagram' THEN 1.05
        ELSE 1.0
    END;
    
    -- Additional quality bonus (0-10 points) - placeholder for future AI scoring
    RETURN LEAST((base_score + view_bonus + 5) * platform_multiplier, 100.0);
END;
$$;

CREATE OR REPLACE FUNCTION update_post_analytics(
    p_post_id UUID,
    p_platform TEXT,
    p_views BIGINT DEFAULT 0,
    p_likes BIGINT DEFAULT 0,
    p_shares BIGINT DEFAULT 0,
    p_comments BIGINT DEFAULT 0,
    p_clicks BIGINT DEFAULT 0,
    p_platform_metrics JSONB DEFAULT '{}'
) RETURNS UUID 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    analytics_id UUID;
    engagement_rate DECIMAL(5,4);
    performance_score DECIMAL(5,2);
BEGIN
    -- Calculate metrics
    engagement_rate := calculate_engagement_rate(p_likes, p_shares, p_comments, p_views);
    performance_score := calculate_performance_score(engagement_rate, p_views, p_platform);
    
    -- Insert or update analytics
    INSERT INTO post_analytics (
        post_id, platform, views_count, likes_count, shares_count, 
        comments_count, clicks_count, engagement_rate, performance_score,
        platform_metrics, last_updated
    ) VALUES (
        p_post_id, p_platform, p_views, p_likes, p_shares,
        p_comments, p_clicks, engagement_rate, performance_score,
        p_platform_metrics, NOW()
    )
    ON CONFLICT (post_id, platform) 
    DO UPDATE SET
        views_count = EXCLUDED.views_count,
        likes_count = EXCLUDED.likes_count,
        shares_count = EXCLUDED.shares_count,
        comments_count = EXCLUDED.comments_count,
        clicks_count = EXCLUDED.clicks_count,
        engagement_rate = EXCLUDED.engagement_rate,
        performance_score = EXCLUDED.performance_score,
        platform_metrics = EXCLUDED.platform_metrics,
        last_updated = NOW()
    RETURNING id INTO analytics_id;
    
    RETURN analytics_id;
END;
$$;

-- ============================================================================
-- FIX 3: SECURE MATERIALIZED VIEW ACCESS
-- ============================================================================

-- Remove public access to materialized view and create secure function instead
REVOKE SELECT ON public.user_dashboard_stats FROM anon, authenticated;

-- Create secure function to access dashboard stats
CREATE OR REPLACE FUNCTION get_user_dashboard_stats(user_uuid uuid)
RETURNS TABLE (
  total_campaigns bigint,
  completed_campaigns bigint,
  processing_campaigns bigint,
  total_posts bigint,
  scheduled_posts bigint,
  last_activity timestamptz
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uds.total_campaigns,
    uds.completed_campaigns,
    uds.processing_campaigns,
    uds.total_posts,
    uds.scheduled_posts,
    uds.last_activity
  FROM user_dashboard_stats uds
  WHERE uds.user_id = user_uuid;
END;
$$;

-- Grant access to secure dashboard function
GRANT EXECUTE ON FUNCTION get_user_dashboard_stats(uuid) TO authenticated;

-- ============================================================================
-- SECURITY COMMENTS
-- ============================================================================

COMMENT ON POLICY "Users can view their own performance logs" ON public.query_performance_log IS 'RLS: Users can only access their own performance monitoring data';
COMMENT ON FUNCTION get_user_dashboard_stats IS 'Secure access to dashboard stats via function instead of direct materialized view access';
COMMENT ON FUNCTION get_user_briefs_paginated IS 'Secure function with fixed search_path to prevent SQL injection';
COMMENT ON FUNCTION log_slow_query IS 'Secure performance monitoring function with restricted search_path';
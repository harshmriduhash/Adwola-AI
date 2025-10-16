-- Performance Optimization Migration for Dashboard Loading Issues
-- Run this migration to add critical performance improvements

-- ============================================================================
-- ADDITIONAL PERFORMANCE INDEXES
-- ============================================================================

-- Index for dashboard pagination queries (user + created_at)
CREATE INDEX IF NOT EXISTS idx_content_briefs_user_created_pagination 
ON public.content_briefs(user_id, created_at DESC, id);

-- Index for generated_posts by brief_id with status
CREATE INDEX IF NOT EXISTS idx_generated_posts_brief_status_optimized 
ON public.generated_posts(brief_id, status);

-- Index for real-time subscription filtering
CREATE INDEX IF NOT EXISTS idx_content_briefs_user_status_created
ON public.content_briefs(user_id, status, created_at DESC);

-- ============================================================================
-- DASHBOARD PERFORMANCE FUNCTIONS
-- ============================================================================

-- Function to get paginated briefs with efficient counting
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
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get posts for specific briefs (separate query)
CREATE OR REPLACE FUNCTION get_posts_for_briefs(brief_ids uuid[])
RETURNS TABLE (
  id uuid,
  brief_id uuid,
  platform text,
  generated_text text,
  status text,
  schedule_time timestamptz
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- REAL-TIME SUBSCRIPTION OPTIMIZATION
-- ============================================================================

-- Function to reduce real-time subscription payload size
CREATE OR REPLACE FUNCTION notify_dashboard_change()
RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql;

-- ============================================================================
-- QUERY OPTIMIZATION VIEWS
-- ============================================================================

-- Materialized view for dashboard stats (refresh periodically)
CREATE MATERIALIZED VIEW IF NOT EXISTS user_dashboard_stats AS
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
GROUP BY cb.user_id;

-- Index for materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_dashboard_stats_user_id 
ON user_dashboard_stats(user_id);

-- Function to refresh user stats
CREATE OR REPLACE FUNCTION refresh_user_dashboard_stats(user_uuid uuid)
RETURNS void AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PERFORMANCE MONITORING
-- ============================================================================

-- Table to track slow queries
CREATE TABLE IF NOT EXISTS query_performance_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  query_type text,
  execution_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Function to log slow queries
CREATE OR REPLACE FUNCTION log_slow_query(
  user_uuid uuid,
  query_type_name text,
  execution_time integer
)
RETURNS void AS $$
BEGIN
  -- Only log queries slower than 1 second
  IF execution_time > 1000 THEN
    INSERT INTO query_performance_log (user_id, query_type, execution_time_ms)
    VALUES (user_uuid, query_type_name, execution_time);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- CLEANUP AND MAINTENANCE
-- ============================================================================

-- Function to clean up old performance logs
CREATE OR REPLACE FUNCTION cleanup_performance_logs()
RETURNS void AS $$
BEGIN
  -- Keep only last 30 days of performance logs
  DELETE FROM query_performance_log 
  WHERE created_at < now() - interval '30 days';
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_user_briefs_paginated(uuid, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION get_posts_for_briefs(uuid[]) TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_user_dashboard_stats(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION log_slow_query(uuid, text, integer) TO authenticated;
GRANT SELECT ON user_dashboard_stats TO authenticated;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON FUNCTION get_user_briefs_paginated IS 'Efficiently loads paginated briefs with post counts for dashboard';
COMMENT ON FUNCTION get_posts_for_briefs IS 'Loads posts for specific briefs in separate optimized query';
COMMENT ON MATERIALIZED VIEW user_dashboard_stats IS 'Cached dashboard statistics for improved performance';
COMMENT ON FUNCTION refresh_user_dashboard_stats IS 'Refreshes cached stats for specific user';
COMMENT ON TABLE query_performance_log IS 'Tracks slow queries for performance monitoring';
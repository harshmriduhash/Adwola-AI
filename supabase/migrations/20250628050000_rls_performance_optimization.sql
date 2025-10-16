-- RLS Performance Optimization Migration
-- Fixes auth function re-evaluation and multiple permissive policies issues

-- ============================================================================
-- FIX RLS AUTH FUNCTION RE-EVALUATION ISSUES 
-- ============================================================================

-- Replace auth.uid() with (select auth.uid()) for better performance
-- This prevents re-evaluation of auth functions for each row

-- Users table RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.users;

CREATE POLICY "Users can insert their own profile." ON public.users
    FOR INSERT WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile." ON public.users
    FOR UPDATE USING ((select auth.uid()) = id);

-- Brands table RLS policies  
DROP POLICY IF EXISTS "Users can CRUD their own brands." ON public.brands;

CREATE POLICY "Users can CRUD their own brands." ON public.brands
    FOR ALL USING ((select auth.uid()) = user_id);

-- Waitlist emails table RLS policies
DROP POLICY IF EXISTS "Only authenticated users can view waitlist" ON public.waitlist_emails;

CREATE POLICY "Only authenticated users can view waitlist" ON public.waitlist_emails
    FOR SELECT USING ((select auth.uid()) IS NOT NULL);

-- Content briefs table RLS policies
DROP POLICY IF EXISTS "Users can CRUD their own briefs." ON public.content_briefs;

CREATE POLICY "Users can CRUD their own briefs." ON public.content_briefs
    FOR ALL USING ((select auth.uid()) = user_id);

-- Generated posts table RLS policies
DROP POLICY IF EXISTS "Users can view posts from their own briefs." ON public.generated_posts;
DROP POLICY IF EXISTS "Users can update posts from their own briefs." ON public.generated_posts;
DROP POLICY IF EXISTS "Users can insert posts for their own briefs." ON public.generated_posts;

-- Create consolidated policy for generated_posts
CREATE POLICY "Users can manage posts from their own briefs." ON public.generated_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM content_briefs cb 
            WHERE cb.id = generated_posts.brief_id 
            AND cb.user_id = (select auth.uid())
        )
    );

-- Scheduling logs table RLS policies
DROP POLICY IF EXISTS "Authenticated users can view scheduling logs" ON public.scheduling_logs;

CREATE POLICY "Authenticated users can view scheduling logs" ON public.scheduling_logs
    FOR SELECT USING ((select auth.uid()) IS NOT NULL);

-- Social connections table RLS policies
DROP POLICY IF EXISTS "Users can manage their own social connections" ON public.social_connections;

CREATE POLICY "Users can manage their own social connections" ON public.social_connections
    FOR ALL USING ((select auth.uid()) = user_id);

-- Subscriptions table RLS policies
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscriptions;

CREATE POLICY "Users can manage their own subscription" ON public.subscriptions
    FOR ALL USING ((select auth.uid()) = user_id);

-- Usage tracking table RLS policies
DROP POLICY IF EXISTS "Users can view their own usage" ON public.usage_tracking;
DROP POLICY IF EXISTS "System can insert/update usage" ON public.usage_tracking;

-- Consolidated usage tracking policy
CREATE POLICY "Users can manage their own usage" ON public.usage_tracking
    FOR ALL USING ((select auth.uid()) = user_id);

-- Billing history table RLS policies
DROP POLICY IF EXISTS "Users can view their own billing history" ON public.billing_history;

CREATE POLICY "Users can view their own billing history" ON public.billing_history
    FOR SELECT USING ((select auth.uid()) = user_id);

-- Team members table RLS policies
DROP POLICY IF EXISTS "Team owners can manage their team" ON public.team_members;
DROP POLICY IF EXISTS "Team members can view their team info" ON public.team_members;

-- Consolidated team members policy
CREATE POLICY "Users can manage team members" ON public.team_members
    FOR ALL USING (
        (select auth.uid()) = team_owner_id OR 
        (select auth.uid()) = member_user_id
    );

-- Post analytics table RLS policies
DROP POLICY IF EXISTS "Users can view their own post analytics" ON public.post_analytics;
DROP POLICY IF EXISTS "Users can update their own post analytics" ON public.post_analytics;

CREATE POLICY "Users can manage their own post analytics" ON public.post_analytics
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM generated_posts gp
            JOIN content_briefs cb ON gp.brief_id = cb.id
            WHERE gp.id = post_analytics.post_id 
            AND cb.user_id = (select auth.uid())
        )
    );

-- Content insights table RLS policies
DROP POLICY IF EXISTS "Users can view their own insights" ON public.content_insights;
DROP POLICY IF EXISTS "Users can update their own insights" ON public.content_insights;
DROP POLICY IF EXISTS "System can manage insights" ON public.content_insights;

CREATE POLICY "Users can manage their own insights" ON public.content_insights
    FOR ALL USING ((select auth.uid()) = user_id);

-- Competitor analysis table RLS policies
DROP POLICY IF EXISTS "Users can view their own competitor analysis" ON public.competitor_analysis;
DROP POLICY IF EXISTS "Users can manage their own competitor analysis" ON public.competitor_analysis;

CREATE POLICY "Users can manage their own competitor analysis" ON public.competitor_analysis
    FOR ALL USING ((select auth.uid()) = user_id);

-- Optimal posting times table RLS policies
DROP POLICY IF EXISTS "Users can view their own posting times" ON public.optimal_posting_times;
DROP POLICY IF EXISTS "System can manage posting times" ON public.optimal_posting_times;

CREATE POLICY "Users can manage their own posting times" ON public.optimal_posting_times
    FOR ALL USING ((select auth.uid()) = user_id);

-- A/B tests table RLS policies
DROP POLICY IF EXISTS "Users can view their own A/B tests" ON public.ab_tests;
DROP POLICY IF EXISTS "Users can manage their own A/B tests" ON public.ab_tests;

CREATE POLICY "Users can manage their own A/B tests" ON public.ab_tests
    FOR ALL USING ((select auth.uid()) = user_id);

-- Query performance log table RLS policies
DROP POLICY IF EXISTS "Users can view their own performance logs" ON public.query_performance_log;

CREATE POLICY "Users can view their own performance logs" ON public.query_performance_log
    FOR SELECT USING ((select auth.uid()) = user_id);

-- ============================================================================
-- REMOVE DUPLICATE INDEXES
-- ============================================================================

-- Remove duplicate index on generated_posts table
DROP INDEX IF EXISTS idx_generated_posts_brief_status;
-- Keep the optimized version: idx_generated_posts_brief_status_optimized

-- ============================================================================
-- SECURITY COMMENTS
-- ============================================================================

COMMENT ON POLICY "Users can insert their own profile." ON public.users IS 'Optimized RLS policy with select auth.uid() for better performance';
COMMENT ON POLICY "Users can update their own profile." ON public.users IS 'Optimized RLS policy with select auth.uid() for better performance';
COMMENT ON POLICY "Users can CRUD their own brands." ON public.brands IS 'Optimized RLS policy with select auth.uid() for better performance';
COMMENT ON POLICY "Users can manage posts from their own briefs." ON public.generated_posts IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own subscription" ON public.subscriptions IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own usage" ON public.usage_tracking IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage team members" ON public.team_members IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own post analytics" ON public.post_analytics IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own insights" ON public.content_insights IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own competitor analysis" ON public.competitor_analysis IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own posting times" ON public.optimal_posting_times IS 'Consolidated RLS policy for better performance';
COMMENT ON POLICY "Users can manage their own A/B tests" ON public.ab_tests IS 'Consolidated RLS policy for better performance';
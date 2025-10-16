-- Phase 11: Advanced AI & Analytics - Database Schema
-- Migration: Add analytics and performance tracking system

-- Performance Analytics Table
CREATE TABLE IF NOT EXISTS public.post_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.generated_posts(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'facebook', 'instagram')),
    
    -- Engagement Metrics
    views_count BIGINT DEFAULT 0,
    likes_count BIGINT DEFAULT 0,
    shares_count BIGINT DEFAULT 0,
    comments_count BIGINT DEFAULT 0,
    clicks_count BIGINT DEFAULT 0,
    
    -- Performance Scores
    engagement_rate DECIMAL(5,4) DEFAULT 0.0, -- Calculated: (likes + shares + comments) / views
    performance_score DECIMAL(5,2) DEFAULT 0.0, -- AI-calculated overall score (0-100)
    
    -- Platform-specific metrics
    platform_metrics JSONB DEFAULT '{}',
    
    -- Timestamps
    published_at TIMESTAMPTZ,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Performance Insights Table
CREATE TABLE IF NOT EXISTS public.content_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    
    -- AI-Generated Insights
    insight_type TEXT NOT NULL CHECK (insight_type IN ('trend', 'optimization', 'timing', 'content_style', 'competitor')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    
    -- Supporting Data
    data_points JSONB DEFAULT '{}',
    confidence_score DECIMAL(3,2) DEFAULT 0.0, -- 0.0 to 1.0
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'dismissed', 'applied')),
    applied_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Competitor Analysis Table
CREATE TABLE IF NOT EXISTS public.competitor_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    
    -- Competitor Info
    competitor_name TEXT NOT NULL,
    competitor_platform TEXT NOT NULL,
    competitor_handle TEXT,
    
    -- Analysis Data
    content_themes JSONB DEFAULT '[]',
    posting_frequency JSONB DEFAULT '{}',
    engagement_patterns JSONB DEFAULT '{}',
    top_performing_content JSONB DEFAULT '[]',
    
    -- AI Analysis
    analysis_summary TEXT,
    opportunities JSONB DEFAULT '[]',
    threats JSONB DEFAULT '[]',
    
    -- Analysis Status
    last_analyzed_at TIMESTAMPTZ DEFAULT NOW(),
    analysis_status TEXT DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'analyzing', 'completed', 'failed')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optimal Posting Times Table
CREATE TABLE IF NOT EXISTS public.optimal_posting_times (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'facebook', 'instagram')),
    
    -- Time Analysis
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
    hour_of_day INTEGER NOT NULL CHECK (hour_of_day BETWEEN 0 AND 23),
    timezone TEXT DEFAULT 'UTC',
    
    -- Performance Data
    avg_engagement_rate DECIMAL(5,4) DEFAULT 0.0,
    post_count INTEGER DEFAULT 0,
    total_engagement BIGINT DEFAULT 0,
    
    -- AI Confidence
    confidence_score DECIMAL(3,2) DEFAULT 0.0,
    recommendation_strength TEXT DEFAULT 'moderate' CHECK (recommendation_strength IN ('low', 'moderate', 'high')),
    
    -- Timestamps
    last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- A/B Testing Table
CREATE TABLE IF NOT EXISTS public.ab_tests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    
    -- Test Configuration
    test_name TEXT NOT NULL,
    test_type TEXT NOT NULL CHECK (test_type IN ('content_style', 'posting_time', 'hashtags', 'cta', 'image_style')),
    
    -- Test Variants
    variant_a JSONB NOT NULL,
    variant_b JSONB NOT NULL,
    
    -- Test Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'cancelled')),
    
    -- Test Results
    variant_a_performance JSONB DEFAULT '{}',
    variant_b_performance JSONB DEFAULT '{}',
    winner TEXT CHECK (winner IN ('variant_a', 'variant_b', 'inconclusive')),
    confidence_level DECIMAL(3,2) DEFAULT 0.0,
    
    -- Test Duration
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    target_duration INTERVAL DEFAULT '7 days',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_post_analytics_post_id ON public.post_analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_post_analytics_platform ON public.post_analytics(platform);
CREATE INDEX IF NOT EXISTS idx_post_analytics_published_at ON public.post_analytics(published_at);

CREATE INDEX IF NOT EXISTS idx_content_insights_user_id ON public.content_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_content_insights_brand_id ON public.content_insights(brand_id);
CREATE INDEX IF NOT EXISTS idx_content_insights_type ON public.content_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_content_insights_status ON public.content_insights(status);

CREATE INDEX IF NOT EXISTS idx_competitor_analysis_user_id ON public.competitor_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_competitor_analysis_brand_id ON public.competitor_analysis(brand_id);
CREATE INDEX IF NOT EXISTS idx_competitor_analysis_status ON public.competitor_analysis(analysis_status);

CREATE INDEX IF NOT EXISTS idx_optimal_posting_times_user_id ON public.optimal_posting_times(user_id);
CREATE INDEX IF NOT EXISTS idx_optimal_posting_times_platform ON public.optimal_posting_times(platform);
CREATE INDEX IF NOT EXISTS idx_optimal_posting_times_dow_hour ON public.optimal_posting_times(day_of_week, hour_of_day);

CREATE INDEX IF NOT EXISTS idx_ab_tests_user_id ON public.ab_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_ab_tests_status ON public.ab_tests(status);

-- Row Level Security Policies
ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.optimal_posting_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for post_analytics
CREATE POLICY "Users can view their own post analytics" ON public.post_analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.generated_posts gp
            JOIN public.content_briefs cb ON gp.brief_id = cb.id
            WHERE gp.id = post_analytics.post_id
            AND cb.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own post analytics" ON public.post_analytics
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.generated_posts gp
            JOIN public.content_briefs cb ON gp.brief_id = cb.id
            WHERE gp.id = post_analytics.post_id
            AND cb.user_id = auth.uid()
        )
    );

CREATE POLICY "System can insert post analytics" ON public.post_analytics
    FOR INSERT WITH CHECK (true);

-- RLS Policies for content_insights
CREATE POLICY "Users can view their own insights" ON public.content_insights
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own insights" ON public.content_insights
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can manage insights" ON public.content_insights
    FOR ALL WITH CHECK (true);

-- RLS Policies for competitor_analysis
CREATE POLICY "Users can view their own competitor analysis" ON public.competitor_analysis
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own competitor analysis" ON public.competitor_analysis
    FOR ALL USING (user_id = auth.uid());

-- RLS Policies for optimal_posting_times
CREATE POLICY "Users can view their own posting times" ON public.optimal_posting_times
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can manage posting times" ON public.optimal_posting_times
    FOR ALL WITH CHECK (true);

-- RLS Policies for ab_tests
CREATE POLICY "Users can view their own A/B tests" ON public.ab_tests
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own A/B tests" ON public.ab_tests
    FOR ALL USING (user_id = auth.uid());

-- Helper Functions

-- Function to calculate engagement rate
CREATE OR REPLACE FUNCTION calculate_engagement_rate(
    p_likes BIGINT,
    p_shares BIGINT,
    p_comments BIGINT,
    p_views BIGINT
) RETURNS DECIMAL(5,4) AS $$
BEGIN
    IF p_views = 0 THEN
        RETURN 0.0;
    END IF;
    
    RETURN LEAST(((p_likes + p_shares + p_comments)::DECIMAL / p_views::DECIMAL), 1.0);
END;
$$ LANGUAGE plpgsql;

-- Function to calculate performance score
CREATE OR REPLACE FUNCTION calculate_performance_score(
    p_engagement_rate DECIMAL(5,4),
    p_views BIGINT,
    p_platform TEXT
) RETURNS DECIMAL(5,2) AS $$
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
$$ LANGUAGE plpgsql;

-- Function to update post analytics
CREATE OR REPLACE FUNCTION update_post_analytics(
    p_post_id UUID,
    p_platform TEXT,
    p_views BIGINT DEFAULT 0,
    p_likes BIGINT DEFAULT 0,
    p_shares BIGINT DEFAULT 0,
    p_comments BIGINT DEFAULT 0,
    p_clicks BIGINT DEFAULT 0,
    p_platform_metrics JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    analytics_id UUID;
    engagement_rate DECIMAL(5,4);
    performance_score DECIMAL(5,2);
BEGIN
    -- Calculate metrics
    engagement_rate := calculate_engagement_rate(p_likes, p_shares, p_comments, p_views);
    performance_score := calculate_performance_score(engagement_rate, p_views, p_platform);
    
    -- Insert or update analytics
    INSERT INTO public.post_analytics (
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
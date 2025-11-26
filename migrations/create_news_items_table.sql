-- Create news_items table for The Oak Observer
-- This table stores news items that appear in the FeaturedNewsSection

CREATE TABLE IF NOT EXISTS public.news_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_news_items_created_at ON public.news_items(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read news items
CREATE POLICY "Anyone can read news items"
    ON public.news_items
    FOR SELECT
    USING (true);

-- Policy: Only admins can insert news items
CREATE POLICY "Only admins can insert news items"
    ON public.news_items
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );

-- Policy: Only admins can update news items
CREATE POLICY "Only admins can update news items"
    ON public.news_items
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );

-- Policy: Only admins can delete news items
CREATE POLICY "Only admins can delete news items"
    ON public.news_items
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = true
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_news_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_news_items_updated_at
    BEFORE UPDATE ON public.news_items
    FOR EACH ROW
    EXECUTE FUNCTION update_news_items_updated_at();


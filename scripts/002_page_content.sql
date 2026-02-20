-- ============================================================================
-- 002_page_content.sql -- Lightweight CMS layer
-- STATUS: ALREADY EXECUTED (reference only -- do NOT re-run)
-- NOTE: English i18n columns (h1_en, etc.) added later in 004.
-- ============================================================================

-- Page content table: the lightweight CMS content layer
-- Stores editable copy for every public page. Template + rendering stays in code.
-- Admin can edit text, toggle sections, and manage FAQs.
-- Migration applied via supabase_apply_migration

CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  template_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  og_image_url TEXT,
  canonical_url TEXT,
  h1 TEXT NOT NULL,
  h1_ro TEXT,
  subheadline TEXT,
  subheadline_ro TEXT,
  sections_config JSONB NOT NULL DEFAULT '{}',
  booking_preset JSONB NOT NULL DEFAULT '{}',
  faqs JSONB NOT NULL DEFAULT '[]',
  schema_types TEXT[] NOT NULL DEFAULT '{}',
  cross_link_slugs TEXT[] NOT NULL DEFAULT '{}',
  parent_slug TEXT,
  cta_text TEXT NOT NULL DEFAULT 'Book nu',
  cta_text_ro TEXT DEFAULT 'Rezerva acum',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_content_public_read" ON public.page_content
  FOR SELECT USING (status = 'published');

CREATE POLICY "page_content_admin_all" ON public.page_content
  FOR ALL USING (true) WITH CHECK (true);

-- NOTE: Seed data inserted via separate SQL commands (58 pages total)
-- See sprint-data.ts Block 0.2 for the full inventory

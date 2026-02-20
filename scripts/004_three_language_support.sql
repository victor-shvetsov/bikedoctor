-- ============================================================================
-- 004_three_language_support.sql -- i18n column additions
-- STATUS: ALREADY EXECUTED (reference only -- do NOT re-run)
-- ============================================================================

-- Migration: Full 3-language support (da/en/ro)
-- Run after: 001_phase1_schema.sql, 002_page_content.sql

-- Add Romanian columns to bike_types and service_catalog
ALTER TABLE public.bike_types ADD COLUMN IF NOT EXISTS name_ro TEXT;
ALTER TABLE public.service_catalog ADD COLUMN IF NOT EXISTS name_ro TEXT;
ALTER TABLE public.service_catalog ADD COLUMN IF NOT EXISTS description_ro TEXT;

-- Add English columns to page_content
ALTER TABLE public.page_content ADD COLUMN IF NOT EXISTS h1_en TEXT;
ALTER TABLE public.page_content ADD COLUMN IF NOT EXISTS subheadline_en TEXT;
ALTER TABLE public.page_content ADD COLUMN IF NOT EXISTS cta_text_en TEXT DEFAULT 'Book now';
ALTER TABLE public.page_content ADD COLUMN IF NOT EXISTS meta_title_en TEXT;
ALTER TABLE public.page_content ADD COLUMN IF NOT EXISTS meta_description_en TEXT;

-- Language strategy:
-- da = Danish  (PRIMARY customer-facing, SEO)
-- en = English (PRIMARY admin/mechanic, secondary customer)
-- ro = Romanian (SECONDARY admin/mechanic)
--
-- DB columns: name_da, name_en, name_ro (same pattern for description, h1, etc.)
-- Fallback chain: requested locale -> en -> da

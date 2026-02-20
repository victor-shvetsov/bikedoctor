-- ============================================================================
-- 001_phase1_schema.sql -- Core business tables
-- STATUS: ALREADY EXECUTED (reference only -- do NOT re-run)
-- NOTE: This is the original migration. Columns added later (name_ro, etc.)
--       are documented in 004_i18n_and_policy_updates.sql.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.bike_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_da TEXT NOT NULL,
  name_en TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bike_types ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "bike_types_public_read" ON public.bike_types;
CREATE POLICY "bike_types_public_read" ON public.bike_types FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.service_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_da TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_da TEXT,
  description_en TEXT,
  price_dkk INT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  category TEXT NOT NULL DEFAULT 'repair',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_catalog_public_read" ON public.service_catalog;
CREATE POLICY "service_catalog_public_read" ON public.service_catalog FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  zip_code TEXT,
  city TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  bike_type_id UUID REFERENCES public.bike_types(id),
  status TEXT NOT NULL DEFAULT 'pending',
  preferred_date DATE,
  preferred_time_slot TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT,
  customer_zip TEXT,
  customer_city TEXT,
  total_dkk INT NOT NULL DEFAULT 0,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.booking_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.service_catalog(id),
  quantity INT NOT NULL DEFAULT 1,
  unit_price_dkk INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_line_items ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id),
  customer_id UUID REFERENCES public.customers(id),
  status TEXT NOT NULL DEFAULT 'received',
  total_dkk INT NOT NULL DEFAULT 0,
  assigned_mechanic_id UUID,
  scheduled_date DATE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.order_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.service_catalog(id),
  description TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price_dkk INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.order_line_items ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id),
  order_id UUID REFERENCES public.orders(id),
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  amount_dkk INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'dkk',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

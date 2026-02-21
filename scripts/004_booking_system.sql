-- ============================================================================
-- Block A: Booking system DB migration
-- Adds: customer_bikes, mechanics, mechanic_schedules
-- Alters: customers (pin_code, phone unique), bookings (bike + mechanic refs)
-- ============================================================================

-- 1. Alter customers: phone as unique ID, pin for future app login
ALTER TABLE customers ADD COLUMN IF NOT EXISTS pin_code TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS customers_phone_unique ON customers (phone);

-- 2. Customer bikes -- bikes belong to customers, bookings belong to bikes
CREATE TABLE IF NOT EXISTS customer_bikes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  bike_type_id UUID NOT NULL REFERENCES bike_types(id),
  nickname TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS customer_bikes_customer_id_idx ON customer_bikes (customer_id);
ALTER TABLE customer_bikes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read customer_bikes" ON customer_bikes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role manages customer_bikes" ON customer_bikes FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 3. Mechanics
CREATE TABLE IF NOT EXISTS mechanics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE mechanics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read mechanics" ON mechanics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role manages mechanics" ON mechanics FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 4. Mechanic schedules: per-mechanic, per-weekday (dow 0=Mon ... 6=Sun)
CREATE TABLE IF NOT EXISTS mechanic_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mechanic_id UUID NOT NULL REFERENCES mechanics(id) ON DELETE CASCADE,
  dow SMALLINT NOT NULL CHECK (dow BETWEEN 0 AND 6),
  morning BOOLEAN NOT NULL DEFAULT false,
  afternoon BOOLEAN NOT NULL DEFAULT false,
  UNIQUE (mechanic_id, dow)
);
ALTER TABLE mechanic_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read mechanic_schedules" ON mechanic_schedules FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role manages mechanic_schedules" ON mechanic_schedules FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. Alter bookings: link to bike and mechanic
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_bike_id UUID REFERENCES customer_bikes(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS mechanic_id UUID REFERENCES mechanics(id);
CREATE INDEX IF NOT EXISTS bookings_mechanic_date_idx ON bookings (mechanic_id, preferred_date);

-- 6. Seed test mechanics
INSERT INTO mechanics (id, full_name, phone, email) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Anders Jensen', '11223344', 'anders@bikedoctor.dk'),
  ('b2222222-2222-2222-2222-222222222222', 'Marius Popescu', '22334455', 'marius@bikedoctor.dk'),
  ('c3333333-3333-3333-3333-333333333333', 'Lars Nielsen', '33445566', 'lars@bikedoctor.dk')
ON CONFLICT (id) DO NOTHING;

INSERT INTO mechanic_schedules (mechanic_id, dow, morning, afternoon) VALUES
  ('a1111111-1111-1111-1111-111111111111', 0, true, true),
  ('a1111111-1111-1111-1111-111111111111', 1, true, true),
  ('a1111111-1111-1111-1111-111111111111', 2, true, true),
  ('a1111111-1111-1111-1111-111111111111', 3, true, true),
  ('a1111111-1111-1111-1111-111111111111', 4, true, true),
  ('b2222222-2222-2222-2222-222222222222', 0, true, true),
  ('b2222222-2222-2222-2222-222222222222', 1, true, true),
  ('b2222222-2222-2222-2222-222222222222', 2, true, true),
  ('b2222222-2222-2222-2222-222222222222', 3, true, false),
  ('c3333333-3333-3333-3333-333333333333', 1, true, true),
  ('c3333333-3333-3333-3333-333333333333', 2, true, true),
  ('c3333333-3333-3333-3333-333333333333', 3, true, true),
  ('c3333333-3333-3333-3333-333333333333', 4, true, true),
  ('c3333333-3333-3333-3333-333333333333', 5, true, true)
ON CONFLICT (mechanic_id, dow) DO NOTHING;

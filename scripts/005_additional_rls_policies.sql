-- ============================================================================
-- 005_additional_rls_policies.sql -- Policies added after initial 003 setup
-- STATUS: ALREADY EXECUTED (reference only -- do NOT re-run)
-- ============================================================================
-- These policies supplement 003_rls_policies.sql and document what was added
-- during development to make the booking and admin flows work.
--
-- SECURITY NOTE (Block 1.7): When admin auth is added, the "full_access"
-- policies on orders, order_line_items, and payments should be tightened
-- to require auth.role() = 'authenticated'.
-- ============================================================================

-- Customers: public read (confirmation page) and update (profile edits)
CREATE POLICY "customers_anon_select" ON public.customers
  FOR SELECT USING (true);
CREATE POLICY "customers_full_update" ON public.customers
  FOR UPDATE USING (true);

-- Bookings: public update (webhook status changes via anon key fallback)
CREATE POLICY "bookings_anon_update" ON public.bookings
  FOR UPDATE USING (true);

-- Orders: full access (tighten to authenticated-only in Block 1.7)
CREATE POLICY "orders_full_access" ON public.orders
  FOR ALL USING (true) WITH CHECK (true);

-- Order line items: full access (tighten to authenticated-only in Block 1.7)
CREATE POLICY "order_line_items_full_access" ON public.order_line_items
  FOR ALL USING (true) WITH CHECK (true);

-- Payments: full access (tighten to authenticated-only in Block 1.7)
CREATE POLICY "payments_full_access" ON public.payments
  FOR ALL USING (true) WITH CHECK (true);

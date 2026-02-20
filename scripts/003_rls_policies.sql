-- ============================================================================
-- 003_rls_policies.sql -- Initial RLS policies
-- STATUS: ALREADY EXECUTED (reference only -- do NOT re-run)
-- NOTE: Additional policies added later are documented in 004.
-- ============================================================================

-- RLS policies for booking flow tables (applied via migration)
-- The anon key (public website) needs INSERT for customers/bookings, SELECT for confirmation.
-- Admin (service_role) gets full access.

-- CUSTOMERS
CREATE POLICY "customers_anon_insert" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "customers_service_role_all" ON public.customers FOR ALL USING (true) WITH CHECK (true);

-- BOOKINGS
CREATE POLICY "bookings_anon_insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_anon_select" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "bookings_service_role_all" ON public.bookings FOR ALL USING (true) WITH CHECK (true);

-- BOOKING_LINE_ITEMS
CREATE POLICY "booking_line_items_anon_insert" ON public.booking_line_items FOR INSERT WITH CHECK (true);
CREATE POLICY "booking_line_items_anon_select" ON public.booking_line_items FOR SELECT USING (true);
CREATE POLICY "booking_line_items_service_role_all" ON public.booking_line_items FOR ALL USING (true) WITH CHECK (true);

-- ORDERS (admin only)
CREATE POLICY "orders_service_role_all" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- ORDER_LINE_ITEMS (admin only)
CREATE POLICY "order_line_items_service_role_all" ON public.order_line_items FOR ALL USING (true) WITH CHECK (true);

-- PAYMENTS
CREATE POLICY "payments_anon_select" ON public.payments FOR SELECT USING (true);
CREATE POLICY "payments_service_role_all" ON public.payments FOR ALL USING (true) WITH CHECK (true);

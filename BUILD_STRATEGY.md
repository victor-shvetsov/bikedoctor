# BikeDoctor Build Strategy -- Time-to-Revenue Prioritization

> This is the PERMANENT reference for the 4-phase build plan.
> Every future build session MUST read this file first and follow the phase order.
> Features are built in dependency order -- never build a downstream feature before its upstream dependency ships.
>
> **SYSTEM:** Five files govern all builds:
> 1. **SPRINT.md** -- Current block, acceptance criteria, file inventory. READ FIRST.
> 2. **BUILD_STRATEGY.md** (this file) -- 4-phase master plan.
> 3. **lib/site-architecture.ts** -- COMPLETE website SEO map: every URL, keyword, heading, schema, booking preset, cross-links. READ before building ANY public page.
> 4. **lib/page-templates.ts** -- Section blueprints for every page TYPE: what sections, what order, what content, what conversion elements. READ alongside site-architecture.ts.
> 5. **lib/project-map-data.ts** -- Full feature map. Update statuses after each block ships.

---

## Phase 1: "Take Money" (CURRENT)

Goal: Customer can find website, book a repair, pay, owner sees the order.

| # | Feature | Module | Status | Key Tables |
|---|---------|--------|--------|------------|
| 1 | Supabase schema + next-intl skeleton | Foundation | TODO | All core tables |
| 2 | Public website + booking overlay | Booking | TODO | service_catalog, bike_types, bookings |
| 3 | Stripe authorization hold + webhooks | Booking | TODO | payments, bookings |
| 4 | Minimal admin: order list + detail | Admin | TODO | orders, customers |
| 5 | SMS booking confirmation (Twilio) | Notifications | TODO | notification_log |

**Definition of Done:** A real customer can visit the site, select bike type, choose services, enter info, pay with Stripe, receive SMS confirmation, and the owner sees the order in admin.

---

## Phase 2: "Operate Efficiently"

Goal: Full order lifecycle, customer portal, mechanic dashboard, quote/invoice flow.

| # | Feature | Module |
|---|---------|--------|
| 6 | Customer portal (phone + PIN login) | Customer Portal |
| 7 | Order state machine + quote flow | CRM |
| 8 | Mechanic mobile dashboard (core) | Mechanic |
| 9 | Invoice + payment capture | CRM + Booking |

**Definition of Done:** Owner dispatches, mechanic executes on phone, customer approves quotes and pays invoices digitally.

---

## Phase 3: "Scale Without Hiring"

Goal: Automation, inventory, geo-routing, full notifications, RBAC.

| # | Feature | Module |
|---|---------|--------|
| 10 | Parts catalog + stock tracking | Inventory |
| 11 | Mechanic geo-zones + auto-assignment | Mechanic |
| 12 | Full notification system (email + templates) | Notifications |
| 13 | Admin RBAC + user management | Admin |
| 14 | Structured mechanic notes + before/after photos | Mechanic + CRM |

**Definition of Done:** Business runs with minimal manual intervention. Owner is no longer the bottleneck dispatcher.

---

## Phase 4: "Dominate Search + AI Flywheel"

Goal: SEO infrastructure, AI content generation, business intelligence.

| # | Feature | Module |
|---|---------|--------|
| 15 | SEO infrastructure (JSON-LD, sitemap, area pages) | SEO |
| 16 | Service pages with real stats | SEO + AI Engine |
| 17 | Blog structure | SEO |
| 18 | AI data aggregation pipeline | AI Engine |
| 19 | Auto-generated neighborhood pages | AI Engine |
| 20 | Bike model knowledge pages | AI Engine |
| 21 | Content review queue | AI Engine + Admin |
| 22 | Demand forecasting + smart booking | AI Engine |

**Definition of Done:** Automated SEO content generation from real repair data. Business intelligence dashboards.

---

## Key Rules

1. Never build admin features before the thing they administer exists.
2. Never build notifications before the events they trigger from exist.
3. Never build AI engine before you have 200+ orders with structured notes.
4. Always build customer-facing revenue path first.
5. Seed data via SQL scripts -- don't build editors for things with <10 entries.
6. One hardcoded integration beats a configurable system with no users.

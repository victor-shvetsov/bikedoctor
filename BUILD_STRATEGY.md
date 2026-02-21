# BikeDoctor Build Strategy -- Time-to-Revenue Prioritization

> This is the PERMANENT reference for the 5-phase build plan.
> Every future build session MUST read this file first and follow the phase order.
> Features are built in dependency order -- never build a downstream feature before its upstream dependency ships.
>
> **SYSTEM:** Six files govern all builds:
> 1. **SPRINT.md** -- Current block, acceptance criteria, file inventory. READ FIRST.
> 2. **BUILD_STRATEGY.md** (this file) -- 5-phase master plan.
> 3. **BRAND.md** -- Brand voice, USPs, target customer, emotional triggers. READ before building ANY public-facing UI.
> 4. **lib/site-architecture.ts** -- COMPLETE website SEO map: every URL, keyword, heading, schema, booking preset, cross-links. READ before building ANY public page.
> 5. **lib/page-templates.ts** -- Section blueprints for every page TYPE: what sections, what order, what content, what conversion elements. READ alongside site-architecture.ts.
> 6. **lib/project-map-data.ts** -- Visual feature map. Update statuses after each block ships.

---

## Phase 1: "Take Money" (CURRENT)

Goal: Customer can find website, book a repair, pay, owner sees the order.

| # | Feature | Module | Status | Key Tables |
|---|---------|--------|--------|------------|
| 1 | Supabase schema + Stripe + types + i18n | Foundation | DONE | All core tables |
| 2 | Homepage -- conversion landing page | Public Website | DONE | page_content, service_catalog, bike_types |
| 3 | Location + bike type + brand templates | Public Website | QUEUED | page_content |
| 4 | Pricing + info pages | Public Website | QUEUED | service_catalog, page_content |
| 5 | Navbar + footer + layout | Public Website | QUEUED | -- |
| 6 | Testimonials carousel | Public Website | QUEUED | -- (Trustpilot widget or seeded reviews) |
| 7 | Video embed section | Public Website | QUEUED | page_content |
| 8 | Booking overlay -- complete flow | Booking | QUEUED | service_catalog, bike_types, bookings |
| 9 | Stripe payment -- end-to-end | Booking | QUEUED | payments, bookings |
| 10 | Admin authentication | Admin | QUEUED | -- |
| 11 | Admin dashboard -- order management | Admin | QUEUED | orders, customers |
| 12 | Admin page editor -- content management | Admin | QUEUED | page_content |

**Definition of Done:** A real customer can visit the site, select bike type, choose services, enter info, pay with Stripe, and the owner sees the order in admin.

---

## Phase 1.5: "Serviceaftale" (Subscription Model)

Goal: Annual subscription per bike. Subscribers pay once, get unlimited repairs + priority booking.

| # | Feature | Module |
|---|---------|--------|
| 13 | Subscription plans DB + Stripe recurring | Subscriptions |
| 14 | Subscription signup in booking flow | Booking + Subscriptions |
| 15 | Subscriber portal (plan management, renewal) | Customer Portal |
| 16 | Admin subscription management | Admin |

**Definition of Done:** Customer can subscribe to annual plan per bike type, pay via Stripe recurring, and get priority booking without per-visit payment. Admin sees active subscriptions.

---

## Phase 2: "Operate Efficiently"

Goal: Full order lifecycle, customer portal, mechanic dashboard, quote/invoice flow.

| # | Feature | Module |
|---|---------|--------|
| 17 | Customer portal (phone + PIN login via SMS link) | Customer Portal |
| 18 | Personal mechanic assignment + dashboard greeting | Customer Portal |
| 19 | Order state machine + quote flow | CRM |
| 20 | Mechanic mobile dashboard (core) | Mechanic |
| 21 | Invoice + payment capture | CRM + Booking |
| 22 | Customer-mechanic chat (async messaging) | Communications |

**Definition of Done:** Owner dispatches, mechanic executes on phone, customer approves quotes and pays invoices digitally. Each customer has an assigned mechanic with context.

---

## Phase 3: "Scale Without Hiring"

Goal: Automation, inventory, geo-routing, full notifications, RBAC.

| # | Feature | Module |
|---|---------|--------|
| 23 | Parts catalog + stock tracking | Inventory |
| 24 | Mechanic geo-zones + auto-assignment | Mechanic |
| 25 | Map coverage section (polygons per mechanic) | Public Website + Mechanic |
| 26 | Full notification system (email + SMS templates) | Notifications |
| 27 | Admin RBAC + user management | Admin |
| 28 | Structured mechanic notes + before/after photos | Mechanic + CRM |

**Definition of Done:** Business runs with minimal manual intervention. Owner is no longer the bottleneck dispatcher. Public map shows coverage areas.

---

## Phase 4: "Dominate Search + AI Flywheel"

Goal: SEO infrastructure, AI content generation, e-commerce, business intelligence.

| # | Feature | Module |
|---|---------|--------|
| 29 | Blog engine + article templates | SEO |
| 30 | E-commerce: bike sales + parts shop | E-commerce |
| 31 | About BikeDoctor deep story page | Public Website |
| 32 | Service pages with real stats | SEO + AI Engine |
| 33 | AI data aggregation pipeline | AI Engine |
| 34 | Auto-generated neighborhood pages | AI Engine |
| 35 | Bike model knowledge pages | AI Engine |
| 36 | Content review queue | AI Engine + Admin |
| 37 | Demand forecasting + smart booking | AI Engine |

**Definition of Done:** Automated SEO content generation from real repair data. E-commerce live. Business intelligence dashboards.

---

## Key Rules

1. Never build admin features before the thing they administer exists.
2. Never build notifications before the events they trigger from exist.
3. Never build AI engine before you have 200+ orders with structured notes.
4. Always build customer-facing revenue path first.
5. Seed data via SQL scripts -- don't build editors for things with <10 entries.
6. One hardcoded integration beats a configurable system with no users.
7. Read BRAND.md before building any public-facing UI -- voice, USPs, and emotional triggers matter.
8. Subscriptions (Serviceaftale) ship AFTER one-off booking works (Phase 1.5, not Phase 1).

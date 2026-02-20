# BikeDoctor Sprint Manifest

> **AI INSTRUCTION: Read this file FIRST at the start of every prompt.**
> **Then read lib/sprint-data.ts for the structured block definitions.**
> **Then read BUILD_STRATEGY.md for the 4-phase plan if needed.**
> **Then read lib/site-architecture.ts + lib/page-templates.ts before building ANY public page.**

---

## How This System Works

### Governance Files (5 total -- the ONLY source of truth)
1. **SPRINT.md** (this file) = Quick reference + AI instructions
2. **lib/sprint-data.ts** = STRUCTURED source of truth: all blocks, acceptance criteria, files, owner notes. Drives the Sprint Board UI at /sprint.
3. **BUILD_STRATEGY.md** = The 5-phase master plan (Phase 0-4). Never changes unless scope changes.
4. **lib/site-architecture.ts** = COMPLETE website SEO map: every URL, keyword, heading, schema type, booking preset, cross-links. READ before building ANY public page.
5. **lib/page-templates.ts** = Section blueprints for every page TYPE: what sections, what order, what content, what conversion elements.

### Stale Files (DO NOT use for planning)
- **v0_plans/efficient-design.md** -- Historical plan for the /project-map page (already built). Superseded by the 5 governance files above.
- **lib/project-map-data.ts** -- Visual feature map data. Useful as a reference but sprint-data.ts is the authoritative tracker for build status.

### Sprint Board UI
**The owner can view all blocks at /sprint** -- a visual interface showing phases, blocks, acceptance criteria, files, and the "Your Requirements" field.

### Block Rules
- Each block is ONE prompt's worth of work (3-8 files max)
- Block has explicit acceptance criteria
- Block lists every file it will touch BEFORE building
- After a block ships: update sprint-data.ts statuses

---

## Current State: Phase 0 COMPLETE, Phase 1 in progress (1.1 done)

## Next Block: 1.2 -- Location + Bike Type + Brand Templates

---

## Inventory: What Exists

### Database (Supabase -- LIVE)
| Table | Rows | RLS Status |
|-------|------|------------|
| bike_types | 8 | Public read |
| service_catalog | 10 | Public read |
| customers | 0 | Anon insert, service_role all |
| bookings | 0 | Anon insert/select, service_role all |
| booking_line_items | 0 | Anon insert/select, service_role all |
| orders | 0 | Service_role only |
| order_line_items | 0 | Service_role only |
| payments | 0 | Anon select, service_role all |
| **page_content** | **58** | **Public read (published), admin all** |

### Infrastructure (DONE)
| File | Status | Notes |
|------|--------|-------|
| lib/supabase/client.ts | DONE | Browser client |
| lib/supabase/server.ts | DONE | Server client (per-request) |
| lib/supabase/middleware.ts | DONE | Session refresh |
| lib/stripe.ts | DONE | Stripe server client (server-only) |
| lib/types.ts | DONE | All interfaces: tables + PageContent + BookingPreset + FaqItem |
| lib/i18n.ts | DONE | DA (public) / EN (secondary) / RO (team) with fallbacks |
| middleware.ts | DONE | Supabase session middleware |
| app/actions/booking.ts | DONE | Server-side price validation from DB |
| app/api/webhooks/stripe/route.ts | DONE | checkout.session.completed + expired |
| app/sitemap.ts | DONE | Dynamic from page_content with priorities |
| app/robots.ts | DONE | Blocks /admin, /api, internal pages |
| app/not-found.tsx | DONE | Branded 404 in Danish |
| app/error.tsx | DONE | Branded error page with retry |

### SEO Architecture (DONE)
| File | Status | Notes |
|------|--------|-------|
| lib/site-architecture.ts | DONE | 58+ pages: URLs, keywords, headings, schema types, booking presets, cross-links |
| lib/page-templates.ts | DONE | 9 page type templates: sections, content specs, conversion elements |
| app/seo-map/page.tsx | DONE | Visual SEO map browser |

### Content Layer (DONE)
| page_content rows | Status |
|-------------------|--------|
| 1 homepage | Published |
| 37 location pages | Published |
| 5 bike type pages | Published |
| 7 brand pages | Published |
| 1 pricing page | Published |
| 1 info page | Published |
| 3 shop-bikes pages | Draft |
| 3 shop-parts pages | Draft |

### Public Website Components (SCAFFOLDED -- rebuilt in Blocks 1.1-1.4)
Scaffolded but not yet connected to page_content system. Will be rebuilt as template sections.

### Booking Flow (SCAFFOLDED -- rebuilt in Blocks 1.5-1.6)
4-step overlay with Stripe. Server action now has price validation. Webhook handles payment confirmation.

### Admin Dashboard (SCAFFOLDED -- rebuilt in Blocks 1.7-1.9)
Basic layout + pages. No auth yet (Block 1.7). No page editor yet (Block 1.9).

---

## Block Queue

| Block | Name | Status | Depends On |
|-------|------|--------|------------|
| **0.1** | SEO Architecture & Keyword Map | DONE | -- |
| **0.2** | Supabase Content Layer | DONE | 0.1 |
| **0.3** | Dynamic [slug] Route + Template Renderer | **DONE** | 0.2 |
| **0.4** | Audit Fix: RLS + Validation + i18n | DONE | 0.2 |
| **0.5** | Audit Fix: Webhook + Sitemap + Errors | DONE | 0.4 |
| **1.0** | Foundation: DB + Stripe + Types | DONE | -- |
| **1.1** | Homepage -- Conversion Landing Page | **DONE** | 0.3 |
| **1.2** | Location + Bike Type + Brand Templates | QUEUED | 1.1 |
| **1.3** | Pricing + Info Pages | QUEUED | 1.1 |
| **1.4** | Navbar + Footer + Public Layout | QUEUED | 0.3 |
| **1.5** | Booking Overlay -- Complete Flow | QUEUED | 1.1 |
| **1.6** | Stripe Payment -- End-to-End | QUEUED | 1.5 |
| **1.7** | Admin Authentication | QUEUED | 1.6 |
| **1.8** | Admin Dashboard -- Order Management | QUEUED | 1.7 |
| **1.9** | Admin Page Editor -- Content Management | QUEUED | 1.8 |
| **2.1** | Customer Portal | QUEUED | 1.9 |
| **2.2** | Order State Machine + Quote Flow | QUEUED | 2.1 |
| **2.3** | Mechanic Mobile Dashboard | QUEUED | 2.2 |
| **2.4** | Invoice + Payment Capture | QUEUED | 2.3 |
| **3.1** | Inventory Management | QUEUED | 2.4 |
| **4.1** | Blog Engine + Article Templates | QUEUED | 1.2 |
| **4.2** | E-commerce: Bike Sales + Parts Shop | QUEUED | 1.3 |

---

## Env Vars Needed (set in Vercel / Vars sidebar)
- `NEXT_PUBLIC_SUPABASE_URL` -- Set via integration
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Set via integration
- `SUPABASE_SERVICE_ROLE_KEY` -- Set via integration
- `STRIPE_SECRET_KEY` -- Set via integration
- `NEXT_PUBLIC_SITE_URL` -- Production domain (e.g. https://bikedoctor.dk) -- SET
- `STRIPE_WEBHOOK_SECRET` -- From Stripe Dashboard > Webhooks -- SET

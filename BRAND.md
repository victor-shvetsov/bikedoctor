# BikeDoctor Brand Guidelines

> **AI INSTRUCTION:** Read this file before building ANY public-facing UI.
> It defines the voice, messaging, and emotional targets for all customer-facing content.
> This is NOT a build plan -- see SPRINT.md and sprint-data.ts for what to build.

---

## Target Customer (ICP)

**Primary:** Person whose bike is broken, Googling for help, doesn't have a regular repair shop.
**Secondary:** Bike owner who wants preventive maintenance without the hassle of visiting a shop.

**Key insight:** They're stressed, short on time, and want someone reliable to just handle it.

---

## Three USPs (in priority order)

### 1. Peace of Mind -- "Feel Safe"
You always have access to help with your bike. Log in, choose your bike, open a case, contact your mechanic. Your personal BikeDoctor knows your bikes and their history.

### 2. Save Time AND Money
The average Danish cyclist spends X kr and Y hours per year visiting repair shops. With BikeDoctor's Serviceaftale, you pay less per year AND the mechanic comes to you. Your time stays yours.

### 3. Personal BikeDoctor App
Your own dashboard: bikes, repair history, invoices, direct booking, and personal contact with your assigned mechanic -- who has full context about your bikes.

---

## Emotional Triggers

| Trigger | How we evoke it |
|---------|----------------|
| Safety & reliability | Assigned personal mechanic, always available, knows your bikes |
| Convenience | We come to you -- home, work, anywhere your bike is |
| Trust | Trustpilot reviews, real mechanic photos, transparent pricing |
| Personal connection | Same mechanic every time, greeting by name, coffee over time |
| Smart money | Annual subscription saves 20%+ vs. per-visit pricing |

---

## Tone of Voice

- **Warm and direct.** Like a friend who's also a professional.
- **Danish-first.** All public copy in Danish (da) at root URLs. English at /en/ prefix. No Romanian on public site.
- **No corporate speak.** "Vi fikser din cykel" not "Vi tilbyder cykelreparationsydelser."
- **Confident but not arrogant.** We're experts, but we're approachable.
- **Action-oriented CTAs.** "Book nu", "Fa din cykel fikset", "Vaelg din cykel."

---

## Serviceaftale (Subscription Model)

**Core concept:** Annual subscription per bike. Pay once, get unlimited repairs + checkups.
- Priced at ~20% below annual average repair spend
- Different tiers per bike type (ladcykel costs more than bycykel)
- Subscriber benefits: priority booking, no per-visit fees, personal mechanic assignment
- Non-subscribers still book one-off repairs at standard prices

**Build note:** One-off bookings ship first (Phase 1). Subscriptions are Phase 1.5 -- after the core flow works but before Phase 2 operations.

---

## Visual Identity (implemented in globals.css)

### Colors (from Figma)

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Navy) | `#082852` | Hero overlay, headings, navbar text, primary text |
| Accent (Coral) | `#F15C45` | CTA buttons, icon highlights, accent headings (italic), links |
| Background | `#f9fbff` | Default page bg (very light blue-white) |
| Secondary bg | `#f0f4f8` | Alternating section backgrounds |
| Card | `#ffffff` | All card surfaces |
| Trustpilot Green | `#00b67a` | Trustpilot stars and badge |
| Border | `#e2e8f0` | Subtle borders (used sparingly) |
| Muted text | `#4a6a8a` | Body text, descriptions |
| Font | Geist Sans | All UI text |

### Component Patterns (from Figma -- apply everywhere)

| Pattern | Figma spec | CSS |
|---------|-----------|-----|
| **Cards** | White, rounded 16px, soft shadow, NO visible border | `bd-card` utility or `rounded-2xl bg-card shadow-sm` |
| **CTA button** | Coral pill, white text, icon right, shadow | `bd-cta` utility or `rounded-full bg-accent text-accent-foreground shadow-md` |
| **Section heading** | Navy bold + coral italic accent words | `bd-heading` + `<span class="bd-heading-accent">` |
| **Body text** | Muted foreground, relaxed line-height | `bd-body` utility |
| **Icon containers** | Coral tinted bg, coral icon, rounded-xl | `bd-icon` utility |
| **Section container** | max-w-6xl, centered, px-5/6/8 responsive | `bd-container` utility |
| **Section spacing** | py-16 / py-20 / py-24 responsive | `bd-section` utility |
| **Hero layout** | Full-bleed photo bg, navy gradient overlay (heavier on left), text LEFT-aligned, not centered | See hero-section.tsx |
| **USP cards** | 3-col grid, overlap hero bottom edge, white cards with line-art coral icons | Negative margin-top to overlap hero |
| **Section headings** | Two-tone: navy bold for main words, coral italic for accent phrase | `<h2 class="bd-heading">Main <span class="bd-heading-accent">accent</span></h2>` |

### Build Rules for Sections

1. Every section component uses `bd-container` for width + padding.
2. Every section uses `bd-section` for vertical rhythm.
3. Cards always use `bd-card` (rounded-2xl, shadow-sm, no border).
4. CTA buttons always use `bd-cta` (coral pill) or `bd-cta-outline`.
5. Headings use `bd-heading` + `bd-heading-accent` for the two-tone pattern.
6. Body text uses `bd-body`.
7. Icon containers use `bd-icon`.
8. Sections alternate between `bg-background` and `bg-secondary` for visual rhythm.
9. No heavy borders on cards -- only shadows.
10. Hero text is LEFT-aligned, not centered.

---

## Homepage Layout (canonical section order)

The homepage is the primary conversion page. This is the definitive section order:

| # | Section | Emotional job | Design notes |
|---|---------|--------------|--------------|
| 1 | **Hero** | Instant clarity + urgency | Headline, short paragraph, 3 USP highlights (icon + text), primary CTA (opens booking modal), secondary CTA (scroll to How It Works), background image placeholder |
| 2 | **Testimonials** | Social proof | Horizontal auto-scrolling carousel, Trustpilot-style stars, compact height |
| 3 | **How It Works (Video)** | Show real experience | Large video placeholder, short intro text above |
| 4 | **How It Works (Steps)** | Reduce uncertainty | 4-step grid: Choose bike, Select service plan, Pick time, We come & fix |
| 5 | **Pricing** | Transparency + upsell | Highlighted subscription card ("Most Popular"), other services in grid, each: title, description, price, CTA |
| 6 | **About** | Personal trust | Image + short story block, trust-driven layout |
| 7 | **App Preview** | Show the product | Dashboard mockup placeholder, assigned mechanic card, bike list preview, chat button |
| 8 | **FAQ** | Remove objections | Accordion layout |
| 9 | **Coverage Map** | "We serve YOUR area" | Map placeholder, mechanic coverage areas, location links |
| 10 | **Large Final CTA** | Last conversion push | Emotional headline, strong centered CTA |
| 11 | **Footer** | Navigation + trust | Logo, navigation, contact, legal |

**Global behavior:** "Book Now" CTA in multiple sections. CTA opens full-screen booking modal (4-step flow). Clean component structure, fully responsive, SEO-friendly.

## Key Content Sections (marketing-driven)

These sections appear across ALL page types (not just homepage):

| Section | Emotional job | Notes |
|---------|--------------|-------|
| Hero | Instant clarity + urgency | Headline, USP highlights, coral CTA |
| Testimonials carousel | Social proof | Trustpilot branding, auto-scroll, narrow height |
| How It Works (video) | Show the real experience | Embedded promo video above/alongside steps |
| How It Works (steps) | Reduce uncertainty | 4 steps with icons |
| Pricing | Transparency + Serviceaftale upsell | Subscription plans at top, per-service below |
| About BikeDoctor | Personal trust | Founder story, single mechanic -> growing team |
| App Preview | Show the digital product | Dashboard mockup, mechanic card, bike list, chat |
| Map coverage | "We serve YOUR area" | Polygons per mechanic, location links |
| Booking overlay | Frictionless conversion | Trustpilot ticker under form during checkout |

---

## Promo Video Concept (for reference -- not built by AI)

Woman with broken bike -> Googles repair -> visits regular shop (time + money counters increase) -> situation repeats -> rewind to BikeDoctor ad -> clicks it -> books online -> mechanic comes to her -> counters stay flat -> personal relationship develops over time. Ends with the feeling: "now she has her person."

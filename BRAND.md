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
- **Danish-first.** All public copy in Danish (da). English available but not primary.
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

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Navy) | `#082852` | Headers, hero bg, trust elements, navbar |
| Accent (Coral) | `#F15C45` | CTA buttons, highlights, urgency |
| Background | `#f0f4f8` | Page background, section alternation |
| Text | Dark navy variants | Body text, headings |
| Font | Geist Sans | All UI text |

---

## Key Content Sections (marketing-driven)

These sections appear across the site. Each has a specific emotional job:

| Section | Emotional job | Notes |
|---------|--------------|-------|
| Hero | Instant clarity + urgency | Headline, USP pills, one coral CTA |
| Testimonials carousel | Social proof | Trustpilot branding, auto-scroll, narrow height |
| How It Works (video) | Show the real experience | Embedded promo video above/alongside steps |
| How It Works (steps) | Reduce uncertainty | 3 simple steps with icons |
| Pricing | Transparency + Serviceaftale upsell | Subscription plans at top, per-service below |
| About BikeDoctor | Personal trust | Founder story, single mechanic -> growing team |
| Map coverage | "We serve YOUR area" | Polygons per mechanic, location links |
| Booking overlay | Frictionless conversion | Trustpilot ticker under form during checkout |

---

## Promo Video Concept (for reference -- not built by AI)

Woman with broken bike -> Googles repair -> visits regular shop (time + money counters increase) -> situation repeats -> rewind to BikeDoctor ad -> clicks it -> books online -> mechanic comes to her -> counters stay flat -> personal relationship develops over time. Ends with the feeling: "now she has her person."

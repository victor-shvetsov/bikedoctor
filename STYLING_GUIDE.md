# BikeDoctor Styling Guide

Quick reference for manual CSS/styling work. Every class mentioned here is already defined in `globals.css`.

---

## Design Token Cheatsheet (globals.css :root)

| Token | Value | Where to use |
|-------|-------|-------------|
| `--background` | `#f9fbff` | Page bg (`bg-background`) |
| `--foreground` | `#082852` | Navy text, headings (`text-foreground`) |
| `--card` | `#ffffff` | Card surfaces (`bg-card`) |
| `--primary` | `#082852` | Navy elements (`bg-primary`, `text-primary`) |
| `--primary-foreground` | `#ffffff` | Text on navy (`text-primary-foreground`) |
| `--secondary` | `#f0f4f8` | Alt section bg (`bg-secondary`) |
| `--muted-foreground` | `#4a6a8a` | Body/description text (`text-muted-foreground`) |
| `--accent` | `#F15C45` | Coral CTAs, icons, links (`bg-accent`, `text-accent`) |
| `--accent-foreground` | `#ffffff` | Text on coral (`text-accent-foreground`) |
| `--border` | `#e2e8f0` | Subtle borders (`border-border`) |
| `--trustpilot` | `#00b67a` | Trustpilot green (`text-trustpilot`) |
| `--radius` | `1rem` | Base radius (cards = `rounded-2xl`, buttons = `rounded-full`) |

---

## bd-* Utility Classes (defined in globals.css @layer utilities)

These are the shared building blocks. **Every section component uses them.**

| Class | What it does | Tailwind equivalent |
|-------|-------------|---------------------|
| `bd-container` | Centered max-w-6xl + responsive padding | `mx-auto max-w-6xl px-5 sm:px-6 lg:px-8` |
| `bd-section` | Vertical section padding | `py-16 sm:py-20 lg:py-24` |
| `bd-heading` | Section heading (navy, bold, responsive sizes) | `text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]` |
| `bd-heading-accent` | Coral italic accent for heading spans | `font-bold text-accent` + `font-style: italic` |
| `bd-body` | Body text below headings | `text-base leading-relaxed text-muted-foreground sm:text-lg` |
| `bd-card` | White card with soft shadow | `rounded-2xl bg-card p-6 shadow-sm sm:p-8` |
| `bd-cta` | Primary coral pill CTA button | `rounded-full bg-accent text-accent-foreground shadow-md ...` |
| `bd-cta-outline` | Secondary outline pill button | `rounded-full border-2 border-primary text-primary ...` |
| `bd-icon` | Coral icon container (used in feature cards) | `size-12 rounded-xl bg-accent/10 text-accent` |

### How to modify these globally

Edit the `@layer utilities` block in `globals.css`. Changes apply to every section instantly.

For example, to make all section padding bigger:
```css
.bd-section {
  @apply py-20 sm:py-24 lg:py-32;  /* was py-16 sm:py-20 lg:py-24 */
}
```

To change card radius:
```css
.bd-card {
  @apply rounded-3xl bg-card p-6 shadow-md sm:p-8;  /* was rounded-2xl shadow-sm */
}
```

---

## File Map: Where to change what

| What | File | Notes |
|------|------|-------|
| **Design tokens** (colors, radius) | `app/globals.css` `:root` block | Changes all components using tokens |
| **bd-* utility classes** | `app/globals.css` `@layer utilities` | Changes all section spacing/cards/CTAs |
| **Font** | `app/layout.tsx` (import) + `globals.css` (`--font-sans`) | Currently Poppins 400/700 |
| **Navbar** | `components/sections/site-header.tsx` | Fixed position, scroll effect, logo, nav links |
| **Hero** | `components/sections/hero-section.tsx` | Full-bleed bg, centered text, 2 CTAs, USP labels |
| **Testimonials** | `components/sections/testimonials-carousel.tsx` | Floating review cards |
| **Bike Types Grid** | `components/sections/bike-types-grid.tsx` | Two-tone heading, wrench links, photo |
| **Video Section** | `components/sections/video-section.tsx` | YouTube embed |
| **How It Works** | `components/sections/how-it-works.tsx` | 4-step numbered cards |
| **Pricing** | `components/sections/pricing-section.tsx` | Subscription card + service grid |
| **About** | `components/sections/about-section.tsx` | Story + stats |
| **App Preview** | `components/sections/app-preview-section.tsx` | Dashboard mockup |
| **FAQ** | `components/sections/faq-section.tsx` | Accordion |
| **Coverage Map** | `components/sections/coverage-map-section.tsx` | Map + badge list |
| **CTA Banner** | `components/sections/cta-banner.tsx` | Navy bg, white text, coral CTA |
| **Cross Links** | `components/templates/cross-links.tsx` | Internal link cards at page bottom |

---

## Section Background Alternation Pattern

Sections alternate between `bg-background` (#f9fbff) and `bg-secondary` (#f0f4f8) for visual rhythm.
To change this, edit the section's root `<section>` tag:

```tsx
// Light section
<section className="bd-section bg-background">

// Darker alt section
<section className="bd-section bg-secondary">

// Navy section (used for CTA banner)
<section className="bd-section bg-primary text-primary-foreground">
```

---

## Tips for Efficient Styling

1. **Start with globals.css** -- Change design tokens and bd-* classes first. This propagates everywhere.
2. **One section at a time** -- Each section is a standalone file. Edit, preview, move on.
3. **Use browser DevTools** -- Inspect any element, find its Tailwind classes, trace back to the file.
4. **Search by class** -- `grep -r "bd-heading" components/` finds every usage.
5. **The homepage template** (`components/templates/homepage-template.tsx`) controls section order.
6. **Don't touch `lib/` for styling** -- All visual code is in `components/sections/` and `globals.css`.

---

## Dead Code (safe to delete)

These files are from an earlier iteration and are NOT imported anywhere:

- `components/public/navbar.tsx` (replaced by `components/sections/site-header.tsx`)
- `components/public/hero-section.tsx` (replaced by `components/sections/hero-section.tsx`)
- `components/public/home-page.tsx` (replaced by template system)
- `components/public/services-section.tsx` (replaced by `components/sections/services-grid.tsx`)
- `components/public/trust-section.tsx` (replaced by `components/sections/trust-bar.tsx`)
- `components/public/footer.tsx` (not yet replaced -- keep for reference)
- `components/sections/usp-cards.tsx` (removed from templates, not imported anywhere)

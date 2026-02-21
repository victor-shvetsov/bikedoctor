"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Globe } from "lucide-react"
import type { SiteConfigNavLink, SiteConfigPhone, CustomerLocale } from "@/lib/types"

// ---------------------------------------------------------------------------
// Site Header -- matches Figma
// Transparent on top of hero, white bg on scroll. Logo left, nav center-right,
// coral phone number far right. Mobile: hamburger menu.
// Content driven by site_config via SiteHeaderServer wrapper.
// Locale-aware: nav links and aria labels adapt to da/en.
// ---------------------------------------------------------------------------

interface SiteHeaderProps {
  navLinks: SiteConfigNavLink[]
  phone: SiteConfigPhone
  locale: CustomerLocale
}

export function SiteHeader({ navLinks, phone, locale }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Build the alternate-language URL for the same page
  const altLocale = locale === "da" ? "en" : "da"
  const altPath = locale === "da"
    ? `/en${pathname === "/" ? "" : pathname}` // da -> en: prepend /en
    : pathname.replace(/^\/en\/?/, "/")        // en -> da: strip /en

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/90"
          : "bg-transparent"
      }`}
    >
      <nav className="bd-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-1.5" aria-label={locale === "en" ? "BikeDoctor home" : "BikeDoctor forside"}>
          <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M19 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M12 19V6" />
              <path d="m9 6 3-3 3 3" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className={scrolled ? "text-primary" : "text-primary-foreground"}>BIKE</span>
            <span className="text-accent">DOCTOR</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-bold uppercase tracking-wide transition-colors ${
                scrolled
                  ? "text-primary/70 hover:text-primary"
                  : "text-primary-foreground/75 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Phone */}
          <a
            href={phone.href}
            className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-accent transition-colors hover:text-accent/80"
          >
            <Phone className="size-3.5" strokeWidth={2.5} />
            {phone.number}
          </a>

          {/* Language switcher */}
          <Link
            href={altPath}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-all ${
              scrolled
                ? "border-border text-primary/60 hover:border-primary/30 hover:text-primary"
                : "border-primary-foreground/30 text-primary-foreground/60 hover:border-primary-foreground/50 hover:text-primary-foreground"
            }`}
            aria-label={locale === "en" ? "Skift til dansk" : "Switch to English"}
          >
            <Globe className="size-3" />
            {altLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile: phone + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={phone.href}
            className="flex items-center gap-1.5 text-xs font-bold text-accent"
            aria-label={locale === "en" ? "Call us" : "Ring til os"}
          >
            <Phone className="size-4" strokeWidth={2.5} />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-lg p-2 transition-colors ${
              scrolled ? "text-primary hover:bg-secondary" : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
            aria-label={mobileOpen ? (locale === "en" ? "Close menu" : "Luk menu") : (locale === "en" ? "Open menu" : "Abn menu")}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-card px-5 pb-6 pt-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold uppercase tracking-wide text-primary/70 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={phone.href}
              className="flex items-center gap-2 pt-2 text-sm font-bold text-accent"
            >
              <Phone className="size-4" strokeWidth={2.5} />
              {phone.number}
            </a>

            {/* Language switcher (mobile) */}
            <Link
              href={altPath}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 border-t border-border/50 pt-4 text-sm font-bold uppercase tracking-wide text-primary/60 transition-colors hover:text-primary"
              aria-label={locale === "en" ? "Skift til dansk" : "Switch to English"}
            >
              <Globe className="size-3.5" />
              {altLocale.toUpperCase()} - {locale === "en" ? "Dansk" : "English"}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

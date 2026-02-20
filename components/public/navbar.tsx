"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { t, type TranslationKey } from "@/lib/i18n"
import type { Locale } from "@/lib/types"

interface NavbarProps {
  locale: Locale
  onBookingClick: () => void
}

export function Navbar({ locale, onBookingClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links: { label: TranslationKey; href: string }[] = [
    { label: "nav.services", href: "#services" },
    { label: "nav.about", href: "#trust" },
    { label: "nav.contact", href: "#footer" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="BikeDoctor"
            width={140}
            height={36}
            style={{ height: 36, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {t(locale, link.label)}
            </a>
          ))}
          <a
            href="tel:+4512345678"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            +45 12 34 56 78
          </a>
          <Button onClick={onBookingClick} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {t(locale, "nav.booking")}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <Button
            onClick={onBookingClick}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {t(locale, "nav.booking")}
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70"
              >
                {t(locale, link.label)}
              </a>
            ))}
            <a
              href="tel:+4512345678"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/70"
            >
              <Phone className="h-3.5 w-3.5" />
              +45 12 34 56 78
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

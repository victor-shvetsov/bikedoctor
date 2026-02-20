"use client"

import { useState } from "react"
import { Navbar } from "./navbar"
import { HeroSection } from "./hero-section"
import { ServicesSection } from "./services-section"
import { TrustSection } from "./trust-section"
import { Footer } from "./footer"
import { BookingOverlay } from "@/components/booking/booking-overlay"
import type { Locale, BikeType, ServiceCatalogItem } from "@/lib/types"

interface HomePageProps {
  locale: Locale
  bikeTypes: BikeType[]
  services: ServiceCatalogItem[]
}

export function HomePage({ locale, bikeTypes, services }: HomePageProps) {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <Navbar locale={locale} onBookingClick={() => setBookingOpen(true)} />
      <main>
        <HeroSection locale={locale} onBookingClick={() => setBookingOpen(true)} />
        <ServicesSection locale={locale} services={services} />
        <TrustSection locale={locale} />
      </main>
      <Footer locale={locale} />

      <BookingOverlay
        locale={locale}
        bikeTypes={bikeTypes}
        services={services}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  )
}

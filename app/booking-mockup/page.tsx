import type { Metadata } from "next"
import { BookingForm } from "@/components/booking-mockup/booking-form"

export const metadata: Metadata = {
  title: "Booking Mockup | BikeDoctor",
  description: "Interactive booking form prototype",
  robots: { index: false, follow: false },
}

export default function BookingMockupPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {"Book din "}
            <span className="text-accent">{"cykelsmed"}</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            {"Vi kommer til dig \u2013 v\u00e6lg service og book p\u00e5 2 minutter"}
          </p>
        </div>

        <BookingForm />

        {/* Dev note */}
        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          {"Frontend mockup \u2013 ingen data sendes til backend"}
        </p>
      </div>
    </main>
  )
}

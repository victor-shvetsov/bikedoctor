import type { Metadata } from "next"
import { IframeResize } from "@/components/booking/iframe-resize"

export const metadata: Metadata = {
  title: "Book tid - BikeDoctor",
  description: "Book en mobil cykelsmed direkte til din adresse.",
  robots: { index: false, follow: false }, // Don't index the embed page
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-background px-4 py-6">
      {/* Iframe auto-resize for Webflow embed */}
      <IframeResize />
      {/* Minimal BikeDoctor branding */}
      <div className="mb-6 flex items-center gap-1.5">
        <span className="text-xl font-bold tracking-tight text-primary">BIKE</span>
        <span className="text-xl font-bold tracking-tight text-accent">DOCTOR</span>
      </div>
      {children}
    </div>
  )
}

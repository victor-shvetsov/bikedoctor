import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeaderServer } from "@/components/sections/site-header-server"
import "./globals.css"

const _poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "BikeDoctor | Mobil Cykelsmed -- Vi kommer til dig",
  description:
    "Professionel cykelreparation der kommer til dig. Book online, vi kommer til dit hjem eller arbejde. Gear, bremser, daek, el-cykler og mere.",
}

export const viewport: Viewport = {
  themeColor: "#082852",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // lang attribute set by (da) and (en) route group layouts via <html> override
  // Defaulting to "da" here as the base fallback
  return (
    <html lang="da">
      <body className="font-sans antialiased">
        <SiteHeaderServer />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

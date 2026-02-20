import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
  return (
    <html lang="da">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

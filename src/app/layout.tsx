import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Osotua Farming — From Our Land, To Your Table",
  description: "Premium livestock, fresh produce, and farm products from Kajiado, Kenya.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
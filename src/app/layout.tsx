import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Osotua Farming - From Our Land, To Your Table",
  description: "Premium livestock, fresh produce, and farm products from Kajiado, Kenya.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}

import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/shared/CartContext"
import ToastContainer from "@/components/shared/Toast"
import WhatsAppFAB from "@/components/shared/WhatsAppFAB"
import PageLoader from "@/components/shared/PageLoader"
import Providers from "@/components/shared/Providers"
import ScrollReveal from "@/components/shared/ScrollReveal"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

/* ── METADATA ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Osotua Farming — From Our Land, To Your Table",
    template: "%s — Osotua Farming",
  },
  description:
    "A modern smart farm raising premium indigenous livestock, growing wholesome food, and delivering it fresh from Kajiado County, Kenya.",
  keywords: [
    "Osotua Farming", "Kenya farm", "Kajiado livestock",
    "Boran cattle Kenya", "Sahiwal dairy", "Boer goats Kenya",
    "Dorper sheep", "farm fresh produce Kenya", "buy livestock Kenya",
  ],
  authors: [{ name: "Osotua Farming", url: "https://osotua-farming.vercel.app" }],
  creator: "Bezalel Technologies LTD",
  publisher: "Osotua Farming",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://osotua-farming.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://osotua-farming.vercel.app",
    siteName: "Osotua Farming",
    title: "Osotua Farming — From Our Land, To Your Table",
    description: "Premium indigenous livestock, fresh dairy, beef, vegetables, and fruits from Kajiado County, Kenya.",
    images: [{ url: "/logos/Rooted in Tradition, Growing with Nature (1).png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osotua Farming",
    description: "Premium livestock & farm produce from Kajiado, Kenya.",
    creator: "@OsotuaFarming",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C1208",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="antialiased bg-[#FBF7F0] text-[#1C1208] font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#C4882A] focus:text-[#1C1208] focus:px-4 focus:py-2 focus:rounded focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>

        <Providers>
          <CartProvider>
            <PageLoader />
            <div id="main-content">{children}</div>
            <ToastContainer />
            <WhatsAppFAB />
          </CartProvider>
        </Providers>

        <ScrollReveal />
      </body>
    </html>
  )
}
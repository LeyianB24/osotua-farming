import type { Metadata, Viewport } from "next"
import { Playfair_Display, Source_Sans_3, Cormorant_Garamond, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/shared/CartContext"
import ToastContainer from "@/components/shared/Toast"
import Providers from "@/components/shared/Providers"
import ScrollReveal from "@/components/shared/ScrollReveal"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
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
  authors: [{ name: "Osotua Farming", url: "https://osotuafarming.co.ke" }],
  creator: "Bezalel Technologies LTD",
  publisher: "Osotua Farming",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://osotuafarming.co.ke"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://osotuafarming.co.ke",
    siteName: "Osotua Farming",
    title: "Osotua Farming — From Our Land, To Your Table",
    description: "Premium indigenous livestock, fresh dairy, beef, vegetables, and fruits from Kajiado County, Kenya.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Osotua Farming Pastoral Rangelands" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osotua Farming — From Our Land, To Your Table",
    description: "Premium indigenous livestock, fresh dairy, beef, vegetables, and fruits from Kajiado County, Kenya.",
    images: ["/og-image.jpg"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://osotuafarming.co.ke/#organization",
      name: "Osotua Farming",
      url: "https://osotuafarming.co.ke",
      logo: "https://osotuafarming.co.ke/icon.png",
      image: "https://osotuafarming.co.ke/og-image.jpg",
      description:
        "A modern smart farm raising premium indigenous livestock, growing wholesome food, and delivering it fresh from Kajiado County, Kenya.",
      telephone: "+254755758208",
      email: "info@osotuafarming.co.ke",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Off Namanga Highway, 2 km from Kajiado Town",
        addressLocality: "Kajiado",
        addressRegion: "Kajiado County",
        addressCountry: "KE",
      },
      sameAs: [
        "https://www.instagram.com/osotua_ranches_/",
        "https://www.tiktok.com/@osotua.ranches",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://osotuafarming.co.ke/#website",
      url: "https://osotuafarming.co.ke",
      name: "Osotua Farming",
      publisher: {
        "@id": "https://osotuafarming.co.ke/#organization",
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${plusJakartaSans.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#F5F0E8] text-[#1C1208] font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#C4882A] focus:text-[#1C1208] focus:px-4 focus:py-2 focus:rounded focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>

        <Providers>
          <CartProvider>
            <div id="main-content">{children}</div>
            <ToastContainer />
          </CartProvider>
        </Providers>

        <ScrollReveal />
      </body>
    </html>
  )
}
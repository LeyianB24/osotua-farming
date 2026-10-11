import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Source_Sans_3,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/components/shared/CartContext";
import ToastContainer from "@/components/shared/Toast";
import Providers from "@/components/shared/Providers";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* =========================================================
   OSOTUA FARMING — TYPOGRAPHY SYSTEM
   ========================================================= */

/**
 * Display font:
 * Used for hero headings, breed names, and editorial titles.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/**
 * Body font:
 * Used for paragraphs, navigation, buttons, and general UI.
 */
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

/**
 * UI font:
 * Used for dashboard interfaces, forms, labels, and controls.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * Technical font:
 * Used for metadata, technical labels, prices, and small UI details.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/* =========================================================
   SITE CONFIGURATION
   ========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://osotuafarming.co.ke"
).replace(/\/+$/, "");

const SITE_NAME = "Osotua Farming";

const DEFAULT_TITLE = "Osotua Farming — From Our Land, To Your Table";

const DEFAULT_DESCRIPTION =
  "Discover premium livestock and farm products from Osotua Farming in Kajiado County, Kenya. Explore our breeds, farming practices, and ranch experiences.";

/* =========================================================
   SEO METADATA
   ========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "Osotua Farming",
    "livestock farming Kenya",
    "Kajiado livestock farm",
    "Boran cattle Kenya",
    "Sahiwal cattle Kenya",
    "Boer goats Kenya",
    "Dorper sheep Kenya",
    "livestock breeding Kenya",
    "farm products Kenya",
    "ranch tours Kenya",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: "Bezalel Technologies LTD",
  publisher: SITE_NAME,

  category: "Agriculture",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Osotua Farming — Livestock and Agriculture in Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@OsotuaFarming",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      undefined,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
      {
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

/* =========================================================
   VIEWPORT
   ========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C1208",
  colorScheme: "light",
};

/* =========================================================
   STRUCTURED DATA
   ========================================================= */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],

      "@id": `${SITE_URL}/#organization`,

      name: SITE_NAME,

      url: SITE_URL,

      logo: `${SITE_URL}/icon.png`,

      image: `${SITE_URL}/og-image.jpg`,

      description: DEFAULT_DESCRIPTION,

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

      "@id": `${SITE_URL}/#website`,

      url: SITE_URL,

      name: SITE_NAME,

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      inLanguage: "en-KE",
    },
  ],
};

/**
 * Escape characters that could terminate an embedded JSON-LD script.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/* =========================================================
   ROOT LAYOUT
   ========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-KE"
      className={[
        playfair.variable,
        sourceSans.variable,
        jakarta.variable,
        spaceGrotesk.variable,
      ].join(" ")}
    >
      <head>
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />

        {/* Search engine structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(jsonLd),
          }}
        />
      </head>

      <body className="antialiased bg-[#F5F0E8] text-[#1C1208]">
        {/* Accessibility: skip directly to page content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#C99A2E] focus:text-[#1C1208] focus:px-5 focus:py-3 focus:font-bold focus:shadow-xl"
        >
          Skip to main content
        </a>

        <Providers>
          <CartProvider>
            {children}

            <ToastContainer />
          </CartProvider>
        </Providers>

        <ScrollReveal />
      </body>
    </html>
  );
}
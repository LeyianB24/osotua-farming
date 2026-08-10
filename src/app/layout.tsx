import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, DM_Sans, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

/* ── FONTS ──────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
})

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    "Osotua Farming",
    "Kenya farm",
    "Kajiado livestock",
    "Boran cattle Kenya",
    "Sahiwal dairy",
    "Boer goats Kenya",
    "Dorper sheep",
    "farm fresh produce Kenya",
    "buy livestock Kenya",
  ],
  authors: [{ name: "Osotua Farming", url: "https://osotuafarming.co.ke" }],
  creator: "Bezalel Technologies LTD",
  publisher: "Osotua Farming",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://osotuafarming.co.ke"
  ),
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://osotuafarming.co.ke",
    siteName: "Osotua Farming",
    title: "Osotua Farming — From Our Land, To Your Table",
    description:
      "Premium indigenous livestock, fresh dairy, beef, vegetables, and fruits from Kajiado County, Kenya.",
    images: [
      {
        url: "/logos/Rooted in Tradition, Growing with Nature (1).png",
        width: 1200,
        height: 630,
        alt: "Osotua Farming — Kajiado, Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osotua Farming",
    description: "Premium livestock & farm produce from Kajiado, Kenya.",
    images: ["/logos/Rooted in Tradition, Growing with Nature (1).png"],
    creator: "@OsotuaFarming",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logos/Rooted in Tradition, Growing with Nature (1).png", type: "image/png" },
    ],
    apple: [
      { url: "/logos/Rooted in Tradition, Growing with Nature (1).png" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C1208",
}

import { CartProvider } from "@/components/shared/CartContext"
import ToastContainer from "@/components/shared/Toast"

/* ── ROOT LAYOUT ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`
        ${cormorant.variable}
        ${dmSans.variable}
        ${jakarta.variable}
        ${spaceGrotesk.variable}
      `}
    >
      <head>
        {/* Preconnect to Google Fonts CDN for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-[#FBF7F0] text-[#1C1208]">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#C4882A] focus:text-[#1C1208] focus:px-4 focus:py-2 focus:rounded focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>

        <CartProvider>
          <div id="main-content">{children}</div>
          <ToastContainer />
        </CartProvider>

        {/* Scroll reveal script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
                );
                
                const init = () => {
                  document.querySelectorAll('.reveal').forEach((el) => {
                    observer.observe(el);
                  });
                };

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', init);
                } else {
                  init();
                }

                // Re-run on route changes (Next.js SPA navigation)
                const mutObs = new MutationObserver(init);
                mutObs.observe(document.body, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
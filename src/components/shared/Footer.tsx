"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const year = new Date().getFullYear();

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="w-full">
      {/* ── TOP TERRACOTTA NEWSLETTER SECTION ── */}
      <section
        className="relative w-full py-20 sm:py-24 md:py-32 overflow-hidden border-t border-[#C99A2E]/20"
        style={{ backgroundColor: "#C4602A" }}
      >
        <div className="os-container text-center max-w-2xl mx-auto relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-6 bg-white/40" />
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/90"
            >
              THE OSOTUA GAZETTE
            </span>
            <div className="h-[1px] w-6 bg-white/40" />
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Subscribe to the Ranch
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-white/90 max-w-lg mx-auto mb-8 leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Seasonal harvest announcements, breeding stock availability, and pastoral ranching updates &mdash; delivered directly to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch justify-center gap-2 sm:gap-0 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              disabled={status === "loading" || status === "success"}
              className="w-full sm:flex-1 py-3.5 px-4 text-sm text-white placeholder:text-white/60 outline-none border transition-colors rounded-[2px] sm:rounded-r-none focus:border-white"
              style={{
                backgroundColor: "rgba(28, 18, 8, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.25)",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full sm:w-auto py-3.5 px-7 font-bold text-xs uppercase tracking-[0.16em] transition-all cursor-pointer shrink-0 rounded-[2px] sm:rounded-l-none btn-shimmer"
              style={{
                backgroundColor: "#1C1208",
                color: "#F5F0E8",
                border: "none",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed ✓" : "JOIN THE RANCH"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-center text-xs text-white/95 mt-4 font-semibold">
              ✓ You have successfully subscribed to the Osotua ranch dispatch.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-xs text-red-100 mt-4 font-semibold">
              Subscription failed. Please check your email address and try again.
            </p>
          )}
        </div>
      </section>

      {/* ── MAIN FOOTER BODY (Standardized Obsidian & Brushed Brass Grid) ── */}
      <div
        className="w-full py-20 sm:py-24 md:py-28 border-t border-[#C99A2E]/15"
        style={{ backgroundColor: "#110B05", color: "#F5F0E8" }}
      >
        <div className="os-container">
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-14">

            {/* Column 1: Brand Wordmark, Description & Social Icons (4 cols) */}
            <div className="space-y-6 sm:col-span-2 lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
                <span
                  className="font-serif italic text-3xl text-[#C99A2E]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                >
                  Osotua
                </span>
                <span
                  className="text-xs font-bold tracking-[0.25em] text-[#D4C9B0] uppercase"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif", marginTop: "2px" }}
                >
                  FARMING
                </span>
              </Link>

              <p
                className="max-w-sm text-sm leading-relaxed text-[#F5F0E8]/65 font-normal m-0"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Rooted in tradition, growing with nature. Premium indigenous livestock genetics, organic produce, and pastoral agricultural tours from Kajiado County, Kenya.
              </p>

              {/* Social Media Square Icon Buttons */}
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  {
                    icon: "bi-instagram",
                    href: "https://www.instagram.com/osotua_ranches_/",
                    label: "Instagram (@osotua_ranches_)",
                  },
                  {
                    icon: "bi-facebook",
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: "bi-tiktok",
                    href: "https://www.tiktok.com/@osotua.ranches",
                    label: "TikTok (@osotua.ranches)",
                  },
                  {
                    icon: "bi-youtube",
                    href: "https://youtube.com",
                    label: "YouTube",
                  },
                  {
                    icon: "bi-whatsapp",
                    href: "https://wa.me/254755758208?text=Hello%20Osotua%20Farming!%20I%20would%20like%20to%20enquire%20about%20your%20products.",
                    label: "WhatsApp Concierge",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center text-sm text-[#F5F0E8]/70 hover:text-[#C99A2E] hover:border-[#C99A2E] hover:bg-white/[0.08] transition-all duration-200 border border-white/10 bg-white/[0.03] rounded-[2px]"
                  >
                    <i className={`bi ${s.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="space-y-4 lg:col-span-2">
              <div
                className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#D4C9B0]"
              >
                QUICK LINKS
              </div>
              <nav className="flex flex-col gap-2.5 leading-relaxed" aria-label="Quick links">
                {[
                  { label: "Our Story", href: "/about" },
                  { label: "The Barn", href: "/barn" },
                  { label: "Breeding Programme", href: "/breeds" },
                  { label: "Ranch Visits", href: "/visit" },
                  { label: "Invest with Us", href: "/invest" },
                  { label: "Blog & Field Notes", href: "/blog" },
                  { label: "Partner Farmers", href: "/partners" },
                  { label: "Careers", href: "/careers" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-[#F5F0E8]/70 hover:text-[#C99A2E] hover:translate-x-0.5 transition-all no-underline inline-block"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Livestock Catalogue (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <div
                className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#D4C9B0]"
              >
                LIVESTOCK CATALOGUE
              </div>
              <nav className="flex flex-col gap-2.5 leading-relaxed" aria-label="Livestock catalogue">
                {[
                  { label: "Boran Beef Cattle", href: "/breeds?category=beef" },
                  { label: "Bonsmara Bulls", href: "/breeds?category=beef" },
                  { label: "Sahiwal Dairy Cows", href: "/breeds?category=dairy" },
                  { label: "Boer Meat Goats", href: "/breeds?category=goats" },
                  { label: "Galla × Boer Crosses", href: "/breeds?category=goats" },
                  { label: "Dorper Hair Sheep", href: "/breeds?category=sheep" },
                  { label: "Red Maasai × Dorper", href: "/breeds?category=sheep" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-[#F5F0E8]/70 hover:text-[#C99A2E] hover:translate-x-0.5 transition-all no-underline inline-block"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4: Get in Touch (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <div
                className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#D4C9B0]"
              >
                GET IN TOUCH
              </div>
              <div className="flex flex-col gap-3.5 text-sm leading-relaxed text-[#F5F0E8]/70" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                <a
                  href="tel:+254755758208"
                  className="flex items-center gap-3 text-[#F5F0E8]/70 hover:text-[#C99A2E] transition-colors no-underline group"
                >
                  <i className="bi bi-telephone text-sm text-[#C99A2E] group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>+254 755 758 208</span>
                </a>

                <a
                  href="mailto:info@osotuafarming.co.ke"
                  className="flex items-center gap-3 text-[#F5F0E8]/70 hover:text-[#C99A2E] transition-colors no-underline group"
                >
                  <i className="bi bi-envelope text-sm text-[#C99A2E] group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>info@osotuafarming.co.ke</span>
                </a>

                <div className="flex items-center gap-3 text-[#F5F0E8]/70">
                  <i className="bi bi-clock text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>Mon–Sat, 8:00am–5:00pm</span>
                </div>

                <div className="flex items-center gap-3 text-[#F5F0E8]/70">
                  <i className="bi bi-geo-alt text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>Kajiado County, Kenya</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar with Subtle Border Line */}
          <div className="border-t border-white/10 pt-10 mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-[#F5F0E8]/50">
            <div>
              &copy; {year} Osotua Farming. Built by{" "}
              <a
                href="https://www.bezalel.website/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                Bezalel Technologies
              </a>
              . All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors no-underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors no-underline">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors no-underline">
                Ranch Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

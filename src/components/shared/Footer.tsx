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
      {/* ── TOP TERRACOTTA NEWSLETTER SECTION (Exact Figma Screenshot) ── */}
      <section
        className="w-full py-24 md:py-32"
        style={{ backgroundColor: "#C4602A" }}
      >
        <div className="os-container text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-white/40" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              THE OSOTUA GAZETTE
            </span>
            <div className="h-[1px] w-8 bg-white/40" />
          </div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Subscribe to the Ranch
          </h2>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-10 leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Seasonal harvest announcements, breeding stock availability, and pastoral ranching updates &mdash; delivered to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-0 max-w-xl mx-auto shadow-sm"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading" || status === "success"}
              className="w-full sm:w-84 py-4 px-5 text-sm text-white placeholder:text-white/70 outline-none border transition-colors"
              style={{
                backgroundColor: "rgba(28, 18, 8, 0.2)",
                borderColor: "rgba(28, 18, 8, 0.3)",
                borderRadius: "2px 0 0 2px",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full sm:w-auto py-4 px-8 font-bold text-xs uppercase tracking-[0.16em] transition-all cursor-pointer shrink-0"
              style={{
                backgroundColor: "#1C1208",
                color: "#F5F0E8",
                border: "none",
                borderRadius: "0 2px 2px 0",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed ✓" : "JOIN THE RANCH"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-center text-xs text-white mt-4 font-semibold">
              You are subscribed to the Osotua ranch dispatch.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-xs text-red-100 mt-4 font-semibold">
              Subscription failed. Please check your email address and try again.
            </p>
          )}
        </div>
      </section>

      {/* ── MAIN FOOTER BODY (Exact Figma 4-Column Layout) ── */}
      <div
        className="w-full py-20 md:py-24"
        style={{ backgroundColor: "#1C1208", color: "#F5F0E8" }}
      >
        <div className="os-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">

            {/* Column 1: Brand Wordmark, Description & Social Icons (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
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
                className="text-sm text-[#F5F0E8]/65 leading-relaxed max-w-xs font-normal m-0"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Rooted in tradition, growing with nature. Premium indigenous livestock and wholesome produce from Kajiado County, Kenya.
              </p>

              {/* Social Media Square Icon Buttons */}
              <div className="flex items-center gap-3 pt-2">
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
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center text-sm text-[#F5F0E8]/70 hover:text-[#C99A2E] hover:border-[#C99A2E] transition-all duration-200 border border-white/15 bg-white/[0.04]"
                    style={{ borderRadius: "2px" }}
                  >
                    <i className={`bi ${s.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4C9B0]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                QUICK LINKS
              </div>
              <nav className="flex flex-col space-y-2.5" aria-label="Quick links">
                {[
                  { label: "Our Story", href: "/about" },
                  { label: "The Barn", href: "/barn" },
                  { label: "Breeding Programme", href: "/breeds" },
                  { label: "Ranch Visits", href: "/visit" },
                  { label: "Invest with Us", href: "/invest" },
                  { label: "Blog", href: "/blog" },
                  { label: "Partners", href: "/partners" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-[#F5F0E8]/70 hover:text-[#C99A2E] transition-colors no-underline"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Livestock Catalogue (2.5 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4C9B0]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                LIVESTOCK CATALOGUE
              </div>
              <nav className="flex flex-col space-y-2.5" aria-label="Livestock catalogue">
                {[
                  { label: "Boran Beef Cattle", href: "/breeds?category=beef" },
                  { label: "Bonsmara Bulls", href: "/breeds?category=beef" },
                  { label: "Sahiwal Dairy Cows", href: "/breeds?category=dairy" },
                  { label: "Boer Goats", href: "/breeds?category=goats" },
                  { label: "Galla × Boer Crosses", href: "/breeds?category=goats" },
                  { label: "Dorper Sheep", href: "/breeds?category=sheep" },
                  { label: "Red Maasai × Dorper", href: "/breeds?category=sheep" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-[#F5F0E8]/70 hover:text-[#C99A2E] transition-colors no-underline"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4: Get in Touch (2.5 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4C9B0]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                GET IN TOUCH
              </div>
              <div className="flex flex-col space-y-3.5 text-sm text-[#F5F0E8]/70" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                <a
                  href="tel:+254755758208"
                  className="flex items-center gap-3 text-[#F5F0E8]/70 hover:text-[#C99A2E] transition-colors no-underline"
                >
                  <i className="bi bi-telephone text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>+254 755 758 208</span>
                </a>

                <a
                  href="mailto:info@osotuafarming.co.ke"
                  className="flex items-center gap-3 text-[#F5F0E8]/70 hover:text-[#C99A2E] transition-colors no-underline"
                >
                  <i className="bi bi-envelope text-sm text-[#C99A2E]" aria-hidden="true" />
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

          {/* Bottom Copyright Bar */}
          <div className="pt-16 mt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E8]/40">
            <div>
              &copy; {year} Osotua Farming. All rights reserved.
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

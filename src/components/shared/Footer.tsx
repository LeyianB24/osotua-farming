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
      {/* ── TOP TERRACOTTA NEWSLETTER SECTION (Figma Exact Sizing & Spacing) ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#C4602A",
          paddingTop: "120px",
          paddingBottom: "130px",
        }}
      >
        <div className="os-container text-center max-w-3xl mx-auto relative z-10 px-6">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-white/40" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/90"
              style={{ fontFamily: "var(--font-source-sans), monospace" }}
            >
              THE OSOTUA GAZETTE
            </span>
            <div className="h-[1px] w-8 bg-white/40" />
          </div>

          {/* Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-[54px] text-white font-bold leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Subscribe to the Ranch
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-12 leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Seasonal harvest announcements, breeding stock availability, and pastoral ranching updates &mdash; delivered to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch justify-center max-w-[580px] w-full mx-auto"
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading" || status === "success"}
              className="w-full sm:flex-1 text-sm text-white placeholder:text-white/60 outline-none transition-colors"
              style={{
                backgroundColor: "rgba(28, 18, 8, 0.22)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                borderRadius: "0px",
                padding: "16px 20px",
                fontFamily: "var(--font-source-sans), sans-serif",
                minWidth: "0",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full sm:w-auto text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer shrink-0 whitespace-nowrap disabled:opacity-50"
              style={{
                backgroundColor: "#1C1208",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "0px",
                padding: "16px 36px",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              {status === "loading" ? "JOINING..." : status === "success" ? "SUBSCRIBED ✓" : "JOIN THE RANCH"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-center text-xs text-white/95 mt-5 font-semibold flex items-center justify-center gap-1.5">
              <i className="bi bi-check-circle-fill text-white" />
              <span>You have successfully subscribed to the Osotua ranch dispatch.</span>
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-xs text-red-100 mt-5 font-semibold flex items-center justify-center gap-1.5">
              <i className="bi bi-exclamation-triangle-fill" />
              <span>Subscription failed. Please check your email address and try again.</span>
            </p>
          )}
        </div>
      </section>

      {/* ── MAIN 4-COLUMN FOOTER BODY (Figma Exact Ranch Brown Grid) ── */}
      <div
        className="w-full"
        style={{
          backgroundColor: "#1C1208",
          color: "#F5F0E8",
          paddingTop: "90px",
          paddingBottom: "60px",
        }}
      >
        <div className="os-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">

            {/* Column 1: Brand Wordmark, Description & Social Icons */}
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
                <span
                  className="italic text-2xl sm:text-[26px] text-[#C99A2E] leading-none tracking-tight font-bold"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Osotua
                </span>
                <span
                  className="text-[10px] font-bold tracking-[0.25em] text-[#D4C9B0] uppercase mt-0.5"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  FARMING
                </span>
              </Link>

              <p
                className="text-[13px] leading-relaxed text-[#B5A494] font-normal m-0 max-w-xs"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Rooted in tradition, growing with nature. Premium indigenous livestock and wholesome produce from Kajiado County, Kenya.
              </p>

              {/* Social Media Square Icon Buttons (Figma Exact Style) */}
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  {
                    icon: "bi-instagram",
                    href: "https://www.instagram.com/osotua_ranches_/",
                    label: "Instagram",
                  },
                  {
                    icon: "bi-facebook",
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: "bi-tiktok",
                    href: "https://www.tiktok.com/@osotua.ranches",
                    label: "TikTok",
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
                    className="w-9 h-9 flex items-center justify-center text-sm text-[#D4C9B0]/75 hover:text-[#C99A2E] hover:border-[#C99A2E] hover:bg-white/[0.05] transition-all border border-white/10 bg-white/[0.02]"
                    style={{ borderRadius: "0px" }}
                  >
                    <i className={`bi ${s.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-5">
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4C9B0]"
                style={{ fontFamily: "var(--font-source-sans), monospace" }}
              >
                QUICK LINKS
              </div>
              <nav className="flex flex-col gap-3" aria-label="Quick links">
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
                    className="text-[13px] text-[#B5A494] hover:text-[#C99A2E] transition-colors no-underline block"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Livestock Catalogue */}
            <div className="space-y-5">
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4C9B0]"
                style={{ fontFamily: "var(--font-source-sans), monospace" }}
              >
                LIVESTOCK CATALOGUE
              </div>
              <nav className="flex flex-col gap-3" aria-label="Livestock catalogue">
                {[
                  { label: "Boran Beef Cattle", href: "/breeds" },
                  { label: "Bonsmara Bulls", href: "/breeds" },
                  { label: "Sahiwal Dairy Cows", href: "/breeds" },
                  { label: "Boer Goats", href: "/breeds" },
                  { label: "Galla × Boer Crosses", href: "/breeds" },
                  { label: "Dorper Sheep", href: "/breeds" },
                  { label: "Red Maasai × Dorper", href: "/breeds" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-[13px] text-[#B5A494] hover:text-[#C99A2E] transition-colors no-underline block"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4: Get in Touch */}
            <div className="space-y-5">
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4C9B0]"
                style={{ fontFamily: "var(--font-source-sans), monospace" }}
              >
                GET IN TOUCH
              </div>
              <div className="flex flex-col gap-4 text-[13px] leading-relaxed text-[#B5A494]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                <a
                  href="tel:+254700000000"
                  className="flex items-center gap-3 text-[#B5A494] hover:text-[#C99A2E] transition-colors no-underline group"
                >
                  <i className="bi bi-telephone text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>+254 700 000 000</span>
                </a>

                <a
                  href="mailto:info@osotuafarming.co.ke"
                  className="flex items-center gap-3 text-[#B5A494] hover:text-[#C99A2E] transition-colors no-underline group"
                >
                  <i className="bi bi-envelope text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>info@osotuafarming.co.ke</span>
                </a>

                <div className="flex items-center gap-3 text-[#B5A494]">
                  <i className="bi bi-clock text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>Mon–Sat, 8:00am–5:00pm</span>
                </div>

                <div className="flex items-center gap-3 text-[#B5A494]">
                  <i className="bi bi-geo-alt text-sm text-[#C99A2E]" aria-hidden="true" />
                  <span>Kajiado County, Kenya</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-white/10 pt-8 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B5A494]/60">
            <div>
              &copy; {year} Osotua Farming. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-white transition-colors no-underline">
                About Us
              </Link>
              <Link href="/barn" className="hover:text-white transition-colors no-underline">
                The Barn
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors no-underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

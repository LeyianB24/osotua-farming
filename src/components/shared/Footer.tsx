"use client"

import Link from "next/link"
import Image from "next/image"
import { LOGO } from "@/lib/images"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #1A1208 0%, #120C05 100%)",
        borderTop: "1px solid rgba(196, 136, 42, 0.3)",
      }}
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,136,42,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(46,107,52,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Main Grid */}
      <div className="os-container pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">

          {/* Col 1 — Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-4 no-underline group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-400/60 shadow-xl bg-white shrink-0 group-hover:scale-105 group-hover:ring-amber-400 transition-all">
                <Image
                  src={LOGO}
                  alt="Osotua Farming Official Logo"
                  fill
                  sizes="56px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-2xl tracking-tight text-white leading-tight group-hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Osotua Farming
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold mt-0.5">
                  Pastoral Smart Farm &bull; Kenya
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-300/85 leading-relaxed max-w-sm">
              Rooted in Maa pastoral heritage, raised with regenerative rangeland science, and delivered directly to your doorstep from Kajiado County, Kenya.
            </p>

            {/* Verified seal */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <i className="ti ti-shield-check text-[#C4882A] text-sm" />
              <span>Kenya Stud Book &bull; Certified Purebred</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: "ti-brand-instagram", href: "https://instagram.com", label: "Instagram" },
                { icon: "ti-brand-facebook", href: "https://facebook.com", label: "Facebook" },
                { icon: "ti-brand-tiktok", href: "https://tiktok.com", label: "TikTok" },
                { icon: "ti-brand-youtube", href: "https://youtube.com", label: "YouTube" },
                { icon: "ti-brand-x", href: "https://twitter.com", label: "Twitter / X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 flex items-center justify-center text-lg transition-all duration-200"
                >
                  <i className={`ti ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
              Navigation
            </div>
            <nav className="flex flex-col gap-3">
              {[
                { label: "The Barn Store", href: "/barn" },
                { label: "Our Breeds", href: "/breeds" },
                { label: "Partner Farmers", href: "/partners" },
                { label: "Visit the Ranch", href: "/visit" },
                { label: "Invest With Us", href: "/invest" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-stone-300 hover:text-amber-300 transition-colors no-underline flex items-center gap-2"
                >
                  <i className="ti ti-chevron-right text-xs text-amber-500/60" />
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Genetics & Breeds (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
              Stud Catalog
            </div>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Kenya Boran Cattle", href: "/breeds" },
                { label: "Sahiwal Dual-Purpose", href: "/breeds" },
                { label: "Boer Champion Goats", href: "/breeds" },
                { label: "Galla × Boer Crosses", href: "/breeds" },
                { label: "Dorper Stud Sheep", href: "/breeds" },
                { label: "Red Maasai Genetics", href: "/breeds" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-sm text-stone-300 hover:text-amber-300 transition-colors no-underline flex items-center gap-2"
                >
                  <i className="ti ti-chevron-right text-xs text-amber-500/60" />
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Ranch Gate Info (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
              Ranch Gate &amp; Contact
            </div>
            <div className="space-y-3.5 text-sm text-stone-300">
              <div className="flex items-start gap-3">
                <i className="ti ti-map-pin text-amber-400 text-lg shrink-0 mt-0.5" />
                <span>Kajiado County, Kenya &bull; Pasture Lot 14</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ti ti-phone text-amber-400 text-lg shrink-0" />
                <a href="tel:+254700000000" className="text-stone-300 hover:text-amber-300 transition-colors no-underline">
                  +254 700 000 000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="ti ti-mail text-amber-400 text-lg shrink-0" />
                <a href="mailto:info@osotuafarming.co.ke" className="text-stone-300 hover:text-amber-300 transition-colors no-underline">
                  info@osotuafarming.co.ke
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="ti ti-clock text-amber-400 text-lg shrink-0" />
                <span>Mon – Sat: 8:00 AM – 5:00 PM EAT</span>
              </div>

              {/* Fast WhatsApp Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all no-underline shadow-lg"
                >
                  <i className="ti ti-brand-whatsapp text-base" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t border-white/10 py-6"
        style={{ background: "rgba(12, 8, 3, 0.7)" }}
      >
        <div className="os-container flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-xs text-stone-400 m-0">
              &copy; {year} Osotua Farming Ltd. All rights reserved.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
              <i className="ti ti-shield-check" />
              <span>M-Pesa Verified &bull; KDPA 2019 Compliant</span>
            </div>
          </div>

          <p className="text-xs text-stone-400 m-0">
            Crafted for <span className="text-amber-400 font-semibold">Osotua Pastoral Smart Farm</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

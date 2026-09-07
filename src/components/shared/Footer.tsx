"use client";

import Link from "next/link";
import Image from "next/image";
import { LOGO } from "@/lib/images";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#1C1208] text-[#FBF7F0] border-t border-[#C4882A]/20">
      
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(61,107,62,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Main 4-Column Grid */}
      <div className="os-container pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">

          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 no-underline group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-[#C4882A]/50 bg-[#1C1208] shrink-0 group-hover:scale-105 group-hover:ring-[#C4882A] transition-all shadow-xl">
                <Image
                  src={LOGO}
                  alt="Osotua Farming Official Seal"
                  fill
                  sizes="48px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-light text-2xl tracking-tight text-[#FBF7F0] leading-tight group-hover:text-[#C4882A] transition-colors"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Osotua Farming
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C4882A] font-semibold mt-0.5">
                  Kajiado &bull; Kenya
                </span>
              </div>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.88rem",
                color: "rgba(251,247,240,0.65)",
                lineHeight: 1.75,
                maxWidth: "320px",
                margin: 0,
              }}
            >
              Rooted in centuries of Maa pastoral intuition, nurtured by regenerative savanna ecology, and delivered directly to your doorstep with total digital traceability.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#C4882A]/30 text-[#C4882A] text-xs font-mono">
              <i className="bi bi-patch-check text-sm" aria-hidden="true" />
              <span>Kenya Stud Book &bull; Verified Purebred</span>
            </div>

            {/* Official Social Links & Badges */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/osotua_ranches_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[#C4882A]/20 border border-[#C4882A]/35 text-[#FBF7F0] hover:text-[#C4882A] text-xs font-mono transition-all no-underline"
                >
                  <i className="bi bi-instagram text-[#C4882A]" aria-hidden="true" />
                  <span>@osotua_ranches_</span>
                </a>
                <a
                  href="https://www.tiktok.com/@osotua.ranches"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[#C4882A]/20 border border-[#C4882A]/35 text-[#FBF7F0] hover:text-[#C4882A] text-xs font-mono transition-all no-underline"
                >
                  <i className="bi bi-tiktok text-[#C4882A]" aria-hidden="true" />
                  <span>@osotua.ranches</span>
                </a>
              </div>

              {/* Circular Social Row */}
              <div className="flex items-center gap-2.5">
                {[
                  { icon: "bi-instagram", href: "https://www.instagram.com/osotua_ranches_/", label: "Instagram (@osotua_ranches_)" },
                  { icon: "bi-tiktok", href: "https://www.tiktok.com/@osotua.ranches", label: "TikTok (@osotua.ranches)" },
                  { icon: "bi-whatsapp", href: "https://wa.me/254700000000", label: "WhatsApp" },
                  { icon: "bi-facebook", href: "https://facebook.com", label: "Facebook" },
                  { icon: "bi-youtube", href: "https://youtube.com", label: "YouTube" },
                  { icon: "bi-twitter-x", href: "https://twitter.com", label: "Twitter / X" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-transparent border border-[#C4882A]/40 hover:bg-[#C4882A] text-[#C4882A] hover:text-[#1C1208] flex items-center justify-center text-sm transition-all duration-200 hover:scale-110"
                  >
                    <i className={`bi ${s.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Stud Catalog & Genetics (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="t-label text-[11px] font-semibold text-[#C4882A]">
              Stud Catalog &amp; Breeds
            </div>
            <nav className="flex flex-col gap-2.5" aria-label="Livestock navigation">
              {[
                { label: "Kenya Boran Beef Cattle", href: "/breeds?category=beef" },
                { label: "Sahiwal A2 Dairy Champions", href: "/breeds?category=dairy" },
                { label: "Pedigree Boer Stud Goats", href: "/breeds?category=goats" },
                { label: "Galla Desert Dairy Goats", href: "/breeds?category=goats" },
                { label: "Dorper Prime Stud Rams", href: "/breeds?category=sheep" },
                { label: "Red Maasai Indigenous Ewes", href: "/breeds?category=sheep" },
                { label: "Bonsmara Dual-Purpose", href: "/breeds?category=beef" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-[#FBF7F0]/75 hover:text-[#C4882A] transition-colors no-underline flex items-center gap-2"
                >
                  <i className="bi bi-chevron-right text-[10px] text-[#C4882A]/60" aria-hidden="true" />
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: The Barn Store (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="t-label text-[11px] font-semibold text-[#C4882A]">
              The Barn Store
            </div>
            <nav className="flex flex-col gap-2.5" aria-label="Store navigation">
              {[
                { label: "Dry-Aged Boran Cuts", href: "/barn" },
                { label: "Sahiwal A2 Whole Milk", href: "/barn" },
                { label: "Wild Acacia Raw Honey", href: "/barn" },
                { label: "Free-Range Pasture Eggs", href: "/barn" },
                { label: "Dawn Organic Greens", href: "/barn" },
                { label: "The Ranch Box (Weekly)", href: "/barn" },
                { label: "Cart &amp; Checkout", href: "/cart" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-[#FBF7F0]/75 hover:text-[#C4882A] transition-colors no-underline flex items-center gap-2"
                >
                  <i className="bi bi-chevron-right text-[10px] text-[#C4882A]/60" aria-hidden="true" />
                  <span dangerouslySetInnerHTML={{ __html: l.label }} />
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Ranch Gate & Contacts (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="t-label text-[11px] font-semibold text-[#C4882A]">
              Ranch Gate &amp; Visits
            </div>
            <div className="space-y-3 text-xs text-[#FBF7F0]/75 font-light">
              <div className="flex items-start gap-2.5">
                <i className="bi bi-geo-alt-fill text-[#C4882A] text-sm shrink-0 mt-0.5" aria-hidden="true" />
                <span>Kajiado South Rangeland, Kenya &bull; Pasture Lot 14</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="bi bi-telephone-fill text-[#C4882A] text-sm shrink-0" aria-hidden="true" />
                <a href="tel:+254700000000" className="text-[#FBF7F0]/75 hover:text-[#C4882A] no-underline">
                  +254 700 000 000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="bi bi-envelope-fill text-[#C4882A] text-sm shrink-0" aria-hidden="true" />
                <a href="mailto:concierge@osotuafarming.co.ke" className="text-[#FBF7F0]/75 hover:text-[#C4882A] no-underline">
                  concierge@osotuafarming.co.ke
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="bi bi-clock text-[#C4882A] text-sm shrink-0" aria-hidden="true" />
                <span>Mon &ndash; Sat: 7:00 AM &ndash; 6:00 PM EAT</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/visit"
                  className="btn-primary text-xs py-2 px-4 w-full justify-center text-center"
                  style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
                >
                  <i className="bi bi-calendar-check" aria-hidden="true" />
                  <span>Book Ranch Tour</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 bg-[#160D05]">
        <div className="os-container flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#FBF7F0]/50 m-0">
            &copy; {year} Osotua Farming Ltd. All rights reserved. Registered under Kenya Agricultural Authority.
          </p>

          <p className="text-xs text-[#FBF7F0]/60 m-0">
            Built by <span className="text-[#C4882A] font-medium">Bezalel Technologies LTD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

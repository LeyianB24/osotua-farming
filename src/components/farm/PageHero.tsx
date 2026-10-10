"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
  Phone,
} from "lucide-react";

export interface PageHeroStat {
  value: string;
  label: string;
}

export interface PageHeroTrustChip {
  label: string;
}

export interface PageHeroProps {
  image: {
    src: string;
    alt: string;
  };
  eyebrow: string;
  title: string | React.ReactNode;
  lead?: string | React.ReactNode;
  stats?: PageHeroStat[];
  trustChips?: PageHeroTrustChip[];
  hideCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaExternal?: boolean;
  /** Right-aligned aside content (e.g. quick form, stat badge, or overview card) */
  children?: React.ReactNode;
}

const DEFAULT_STATS: PageHeroStat[] = [
  { value: "4,200+", label: "Titled Acres in Kajiado" },
  { value: "850+", label: "Pedigree Livestock Head" },
  { value: "100%", label: "Organic Pasture-Raised" },
];

const DEFAULT_CHIPS: PageHeroTrustChip[] = [
  { label: "Kenya Stud Book Registered" },
  { label: "Zero Chemical Inputs" },
  { label: "Direct Ranch Traceability" },
];

/**
 * Standardized full-bleed inner-page hero matching the signature visual architecture
 * of Compass Cartage: cinematic dark soil bedrock (#1C1208), three-layer legibility
 * gradient vignettes, subtle drafting grid, gold rule eyebrow, trust guarantee chips,
 * high-contrast CTAs with shimmer, and bottom reassurance stats bar with dividers.
 */
export default function PageHero({
  image,
  eyebrow,
  title,
  lead,
  stats = DEFAULT_STATS,
  trustChips = DEFAULT_CHIPS,
  hideCta = false,
  ctaText = "Explore Farm Barn",
  ctaHref = "/barn",
  secondaryCtaText = "WhatsApp Concierge",
  secondaryCtaHref = "https://wa.me/254755758208",
  secondaryCtaExternal = true,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#1C1208] text-[#F5F0E8] border-b border-white/10">
      {/* ── FULL-BLEED PHOTOGRAPHIC BACKDROP & OPTICAL VIGNETTES ── */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* 1. Left-heavy overlay — text perfectly legible on left, rich photography bleeds through on right */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(28,18,8,0.97) 0%, rgba(28,18,8,0.88) 35%, rgba(28,18,8,0.55) 60%, rgba(28,18,8,0.20) 100%)",
          }}
        />

        {/* 2. Bottom vignette — seamless transition to bottom stats bar */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,18,8,0.97) 0%, rgba(28,18,8,0.4) 18%, transparent 40%)",
          }}
        />

        {/* 3. Top vignette — blends behind the fixed navbar */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,18,8,0.65) 0%, transparent 30%)",
          }}
        />

        {/* 4. Subtle architectural golden drafting grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,154,46,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,154,46,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative flex flex-1 flex-col">
        <div className="os-container w-full pt-32 pb-14 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20">
          <div className={children ? "grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-end" : "max-w-2xl lg:max-w-3xl"}>
            <div>
              {/* Eyebrow badge matching Compass Cartage signature style */}
              <div className="mb-4 sm:mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C99A2E]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C99A2E]">
                  {eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#F5F0E8]"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {title}
              </h1>

              {/* Sub-headline / lead */}
              {lead && (
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F5F0E8]/85 sm:text-lg font-normal">
                  {lead}
                </p>
              )}

              {/* Signature Trust Chips */}
              {trustChips.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#F5F0E8]/75">
                  {trustChips.map((chip, idx) => (
                    <span key={chip.label} className="flex items-center gap-1.5">
                      {idx === 0 ? (
                        <CheckCircle2 size={14} className="text-[#C99A2E] shrink-0" />
                      ) : idx === 1 ? (
                        <ShieldCheck size={14} className="text-[#C99A2E] shrink-0" />
                      ) : (
                        <Star size={14} className="text-[#C99A2E] shrink-0 fill-[#C99A2E]" />
                      )}
                      <span>{chip.label}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* High-visibility Action CTAs */}
              {!hideCta && (
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={ctaHref}
                    className="btn-shimmer group inline-flex items-center gap-2.5 rounded-[2px] bg-[#C99A2E] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] shadow-[0_0_24px_rgba(201,154,46,0.35)] transition-all hover:bg-[#D9AA3E] hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(201,154,46,0.5)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  {secondaryCtaExternal ? (
                    <a
                      href={secondaryCtaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8] backdrop-blur-sm transition-all hover:border-[#C99A2E]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
                    >
                      <Phone size={14} className="text-[#C99A2E]" />
                      <span>{secondaryCtaText}</span>
                    </a>
                  ) : (
                    <Link
                      href={secondaryCtaHref}
                      className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8] backdrop-blur-sm transition-all hover:border-[#C99A2E]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
                    >
                      <ArrowRight size={14} className="text-[#C99A2E]" />
                      <span>{secondaryCtaText}</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Optional right-aligned aside/children */}
            {children && (
              <div className="lg:pb-2">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM STATS & REASSURANCE BAR ── */}
        <div className="relative border-t border-white/10 bg-[#1C1208]/75 backdrop-blur-md">
          <div className="os-container">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-5">
              {/* Stats with vertical dividers */}
              <div className="flex items-center divide-x divide-white/15">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-5 sm:px-6 first:pl-0 last:pr-0">
                    <p
                      className="text-xl sm:text-2xl font-bold text-[#C99A2E] leading-none"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#F5F0E8]/60 whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Certified badges */}
              <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-[#F5F0E8]/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#C99A2E]" />
                  Kenya Stud Book Registered
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#C99A2E]" />
                  Direct Pastoral Traceability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
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
      {/* ── FULL-BLEED PHOTOGRAPHIC BACKDROP: COVERS TO THE VERY TOP ── */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* 1. Subtle top-down scrim for transparent navbar text contrast while sky & clouds stay brilliant */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,10,5,0.65)_0%,rgba(15,10,5,0.22)_25%,transparent_50%)]" />

        {/* 2. Left-directional scrim ensuring bold typography pops while photography on right stays luminous */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,10,5,0.88)_0%,rgba(15,10,5,0.70)_38%,rgba(15,10,5,0.30)_68%,transparent_100%)]" />

        {/* 3. Soft bottom vignette to transition smoothly behind the floating stats dock */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,10,5,0.85)_0%,rgba(15,10,5,0.30)_20%,transparent_50%)]" />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative flex flex-1 flex-col justify-between pt-36 sm:pt-40 lg:pt-44">
        <div className="os-container w-full pb-8 sm:pb-12">
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
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {/* Primary — solid gold button */}
                  <Link
                    href={ctaHref}
                    className="group inline-flex items-center gap-3 bg-[#C99A2E] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] shadow-[0_8px_28px_rgba(201,154,46,0.30)] transition-all duration-200 hover:bg-[#D9AA3E] hover:shadow-[0_12px_36px_rgba(201,154,46,0.45)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary — editorial animated underline text link */}
                  {secondaryCtaExternal ? (
                    <a
                      href={secondaryCtaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8]/80 transition-colors duration-200 hover:text-[#F5F0E8] focus-visible:outline-none"
                    >
                      <span>{secondaryCtaText}</span>
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-0 h-px w-0 bg-[#C99A2E] transition-[width] duration-300 ease-out group-hover:w-full"
                      />
                    </a>
                  ) : (
                    <Link
                      href={secondaryCtaHref}
                      className="group relative text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8]/80 transition-colors duration-200 hover:text-[#F5F0E8] focus-visible:outline-none"
                    >
                      <span>{secondaryCtaText}</span>
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-0 h-px w-0 bg-[#C99A2E] transition-[width] duration-300 ease-out group-hover:w-full"
                      />
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

        {/* ── FLOATING FROSTED GLASS STATS DOCK (IMAGE A STYLE) ── */}
        <div className="os-container relative z-10 w-full pb-8 sm:pb-12 pt-4">
          <div className="rounded-2xl border border-white/15 bg-[#1C1208]/65 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Stats with vertical dividers */}
              <div className="flex flex-wrap items-center divide-x divide-white/15">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-4 sm:px-6 first:pl-0 last:pr-0 py-1">
                    <p
                      className="text-xl sm:text-2xl font-bold text-[#C99A2E] leading-none"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#F5F0E8]/70 whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Certified badges */}
              <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-[#F5F0E8]/75 pr-2">
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

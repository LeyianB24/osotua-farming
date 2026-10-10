"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { HERO_IMAGE } from "@/lib/images";

export default function HeroMaster() {
  const { count: acresCount, ref: acresRef } = useCountUp(4200, 1600, 4200);
  const { count: livestockCount, ref: livestockRef } = useCountUp(850, 1600, 850);
  const { count: familiesCount, ref: familiesRef } = useCountUp(127, 1600, 127);
  const { count: yieldCount, ref: yieldRef } = useCountUp(380, 1600, 380);

  return (
    <div className="relative isolate w-full overflow-hidden bg-[#1C1208] text-[#F5F0E8]">
      {/* ── FULL-BLEED PHOTOGRAPHIC SAVANNA BACKDROP & VIGNETTES ── */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt="Osotua pastoral Brahman cattle herd in Kajiado"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-center"
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

      {/* ── HERO BANNER CONTENT ── */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] w-full flex flex-col justify-end pt-32 pb-14 lg:pb-20">
        <div className="os-container relative z-10 w-full">
          <div className="max-w-3xl space-y-6" data-reveal data-delay="1">
            {/* Eyebrow badge matching Compass Cartage signature style */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C99A2E]" aria-hidden="true" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#6B7A3F] text-white text-[11px] font-mono font-bold uppercase tracking-[0.16em] shadow-sm">
                <i className="bi bi-geo-alt-fill text-xs text-white" aria-hidden="true" />
                <span>KAJIADO COUNTY, KENYA</span>
              </div>
            </div>

            {/* Headline: Playfair Display 700 */}
            <h1
              className="text-[#F5F0E8] m-0 font-bold tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02]"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              Pristine <br />
              Livestock <br />
              <span className="text-[#C99A2E]">&amp; Artisanal</span> <br />
              Farm Produce
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg md:text-xl text-[#F5F0E8]/90 max-w-xl leading-relaxed m-0 font-normal"
              style={{ fontFamily: "var(--font-source-sans), var(--font-jakarta), system-ui, sans-serif" }}
            >
              Directly from Kenya&apos;s sun-drenched pastures &mdash; ethical breeding, grass-fed livestock, organic dairy, raw honey.
            </p>

            {/* Trust chips matching Compass Cartage signature architecture */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#F5F0E8]/75 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C99A2E] shrink-0" />
                Kenya Stud Book Registered
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C99A2E] shrink-0" />
                100% Organic Pasture Raised
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-[#C99A2E] shrink-0 fill-[#C99A2E]" />
                Direct Ranch Traceability
              </span>
            </div>

            {/* CTA Buttons with shimmer and hover translate */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/barn"
                className="btn-shimmer group inline-flex items-center gap-2.5 rounded-[2px] bg-[#C99A2E] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] shadow-[0_0_24px_rgba(201,154,46,0.35)] transition-all hover:bg-[#D9AA3E] hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(201,154,46,0.5)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
              >
                <span>EXPLORE FARM BARN</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/breeds"
                className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8] backdrop-blur-sm transition-all hover:border-[#C99A2E]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
              >
                <span>VIEW PEDIGREE BREEDS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP & REASSURANCE BAR (Divided Layout matching Compass Cartage) ── */}
      <section className="relative z-10 w-full bg-[#1C1208]/75 backdrop-blur-md border-t border-white/10 py-5 sm:py-6">
        <div className="os-container">
          <div className="flex flex-wrap items-center justify-between gap-6" data-reveal data-delay="2">
            {/* Stats with vertical dividers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-x divide-white/15 w-full lg:w-auto">
              {/* Stat 1: Acres */}
              <div className="space-y-1 pl-4 first:pl-0">
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C99A2E] leading-none"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  <span ref={acresRef}>{acresCount.toLocaleString()}</span>+
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Acres
                </div>
                <div className="text-[11px] text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Rotational pastures
                </div>
              </div>

              {/* Stat 2: Livestock Head */}
              <div className="space-y-1 pl-4 sm:pl-6">
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C99A2E] leading-none"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  <span ref={livestockRef}>{livestockCount}</span>+
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Livestock Head
                </div>
                <div className="text-[11px] text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Purebred studs
                </div>
              </div>

              {/* Stat 3: Partner Families */}
              <div className="space-y-1 pl-4 sm:pl-6">
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C99A2E] leading-none"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  <span ref={familiesRef}>{familiesCount}</span>+
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Partner Families
                </div>
                <div className="text-[11px] text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Fair-trade offtake
                </div>
              </div>

              {/* Stat 4: Annual Yield */}
              <div className="space-y-1 pl-4 sm:pl-6">
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C99A2E] leading-none"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  <span ref={yieldRef}>{yieldCount}</span>+ t
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Annual Yield
                </div>
                <div className="text-[11px] text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Pasture harvest
                </div>
              </div>
            </div>

            {/* Right: Certified badges */}
            <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-[#F5F0E8]/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C99A2E]" />
                Kenya Stud Book Registered
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C99A2E]" />
                Single Dedicated Rangeland
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

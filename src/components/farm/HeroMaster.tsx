"use client";

import Link from "next/link";
import Image from "next/image";
import { useCountUp } from "@/hooks/use-count-up";

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
          src="/images/brahmangreen.jpeg"
          alt="Osotua pastoral Brahman cattle herd grazing the Kajiado rangelands"
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
              "linear-gradient(to right, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.78) 35%, rgba(28,18,8,0.40) 65%, rgba(28,18,8,0.18) 100%)",
          }}
        />

        {/* 2. Bottom vignette — seamless transition to bottom stats bar */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,18,8,0.96) 0%, rgba(28,18,8,0.35) 20%, transparent 45%)",
          }}
        />

        {/* 3. Top vignette — blends behind the fixed navbar */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,18,8,0.70) 0%, transparent 28%)",
          }}
        />

        {/* 4. Subtle architectural golden drafting grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,154,46,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,154,46,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        />
      </div>

      {/* ── HERO BANNER CONTENT ── */}
      <section className="relative min-h-[76vh] lg:min-h-[84vh] w-full flex flex-col justify-end pt-20 sm:pt-24 lg:pt-28 pb-20 lg:pb-24">
        <div className="os-container relative z-10 w-full">
          <div className="max-w-3xl space-y-6" data-reveal data-delay="1">
            {/* Eyebrow badge matching Figma signature style */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C99A2E]" aria-hidden="true" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[0px] bg-[#6B7A3F] text-white text-[11px] font-mono font-bold uppercase tracking-[0.16em] shadow-sm">
                <i className="bi bi-geo-alt-fill text-xs text-white" aria-hidden="true" />
                <span>KAJIADO COUNTY, KENYA</span>
              </div>
            </div>

            {/* Headline: Playfair Display 700 */}
            <h1
              className="text-[#F5F0E8] m-0 font-bold tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.04]"
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

            {/* CTA Buttons — subtitle flows directly into CTAs with exact Figma button sizing */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <Link
                href="/barn"
                className="group inline-flex items-center justify-center rounded-[0px] bg-[#C99A2E] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] shadow-[0_0_24px_rgba(201,154,46,0.3)] transition-all hover:bg-[#D9AA3E] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
              >
                <span>EXPLORE FARM BARN</span>
              </Link>

              <Link
                href="/breeds"
                className="inline-flex items-center justify-center rounded-[0px] border border-white/35 bg-black/25 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8] backdrop-blur-sm transition-all hover:border-[#C99A2E] hover:text-[#C99A2E] hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
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
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Acres
                </div>
                <div className="text-[11px] text-[#D4C9B0]/70 leading-relaxed">
                  Chemical-free rotational pastures
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
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Livestock Head
                </div>
                <div className="text-[11px] text-[#D4C9B0]/70 leading-relaxed">
                  Dorper, Boran &amp; Dairy Crosses
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
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Partner Families
                </div>
                <div className="text-[11px] text-[#D4C9B0]/70 leading-relaxed">
                  Direct fair-trade empowerment
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
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Annual Yield
                </div>
                <div className="text-[11px] text-[#D4C9B0]/70 leading-relaxed">
                  Grass-fed beef, mutton &amp; dairy
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}

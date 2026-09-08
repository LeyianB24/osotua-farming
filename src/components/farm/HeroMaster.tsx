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
    <div className="relative w-full overflow-hidden bg-[#1C1208]">
      {/* ── HERO BANNER WITH FULL-BLEED PHOTO & SCRIM ── */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex flex-col justify-end pt-32 pb-16 lg:pb-24">
        {/* Photographic Savanna Background: Mobile full-bleed, Desktop framed unzoomed */}
        <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[56%] z-0">
          <Image
            src="/images/brahman cows.jpg"
            alt="Osotua pastoral Brahman cattle herd in Kajiado"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-center"
          />
          {/* Desktop Left Edge Feather: blends smoothly into dark soil */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#1C1208] to-transparent pointer-events-none" />
          {/* Mobile Overlay: ensure text readability on phones with unblurred photo */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#1C1208] via-[#1C1208]/80 to-[#1C1208]/40 pointer-events-none" />
          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1C1208] to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="os-container relative z-10 w-full">
          <div className="max-w-3xl space-y-6" data-reveal data-delay="1">
            {/* Location Pill Badge (Figma Olive Green) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#6B7A3F] text-white text-[11px] font-mono font-bold uppercase tracking-[0.16em] shadow-sm">
              <i className="bi bi-geo-alt-fill text-xs text-white" aria-hidden="true" />
              <span>KAJIADO COUNTY, KENYA</span>
            </div>

            {/* Figma Headline: Playfair Display 700 */}
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

            {/* CTA Buttons (Exact Figma Button System) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/barn"
                className="btn-gold"
                style={{ borderRadius: "2px" }}
              >
                <span>EXPLORE FARM BARN</span>
              </Link>

              <Link
                href="/breeds"
                className="btn-on-dark"
                style={{ borderRadius: "2px" }}
              >
                <span>VIEW PEDIGREE BREEDS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP (Exact Figma 4-Column Layout) ── */}
      <section className="relative z-10 w-full bg-[#1C1208] border-t border-white/10 py-10 sm:py-14">
        <div className="os-container">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            data-reveal
            data-delay="2"
          >
            {/* Stat 1: Acres */}
            <div className="space-y-1.5 border-l-2 border-[#C99A2E]/40 pl-4 sm:pl-6">
              <div
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#C99A2E] leading-none"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                <span ref={acresRef}>{acresCount.toLocaleString()}</span>+
              </div>
              <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                Acres
              </div>
              <div className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                Chemical-free rotational pastures
              </div>
            </div>

            {/* Stat 2: Livestock Head */}
            <div className="space-y-1.5 border-l-2 border-[#C99A2E]/40 pl-4 sm:pl-6">
              <div
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#C99A2E] leading-none"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                <span ref={livestockRef}>{livestockCount}</span>+
              </div>
              <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                Livestock Head
              </div>
              <div className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                Dorper, Boran &amp; Dairy Crosses
              </div>
            </div>

            {/* Stat 3: Partner Families */}
            <div className="space-y-1.5 border-l-2 border-[#C99A2E]/40 pl-4 sm:pl-6">
              <div
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#C99A2E] leading-none"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                <span ref={familiesRef}>{familiesCount}</span>+
              </div>
              <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                Partner Families
              </div>
              <div className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                Direct fair-trade empowerment
              </div>
            </div>

            {/* Stat 4: Annual Yield */}
            <div className="space-y-1.5 border-l-2 border-[#C99A2E]/40 pl-4 sm:pl-6">
              <div
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#C99A2E] leading-none"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                <span ref={yieldRef}>{yieldCount}</span>+ t
              </div>
              <div className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                Annual Yield
              </div>
              <div className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                Grass-fed beef, mutton &amp; dairy
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

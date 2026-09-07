"use client";

import Link from "next/link";
import { useCountUp } from "@/hooks/use-count-up";

export default function WhatWeAreBento() {
  const { count: animalCount, ref: animalRef } = useCountUp(150, 1600);

  return (
    <section className="section-dark relative overflow-hidden bg-[#1C1208]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C4882A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="os-container relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3" data-reveal data-delay="1">
          <div className="t-eye">
            <span>What We Are</span>
          </div>
          <h2 className="t-section text-[#FBF7F0] m-0">
            A Living Covenant With <br />
            <em className="text-[#C4882A] font-normal italic">Kenya’s Ancient Land</em>
          </h2>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="bento" data-reveal data-delay="2">
          
          {/* 1. Large Headline Cell (8 cols) */}
          <div className="bento-4 bento-cell cell-dark p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden group">
            {/* Watermark */}
            <div className="t-overflow absolute -right-6 -bottom-10 select-none pointer-events-none opacity-5 text-[#C4882A]">
              OSOTUA
            </div>

            <div className="space-y-4 relative z-10 max-w-xl">
              <div className="t-label text-xs text-[#C4882A]">
                The Pastoral Synthesis
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#FBF7F0] font-light leading-snug">
                Where generations of Maasai stewardship merge with modern genetics and veterinary excellence.
              </h3>
            </div>

            <div className="pt-8 relative z-10">
              <p className="t-body text-sm sm:text-base text-[#FBF7F0]/65 max-w-lg m-0">
                Osotua is not an industrial factory. We are a cooperative pastoral platform in Kajiado County dedicated to preserving indigenous vigor, soil regeneration, and fair value for pastoral families.
              </p>
            </div>
          </div>

          {/* 2. Stat Cell (4 cols, Gold Accent) */}
          <div className="bento-2 bento-cell cell-accent p-8 sm:p-10 flex flex-col justify-between text-[#1C1208]">
            <div className="flex items-center justify-between">
              <span className="t-label text-xs tracking-widest text-[#1C1208]/70">
                Herd Strength
              </span>
              <i className="bi bi-shield-check text-2xl text-[#1C1208]" aria-hidden="true" />
            </div>

            <div className="my-6">
              <div className="font-serif text-6xl sm:text-7xl font-light leading-none tracking-tight">
                <span ref={animalRef}>{animalCount}</span>+
              </div>
              <div className="font-sans text-sm font-semibold uppercase tracking-wider mt-2 text-[#1C1208]/80">
                Livestock Animals
              </div>
            </div>

            <div className="text-xs font-medium text-[#1C1208]/70 border-t border-[#1C1208]/15 pt-3">
              Kenya Stud Book &bull; DNA Verified
            </div>
          </div>

          {/* 3. Beef Cell (3 cols, Green) */}
          <Link
            href="/breeds?category=beef"
            className="bento-1 bento-cell cell-green p-6 sm:p-8 flex flex-col justify-between group no-underline"
          >
            <div className="flex items-center justify-between text-emerald-300">
              <i className="bi bi-award text-3xl group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="t-label text-[10px] text-emerald-300/70">Category</span>
            </div>

            <div className="my-4">
              <h4 className="font-serif text-2xl text-[#FBF7F0] m-0 font-light">
                Beef Cattle
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Boran", "Bonsmara", "Sahiwal"].map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 text-emerald-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-300 group-hover:translate-x-1 transition-transform">
              <span>Browse</span>
              <i className="bi bi-arrow-right text-sm" aria-hidden="true" />
            </div>
          </Link>

          {/* 4. Dairy Cell (3 cols, Dark) */}
          <Link
            href="/breeds?category=dairy"
            className="bento-1 bento-cell cell-dark p-6 sm:p-8 flex flex-col justify-between group no-underline"
          >
            <div className="flex items-center justify-between text-[#C4882A]">
              <i className="bi bi-droplet-fill text-3xl group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#C4882A]/70">Category</span>
            </div>

            <div className="my-4">
              <h4 className="font-serif text-2xl text-[#FBF7F0] m-0 font-light">
                Dairy Champions
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Sahiwal A2", "Simmental", "Jersey"].map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#C4882A]">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C4882A] group-hover:translate-x-1 transition-transform">
              <span>Browse</span>
              <i className="bi bi-arrow-right text-sm" aria-hidden="true" />
            </div>
          </Link>

          {/* 5. Quote Cell (6 cols) */}
          <div className="bento-3 bento-cell cell-dark p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1C1208 0%, #2A1D10 100%)" }}>
            <div className="text-[#C4882A] text-6xl font-serif leading-none select-none opacity-40">
              “
            </div>

            <blockquote className="my-2">
              <p className="font-serif italic text-xl sm:text-2xl text-[#FBF7F0] font-light leading-relaxed m-0">
                A bond of friendship and mutual respect that endures across generations.
              </p>
            </blockquote>

            <div className="pt-4 border-t border-[#C4882A]/20 flex items-center justify-between">
              <span className="t-label text-[10px] text-[#C4882A]">
                The Maa Word &mdash; Osotua
              </span>
              <span className="text-[10px] font-mono text-[#FBF7F0]/40">
                Kajiado Heritage
              </span>
            </div>
          </div>

          {/* 6. Goats Cell (4 cols, Green) */}
          <Link
            href="/breeds?category=goats"
            className="bento-2 bento-cell cell-green p-6 sm:p-8 flex flex-col justify-between group no-underline"
          >
            <div className="flex items-center justify-between text-emerald-300">
              <i className="bi bi-heart-pulse text-3xl group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="t-label text-[10px] text-emerald-300/70">Hardy</span>
            </div>

            <div className="my-4">
              <h4 className="font-serif text-2xl text-[#FBF7F0] m-0 font-light">
                Pedigree Goats
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Boer Stud", "Galla Desert", "Kalahari"].map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 text-emerald-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-300 group-hover:translate-x-1 transition-transform">
              <span>View Genetics</span>
              <i className="bi bi-arrow-right text-sm" aria-hidden="true" />
            </div>
          </Link>

          {/* 7. Sheep Cell (4 cols, Dark) */}
          <Link
            href="/breeds?category=sheep"
            className="bento-2 bento-cell cell-dark p-6 sm:p-8 flex flex-col justify-between group no-underline"
          >
            <div className="flex items-center justify-between text-[#C4882A]">
              <i className="bi bi-flower1 text-3xl group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#C4882A]/70">Flock</span>
            </div>

            <div className="my-4">
              <h4 className="font-serif text-2xl text-[#FBF7F0] m-0 font-light">
                Dorper &amp; Red Maasai
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Dorper Ram", "Red Maasai ewe", "Blackhead"].map((b) => (
                  <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#C4882A]">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C4882A] group-hover:translate-x-1 transition-transform">
              <span>View Genetics</span>
              <i className="bi bi-arrow-right text-sm" aria-hidden="true" />
            </div>
          </Link>

          {/* 8. CTA Cell (4 cols, Gold) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-gold p-6 sm:p-8 flex flex-col justify-between group no-underline text-[#FBF7F0]"
          >
            <div className="flex items-center justify-between text-[#F5C76D]">
              <span className="t-label text-[10px] tracking-widest text-[#F5C76D]">
                Fresh Harvest
              </span>
              <i className="bi bi-basket3 text-3xl group-hover:scale-110 transition-transform" aria-hidden="true" />
            </div>

            <div className="my-4">
              <h4 className="font-serif text-2xl sm:text-3xl text-[#FBF7F0] m-0 font-light">
                Visit The Barn Store
              </h4>
              <p className="text-xs text-[#FBF7F0]/80 mt-1 m-0">
                Weekly pantry boxes, cold-pressed oils, pasture honey, and aged grass-fed beef.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#F5C76D] group-hover:translate-x-1.5 transition-transform">
              <span>Enter Store</span>
              <i className="bi bi-arrow-right text-base" aria-hidden="true" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

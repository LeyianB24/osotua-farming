"use client";

import Link from "next/link";
import { useCountUp } from "@/hooks/use-count-up";

export default function HeroMaster() {
  const { count: animalCount, ref: animalRef } = useCountUp(150, 1800);
  const { count: studCount, ref: studRef } = useCountUp(1200, 2200);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 sm:pt-40 pb-16 overflow-hidden bg-[#1C1208] text-[#FBF7F0]">
      {/* ── Gradient Mesh Background ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 18% 45%, rgba(196, 136, 42, 0.16) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 82% 25%, rgba(61, 107, 62, 0.14) 0%, transparent 55%),
            linear-gradient(165deg, #1C1208 0%, #25170B 50%, #1C1208 100%)
          `,
        }}
      />

      {/* Subtle organic light flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C4882A]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ── Main Hero Type Engine ── */}
      <div className="os-container relative z-10 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Landscape Typography */}
          <div className="lg:col-span-8 max-w-[760px] space-y-7" data-reveal data-delay="1">
            
            {/* Eyebrow marker */}
            <div className="t-eye">
              <span>Kajiado County &bull; Kenya &bull; Est. 2026</span>
            </div>

            {/* Headline: 3 Lines with Gold Italic Hero Word */}
            <h1 className="t-hero text-[#FBF7F0] m-0 font-light tracking-tight">
              Where the land <br />
              <em className="font-normal italic text-[#C4882A]">feeds</em> <br />
              the future
            </h1>

            {/* Restrained Subtitle */}
            <p className="t-body text-[#FBF7F0]/65 max-w-xl leading-relaxed m-0 text-base sm:text-lg font-light">
              Ethically raised indigenous livestock, pure pasture genetics, and sunrise-harvested produce nurtured on 3,200 acres of regenerative Maasai rangeland.
            </p>

            {/* Action CTAs: Gold Shimmer & Ghost Glass */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/breeds"
                className="btn-primary text-xs sm:text-sm py-4 px-8 tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <span>Explore Breeds</span>
                <i className="bi bi-arrow-right text-base" aria-hidden="true" />
              </Link>

              <Link
                href="/barn"
                className="btn-ghost text-xs sm:text-sm py-4 px-8 tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <span>Shop The Barn</span>
                <i className="bi bi-bag text-base" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Breed Tag Pills (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 items-end justify-center relative" data-reveal data-delay="2">
            
            {/* Pill 1 */}
            <div className="anim-tag-float-1 px-5 py-3 rounded-2xl bg-white/5 border border-[#C4882A]/30 backdrop-blur-md shadow-xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C4882A] animate-pulse" />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg text-[#FBF7F0]">Boran Stud Bull</span>
                <span className="t-label text-[10px] text-[#C4882A]">Tag #408 &bull; 920kg Prime</span>
              </div>
            </div>

            {/* Pill 2 */}
            <div className="anim-tag-float-2 px-5 py-3 rounded-2xl bg-white/5 border border-emerald-500/30 backdrop-blur-md shadow-xl flex items-center gap-3 mr-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3D6B3E]" />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg text-[#FBF7F0]">Red Maasai Sheep</span>
                <span className="t-label text-[10px] text-emerald-400">Pedigree Flock F-22</span>
              </div>
            </div>

            {/* Pill 3 */}
            <div className="anim-tag-float-3 px-5 py-3 rounded-2xl bg-white/5 border border-[#C4882A]/30 backdrop-blur-md shadow-xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C4882A]" />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg text-[#FBF7F0]">Sahiwal Dairy Cow</span>
                <span className="t-label text-[10px] text-[#C4882A]">18L/Day Pasture Yield</span>
              </div>
            </div>

            {/* Pill 4 */}
            <div className="anim-tag-float-4 px-5 py-3 rounded-2xl bg-white/5 border border-amber-500/25 backdrop-blur-md shadow-xl flex items-center gap-3 mr-4">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="flex flex-col text-right">
                <span className="font-serif text-lg text-[#FBF7F0]">Purebred Galla Goat</span>
                <span className="t-label text-[10px] text-amber-300">Drought Hardy G-09</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Floating Glass Stat Cards ── */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-reveal data-delay="3">
          
          {/* Stat 1 */}
          <div className="cell-glass p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-[#C4882A]/50 transition-colors">
            <div className="flex items-center justify-between text-[#C4882A] mb-3">
              <i className="bi bi-award text-2xl" aria-hidden="true" />
              <span className="t-label text-[9px] text-[#FBF7F0]/50">Rangeland</span>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#FBF7F0] tracking-tight">
                <span ref={animalRef}>{animalCount}</span>+
              </div>
              <div className="t-label text-[11px] text-[#FBF7F0]/65 mt-1">
                Livestock Animals
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="cell-glass p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between text-emerald-400 mb-3">
              <i className="bi bi-tree text-2xl" aria-hidden="true" />
              <span className="t-label text-[9px] text-[#FBF7F0]/50">Forage</span>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#FBF7F0] tracking-tight">
                100%
              </div>
              <div className="t-label text-[11px] text-[#FBF7F0]/65 mt-1">
                Pasture Fed &amp; Organic
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="cell-glass p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-[#C4882A]/50 transition-colors">
            <div className="flex items-center justify-between text-[#C4882A] mb-3">
              <i className="bi bi-patch-check text-2xl" aria-hidden="true" />
              <span className="t-label text-[9px] text-[#FBF7F0]/50">Stud Book</span>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#FBF7F0] tracking-tight">
                <span ref={studRef}>{studCount}</span>+
              </div>
              <div className="t-label text-[11px] text-[#FBF7F0]/65 mt-1">
                Certified Genetics
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="cell-glass p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-amber-400/50 transition-colors">
            <div className="flex items-center justify-between text-amber-300 mb-3">
              <i className="bi bi-shield-check text-2xl" aria-hidden="true" />
              <span className="t-label text-[9px] text-[#FBF7F0]/50">Clean Standard</span>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-light text-[#FBF7F0] tracking-tight">
                Zero
              </div>
              <div className="t-label text-[11px] text-[#FBF7F0]/65 mt-1">
                Synthetic Hormones
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breathing Terrain Wave SVG ── */}
      <div className="w-full relative z-10 mt-12 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 C240,65 480,30 720,58 C960,52 1200,38 1440,54 L1440,80 L0,80 Z"
            fill="rgba(196, 136, 42, 0.08)"
            style={{ animation: "terrainBreathe 8s ease-in-out infinite" }}
          />
          <path
            d="M0,55 C240,35 480,75 720,55 C960,35 1200,65 1440,48 L1440,80 L0,80 Z"
            fill="rgba(46, 28, 8, 0.7)"
          />
        </svg>
      </div>
    </section>
  );
}

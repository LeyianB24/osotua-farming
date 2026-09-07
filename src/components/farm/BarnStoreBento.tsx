"use client";

import Link from "next/link";
import { useState } from "react";

export default function BarnStoreBento() {
  const [frequency, setFrequency] = useState<"weekly" | "biweekly">("weekly");

  return (
    <section className="section-cream relative bg-[#FBF7F0] text-[#1C1208]">
      <div className="os-container space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#DDD0BE]" data-reveal data-delay="1">
          <div className="space-y-2">
            <div className="t-eye" style={{ color: "var(--bark)" }}>
              <span>The Barn Store</span>
            </div>
            <h2 className="t-section text-[#1C1208] m-0">
              Harvested at Sunrise, <br />
              <em className="text-[#C4882A] font-normal italic">Delivered by Dusk</em>
            </h2>
          </div>

          <Link
            href="/barn"
            className="t-label text-xs text-[#6B3E1A] hover:text-[#C4882A] inline-flex items-center gap-2 no-underline tracking-widest transition-colors"
          >
            <span>View All Provisions</span>
            <i className="bi bi-arrow-right text-sm" aria-hidden="true" />
          </Link>
        </div>

        {/* Product Bento Grid */}
        <div className="bento" data-reveal data-delay="2">
          
          {/* 1. Featured Product (Full Width, 12 cols) */}
          <div className="bento-5 bento-cell cell-dark p-8 sm:p-10 border-l-4 border-l-[#C4882A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="t-label text-[10px] px-2.5 py-1 rounded bg-[#C4882A]/20 text-[#C4882A] border border-[#C4882A]/30">
                  Signature Provision
                </span>
                <span className="text-xs text-[#FBF7F0]/50 font-mono">
                  Origin: Kajiado South Rangeland
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FBF7F0] font-light m-0">
                Dry-Aged Boran Prime Ribeye &amp; Loin Box
              </h3>

              <p className="t-body text-sm sm:text-base text-[#FBF7F0]/70 max-w-xl m-0">
                21-day Himalayan salt dry-aged 100% grass-fed Boran beef. Incomparably tender, ethically pasture-finished with zero antibiotics.
              </p>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 shrink-0 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
              <div className="text-left md:text-right">
                <div className="t-label text-[10px] text-[#C4882A]">Per 2.5kg Cut</div>
                <div className="font-serif text-3xl text-[#FBF7F0] font-light">
                  KES 4,800
                </div>
              </div>

              <Link
                href="/barn"
                className="btn-primary text-xs py-3 px-6 tracking-wider no-underline"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <span>Order Cut</span>
                <i className="bi bi-bag text-sm" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 2. Product Cell 1: Raw Pasture Honey (4 cols) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-cream p-6 sm:p-8 flex flex-col justify-between group no-underline transition-all hover:bg-[#3B2506] hover:text-[#FBF7F0] hover:border-[#C4882A]"
          >
            <div className="flex items-center justify-between">
              <i className="bi bi-flower1 text-2xl text-[#C4882A]" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#6B3E1A] group-hover:text-[#F5C76D]">500g Jar</span>
            </div>

            <div className="my-6">
              <h4 className="font-serif text-2xl text-[#1C1208] group-hover:text-[#FBF7F0] m-0 font-light">
                Wild Acacia Blossom Honey
              </h4>
              <p className="text-xs text-[#1C1208]/60 group-hover:text-[#FBF7F0]/70 mt-1 m-0">
                Cold-filtered, unpasteurized raw honey harvested from wild Kajiado hives.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] group-hover:border-white/20 pt-3">
              <span className="font-mono text-sm font-semibold text-[#C4882A] group-hover:text-[#F5C76D]">
                KES 950
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1208]/60 group-hover:text-[#FBF7F0]">
                Add +
              </span>
            </div>
          </Link>

          {/* 3. Product Cell 2: Raw Pasture Milk (4 cols) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-cream p-6 sm:p-8 flex flex-col justify-between group no-underline transition-all hover:bg-[#3B2506] hover:text-[#FBF7F0] hover:border-[#C4882A]"
          >
            <div className="flex items-center justify-between">
              <i className="bi bi-droplet-fill text-2xl text-[#C4882A]" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#6B3E1A] group-hover:text-[#F5C76D]">5L Dispenser</span>
            </div>

            <div className="my-6">
              <h4 className="font-serif text-2xl text-[#1C1208] group-hover:text-[#FBF7F0] m-0 font-light">
                Sahiwal A2 Pasture Milk
              </h4>
              <p className="text-xs text-[#1C1208]/60 group-hover:text-[#FBF7F0]/70 mt-1 m-0">
                Natural beta-casein A2 whole milk with 4.8% butterfat from grass-fed cows.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] group-hover:border-white/20 pt-3">
              <span className="font-mono text-sm font-semibold text-[#C4882A] group-hover:text-[#F5C76D]">
                KES 750
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1208]/60 group-hover:text-[#FBF7F0]">
                Add +
              </span>
            </div>
          </Link>

          {/* 4. Product Cell 3: Pasture Eggs (4 cols) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-cream p-6 sm:p-8 flex flex-col justify-between group no-underline transition-all hover:bg-[#3B2506] hover:text-[#FBF7F0] hover:border-[#C4882A]"
          >
            <div className="flex items-center justify-between">
              <i className="bi bi-egg-fried text-2xl text-[#C4882A]" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#6B3E1A] group-hover:text-[#F5C76D]">Tray of 30</span>
            </div>

            <div className="my-6">
              <h4 className="font-serif text-2xl text-[#1C1208] group-hover:text-[#FBF7F0] m-0 font-light">
                Free-Range Savanna Eggs
              </h4>
              <p className="text-xs text-[#1C1208]/60 group-hover:text-[#FBF7F0]/70 mt-1 m-0">
                Rich amber yolks from hens roaming freely on natural seeds and forage.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] group-hover:border-white/20 pt-3">
              <span className="font-mono text-sm font-semibold text-[#C4882A] group-hover:text-[#F5C76D]">
                KES 650
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1208]/60 group-hover:text-[#FBF7F0]">
                Add +
              </span>
            </div>
          </Link>

          {/* 5. Product Cell 4: Dorper Cuts (3 cols) */}
          <Link
            href="/barn"
            className="bento-1 bento-cell cell-cream p-6 sm:p-8 flex flex-col justify-between group no-underline transition-all hover:bg-[#3B2506] hover:text-[#FBF7F0] hover:border-[#C4882A]"
          >
            <div className="flex items-center justify-between">
              <i className="bi bi-box-seam text-2xl text-[#C4882A]" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#6B3E1A] group-hover:text-[#F5C76D]">1.5kg</span>
            </div>

            <div className="my-4">
              <h4 className="font-serif text-xl text-[#1C1208] group-hover:text-[#FBF7F0] m-0 font-light">
                Dorper Lamb Chops
              </h4>
              <p className="text-[11px] text-[#1C1208]/60 group-hover:text-[#FBF7F0]/70 mt-1 m-0">
                Sweet, mild grass-fed lamb cut fresh.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] group-hover:border-white/20 pt-3">
              <span className="font-mono text-xs font-semibold text-[#C4882A] group-hover:text-[#F5C76D]">
                KES 2,200
              </span>
              <span className="text-xs font-mono text-[#1C1208]/60 group-hover:text-[#FBF7F0]">
                Add +
              </span>
            </div>
          </Link>

          {/* 6. Product Cell 5: Highland Greens (3 cols) */}
          <Link
            href="/barn"
            className="bento-1 bento-cell cell-cream p-6 sm:p-8 flex flex-col justify-between group no-underline transition-all hover:bg-[#3B2506] hover:text-[#FBF7F0] hover:border-[#C4882A]"
          >
            <div className="flex items-center justify-between">
              <i className="bi bi-basket3 text-2xl text-[#3D6B3E]" aria-hidden="true" />
              <span className="t-label text-[10px] text-[#3D6B3E]">Crisp Harvest</span>
            </div>

            <div className="my-4">
              <h4 className="font-serif text-xl text-[#1C1208] group-hover:text-[#FBF7F0] m-0 font-light">
                Dawn Organic Greens
              </h4>
              <p className="text-[11px] text-[#1C1208]/60 group-hover:text-[#FBF7F0]/70 mt-1 m-0">
                Spinach, kale, sweet peppers &amp; herbs.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] group-hover:border-white/20 pt-3">
              <span className="font-mono text-xs font-semibold text-[#3D6B3E] group-hover:text-emerald-300">
                KES 450
              </span>
              <span className="text-xs font-mono text-[#1C1208]/60 group-hover:text-[#FBF7F0]">
                Add +
              </span>
            </div>
          </Link>

          {/* 7. Subscribe CTA Cell: The Ranch Box (6 cols, Green) */}
          <div className="bento-3 bento-cell cell-green p-8 sm:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-200">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
                <i className="bi bi-calendar-check" aria-hidden="true" />
                <span>Weekly Shamba Subscription</span>
              </div>
              <span className="t-label text-xs text-emerald-300">Save 15%</span>
            </div>

            <div className="my-4 space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF7F0] font-light m-0">
                The Osotua Ranch Box
              </h3>
              <p className="t-body text-xs sm:text-sm text-emerald-100/80 m-0">
                A curated weekly parcel containing A2 milk, pasture eggs, fresh greens, grass-fed cuts, and seasonal farm honey.
              </p>
            </div>

            {/* Frequency Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-emerald-700/60 pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFrequency("weekly")}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                    frequency === "weekly"
                      ? "bg-[#C4882A] text-[#1C1208] font-bold"
                      : "bg-black/20 text-emerald-200 hover:bg-black/30"
                  }`}
                >
                  Weekly (KES 3,500)
                </button>
                <button
                  onClick={() => setFrequency("biweekly")}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg transition-all ${
                    frequency === "biweekly"
                      ? "bg-[#C4882A] text-[#1C1208] font-bold"
                      : "bg-black/20 text-emerald-200 hover:bg-black/30"
                  }`}
                >
                  Bi-Weekly (KES 6,200)
                </button>
              </div>

              <Link
                href="/barn"
                className="btn-primary text-xs py-2.5 px-5 tracking-wider text-center"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <span>Subscribe</span>
                <i className="bi bi-arrow-right text-xs" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
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
          
          {/* 1. Featured Product (Full Width, 12 cols) with Image */}
          <div className="bento-5 bento-cell cell-dark p-6 sm:p-10 border-l-4 border-l-[#C4882A] flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="t-label text-[10px] px-2.5 py-1 rounded bg-[#C4882A]/20 text-[#C4882A] border border-[#C4882A]/30">
                  Signature Provision
                </span>
                <span className="text-xs text-[#FBF7F0]/60 font-mono">
                  Origin: Kajiado South Rangeland
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FBF7F0] font-light m-0">
                Dry-Aged Boran Prime Ribeye &amp; Loin Box
              </h3>

              <p className="t-body text-sm sm:text-base text-[#FBF7F0]/75 max-w-lg m-0">
                21-day Himalayan salt dry-aged 100% grass-fed Boran beef. Incomparably tender, ethically pasture-finished with zero antibiotics.
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div>
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

            {/* Featured Image Container */}
            <div className="relative w-full md:w-80 h-56 md:h-64 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-2xl">
              <Image
                src="/images/prime beef.jpg"
                alt="Dry-aged Boran beef cut"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                100% Savanna Grass-Fed
              </div>
            </div>
          </div>

          {/* 2. Product Cell 1: Raw Pasture Honey (4 cols) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-cream p-5 sm:p-6 flex flex-col justify-between group no-underline transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-black/5 bg-[#EAE2D5]">
              <Image
                src="/images/WhatsApp Image 2026-08-10 at 11.55.22.jpeg"
                alt="Wild Acacia Blossom Honey"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-[#8E5E16]">
                500g Jar
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-serif text-xl text-[#1C1208] m-0 font-light">
                Wild Acacia Blossom Honey
              </h4>
              <p className="text-xs text-[#1C1208]/65 mt-1 m-0">
                Cold-filtered, unpasteurized raw honey harvested from wild Kajiado hives.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] pt-3">
              <span className="font-mono text-sm font-bold text-[#C4882A]">
                KES 950
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1208]/70 group-hover:text-[#C4882A] font-bold">
                Add +
              </span>
            </div>
          </Link>

          {/* 3. Product Cell 2: Raw Pasture Milk (4 cols) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-cream p-5 sm:p-6 flex flex-col justify-between group no-underline transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-black/5 bg-[#EAE2D5]">
              <Image
                src="/images/sahiwal calves 2.jpeg"
                alt="Sahiwal A2 Pasture Milk"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-[#2E6B34]">
                5L Dispenser
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-serif text-xl text-[#1C1208] m-0 font-light">
                Sahiwal A2 Pasture Milk
              </h4>
              <p className="text-xs text-[#1C1208]/65 mt-1 m-0">
                Natural beta-casein A2 whole milk with 4.8% butterfat from grass-fed cows.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] pt-3">
              <span className="font-mono text-sm font-bold text-[#C4882A]">
                KES 750
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1208]/70 group-hover:text-[#C4882A] font-bold">
                Add +
              </span>
            </div>
          </Link>

          {/* 4. Product Cell 3: Pasture Eggs (4 cols) */}
          <Link
            href="/barn"
            className="bento-2 bento-cell cell-cream p-5 sm:p-6 flex flex-col justify-between group no-underline transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-black/5 bg-[#EAE2D5]">
              <Image
                src="/images/eggs.jpg"
                alt="Free-Range Savanna Eggs"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-[#8E5E16]">
                Tray of 30
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-serif text-xl text-[#1C1208] m-0 font-light">
                Free-Range Savanna Eggs
              </h4>
              <p className="text-xs text-[#1C1208]/65 mt-1 m-0">
                Rich amber yolks from hens roaming freely on natural seeds and forage.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] pt-3">
              <span className="font-mono text-sm font-bold text-[#C4882A]">
                KES 650
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1C1208]/70 group-hover:text-[#C4882A] font-bold">
                Add +
              </span>
            </div>
          </Link>

          {/* 5. Product Cell 4: Dorper Cuts (3 cols) */}
          <Link
            href="/barn"
            className="bento-1 bento-cell cell-cream p-5 sm:p-6 flex flex-col justify-between group no-underline transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-black/5 bg-[#EAE2D5]">
              <Image
                src="/images/grilled lamb chops.jpg"
                alt="Dorper Lamb Chops"
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-[#8E5E16]">
                1.5kg
              </div>
            </div>

            <div className="my-2">
              <h4 className="font-serif text-lg text-[#1C1208] m-0 font-light">
                Dorper Lamb Chops
              </h4>
              <p className="text-[11px] text-[#1C1208]/65 mt-1 m-0">
                Sweet, mild grass-fed lamb cut fresh.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] pt-3">
              <span className="font-mono text-xs font-bold text-[#C4882A]">
                KES 2,200
              </span>
              <span className="text-xs font-mono text-[#1C1208]/70 group-hover:text-[#C4882A] font-bold">
                Add +
              </span>
            </div>
          </Link>

          {/* 6. Product Cell 5: Highland Greens (3 cols) */}
          <Link
            href="/barn"
            className="bento-1 bento-cell cell-cream p-5 sm:p-6 flex flex-col justify-between group no-underline transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-black/5 bg-[#EAE2D5]">
              <Image
                src="/images/cabbages.jpeg"
                alt="Dawn Organic Greens"
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-[#3D6B3E]">
                Harvest
              </div>
            </div>

            <div className="my-2">
              <h4 className="font-serif text-lg text-[#1C1208] m-0 font-light">
                Dawn Organic Greens
              </h4>
              <p className="text-[11px] text-[#1C1208]/65 mt-1 m-0">
                Cabbages, spinach, kale &amp; farm herbs.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#DDD0BE] pt-3">
              <span className="font-mono text-xs font-bold text-[#3D6B3E]">
                KES 450
              </span>
              <span className="text-xs font-mono text-[#1C1208]/70 group-hover:text-[#3D6B3E] font-bold">
                Add +
              </span>
            </div>
          </Link>

          {/* 7. Subscribe CTA Cell: The Ranch Box (6 cols, Green) */}
          <div className="bento-3 bento-cell cell-green p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-emerald-200">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest bg-black/30 px-3 py-1 rounded-full border border-emerald-500/20">
                <i className="bi bi-calendar-check" aria-hidden="true" />
                <span>Weekly Shamba Subscription</span>
              </div>
              <span className="t-label text-xs text-emerald-300 font-bold">Save 15%</span>
            </div>

            <div className="my-4 space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF7F0] font-light m-0">
                The Osotua Ranch Box
              </h3>
              <p className="t-body text-xs sm:text-sm text-emerald-100/85 m-0 max-w-md">
                A curated weekly parcel containing A2 milk, pasture eggs, fresh greens, grass-fed cuts, and seasonal farm honey.
              </p>
            </div>

            {/* Frequency Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-emerald-700/60 pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
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
                  type="button"
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

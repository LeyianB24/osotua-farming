"use client";

import Link from "next/link";
import Image from "next/image";

export default function ExperienceBannerSection() {
  return (
    <section className="relative w-full py-20 sm:py-24 md:py-28 overflow-hidden text-white" style={{ color: "#F5F0E8" }}>
      {/* Background Image: Pastoral Rangelands Herd */}
      <Image
        src="/images/WhatsApp Image 2026-08-10 at 11.55.21.jpeg"
        alt="Boran stud bull on the open Kajiado rangelands at Osotua Farm"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />

      {/* Dark Film Scrim Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28, 18, 8, 0.65) 0%, rgba(28, 18, 8, 0.82) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] mb-4"
          style={{ color: "#C99A2E" }}
        >
          RANCH EXPERIENCES
        </div>

        {/* Heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] mb-6"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Experience Osotua: <br />
          <span style={{ color: "#C99A2E" }}>Visit Our Rangelands</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg text-[#F5F0E8]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          style={{ fontFamily: "var(--font-source-sans), sans-serif", color: "rgba(245, 240, 232, 0.9)" }}
        >
          Tour Boran herds, inspect purebred breeding stock, learn regenerative rotational
          grazing, and savour a farm-to-table bush breakfast.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/visit"
            className="inline-flex items-center justify-center rounded-[0px] bg-[#C99A2E] hover:bg-[#D9AA3E] text-[#1C1208] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition-all no-underline w-full sm:w-auto active:scale-[0.98]"
            style={{ color: "#1C1208" }}
          >
            <span>BOOK A FARM VISIT</span>
          </Link>

          <Link
            href="/invest"
            className="inline-flex items-center justify-center rounded-[0px] border border-white/40 hover:border-[#C99A2E] text-white hover:text-[#C99A2E] bg-black/30 backdrop-blur-sm px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-all no-underline w-full sm:w-auto"
            style={{ color: "#FFFFFF" }}
          >
            <span>RANCH INVESTMENT</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

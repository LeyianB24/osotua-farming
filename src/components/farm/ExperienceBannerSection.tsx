"use client";

import Link from "next/link";
import Image from "next/image";

export default function ExperienceBannerSection() {
  return (
    <section className="relative w-full py-28 md:py-36 lg:py-40 overflow-hidden">
      {/* Background Image: Pastoral Rangelands Herd */}
      <Image
        src="/images/osotua-rangelands-herd.jpg"
        alt="Osotua pastoral rangelands in Kajiado"
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
          }}
        >
          Experience Osotua: <br />
          <span style={{ color: "#C99A2E" }}>Visit Our Rangelands</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg text-[#F5F0E8]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Tour Boran herds, inspect purebred breeding stock, learn regenerative rotational
          grazing, and savour a farm-to-table bush breakfast.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/visit"
            className="btn-gold w-full sm:w-auto rounded-[0px]"
            style={{
              padding: "0.85rem 2.2rem",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            BOOK A FARM VISIT
          </Link>

          <Link
            href="/invest"
            className="btn-on-dark w-full sm:w-auto rounded-[0px]"
            style={{
              padding: "0.85rem 2.2rem",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            RANCH INVESTMENT
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";

export default function ExperienceBannerSection() {
  return (
    <section className="relative w-full py-32 md:py-44 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-rangeland.jpg"
        alt="Osotua pastoral rangelands with cattle"
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
            "linear-gradient(180deg, rgba(28, 18, 8, 0.72) 0%, rgba(28, 18, 8, 0.82) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-5"
          style={{
            color: "#C99A2E",
            fontFamily: "var(--font-source-sans), sans-serif",
          }}
        >
          RANCH EXPERIENCES
        </div>

        {/* Heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.12] mb-6"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
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
            className="btn-gold w-full sm:w-auto"
            style={{
              borderRadius: "2px",
              padding: "0.95rem 2.2rem",
              fontSize: "0.82rem",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
              backgroundColor: "#C99A2E",
              color: "#1C1208",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            BOOK A FARM VISIT
          </Link>

          <Link
            href="/invest"
            className="btn-on-dark w-full sm:w-auto"
            style={{
              borderRadius: "2px",
              padding: "0.95rem 2.2rem",
              fontSize: "0.82rem",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "1px solid rgba(245, 240, 232, 0.4)",
              color: "#F5F0E8",
              backgroundColor: "transparent",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            RANCH INVESTMENT
          </Link>
        </div>
      </div>
    </section>
  );
}

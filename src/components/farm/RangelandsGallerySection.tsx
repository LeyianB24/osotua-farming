"use client";

import Image from "next/image";
import Link from "next/link";

const GALLERY_IMAGES = [
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.55.28.jpeg",
    alt: "Osotua farm crop rows and rangelands, Kajiado County",
    className: "row-span-2", // tall left column spanning both rows
  },
  {
    src: "/images/osotua-rangelands-herd.jpg",
    alt: "Aerial view of Osotua purebred Boran herd on Kajiado pastures",
    className: "",
  },
  {
    src: "/images/ripe tomatoes.jpg",
    alt: "Fresh organic tomatoes from Osotua farm harvest",
    className: "",
  },
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.55.27.jpeg",
    alt: "Napier grass fodder harvest on Osotua farm",
    className: "",
  },
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.55.23.jpeg",
    alt: "Bonsmara stud bull at Osotua ranch pen",
    className: "",
  },
];

export default function RangelandsGallerySection() {
  return (
    <section
      className="py-16 sm:py-20 md:py-28 border-y border-[#C99A2E]/15 text-white"
      style={{ backgroundColor: "#110B05", color: "#F5F0E8" }}
    >
      <div className="os-container">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] m-0"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Experience Our{" "}
            <br className="hidden sm:inline" />
            <span style={{ color: "#C99A2E" }}>Rangelands</span>
          </h2>
        </div>

        {/* Gallery Grid — 3 col, 2 row with left col spanning both rows */}
        <div
          className="grid gap-4 sm:gap-5"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "260px 260px",
          }}
        >
          {/* Left: Tall spanning image */}
          <div
            className="relative overflow-hidden group"
            style={{ gridRow: "span 2" }}
          >
            <Image
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          {/* Center Top */}
          <div className="relative overflow-hidden group">
            <Image
              src={GALLERY_IMAGES[1].src}
              alt={GALLERY_IMAGES[1].alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          {/* Right Top */}
          <div className="relative overflow-hidden group">
            <Image
              src={GALLERY_IMAGES[2].src}
              alt={GALLERY_IMAGES[2].alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          {/* Center Bottom */}
          <div className="relative overflow-hidden group">
            <Image
              src={GALLERY_IMAGES[3].src}
              alt={GALLERY_IMAGES[3].alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          {/* Right Bottom */}
          <div className="relative overflow-hidden group">
            <Image
              src={GALLERY_IMAGES[4].src}
              alt={GALLERY_IMAGES[4].alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          </div>
        </div>

        {/* Bottom badge + CTA row */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/visit"
            className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white no-underline transition-all hover:opacity-85"
            style={{ backgroundColor: "#6B7A3F", borderRadius: "2px", color: "#FFFFFF" }}
          >
            <i className="bi bi-camera-reels text-xs" aria-hidden="true" />
            <span>DIRECT FROM THE RANGELANDS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

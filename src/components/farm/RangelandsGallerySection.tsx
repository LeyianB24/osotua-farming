"use client";

import Image from "next/image";

export default function RangelandsGallerySection() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#1C1208" }}>
      <div className="os-container">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="w-12 h-[2px] bg-[#C99A2E] mx-auto mb-6 opacity-60" />
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.12] m-0"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            Experience Our <br />
            <span style={{ color: "#C99A2E" }}>Rangelands</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Tall Image (Col 1-4) */}
          <div
            className="md:col-span-4 relative min-h-[380px] md:min-h-[560px] overflow-hidden group"
            style={{ borderRadius: "2px" }}
          >
            <Image
              src="/images/WhatsApp Image 2026-08-10 at 11.55.28.jpeg"
              alt="Osotua rangeland acacia and savanna"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* Center 2 Stacked Images (Col 5-8) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Center Top: Herd on Red Dirt */}
            <div
              className="relative h-[270px] overflow-hidden group"
              style={{ borderRadius: "2px" }}
            >
              <Image
                src="/images/osotua-rangelands-herd.jpg"
                alt="Osotua purebred Boran herd on Kajiado pastures"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* Center Bottom: Savanna Tree & Sky */}
            <div
              className="relative h-[270px] overflow-hidden group"
              style={{ borderRadius: "2px" }}
            >
              <Image
                src="/images/WhatsApp Image 2026-08-10 at 11.55.27.jpeg"
                alt="Savanna tree canopy under Kajiado sky"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
            </div>
          </div>

          {/* Right Image: Fresh Produce Box / Tomatoes (Col 9-12) */}
          <div
            className="md:col-span-4 relative min-h-[380px] md:min-h-[560px] overflow-hidden group"
            style={{ borderRadius: "2px" }}
          >
            <Image
              src="/images/ripe tomatoes.jpg"
              alt="Fresh organic harvest provisions from Osotua farm"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}

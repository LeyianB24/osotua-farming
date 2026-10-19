"use client";

import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  {
    icon: "bi-arrow-repeat",
    title: "Regenerative Rotational Grazing",
    body:
      "Our 4,200-acre Kajiado ranch is divided into 28 managed paddocks. Livestock rotate every 14–21 days, allowing grasslands to fully recover — restoring root depth, water retention, and soil carbon sequestration.",
  },
  {
    icon: "bi-geo-alt",
    title: "Wildlife Corridor Stewardship",
    body:
      "We maintain 800+ acres of undisturbed wildlife corridors along the Amboseli–Maasai Mara migratory route. No fencing, no chemical sprays — open passage for elephants, zebras, wildebeest, and big cats.",
  },
  {
    icon: "bi-globe-africa",
    title: "Indigenous Breed Advantage",
    body:
      "Boran, Sahiwal, and Red Maasai breeds evolved alongside African wildlife. Their low-impact grazing, drought hardiness, and parasite resistance make them the keystone of our co-existence strategy — zero chemical dips.",
  },
  {
    icon: "bi-droplet",
    title: "Water Pan Sharing",
    body:
      "Seven ranch water pans are deliberately left accessible to wildlife in the dry season. Our cattle drink alongside zebras and impala — an ancient relationship honoured by Maasai pastoralists for centuries.",
  },
];

const STATS = [
  { value: "4,200", unit: "Acres", label: "Kajiado Rangeland" },
  { value: "800+", unit: "Acres", label: "Wildlife Corridor" },
  { value: "28", unit: "Paddocks", label: "Rotational Grazing" },
  { value: "12+", unit: "Species", label: "Wildlife Co-habitants" },
];

// Authentic ranch photos repurposed for conservation context
const MOSAIC = [
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.55.26 (1).jpeg",
    alt: "Boran herd grazing open Kajiado savanna at sunrise",
    label: "Kajiado Rangeland at Dawn",
  },
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.55.27.jpeg",
    alt: "Livestock moving through wildlife corridor on Osotua ranch",
    label: "Pastoral Corridor Movement",
  },
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.55.28.jpeg",
    alt: "Sahiwal cattle grazing alongside natural bush on open grassland",
    label: "Sahiwal on Open Rangeland",
  },
  {
    src: "/images/WhatsApp Image 2026-08-10 at 11.56.44 (1).jpeg",
    alt: "Osotua herd drinking from shared ranch water pan",
    label: "Shared Water Pans",
  },
];

export default function ConservationSection() {
  return (
    <section
      id="conservation"
      className="relative overflow-hidden bg-[#0E1A0A] text-[#F5F0E8]"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      {/* Subtle diagonal pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C99A2E 0px, #C99A2E 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div className="os-container relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#6B7A3F]" aria-hidden="true" />
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.24em]"
              style={{ color: "#6B7A3F" }}
            >
              CONSERVATION &middot; KAJIADO WILDLIFE CORRIDOR
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white m-0"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Livestock &amp; Wildlife,{" "}
            <br className="hidden sm:inline" />
            <span style={{ color: "#C99A2E" }}>Living as One</span>
          </h2>

          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "#C5BAA8", fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            At Osotua, &ldquo;Osotua&rdquo; &mdash; the Maasai word for a sacred bond of trust &mdash;
            governs how we steward 4,200 acres alongside Africa&rsquo;s migratory wildlife. Our indigenous
            breeds and holistic rotational grazing don&rsquo;t compete with nature &mdash; they sustain it.
          </p>
        </div>

        {/* ── MAIN CONTENT: Mosaic + Pillars ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* LEFT: Photo Mosaic */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Top-left: tall spanning */}
            <div
              className="relative overflow-hidden col-span-1 row-span-2 group"
              style={{ minHeight: "380px", borderRadius: "2px" }}
            >
              <Image
                src={MOSAIC[0].src}
                alt={MOSAIC[0].alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A0A]/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#C99A2E]">
                  {MOSAIC[0].label}
                </p>
              </div>
            </div>

            {/* Right column: three stacked smaller images */}
            {MOSAIC.slice(1).map((imgItem, i) => (
              <div
                key={i}
                className="relative overflow-hidden group"
                style={{ minHeight: "120px", borderRadius: "2px" }}
              >
                <Image
                  src={imgItem.src}
                  alt={imgItem.alt}
                  fill
                  sizes="(min-width: 1024px) 15vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A0A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E]">
                    {imgItem.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Pillars */}
          <div className="space-y-8">
            {PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="flex gap-5 pb-8 border-b border-white/10 last:border-0 last:pb-0"
              >
                <div
                  className="shrink-0 w-11 h-11 flex items-center justify-center border border-[#6B7A3F]/50"
                  style={{ borderRadius: "2px", backgroundColor: "rgba(107,122,63,0.15)" }}
                >
                  <i
                    className={`bi ${pillar.icon} text-lg`}
                    style={{ color: "#6B7A3F" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-white mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#A8998C", fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {pillar.body}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] no-underline transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#6B7A3F",
                color: "#FFFFFF",
                borderRadius: "2px",
              }}
            >
              <i className="bi bi-leaf" aria-hidden="true" />
              Our Conservation Mission
              <i className="bi bi-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4"
          style={{
            border: "1px solid rgba(107,122,63,0.3)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-6 text-center"
              style={{
                borderRight: i < STATS.length - 1 ? "1px solid rgba(107,122,63,0.3)" : "none",
                borderBottom: "1px solid rgba(107,122,63,0.1)",
              }}
            >
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="text-3xl sm:text-4xl font-bold"
                  style={{
                    color: "#C99A2E",
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "#6B7A3F" }}
                >
                  {s.unit}
                </span>
              </div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "#7A6D62" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── MAASAI QUOTE STRIP ── */}
        <div
          className="mt-10 px-8 py-8 border-l-4"
          style={{ borderColor: "#6B7A3F", backgroundColor: "rgba(107,122,63,0.08)" }}
        >
          <blockquote
            className="text-xl sm:text-2xl font-medium italic leading-relaxed text-white m-0"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            &ldquo;The Maasai have coexisted with lions, elephants, and wild herds for a thousand
            years. Our ranch is proof that this wisdom &mdash; applied with modern precision &mdash; is
            the most powerful agricultural model Africa has ever known.&rdquo;
          </blockquote>
          <p
            className="mt-4 text-xs font-mono font-bold uppercase tracking-[0.2em]"
            style={{ color: "#6B7A3F" }}
          >
            &mdash; Osotua Farming, Kajiado County
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image"
import Link from "next/link"
import { RANCH_WIDE, RANCH_GALLERY, LOGO } from "@/lib/images"

export const metadata = {
  title: "About — Osotua Farming",
  description: "Learn about the heritage, mission, and pastoral covenant behind Osotua Farming in Kajiado County, Kenya.",
}

const VALUES = [
  {
    icon: "bi-flower1",
    title: "Indigenous Breeds, Modern Methods",
    desc: "We champion Africa's finest livestock genetics combined with smart farming technology, rigorous pedigree record-keeping, and holistic pasture management.",
  },
  {
    icon: "bi-geo-alt-fill",
    title: "Rooted in Kajiado",
    desc: "Our 4,200+ acre ranch features the ideal microclimate, rich rangelands, and deep pastoral heritage to raise East Africa's finest disease-resilient livestock.",
  },
  {
    icon: "bi-qr-code-scan",
    title: "Full Traceability",
    desc: "Every animal and farm harvest carries a verified digital identity linking back to its rangeland origin, veterinary pedigree, and sustainable harvest date.",
  },
  {
    icon: "bi-people-fill",
    title: "Community-First Pastoralism",
    desc: "We partner with over 40 smallholder pastoral co-ops, support agricultural internships, and reinvest directly into surrounding pastoral communities.",
  },
]

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#F5F0E8] text-[#1C1208]">

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#1C1208]">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={RANCH_WIDE}
            alt="The Osotua ranch landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1208] via-[#1C1208]/90 to-[#1C1208]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#C99A2E]/40 shadow-md bg-white">
              <Image
                src={LOGO}
                alt="Osotua Farming"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white">
              <span>OUR STORY &bull; THE PASTORAL COVENANT</span>
            </div>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.02] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            }}
          >
            A farm built on <br />
            <em className="font-normal italic text-[#C99A2E]">trust and land</em>
          </h1>

          <p className="text-base sm:text-xl text-[#F5F0E8]/85 max-w-2xl leading-relaxed font-normal">
            Osotua means a sacred bond of friendship and peace in the Maa language — an enduring covenant between the rangelands, the pastoralist, and the community we serve.
          </p>
        </div>
      </section>

      {/* ── CORE PURPOSE ── */}
      <section className="py-24 sm:py-32 bg-[#F5F0E8] border-b border-[#D4C9B0]/60">
        <div className="os-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left quote card */}
            <div className="lg:col-span-6 bg-[#FAF7F2] border border-[#D4C9B0] p-10 sm:p-14 relative overflow-hidden rounded-[2px] shadow-sm">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 mb-8 rounded-[2px]">
                <span>OUR MOTTO</span>
              </div>

              <blockquote
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-[#1C1208] leading-tight mb-8 pl-6 border-l-4 border-[#C99A2E]"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                &ldquo;From Our Land, To Your Table&rdquo;
              </blockquote>

              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#5C4A2A]">
                Maa Pastoral Tradition &bull; Kajiado County, Kenya
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#6B7A3F] bg-[#6B7A3F]/10 border border-[#6B7A3F]/30 rounded-[2px]">
                <span>OUR CORE MISSION</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight m-0"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                }}
              >
                Redefining African <span className="text-[#C99A2E]">Agribusiness</span>
              </h2>

              <p className="text-base sm:text-lg text-[#5C4A2A] leading-relaxed m-0">
                Osotua Farming is a premier smart agribusiness enterprise based across 4,200 acres in Kajiado County, Kenya. We raise climate-resilient indigenous livestock, cultivate organic produce, and supply consumers and hospitality clients directly through our Barn Store.
              </p>

              <p className="text-base sm:text-lg text-[#5C4A2A] leading-relaxed m-0">
                We champion Africa&apos;s finest livestock genetics combined with precision farming technology and regenerative land management — proving that pastoral tradition and modern innovation thrive together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 sm:py-32 bg-[#EDE6DA] border-b border-[#D4C9B0]/60">
        <div className="os-container relative z-10 space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px]">
              <span>OUR GUIDING VALUES</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              }}
            >
              What We <span className="text-[#C99A2E]">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {VALUES.map((item) => (
              <div
                key={item.title}
                className="bg-[#FAF7F2] border border-[#D4C9B0] p-8 sm:p-10 flex gap-6 items-start rounded-[2px] hover:border-[#C99A2E] transition-all"
              >
                <div className="w-14 h-14 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/25 flex items-center justify-center shrink-0 text-2xl text-[#C99A2E]">
                  <i className={`bi ${item.icon}`} />
                </div>
                <div className="space-y-3">
                  <h3
                    className="text-2xl font-bold text-[#1C1208] m-0"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base text-[#5C4A2A] leading-relaxed m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-24 sm:py-32 bg-[#F5F0E8] border-b border-[#D4C9B0]/60">
        <div className="os-container relative z-10 space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#6B7A3F] bg-[#6B7A3F]/10 border border-[#6B7A3F]/30 rounded-[2px]">
              <span>RANCH LIFE</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              }}
            >
              Life on the <span className="text-[#C99A2E]">Osotua Rangelands</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {RANCH_GALLERY.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-[2px] overflow-hidden border border-[#D4C9B0] shadow-sm group bg-[#1C1208]"
              >
                <Image
                  src={src}
                  alt={`Ranch life at Osotua ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION CTA ── */}
      <section className="py-24 sm:py-32 text-center bg-[#FAF7F2]">
        <div className="os-container relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px]">
            <span>VISIT OUR RANCH</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold text-[#1C1208] m-0"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            }}
          >
            Kajiado County, Kenya
          </h2>
          <p className="text-base sm:text-lg text-[#5C4835] leading-relaxed max-w-xl mx-auto">
            Located in the heart of East Africa&apos;s pastoral country — book a guided rangeland tour and experience Osotua firsthand.
          </p>

          <div className="pt-4 flex justify-center">
            <Link href="/visit" className="btn-gold">
              <i className="bi bi-geo-alt-fill text-sm" />
              <span>BOOK A FARM VISIT</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

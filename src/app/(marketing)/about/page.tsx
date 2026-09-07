import Image from "next/image"
import Link from "next/link"
import { RANCH_WIDE, RANCH_GALLERY, LOGO } from "@/lib/images"

export const metadata = {
  title: "About — Osotua Farming",
  description: "Learn about the heritage, mission, and pastoral covenant behind Osotua Farming in Kajiado County, Kenya.",
}

const VALUES = [
  {
    icon: "ti-plant-2",
    title: "Indigenous Breeds, Modern Methods",
    desc: "We champion Africa's finest livestock genetics combined with smart farming technology, rigorous pedigree record-keeping, and holistic pasture management.",
  },
  {
    icon: "ti-map-pin",
    title: "Rooted in Kajiado",
    desc: "Our 3,200+ acre ranch features the ideal microclimate, rich rangelands, and deep pastoral heritage to raise East Africa's finest disease-resilient livestock.",
  },
  {
    icon: "ti-qrcode",
    title: "Full Traceability",
    desc: "Every animal and farm harvest carries a verified digital identity linking back to its rangeland origin, veterinary pedigree, and sustainable harvest date.",
  },
  {
    icon: "ti-users-group",
    title: "Community-First Pastoralism",
    desc: "We partner with over 40 smallholder pastoral co-ops, support agricultural internships, and reinvest directly into surrounding pastoral communities.",
  },
]

export default function AboutPage() {
  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-earth noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={RANCH_WIDE}
            alt="The Osotua ranch landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F0]/95 via-[#FBF7F0]/85 to-[#FBF7F0]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7F0] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#C4882A]/40 shadow-md">
              <Image
                src={LOGO}
                alt="Osotua Farming"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-amber-500/10 text-[#8E5E16] border border-amber-500/25">
              <span>OUR STORY &bull; THE COVENANT</span>
            </div>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            A farm built on <br />
            <em className="font-normal italic text-gradient-gold">trust and land</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed font-normal">
            Osotua means a sacred bond of friendship in the Maa language — an enduring covenant between the rangelands, the pastoralist, and the community we serve.
          </p>
        </div>
      </section>

      {/* ── CORE PURPOSE ── */}
      <section className="bg-mesh-green noise py-24 sm:py-36">
        <div className="os-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left quote card */}
            <div className="lg:col-span-6 card-luxury p-10 sm:p-14 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20 mb-8">
                <span>OUR MOTTO</span>
              </div>

              <blockquote
                className="text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#1C1208] leading-tight mb-8 pl-6 border-l-4 border-[#C4882A]"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                &ldquo;From Our Land, To Your Table&rdquo;
              </blockquote>

              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8E5E16]">
                Maa Pastoral Tradition &bull; Kajiado, Kenya
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E6B34] bg-emerald-500/10 border border-emerald-500/20">
                <span>OUR CORE MISSION</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                }}
              >
                Redefining African <span className="text-gradient-gold font-semibold">Agribusiness</span>
              </h2>

              <p className="text-base sm:text-lg text-[#5C4835] leading-relaxed m-0">
                Osotua Farming is a premier smart agribusiness enterprise based in Kajiado County, Kenya. We raise climate-resilient indigenous livestock, cultivate organic produce, and supply consumers and hospitality clients directly through our Barn Store.
              </p>

              <p className="text-base sm:text-lg text-[#5C4835] leading-relaxed m-0">
                We champion Africa&apos;s finest livestock genetics combined with precision farming technology and regenerative land management — proving that pastoral tradition and modern innovation thrive together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-mesh-earth noise py-24 sm:py-36">
        <div className="os-container relative z-10 space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
              <span>OUR GUIDING VALUES</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              What We <span className="text-gradient-gold font-semibold">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {VALUES.map((item) => (
              <div
                key={item.title}
                className="card-luxury p-8 sm:p-10 flex gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 text-2xl text-[#C4882A]">
                  <i className={`ti ${item.icon}`} />
                </div>
                <div className="space-y-3">
                  <h3
                    className="text-2xl font-bold text-[#1C1208] m-0"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-base text-[#5C4835] leading-relaxed m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="bg-mesh-green noise py-24 sm:py-36">
        <div className="os-container relative z-10 space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E6B34] bg-emerald-500/10 border border-emerald-500/20">
              <span>RANCH LIFE</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              Life on the <span className="text-gradient-gold font-semibold">Osotua Rangelands</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {RANCH_GALLERY.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-3xl overflow-hidden border border-[#EDE6D6] shadow-md group"
              >
                <Image
                  src={src}
                  alt={`Ranch life at Osotua ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION CTA ── */}
      <section className="bg-mesh-gold noise py-24 sm:py-36 text-center">
        <div className="os-container relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
            <span>VISIT OUR RANCH</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Kajiado County, Kenya
          </h2>
          <p className="text-base sm:text-lg text-[#5C4835] leading-relaxed max-w-xl mx-auto">
            Located in the heart of East Africa&apos;s pastoral country — book a guided rangeland tour and experience Osotua firsthand.
          </p>

          <div className="pt-4 flex justify-center">
            <Link href="/visit" className="btn-primary py-4 px-8 text-xs tracking-widest shadow-xl">
              <i className="ti ti-map-pin text-lg" />
              <span>BOOK A FARM VISIT</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

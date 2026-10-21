import Link from "next/link"
import PageHero from "@/components/farm/PageHero"
import RangelandsGallerySection from "@/components/farm/RangelandsGallerySection"
import ConservationSection from "@/components/farm/ConservationSection"
import { RANCH_WIDE } from "@/lib/images"

export const metadata = {
  title: "Our Heritage & Pastoral Mission",
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
      {/* ── STANDARDIZED CINEMATIC PAGE HERO ── */}
      <PageHero
        image={{
          src: RANCH_WIDE,
          alt: "The expansive Osotua ranch landscape and pastoral rangelands in Kajiado",
        }}
        eyebrow="OUR STORY · THE PASTORAL COVENANT"
        title={
          <>
            A farm built on <br />
            <span className="text-[#C99A2E]">trust and land</span>
          </>
        }
        lead="Osotua means a sacred bond of friendship and peace in the Maa language — an enduring covenant between the rangelands, the pastoralist, and the community we serve."
        trustChips={[
          { label: "4,200+ Titled Acres in Kajiado" },
          { label: "40+ Smallholder Pastoral Co-ops" },
          { label: "100% Direct Traceability" },
        ]}
        ctaText="Book A Farm Visit"
        ctaHref="/visit"
        secondaryCtaText="Explore Farm Barn"
        secondaryCtaHref="/barn"
        secondaryCtaExternal={false}
        stats={[
          { value: "4,200+", label: "Titled Rangeland Acres" },
          { value: "40+", label: "Partner Co-operatives" },
          { value: "100%", label: "Regenerative Covenant" },
        ]}
      />

      {/* ── CORE PURPOSE ── */}
      <section className="py-20 sm:py-24 md:py-32 bg-[#F5F0E8] border-b border-[#D4C9B0]/60">
        <div className="os-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left quote card */}
            <div className="lg:col-span-6 bg-[#FAF7F2] border border-[#D4C9B0] p-10 sm:p-14 relative overflow-hidden rounded-[2px] shadow-sm hover-lift">
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
                className="text-3xl sm:text-5xl font-bold text-[#1C1208] m-0"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                }}
              >
                Rooted in Community, <br />
                <span className="text-[#C99A2E]">Powered by the Sun</span>
              </h2>

              <p className="text-base sm:text-lg text-[#5C4A2A] leading-relaxed">
                We believe the future of African food sovereignty lies in harmonizing traditional pastoral knowledge with modern regenerative techniques. By practicing multi-species rotational grazing, water harvesting, and solar-powered cold-chain distribution, Osotua produces superior livestock and pure food while actively regenerating the land.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link href="/breeds" className="btn-outline">
                  <span>VIEW OUR BREEDS</span>
                </Link>
                <Link href="/barn" className="btn-gold">
                  <span>VISIT THE BARN</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES (Generous card spacing matching Compass Cartage) ── */}
      <section className="py-20 sm:py-24 md:py-32 bg-[#EDE6DA] border-b border-[#D4C9B0]/60">
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
                className="bg-[#FAF7F2] border border-[#D4C9B0] p-8 sm:p-10 flex gap-6 items-start rounded-[2px] hover:border-[#C99A2E] transition-all hover-lift"
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
                  <p className="text-base text-[#5C4A2A] leading-relaxed m-0 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSERVATION & WILDLIFE SECTION ── */}
      <ConservationSection />

      {/* ── EXPANDABLE INTERACTIVE RANGELANDS GALLERY ── */}
      <RangelandsGallerySection />

      {/* ── LOCATION CTA ── */}
      <section className="py-20 sm:py-24 md:py-32 text-center bg-[#FAF7F2] border-t border-[#D4C9B0]/40">
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
          <p className="text-base sm:text-lg text-[#5C4835] leading-relaxed max-w-xl mx-auto font-normal">
            Located in the heart of East Africa&apos;s pastoral country — book a guided rangeland tour and experience Osotua firsthand.
          </p>

          <div className="pt-4 flex justify-center">
            <Link href="/visit" className="btn-gold btn-shimmer">
              <i className="bi bi-geo-alt-fill text-sm" />
              <span>BOOK A FARM VISIT</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

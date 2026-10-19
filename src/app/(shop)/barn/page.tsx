import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import BarnClient from "@/components/farm/BarnClient"
import PageHero from "@/components/farm/PageHero"
import Slideshow from "@/components/shared/Slideshow"
import { RANCH_PANO, PRODUCE_SLIDESHOW } from "@/lib/images"

export const metadata = {
  title: "The Farm Barn & Harvest Pantry",
  description: "Order fresh organic vegetables, pasture-raised beef, raw dairy, and artisanal farm honey direct from Osotua Farming in Kajiado, Kenya.",
}

async function getProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { category: { name: "asc" } },
  })
}

async function getCategories() {
  return prisma.productCategory.findMany({ orderBy: { name: "asc" } })
}

export default async function BarnPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F0E8] text-[#1C1208]">
      {/* ── STANDARDIZED CINEMATIC PAGE HERO ── */}
      <PageHero
        image={{
          src: RANCH_PANO,
          alt: "The Barn Store and pastoral harvest at Osotua Farming",
        }}
        eyebrow="DIRECT FARM STORE · KITCHEN SUPPLY"
        title={
          <>
            The Farm Barn <br />
            <span className="text-[#C99A2E]">&amp; Harvest Pantry</span>
          </>
        }
        lead="Raised on pristine Kajiado pastures, handled with artisanal care, and delivered fresh to your table with direct farm traceability."
        trustChips={[
          { label: "Daily Dawn Harvest Active" },
          { label: "Pesticide-Free Produce" },
          { label: "Cold-Chain Same-Day Dispatch" },
        ]}
        ctaText="Shop Fresh Pantry"
        ctaHref="#pantry-catalog"
        secondaryCtaText="WhatsApp Concierge"
        secondaryCtaHref="https://wa.me/254755758208"
        stats={[
          { value: "100%", label: "Organic Pasture-Raised" },
          { value: "Same-Day", label: "Cold-Chain Nairobi Delivery" },
          { value: "0", label: "Synthetic Chemical Inputs" },
        ]}
      />

      {/* ── FRESHNESS FEATURE BAR ── */}
      <section className="bg-[#F5F0E8] pb-12 pt-8 relative z-10">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Produce slideshow */}
            <div
              className="lg:col-span-8 overflow-hidden border border-[#D4C9B0] shadow-xl bg-[#FAF7F2]"
              style={{ borderRadius: "2px" }}
            >
              <Slideshow slides={PRODUCE_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3200} />
            </div>

            {/* Feature card */}
            <div
              className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between bg-[#FAF7F2] border border-[#D4C9B0] shadow-xl hover-lift"
              style={{ borderRadius: "2px" }}
            >
              <div className="space-y-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-white"
                  style={{ backgroundColor: "#C4602A", borderRadius: "2px" }}
                >
                  <span>FRESH FROM THE RANCH</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl text-[#1C1208] leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 600 }}
                >
                  Garden, Orchard &amp; Pasture
                </h2>
                <p
                  className="text-sm text-[#5C4A2A] leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  Every Barn item originates right here — pesticide-free leafy greens, vine-ripened crops, free-range eggs, and dry-aged grass-fed beef raised on the Osotua rangelands.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#D4C9B0]/60 flex items-center justify-between">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#5C4A2A]"
                >
                  Next Nairobi Dispatch
                </span>
                <span
                  className="text-base font-bold text-[#C4602A]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Same-Day Express
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTISAN GHEE & TALLOW SPOTLIGHT ── */}
      <section className="bg-[#FAF7F2] border-y border-[#D4C9B0] py-14 sm:py-18 relative z-10">
        <div className="os-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-white bg-[#8C6A20] rounded-[2px] mb-3">
                <i className="bi bi-fire text-xs" />
                <span>ARTISANAL ANCESTRAL FATS</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-[#1C1208] leading-tight font-bold"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Grass-Fed Sahiwal Ghee <br />
                <span className="text-[#C99A2E]">&amp; Pure Beef Tallow</span>
              </h2>
              <p
                className="mt-3 text-sm sm:text-base text-[#5C4A2A] leading-relaxed"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Cultured butter slow-simmered over low embers and kettle-rendered tallow from pasture-raised Boran steers. Zero chemical solvents, zero additives — pure, unadulterated nourishment for high-heat cooking and ancestral living.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C6A20] uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#6B7A3F] animate-pulse" />
              <span>Small-Batch Ranch Bottling Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Ghee Feature Card */}
            <div className="bg-white border border-[#D4C9B0] p-6 sm:p-8 flex flex-col justify-between shadow-md hover-lift">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] px-2.5 py-1 bg-[#C99A2E]/15 text-[#8C6A20] border border-[#C99A2E]/30">
                    A2 Cultured Dairy
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1C1208]">
                    From KES 950
                  </span>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 bg-[#1C1208] border border-[#D4C9B0]">
                  <Image
                    src="/images/Ghee 1.jpg"
                    alt="Artisan Maasai Grass-Fed Ghee"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#C99A2E]">
                      Traditional Maasai Bilona Method
                    </p>
                    <h3 className="text-xl font-bold font-serif text-white m-0">
                      Artisan Cultured Ghee
                    </h3>
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { src: "/images/Ghee 2.jpg", label: "Golden Jar" },
                    { src: "/images/Ghee 3.jpg", label: "Bilona Curd" },
                    { src: "/images/Ghee 4.jpg", label: "Amber Clarified" },
                    { src: "/images/Ghee 5.jpg", label: "Small Batch" },
                  ].map((thumb) => (
                    <div key={thumb.src} className="relative aspect-square border border-[#D4C9B0] overflow-hidden group">
                      <Image
                        src={thumb.src}
                        alt={thumb.label}
                        fill
                        sizes="100px"
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#5C4A2A] mb-6">
                  <li className="flex items-center gap-2">
                    <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                    <span>Rich in fat-soluble Vitamins A, D, E &amp; K2 with natural CLA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                    <span>High smoke point (250°C / 485°F) — ideal for searing &amp; roasting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                    <span>Lactose &amp; casein free through traditional clarified separation</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E8E0D2] flex items-center justify-between">
                <span className="text-xs text-[#756B5B] font-mono">
                  Origin: Sahiwal A2 Dairy Herd
                </span>
                <Link
                  href="/barn/artisan-maasai-ghee"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C99A2E] text-[#1C1208] text-xs font-bold uppercase tracking-wider hover:bg-[#D9AA3E] transition-colors"
                >
                  <span>Order Ghee</span>
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>

            {/* Tallow Feature Card */}
            <div className="bg-white border border-[#D4C9B0] p-6 sm:p-8 flex flex-col justify-between shadow-md hover-lift">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] px-2.5 py-1 bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]">
                    Pasture-Raised Boran
                  </span>
                  <span className="text-xs font-mono font-bold text-[#1C1208]">
                    From KES 850
                  </span>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 bg-[#1C1208] border border-[#D4C9B0]">
                  <Image
                    src="/images/Beef Tallow 1.jpg"
                    alt="Pure Grass-Fed Beef Tallow"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#C99A2E]">
                      Kettle-Rendered Boran Suet
                    </p>
                    <h3 className="text-xl font-bold font-serif text-white m-0">
                      Pure Beef Tallow
                    </h3>
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { src: "/images/Beef Tallow 2.jpg", label: "Cold Rendered" },
                    { src: "/images/Tallow 1.jpg", label: "Rendered Suet" },
                    { src: "/images/Tallow 2.jpg", label: "Raw Pasture Tallow" },
                    { src: "/images/Tallow 3.jpg", label: "Triple Filtered" },
                  ].map((thumb) => (
                    <div key={thumb.src} className="relative aspect-square border border-[#D4C9B0] overflow-hidden group">
                      <Image
                        src={thumb.src}
                        alt={thumb.label}
                        fill
                        sizes="100px"
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#5C4A2A] mb-6">
                  <li className="flex items-center gap-2">
                    <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                    <span>Pure mono-saturated &amp; saturated fats from 100% grass-grazed cattle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                    <span>Exceptional heat stability (205°C / 400°F) for crisp, golden roasting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                    <span>Zero seed oils, zero trans fats, and naturally shelf-stable</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E8E0D2] flex items-center justify-between">
                <span className="text-xs text-[#756B5B] font-mono">
                  Origin: 100% Grass-Fed Boran
                </span>
                <Link
                  href="/barn/pure-grass-fed-beef-tallow"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C1208] text-[#F5F0E8] text-xs font-bold uppercase tracking-wider hover:bg-[#332415] transition-colors"
                >
                  <span>Order Tallow</span>
                  <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BARN CATALOG ── */}
      <div id="pantry-catalog">
        <BarnClient initialProducts={products} categories={categories} />
      </div>
    </div>
  )
}

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

      {/* ── BARN CATALOG ── */}
      <div id="pantry-catalog">
        <BarnClient initialProducts={products} categories={categories} />
      </div>
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BarnClient from "@/components/farm/BarnClient"
import Slideshow from "@/components/shared/Slideshow"
import { RANCH_PANO, PRODUCE_SLIDESHOW } from "@/lib/images"

export const metadata = {
  title: "The Barn Store — Osotua Farming",
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
    <div style={{ background: "#F5F0E8", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={RANCH_PANO}
            alt="The Barn Store at Osotua Farming"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8]/95 via-[#F5F0E8]/85 to-[#F5F0E8]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-6 text-white"
            style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
          >
            <i className="bi bi-shop text-xs" aria-hidden="true" />
            <span>DIRECT FARM STORE · KITCHEN SUPPLY</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            The Farm Barn <br />
            <span style={{ color: "#C99A2E" }}>&amp; Harvest Pantry</span>
          </h1>

          <p
            className="text-base sm:text-xl text-[#8E7E70] max-w-2xl leading-relaxed mb-10 font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Raised on pristine Kajiado pastures, handled with artisanal care, and delivered fresh to your table with direct farm traceability.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[#D4C9B0]">
            {[
              { icon: "bi-sun", label: "Daily Dawn Harvest Active" },
              { icon: "bi-flower1", label: "Pesticide-Free Produce" },
              { icon: "bi-truck", label: "Cold-Chain Same-Day Dispatch" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <i className={`bi ${item.icon} text-[#C99A2E] text-base`} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208]"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRESHNESS FEATURE BAR ── */}
      <section className="bg-[#F5F0E8] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
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
              className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between bg-[#FAF7F2] border border-[#D4C9B0] shadow-xl"
              style={{ borderRadius: "2px" }}
            >
              <div className="space-y-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
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
                  className="text-sm text-[#8E7E70] leading-relaxed"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  Every Barn item originates right here — pesticide-free leafy greens, vine-ripened crops, free-range eggs, and dry-aged grass-fed beef raised on the Osotua rangelands.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8E0D2] flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#8E7E70", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  Next Nairobi Dispatch
                </span>
                <span
                  className="text-base font-bold"
                  style={{ color: "#C4602A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Same-Day Express
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BARN CATALOG ── */}
      <BarnClient initialProducts={products} categories={categories} />
    </div>
  )
}

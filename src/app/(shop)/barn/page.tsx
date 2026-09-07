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
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-earth noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={RANCH_PANO}
            alt="The Barn Store at Osotua Farming"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F0]/95 via-[#FBF7F0]/85 to-[#FBF7F0]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7F0] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-amber-500/10 text-[#8E5E16] border border-amber-500/25">
            <span>DIRECT FARM STORE &bull; KITCHEN SUPPLY</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Everything fresh, <br />
            <em className="font-normal italic text-gradient-gold">everything ours</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed mb-10 font-normal">
            Walk into our Barn or order directly online. Every product carries the Osotua promise — raised here in Kajiado, handled with artisanal care, and delivered fresh to your doorstep.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-amber-900/15">
            {[
              { icon: "ti-bolt", label: "Daily Dawn Harvest Active", pulse: true },
              { icon: "ti-leaf", label: "Pesticide-Free Produce" },
              { icon: "ti-truck-delivery", label: "Cold-Chain Same-Day Dispatch" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <i className={`ti ${item.icon} text-[#C4882A] text-lg`} />
                  {item.pulse && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8E5E16]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRESHNESS FEATURE BAR ── */}
      <section className="bg-[#FBF7F0] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Produce slideshow */}
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-amber-900/15 shadow-2xl">
              <Slideshow slides={PRODUCE_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3200} />
            </div>

            {/* Feature card */}
            <div className="lg:col-span-4 card-luxury p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
                  <span>FRESH FROM THE RANCH</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-light text-[#1C1208] leading-tight"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Garden, Orchard &amp; Pasture
                </h2>
                <p className="text-sm text-[#5C4835] leading-relaxed">
                  Every Barn item originates right here — pesticide-free leafy greens, vine-ripened crops, free-range eggs, and dry-aged grass-fed beef raised on the Osotua rangelands.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8E5E16]">
                  Next Nairobi Dispatch
                </span>
                <span className="font-serif text-lg font-bold text-[#C4882A]">
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

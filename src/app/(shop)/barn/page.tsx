import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BarnClient from "@/components/farm/BarnClient"
import Slideshow from "@/components/shared/Slideshow"
import { RANCH_PANO, PRODUCE_SLIDESHOW } from "@/lib/images"

export const metadata = { title: "The Barn Store — Osotua Farming" }

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
    <div className="bg-[#FBF7F0] pt-20 min-h-screen">
      {/* Header with Background Photo Overlay */}
      <div className="relative bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={RANCH_PANO}
            alt="The Barn Store"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1208] via-[#1C1208]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-transparent to-[#1C1208]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="eyebrow text-[#C4882A] mb-4">
            Direct Farm Store & Kitchen Supply
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 tracking-tight leading-tight">
            Everything fresh,<br />
            <em className="text-[#C4882A] not-italic font-normal">everything ours</em>
          </h1>
          <p className="text-[#F5EFE4]/80 max-w-xl leading-relaxed text-base">
            Walk into our Barn or order directly online. Every product carries the Osotua promise — raised here in Kajiado, handled with artisanal care, and delivered fresh to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-[#F5EFE4]/70 border-t border-[#C4882A]/20 pt-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Daily Harvest Active
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C4882A]" />
            <span>Pesticide-Free Produce</span>
            <span className="w-1 h-1 rounded-full bg-[#C4882A]" />
            <span>Traceable Farm-to-Fork</span>
          </div>
        </div>
      </div>

      {/* Fresh from the ranch — produce slideshow & feature spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 shadow-2xl rounded-md overflow-hidden">
            <Slideshow slides={PRODUCE_SLIDESHOW} heightClass="h-72 sm:h-84" />
          </div>
          <div className="glass-card-dark p-8 rounded-md flex flex-col justify-between border border-[#C4882A]/30 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#C4882A]/10 blur-2xl pointer-events-none" />
            <div>
              <div className="eyebrow text-[#C4882A] mb-3">
                Fresh From The Ranch
              </div>
              <h2 className="font-serif text-3xl text-[#F5EFE4] font-light mb-4">
                Garden, orchard & pasture
              </h2>
              <p className="text-[#F5EFE4]/70 text-xs sm:text-sm leading-relaxed mb-6">
                Every Barn item originates right here — pesticide-free leafy greens, vine-ripened crops, free-range eggs, and dry-aged grass-fed beef raised on the Osotua rangelands.
              </p>
            </div>
            
            <div className="pt-4 border-t border-[#F5EFE4]/10 flex items-center justify-between text-xs font-mono text-[#C4882A]">
              <span>Next Harvest Delivery:</span>
              <span className="font-bold text-[#F5EFE4]">Same-Day Express</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Barn Catalogue Client */}
      <BarnClient initialProducts={products} categories={categories} />
    </div>
  )
}


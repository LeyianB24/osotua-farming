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
      {/* Header */}
      <div className="relative bg-[#1C1208] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={RANCH_PANO}
            alt="The Barn Store"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/85 via-[#1C1208]/70 to-[#1C1208]/95" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            The Barn Store
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Everything fresh,{" "}
            <em className="text-[#C4882A]">everything ours</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed">
            Walk into our Barn or order online. Every product carries the Osotua promise — raised here, handled with care, delivered to you.
          </p>
        </div>
      </div>

      {/* Fresh from the ranch — produce slideshow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Slideshow slides={PRODUCE_SLIDESHOW} heightClass="h-72 sm:h-80" />
          </div>
          <div className="bg-[#1C1208] p-6 rounded flex flex-col justify-center border border-[#C4882A]/20">
            <div className="font-mono text-[10px] text-[#C4882A] tracking-[0.22em] uppercase mb-3">
              Fresh from the ranch
            </div>
            <h2 className="font-serif text-2xl text-[#F5EFE4] font-light mb-3">
              Garden, orchard, pasture
            </h2>
            <p className="text-[#F5EFE4]/55 text-sm leading-relaxed">
              Every Barn product starts here — pesticide-free vegetables, vine-ripe fruit,
              free-range eggs, and grass-fed meat raised on the Osotua rangelands.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Barn Catalogue Client */}
      <BarnClient initialProducts={products} categories={categories} />
    </div>
  )
}


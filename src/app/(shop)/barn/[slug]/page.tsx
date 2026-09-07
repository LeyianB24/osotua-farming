import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

const categoryIcons: Record<string, string> = {
  "Beef Cuts": "bi-shield-check",
  "Dairy Products": "bi-droplet-fill",
  "Vegetables": "bi-flower1",
  "Fruits": "bi-sun-fill",
  "Ranch Box": "bi-box-seam-fill",
  "Goat Meat": "bi-shield-check",
  "Sheep Meat": "bi-shield-check",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true, image: true },
  })
  if (!product) return { title: "Product not found — Osotua Farming" }
  return {
    title: `${product.name} — Osotua Barn Store`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Osotua Barn Store`,
      description: product.description.slice(0, 160),
      images: product.image ? [{ url: product.image }] : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) notFound()

  const iconClass = categoryIcons[product.category.name] || "bi-flower1"

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-[11px] text-[#8E7E70] tracking-wider uppercase mb-8 flex items-center gap-2">
          <Link href="/barn" className="hover:text-[#C99A2E] transition-colors font-bold">
            Barn Store
          </Link>
          <span>/</span>
          <span className="text-[#1C1208] font-semibold">{product.name}</span>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-sm">
          {/* Media */}
          {product.image ? (
            <div className="relative h-80 lg:h-[26rem] bg-[#1C1208] border border-[#D4C9B0] rounded-[2px] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase px-2.5 py-1 bg-[#6B7A3F] text-white rounded-[2px]">
                  {product.category.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-80 lg:h-[26rem] bg-[#1C1208] border border-[#D4C9B0] rounded-[2px] flex items-center justify-center text-[#C99A2E]">
              <i className={`bi ${iconClass} text-7xl`} />
            </div>
          )}

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-3">
                <span>{product.category.name}</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl font-bold text-[#1C1208] mb-4"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {product.name}
              </h1>

              <p className="text-[#5C4A2A] leading-relaxed mb-8 text-base font-normal">
                {product.description}
              </p>
            </div>

            <div>
              <div className="border-t border-[#D4C9B0] pt-6 mb-6">
                <div className="font-mono text-[9px] text-[#8E7E70] font-bold tracking-widest uppercase mb-1">
                  Price
                </div>
                <div
                  className="text-4xl text-[#C4602A] font-bold"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  KES {product.price.toLocaleString()}
                  <span className="text-[#8E7E70] font-normal text-base ml-1 font-mono">/{product.unit}</span>
                </div>
              </div>

              {product.inStock ? (
                <Link
                  href={`/checkout?product=${product.id}`}
                  className="btn-cart w-full justify-center"
                >
                  <i className="bi bi-cart-plus" />
                  <span>Order Now &bull; Cold-Chain Dispatched</span>
                </Link>
              ) : (
                <div className="bg-[#FAF7F2] border border-[#D4C9B0] text-[#8E7E70] px-6 py-3.5 text-center rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider">
                  Currently Out of Stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

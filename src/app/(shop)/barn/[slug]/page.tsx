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
    <>
      <div className="bg-[#FBF7F0] pt-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="font-mono text-[10px] text-[#1C1208]/40 tracking-wide mb-8 flex items-center gap-2">
            <Link href="/barn" className="hover:text-[#C4882A] transition-colors">Barn Store</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {product.image ? (
              <div className="relative h-72 overflow-hidden rounded-2xl border border-[#1C1208]/08 bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-white border border-[#1C1208]/08 rounded-2xl h-72 flex items-center justify-center text-[#C4882A]">
                <i className={`bi ${iconClass} text-7xl`} />
              </div>
            )}

            <div>
              <span className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase">{product.category.name}</span>
              <h1 className="font-serif text-4xl font-light text-[#1C1208] mt-2 mb-4">{product.name}</h1>
              <p className="text-[#1C1208]/60 leading-relaxed mb-8 text-sm">{product.description}</p>

              <div className="border-t border-[#1C1208]/10 pt-6 mb-6">
                <div className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase mb-1">Price</div>
                <div className="font-serif text-3xl text-[#C4882A] font-semibold">
                  KES {product.price.toLocaleString()}
                  <span className="text-[#1C1208]/40 font-normal text-base ml-1">/{product.unit}</span>
                </div>
              </div>

              {product.inStock ? (
                <Link
                  href={`/checkout?product=${product.id}`}
                  className="btn-primary w-full justify-center py-3.5 text-xs text-center"
                >
                  <i className="bi bi-cart-plus" />
                  <span>Order Now</span>
                </Link>
              ) : (
                <div className="bg-[#1C1208]/05 border border-[#1C1208]/10 text-[#1C1208]/40 px-6 py-3 text-sm text-center rounded-xl font-mono text-xs">
                  Currently Out of Stock
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

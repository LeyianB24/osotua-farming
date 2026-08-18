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
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="font-mono text-[11px] text-[#786550] tracking-wide mb-8 flex items-center gap-2">
          <Link href="/barn" className="hover:text-[#C4882A] transition-colors font-bold">Barn Store</Link>
          <span>/</span>
          <span className="text-[#1C1208]">{product.name}</span>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "28px",
            boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
          }}
          className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {product.image ? (
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(196, 136, 42, 0.2)",
                boxShadow: "0 10px 30px rgba(196, 136, 42, 0.08)",
              }}
              className="relative h-80 lg:h-[26rem] bg-[#FAF8F5]"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              style={{
                borderRadius: "20px",
                background: "linear-gradient(135deg, #FAF5EB 0%, #F5EFE4 100%)",
                border: "1px solid rgba(196, 136, 42, 0.2)",
              }}
              className="h-80 lg:h-[26rem] flex items-center justify-center text-[#C4882A]"
            >
              <i className={`bi ${iconClass} text-7xl`} />
            </div>
          )}

          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#8E5E16] font-bold tracking-widest uppercase">{product.category.name}</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1208] mt-2 mb-4">{product.name}</h1>
              <p className="text-[#5C4835] leading-relaxed mb-8 text-sm">{product.description}</p>
            </div>

            <div>
              <div className="border-t border-[#C4882A]/20 pt-6 mb-6">
                <div className="font-mono text-[9px] text-[#786550] font-bold tracking-widest uppercase mb-1">Price</div>
                <div className="font-serif text-4xl text-[#C4882A] font-bold">
                  KES {product.price.toLocaleString()}
                  <span className="text-[#786550] font-normal text-base ml-1">/{product.unit}</span>
                </div>
              </div>

              {product.inStock ? (
                <Link
                  href={`/checkout?product=${product.id}`}
                  className="btn-primary w-full justify-center py-3.5 text-sm text-center shadow-sm"
                >
                  <i className="bi bi-cart-plus" />
                  <span>Order Now</span>
                </Link>
              ) : (
                <div className="bg-[#FAF6EE] border border-[#C4882A]/25 text-[#786550] px-6 py-3.5 text-center rounded-xl font-mono text-xs font-bold">
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

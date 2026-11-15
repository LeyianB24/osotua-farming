import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { imageForCategory } from "@/lib/images"
import ProductDetailClient from "@/components/farm/ProductDetailClient"

const categoryIcons: Record<string, string> = {
  "Beef Cuts": "bi-shield-check",
  "Dairy Products": "bi-droplet-fill",
  "Vegetables": "bi-flower1",
  "Fruits": "bi-sun-fill",
  "Ranch Box": "bi-box-seam-fill",
  "Goat Meat": "bi-shield-check",
  "Sheep Meat": "bi-shield-check",
  "Poultry & Eggs": "bi-egg-fill",
  "Honey & Apiary": "bi-flower2",
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
  const imageSrc = product.image ?? imageForCategory(product.category.name)

  return (
    <ProductDetailClient
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        unit: product.unit,
        image: product.image,
        description: product.description,
        inStock: product.inStock,
        category: {
          name: product.category.name,
        },
      }}
      imageSrc={imageSrc}
      iconClass={iconClass}
    />
  )
}

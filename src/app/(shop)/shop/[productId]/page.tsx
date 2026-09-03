import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ShopProductDetailClient from "@/components/farm/ShopProductDetailClient"

interface Props {
  params: Promise<{ productId: string }>
}

export async function generateMetadata({ params }: Props) {
  const { productId } = await params
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: productId }, { slug: productId }],
    },
  })
  if (!product) return { title: "Product Not Found — Osotua Farming" }
  return {
    title: `${product.name} — Osotua Farming`,
    description: product.description,
  }
}

export default async function ShopProductDetailPage({ params }: Props) {
  const { productId } = await params
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: productId }, { slug: productId }],
    },
    include: { category: true },
  })

  if (!product) notFound()

  return <ShopProductDetailClient product={product} />
}

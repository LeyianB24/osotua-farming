import { prisma } from "@/lib/prisma"
import ShopClient, { ShopProduct } from "@/components/farm/ShopClient"

export const metadata = {
  title: "Shop Produce — Osotua Farming",
  description: "Browse seasonal vegetables, fruits, dairy, and grains directly from Kenyan smallholder farmer cooperatives.",
}

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  // Format products for shop client
  const shopProducts: ShopProduct[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    unit: p.unit,
    image: p.image,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
    },
    inStock: p.inStock,
    stockQty: p.stockQty,
  }))

  return <ShopClient initialProducts={shopProducts} />
}

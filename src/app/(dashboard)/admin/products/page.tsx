import { prisma } from "@/lib/prisma"
import AdminProductsClient from "./AdminProductsClient"

export const metadata = { title: "Product Catalogue — Osotua Admin" }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  })

  return <AdminProductsClient initialProducts={products} />
}

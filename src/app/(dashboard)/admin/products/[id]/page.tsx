import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AdminProductEditForm from "@/components/admin/AdminProductEditForm"

export const metadata = { title: "Edit Product — Osotua Admin" }

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.productCategory.findMany({ orderBy: { name: "asc" } }),
  ])

  if (!product) notFound()

  return <AdminProductEditForm product={product} categories={categories} />
}

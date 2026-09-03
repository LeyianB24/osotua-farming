import { prisma } from "@/lib/prisma"
import AdminProductCreateForm from "@/components/admin/AdminProductCreateForm"

export const metadata = { title: "Add Barn Product — Osotua Admin" }

export default async function NewProductPage() {
  const categories = await prisma.productCategory.findMany({
    orderBy: { name: "asc" },
  })

  return <AdminProductCreateForm categories={categories} />
}

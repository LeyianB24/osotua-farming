import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import SaleDetailClient, { SaleDetailData } from "./SaleDetailClient"

export const metadata = { title: "Sale Detail & Receipt — Osotua Admin" }

export default async function AdminSaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sale = await prisma.sale.findUnique({
    where: { id },
    include: { breed: true, product: true },
  })

  if (!sale) notFound()

  const formatted: SaleDetailData = {
    id: sale.id,
    reference: sale.reference,
    customerName: sale.customerName,
    customerPhone: sale.customerPhone,
    quantity: sale.quantity,
    unitPrice: sale.unitPrice,
    totalAmount: sale.totalAmount,
    channel: sale.channel,
    status: sale.status as SaleDetailData["status"],
    paidAt: sale.paidAt.toISOString(),
    note: sale.note,
    breed: sale.breed ? { id: sale.breed.id, name: sale.breed.name } : null,
    product: sale.product ? { id: sale.product.id, name: sale.product.name, unit: sale.product.unit } : null,
  }

  return <SaleDetailClient sale={formatted} />
}

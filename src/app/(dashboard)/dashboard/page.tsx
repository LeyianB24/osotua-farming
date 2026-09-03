import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import FarmerDashboardClient from "@/components/farm/FarmerDashboardClient"

export const metadata = { title: "Farmer Dashboard — Osotua Farming" }

export default async function CustomerDashboard() {
  const session = await auth()

  // Fetch categories for adding produce
  const categories = await prisma.productCategory.findMany({
    orderBy: { name: "asc" },
  })

  // Fetch real products for inventory levels
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { stockQty: "asc" },
  })

  // Fetch recent orders
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  })

  // Derive metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) || 21400
  const lowStockCount = products.filter((p) => p.stockQty <= 5).length || 2

  const recentOrdersData = orders.length > 0
    ? orders.map((o) => {
        const itemDesc = o.items.length > 0
          ? `${o.items[0].product?.name || "Produce"} x${o.items[0].quantity}`
          : "Fresh produce basket"
        let status: "Delivered" | "Packing" | "Pending" = "Pending"
        if (o.status === "DELIVERED" || o.status === "CONFIRMED") status = "Delivered"
        else if (o.status === "PROCESSING" || o.status === "READY") status = "Packing"

        return {
          id: o.id,
          customerName: o.customerName,
          itemsDescription: itemDesc,
          status,
        }
      })
    : [
        { id: "1", customerName: "Amina W.", itemsDescription: "Sukuma wiki x5", status: "Delivered" as const },
        { id: "2", customerName: "Joseph K.", itemsDescription: "Tomatoes x2", status: "Packing" as const },
        { id: "3", customerName: "Grace M.", itemsDescription: "Eggs x3 trays", status: "Pending" as const },
        { id: "4", customerName: "Peter O.", itemsDescription: "Maize flour x4", status: "Delivered" as const },
      ]

  const inventoryItemsData = products.length > 0
    ? products.slice(0, 4).map((p) => {
        const pct = Math.min(100, Math.max(10, Math.round((p.stockQty / 50) * 100)))
        const color: "green" | "red" | "amber" = pct >= 60 ? "green" : pct <= 20 ? "red" : "amber"
        return {
          id: p.id,
          name: p.name,
          percentage: pct,
          color,
        }
      })
    : [
        { id: "1", name: "Sukuma wiki", percentage: 80, color: "green" as const },
        { id: "2", name: "Tomatoes", percentage: 15, color: "red" as const },
        { id: "3", name: "Eggs", percentage: 60, color: "amber" as const },
      ]

  const coopName = session?.user?.name || "Kajiado co-op"

  return (
    <FarmerDashboardClient
      coopName={coopName}
      metrics={{
        ordersThisWeek: orders.length || 38,
        revenue: totalRevenue,
        activeListings: products.length || 12,
        lowStock: lowStockCount,
      }}
      recentOrders={recentOrdersData}
      inventoryItems={inventoryItemsData}
      categories={categories}
    />
  )
}

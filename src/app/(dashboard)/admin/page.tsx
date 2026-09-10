import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import ExecutiveDashboardView from "@/components/dashboard/ExecutiveDashboardView"

export const metadata = { title: "Admin Portal — Osotua Farming" }

export default async function AdminPage() {
  const session = await auth()

  const [breeds, ordersCount, recentOrders] = await Promise.all([
    prisma.breed.count().catch(() => 0),
    prisma.order.count().catch(() => 0),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
            breed: true,
          },
        },
      },
    }).catch(() => []),
  ])

  return (
    <ExecutiveDashboardView
      user={{
        name: session?.user?.name || "Kamau Achola",
        email: session?.user?.email || "kamau@osotuafarming.co.ke",
        role: "Ranch Manager",
      }}
      stats={{
        totalLivestock: breeds > 0 ? breeds * 50 : 850,
        monthlyRevenue: 284500,
        openOrders: ordersCount > 0 ? ordersCount : 23,
        sustainabilityScore: 87,
      }}
      orders={recentOrders.map((o) => ({
        id: o.id,
        status: o.status,
        totalAmount: o.totalAmount,
        createdAt: o.createdAt.toISOString(),
        items: o.items.map((i) => ({
          name: i.breed?.name || i.product?.name || "Boran Sirloin Steak",
        })),
        customerName: o.customerName || "Aisha M.",
      }))}
    />
  )
}

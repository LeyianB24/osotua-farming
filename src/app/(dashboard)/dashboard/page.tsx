import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ExecutiveDashboardView from "@/components/dashboard/ExecutiveDashboardView"

export const metadata = { title: "Member Command Center — Osotua Farming" }

export default async function MemberDashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard")
  }

  const userId = session.user.id

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
          breed: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  }).catch(() => [])

  const rawRole = (session.user as { role?: string })?.role
  const displayRole =
    rawRole === "ADMIN"
      ? "Estate Administrator"
      : rawRole === "PARTNER_FARMER"
      ? "Partner Farmer"
      : rawRole === "INVESTOR"
      ? "Ranch Investor"
      : "Ranch Patron"

  return (
    <ExecutiveDashboardView
      user={{
        name: session.user.name || "Estate Patron",
        email: session.user.email || "patron@osotuafarming.co.ke",
        role: displayRole,
      }}
      orders={orders.map((o) => ({
        id: o.id,
        status: o.status,
        totalAmount: o.totalAmount,
        createdAt: o.createdAt.toISOString(),
        items: o.items.map((i) => ({
          name: i.breed?.name || i.product?.name || "Boran Sirloin Steak",
        })),
        customerName: session.user?.name || "Estate Patron",
      }))}
    />
  )
}

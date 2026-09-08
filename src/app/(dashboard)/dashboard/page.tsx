import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import FarmerDashboardClient from "@/components/farm/FarmerDashboardClient"

export const metadata = { title: "Member Command Center — Osotua Farming" }

export default async function MemberDashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard")
  }

  const userId = session.user.id
  const userEmail = session.user.email || ""

  const [orders, subscriptions, visits, partnerProfile, categories] = await Promise.all([
    prisma.order.findMany({
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
    }),
    prisma.subscription.findMany({
      where: { userId },
      include: {
        product: {
          include: { category: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    userEmail
      ? prisma.farmVisit.findMany({
          where: { email: userEmail },
          orderBy: { visitDate: "asc" },
          take: 4,
        })
      : Promise.resolve([]),
    userEmail
      ? prisma.partnerFarmer.findFirst({
          where: { email: userEmail },
        })
      : Promise.resolve(null),
    prisma.productCategory.findMany({
      orderBy: { name: "asc" },
    }),
  ])

  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

  return (
    <FarmerDashboardClient
      user={{
        id: session.user.id,
        name: session.user.name || "Valued Patron",
        email: session.user.email || "",
        role: (session.user as { role?: string })?.role || "CUSTOMER",
      }}
      orders={orders.map((o) => ({
        id: o.id,
        status: o.status,
        totalAmount: o.totalAmount,
        createdAt: o.createdAt.toISOString(),
        deliveryAddress: o.deliveryAddress,
        paymentMethod: o.paymentMethod,
        items: o.items.map((i) => ({
          id: i.id,
          name: i.breed?.name || i.product?.name || "Farm Item",
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          image: i.breed?.image || i.product?.image || null,
        })),
      }))}
      subscriptions={subscriptions.map((s) => ({
        id: s.id,
        productName: s.product.name,
        categoryName: s.product.category.name,
        frequency: s.frequency,
        status: s.status,
        nextDelivery: s.nextDelivery ? s.nextDelivery.toISOString() : null,
      }))}
      visits={visits.map((v) => ({
        id: v.id,
        visitDate: v.visitDate.toISOString(),
        groupSize: v.groupSize,
        purpose: v.purpose,
        status: v.status,
      }))}
      partnerProfile={
        partnerProfile
          ? {
              fullName: partnerProfile.fullName,
              location: partnerProfile.location,
              supplyType: partnerProfile.supplyType,
              status: partnerProfile.status,
            }
          : null
      }
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      totalSpent={totalSpent}
    />
  )
}

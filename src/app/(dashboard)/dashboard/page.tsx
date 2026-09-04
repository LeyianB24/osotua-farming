import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import FarmerDashboardClient from "@/components/farm/FarmerDashboardClient"

export const metadata = { title: "Partner Portal — Osotua Farming" }

export default async function CustomerDashboard() {
  const session = await auth()

  // Fetch categories for adding produce
  const categories = await prisma.productCategory.findMany({
    orderBy: { name: "asc" },
  })

  // Derive dynamic user display name
  const rawName = session?.user?.name || "Amina"
  const firstName = rawName.split(" ")[0]

  return (
    <FarmerDashboardClient
      coopName={session?.user?.name || "Kajiado Co-op"}
      userName={firstName}
      metrics={{
        portfolioValue: 480000,
        headCount: 14,
        yieldYtd: "+8.2%",
        nextPayout: "Sep 18",
      }}
      categories={categories}
    />
  )
}

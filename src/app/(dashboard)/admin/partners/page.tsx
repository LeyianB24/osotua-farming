import { prisma } from "@/lib/prisma"
import AdminPartnersClient from "./AdminPartnersClient"

export const metadata = { title: "Partner Farmers — Osotua Admin" }

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerFarmer.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formatted = partners.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }))

  return <AdminPartnersClient initialPartners={formatted} />
}

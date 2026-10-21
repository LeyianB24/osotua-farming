import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import AdminPartnersClient, { PartnerFarmerItem } from "./AdminPartnersClient"

export const metadata = { title: "Partners — Admin · Osotua Farming" }

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerFarmer.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  const initialPartners: PartnerFarmerItem[] = partners.map((p) => ({
    id: p.id,
    fullName: p.fullName,
    email: p.email,
    phone: p.phone,
    location: p.location,
    supplyType: p.supplyType,
    status: p.status as PartnerFarmerItem["status"],
    createdAt: p.createdAt.toISOString(),
  }))

  const pendingCount = partners.filter((p) => p.status === "PENDING").length

  return (
    <div>
      <PageHeader
        eyebrow="Outgrower Network"
        title="Partner Farmers"
        sub={`${partners.length} pastoral partner records · ${pendingCount} pending review`}
      />
      <div className="p-6 sm:p-8">
        <AdminPartnersClient initialPartners={initialPartners} />
      </div>
    </div>
  )
}

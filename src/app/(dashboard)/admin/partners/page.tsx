import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Partners — Admin · Osotua Farming" }

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerFarmer.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Outgrower Network"
        title="Partner Farmers"
        sub={`${partners.length} pastoral partner applications`}
      />
      <div className="p-6 sm:p-8">
        <DataTable
          columns={[
            { key: "name",   label: "Name" },
            { key: "email",  label: "Email" },
            { key: "phone",  label: "Phone",       width: "140px" },
            { key: "loc",    label: "Location",    width: "140px" },
            { key: "supply", label: "Supply Type" },
            { key: "status", label: "Status",      width: "120px" },
            { key: "date",   label: "Applied",     width: "120px" },
          ]}
          rows={partners.map(p => ({
            name:   <span className="font-bold text-[#1A1208]">{p.fullName}</span>,
            email:  <span className="text-xs text-[#7A6C5B]">{p.email}</span>,
            phone:  <span className="text-xs font-mono text-[#7A6C5B]">{p.phone}</span>,
            loc:    <span className="text-xs text-[#7A6C5B]">{p.location}</span>,
            supply: <span className="text-xs text-[#1A1208] font-medium">{p.supplyType}</span>,
            status: <Badge label={p.status} />,
            date:   <span className="text-xs font-mono text-[#7A6C5B]">{new Date(p.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No partner applications registered yet."
        />
      </div>
    </div>
  )
}

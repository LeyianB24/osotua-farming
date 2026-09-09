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
        sub={`${partners.length} applications`}
      />
      <div className="p-4 sm:p-8">
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
            name:   <span className="font-medium" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{p.fullName}</span>,
            email:  <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{p.email}</span>,
            phone:  <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>{p.phone}</span>,
            loc:    <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{p.location}</span>,
            supply: <span className="text-xs" style={{ color: "#F5EFE4" }}>{p.supplyType}</span>,
            status: <Badge label={p.status} />,
            date:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>{new Date(p.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No partner applications yet."
        />
      </div>
    </div>
  )
}

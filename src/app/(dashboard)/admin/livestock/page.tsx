import { prisma } from "@/lib/prisma"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Livestock — Admin · Osotua Farming" }

export default async function AdminLivestockPage() {
  const livestock = await prisma.livestock.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Herd Management"
        title="Livestock Registry"
        sub={`${livestock.length} animals registered`}
        action={
          <Link
            href="/admin/livestock/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-95"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-plus-lg text-sm" /> Add Animal
          </Link>
        }
      />
      <div className="p-4 sm:p-8">
        <DataTable
          columns={[
            { key: "tag",     label: "Tag #",      width: "130px" },
            { key: "breed",   label: "Breed" },
            { key: "species", label: "Species",    width: "110px" },
            { key: "gender",  label: "Gender",     width: "100px" },
            { key: "weight",  label: "Weight",     width: "100px" },
            { key: "status",  label: "Status",     width: "140px" },
            { key: "dob",     label: "Birth Date", width: "130px" },
          ]}
          rows={livestock.map(a => ({
            tag:     <span className="font-mono text-xs" style={{ color: "#C4882A" }}>{a.tagNumber}</span>,
            breed:   <span className="font-medium" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{a.breed.name}</span>,
            species: <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{a.breed.species.name}</span>,
            gender:  <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{a.gender}</span>,
            weight:  <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>{a.weight ? `${a.weight}kg` : "—"}</span>,
            status:  <Badge label={a.status} />,
            dob:     <span className="text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>{a.birthDate ? new Date(a.birthDate).toLocaleDateString() : "—"}</span>,
          }))}
          empty="No livestock records yet."
        />
      </div>
    </div>
  )
}

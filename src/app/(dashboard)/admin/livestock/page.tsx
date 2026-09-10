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
        sub={`${livestock.length} animals registered in pedigree database`}
        action={
          <Link
            href="/admin/livestock/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
          >
            <i className="bi bi-plus-lg text-xs" /> Add Animal
          </Link>
        }
      />
      <div className="p-6 sm:p-8">
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
            tag:     <span className="font-mono text-xs font-bold text-[#7A6C5B]">{a.tagNumber}</span>,
            breed:   <span className="font-bold text-[#1A1208]">{a.breed.name}</span>,
            species: <span className="text-xs text-[#7A6C5B]">{a.breed.species.name}</span>,
            gender:  <span className="text-xs text-[#7A6C5B]">{a.gender}</span>,
            weight:  <span className="text-xs font-mono text-[#1A1208] font-bold">{a.weight ? `${a.weight} kg` : "—"}</span>,
            status:  <Badge label={a.status} />,
            dob:     <span className="text-xs font-mono text-[#7A6C5B]">{a.birthDate ? new Date(a.birthDate).toLocaleDateString() : "—"}</span>,
          }))}
          empty="No livestock records registered yet. Click 'Add Animal' to create one."
        />
      </div>
    </div>
  )
}

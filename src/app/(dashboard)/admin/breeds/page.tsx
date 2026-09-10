import { prisma } from "@/lib/prisma"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Breeds — Admin · Osotua Farming" }

export default async function AdminBreedsPage() {
  const breeds = await prisma.breed.findMany({
    include: { species: true },
    orderBy: { name: "asc" },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Livestock Genetics"
        title="Breeds Catalogue"
        sub={`${breeds.length} indigenous & purebred breeds registered`}
        action={
          <Link
            href="/admin/breeds/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
          >
            <i className="bi bi-plus-lg text-xs" />
            Add Breed
          </Link>
        }
      />

      <div className="p-6 sm:p-8">
        <DataTable
          columns={[
            { key: "name",    label: "Breed Name" },
            { key: "species", label: "Species",    width: "120px" },
            { key: "purpose", label: "Purpose",    width: "140px" },
            { key: "price",   label: "Price/Head", width: "140px" },
            { key: "stock",   label: "In Stock",   width: "100px" },
            { key: "status",  label: "Featured",   width: "100px" },
            { key: "action",  label: "Action",     width: "80px" },
          ]}
          rows={breeds.map(b => ({
            name:    <Link href={`/admin/breeds/${b.id}`} className="font-bold text-[#1A1208] hover:text-[#C4882A] transition-colors">{b.name}</Link>,
            species: <span className="text-xs text-[#7A6C5B]">{b.species?.name ?? "—"}</span>,
            purpose: <span className="text-xs text-[#7A6C5B]">{b.purpose}</span>,
            price:   <span className="font-bold text-[#BA5932] font-mono text-xs">KES {b.pricePerHead.toLocaleString()}</span>,
            stock:   <span className="font-mono text-xs text-[#1A1208] font-bold">{b.inStock}</span>,
            status:  <Badge label={b.featured ? "Featured" : "Standard"} variant={b.featured ? "gold" : "muted"} />,
            action:  <Link href={`/admin/breeds/${b.id}`} className="text-xs text-[#C4882A] hover:underline font-mono font-bold">Edit</Link>,
          }))}
          empty="No breeds registered yet. Add your first breed to get started."
        />
      </div>
    </div>
  )
}

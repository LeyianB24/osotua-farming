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
        eyebrow="Livestock Management"
        title="Breeds Catalogue"
        sub={`${breeds.length} breeds registered`}
        action={
          <Link
            href="/admin/breeds/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-95"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-plus-lg text-sm" />
            Add Breed
          </Link>
        }
      />

      <div className="p-4 sm:p-8">
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
            name:    <Link href={`/admin/breeds/${b.id}`} className="font-medium hover:text-[#C4882A] transition-colors" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{b.name}</Link>,
            species: <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{b.species?.name ?? "—"}</span>,
            purpose: <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{b.purpose}</span>,
            price:   <span style={{ color: "#C4882A", fontFamily: "monospace", fontSize: "0.8rem" }}>KES {b.pricePerHead.toLocaleString()}</span>,
            stock:   <span style={{ color: "#F5EFE4" }}>{b.inStock}</span>,
            status:  <Badge label={b.featured ? "Featured" : "Standard"} variant={b.featured ? "gold" : "muted"} />,
            action:  <Link href={`/admin/breeds/${b.id}`} className="text-xs text-[#C4882A] hover:underline font-mono">Edit</Link>,
          }))}
          empty="No breeds registered yet. Add your first breed to get started."
        />
      </div>
    </div>
  )
}

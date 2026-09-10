import { prisma } from "@/lib/prisma"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "The Barn Products — Admin · Osotua Farming" }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="The Barn Store"
        title="Farm Barn Products"
        sub={`${products.length} products available for estate patrons`}
        action={
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
          >
            <i className="bi bi-plus-lg text-xs" /> Add Product
          </Link>
        }
      />
      <div className="p-6 sm:p-8">
        <DataTable
          columns={[
            { key: "name",     label: "Product" },
            { key: "category", label: "Category",  width: "140px" },
            { key: "price",    label: "Price",      width: "130px" },
            { key: "unit",     label: "Unit",       width: "90px" },
            { key: "stock",    label: "Stock Qty",  width: "100px" },
            { key: "instock",  label: "Available",  width: "110px" },
            { key: "featured", label: "Featured",   width: "100px" },
            { key: "action",   label: "Action",     width: "80px" },
          ]}
          rows={products.map(p => ({
            name:     <Link href={`/admin/products/${p.id}`} className="font-bold text-[#1A1208] hover:text-[#C4882A] transition-colors">{p.name}</Link>,
            category: <span className="text-xs text-[#7A6C5B]">{p.category?.name ?? "—"}</span>,
            price:    <span className="font-bold text-[#BA5932] font-mono text-xs">KES {p.price.toLocaleString()}</span>,
            unit:     <span className="text-xs font-mono text-[#7A6C5B]">{p.unit}</span>,
            stock:    <span className="font-mono text-xs text-[#1A1208] font-bold">{p.stockQty}</span>,
            instock:  <Badge label={p.inStock ? "In Stock" : "Out of Stock"} variant={p.inStock ? "green" : "rust"} />,
            featured: <Badge label={p.featured ? "Yes" : "No"} variant={p.featured ? "gold" : "muted"} />,
            action:   <Link href={`/admin/products/${p.id}`} className="text-xs text-[#C4882A] hover:underline font-mono font-bold">Edit</Link>,
          }))}
          empty="No products registered yet. Click 'Add Product' to list farm goods."
        />
      </div>
    </div>
  )
}

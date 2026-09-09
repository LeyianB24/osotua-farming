import { prisma } from "@/lib/prisma"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Products — Admin · Osotua Farming" }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Barn Store"
        title="Products"
        sub={`${products.length} products`}
        action={
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-95"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-plus-lg text-sm" /> Add Product
          </Link>
        }
      />
      <div className="p-4 sm:p-8">
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
            name:     <Link href={`/admin/products/${p.id}`} className="font-medium hover:text-[#C4882A] transition-colors" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{p.name}</Link>,
            category: <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{p.category?.name ?? "—"}</span>,
            price:    <span style={{ color: "#C4882A", fontFamily: "monospace", fontSize: "0.8rem" }}>KES {p.price.toLocaleString()}</span>,
            unit:     <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>{p.unit}</span>,
            stock:    <span style={{ color: "#F5EFE4" }}>{p.stockQty}</span>,
            instock:  <Badge label={p.inStock ? "In Stock" : "Out"} variant={p.inStock ? "green" : "rust"} />,
            featured: <Badge label={p.featured ? "Yes" : "No"} variant={p.featured ? "gold" : "muted"} />,
            action:   <Link href={`/admin/products/${p.id}`} className="text-xs text-[#C4882A] hover:underline font-mono">Edit</Link>,
          }))}
          empty="No products yet."
        />
      </div>
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Products — Osotua Admin" }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  })

  return (
    <AdminSection
      eyebrow="Farm Store"
      title="Product Catalogue"
      count={products.length}
      countLabel="products listed"
      icon="bi-droplet-fill"
      action={
        <Link
          href="/admin/products/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Add Product
        </Link>
      }
    >

      <AdminTable
        headers={["Name", "Category", "Price (KES)", "Unit", "Qty", "In Stock", "Featured"]}
        empty={products.length === 0}
        emptyIcon="bi-basket"
        emptyText="No products listed yet."
      >
        {products.map((p, i) => (
          <AdminRow key={p.id} index={i}>
            <TD>{p.name}</TD>
            <TD muted>{p.category.name}</TD>
            <TD mono accent>KES {p.price.toLocaleString()}</TD>
            <TD muted>{p.unit}</TD>
            <TD mono>{p.stockQty}</TD>
            <TD><StatusBadge status={p.inStock ? "ACTIVE" : "CANCELLED"} /></TD>
            <TD><StatusBadge status={p.featured ? "CONFIRMED" : "PENDING"} /></TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}

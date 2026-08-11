import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Add Stock — Admin" }

export default async function NewStockPage() {
  const [products, breeds] = await Promise.all([
    prisma.product.findMany({ select: { id: true, name: true } }),
    prisma.breed.findMany({ select: { id: true, name: true } }),
  ])

  return (
    <EntityForm
      title="Add Stock"
      action="/api/stocks"
      backHref="/admin/stocks"
      fields={[
        { kind: "text", name: "name", label: "Stock Name", placeholder: "e.g. Boran Bull Tag #BR-104", required: true },
        {
          kind: "select",
          name: "breedId",
          label: "Linked Breed (optional)",
          options: [{ value: "", label: "— None —" }, ...breeds.map((b) => ({ value: b.id, label: b.name }))],
        },
        {
          kind: "select",
          name: "productId",
          label: "Linked Product (optional)",
          options: [{ value: "", label: "— None —" }, ...products.map((p) => ({ value: p.id, label: p.name }))],
        },
        { kind: "text", name: "unit", label: "Unit", placeholder: "kg / litre / head", required: true },
        { kind: "number", name: "quantity", label: "Quantity", required: true, default: 0 },
        { kind: "number", name: "reorderAt", label: "Reorder At", default: 0 },
        { kind: "textarea", name: "note", label: "Note", placeholder: "Optional notes" },
      ]}
    />
  )
}

import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Log Import — Admin" }

export default async function NewImportPage() {
  const breeds = await prisma.breed.findMany({ select: { id: true, name: true } })

  return (
    <EntityForm
      title="Log Import"
      action="/api/imports"
      backHref="/admin/imports"
      fields={[
        { kind: "text", name: "reference", label: "Reference", placeholder: "IMP-2026-001", required: true },
        { kind: "text", name: "supplierName", label: "Supplier Name", required: true },
        {
          kind: "select",
          name: "breedId",
          label: "Breed (optional)",
          options: [{ value: "", label: "— None —" }, ...breeds.map((b) => ({ value: b.id, label: b.name }))],
        },
        { kind: "text", name: "productName", label: "Product Name (optional)" },
        { kind: "number", name: "quantity", label: "Quantity", required: true, default: 1 },
        { kind: "number", name: "unitPrice", label: "Unit Price (KES)", required: true, default: 0 },
        { kind: "number", name: "totalValue", label: "Total Value (KES)", required: true, default: 0 },
        {
          kind: "select",
          name: "status",
          label: "Status",
          default: "PENDING",
          options: [
            { value: "PENDING", label: "Pending" },
            { value: "IN_TRANSIT", label: "In Transit" },
            { value: "RECEIVED", label: "Received" },
            { value: "CANCELLED", label: "Cancelled" },
          ],
        },
        { kind: "date", name: "arrivedAt", label: "Arrived At" },
        { kind: "textarea", name: "notes", label: "Notes" },
      ]}
    />
  )
}

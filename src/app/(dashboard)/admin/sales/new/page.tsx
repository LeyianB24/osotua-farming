import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Record Sale — Admin" }

export default async function NewSalePage() {
  const [breeds, products] = await Promise.all([
    prisma.breed.findMany({ select: { id: true, name: true } }),
    prisma.product.findMany({ select: { id: true, name: true } }),
  ])

  return (
    <EntityForm
      title="Record Sale"
      action="/api/sales"
      backHref="/admin/sales"
      fields={[
        { kind: "text", name: "reference", label: "Reference", placeholder: "SAL-2026-001", required: true },
        { kind: "text", name: "customerName", label: "Customer Name", required: true },
        { kind: "text", name: "customerPhone", label: "Customer Phone" },
        {
          kind: "select",
          name: "breedId",
          label: "Breed (optional)",
          options: [{ value: "", label: "— None —" }, ...breeds.map((b) => ({ value: b.id, label: b.name }))],
        },
        {
          kind: "select",
          name: "productId",
          label: "Product (optional)",
          options: [{ value: "", label: "— None —" }, ...products.map((p) => ({ value: p.id, label: p.name }))],
        },
        { kind: "number", name: "quantity", label: "Quantity", required: true, default: 1 },
        { kind: "number", name: "unitPrice", label: "Unit Price (KES)", required: true, default: 0 },
        { kind: "number", name: "totalAmount", label: "Total Amount (KES)", required: true, default: 0 },
        {
          kind: "select",
          name: "channel",
          label: "Channel",
          default: "DIRECT",
          options: [
            { value: "DIRECT", label: "Direct" },
            { value: "ONLINE", label: "Online" },
            { value: "WHOLESALE", label: "Wholesale" },
            { value: "RESTAURANT", label: "Restaurant" },
            { value: "PARTNER", label: "Partner" },
          ],
        },
        {
          kind: "select",
          name: "status",
          label: "Status",
          default: "COMPLETED",
          options: [
            { value: "PENDING", label: "Pending" },
            { value: "COMPLETED", label: "Completed" },
            { value: "REFUNDED", label: "Refunded" },
            { value: "CANCELLED", label: "Cancelled" },
          ],
        },
        { kind: "date", name: "paidAt", label: "Paid At" },
        { kind: "textarea", name: "note", label: "Note" },
      ]}
    />
  )
}

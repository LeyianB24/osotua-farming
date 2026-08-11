import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Log New Catch — Admin" }

export default async function NewCatchPage() {
  const breeds = await prisma.breed.findMany({ select: { id: true, name: true, species: true } })

  return (
    <EntityForm
      title="Log New Catch"
      action="/api/catches"
      backHref="/admin/catches"
      fields={[
        { kind: "text", name: "name", label: "Catch Name", placeholder: "Dorper Lamb Harvest", required: true },
        {
          kind: "select",
          name: "breedId",
          label: "Breed (optional)",
          options: [{ value: "", label: "— None —" }, ...breeds.map((b) => ({ value: b.id, label: `${b.name} (${b.species.name})` }))],
        },
        { kind: "number", name: "quantity", label: "Quantity", required: true, default: 1 },
        { kind: "text", name: "unit", label: "Unit", default: "kg", required: true },
        { kind: "number", name: "price", label: "Price (KES)", required: true, default: 0 },
        {
          kind: "select",
          name: "status",
          label: "Status",
          default: "FRESH",
          options: [
            { value: "FRESH", label: "Fresh" },
            { value: "AGING", label: "Aging" },
            { value: "SOLD_OUT", label: "Sold Out" },
            { value: "RESERVED", label: "Reserved" },
          ],
        },
        { kind: "date", name: "caughtAt", label: "Caught At" },
        { kind: "textarea", name: "note", label: "Note" },
      ]}
    />
  )
}

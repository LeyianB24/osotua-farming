import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Add Breed — Admin" }

export default async function NewBreedPage() {
  const species = await prisma.species.findMany({ orderBy: { name: "asc" } })

  return (
    <EntityForm
      title="Add Breed"
      action="/api/breeds"
      backHref="/admin/breeds"
      fields={[
        { kind: "text", name: "name", label: "Breed Name", placeholder: "e.g. Boran", required: true },
        {
          kind: "select",
          name: "speciesId",
          label: "Species",
          required: true,
          options: species.map((s) => ({ value: s.id, label: s.name })),
        },
        { kind: "text", name: "purpose", label: "Purpose", placeholder: "Beef / Dairy / Dual", required: true, default: "Beef" },
        { kind: "textarea", name: "description", label: "Description", required: true, placeholder: "Breed characteristics, history, traits…" },
        { kind: "text", name: "origin", label: "Origin", required: true, default: "Kenya" },
        { kind: "text", name: "maleWeight", label: "Male Weight (range)" },
        { kind: "text", name: "femaleWeight", label: "Female Weight (range)" },
        { kind: "number", name: "pricePerHead", label: "Price Per Head (KES)", required: true, default: 0 },
        { kind: "number", name: "inStock", label: "In Stock", default: 0 },
        { kind: "checkbox", name: "featured", label: "Featured breed", default: false },
        { kind: "text", name: "image", label: "Image URL" },
      ]}
    />
  )
}

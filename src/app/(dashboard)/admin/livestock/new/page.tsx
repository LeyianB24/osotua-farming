import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Register Livestock — Admin" }

export default async function NewLivestockPage() {
  const breeds = await prisma.breed.findMany({ orderBy: { name: "asc" } })

  return (
    <EntityForm
      title="Register Individual Animal"
      action="/api/livestock"
      backHref="/admin/livestock"
      fields={[
        { kind: "text", name: "tagNumber", label: "Ear Tag / ID Number", placeholder: "e.g. OS-BOR-2026-089", required: true },
        {
          kind: "select",
          name: "breedId",
          label: "Breed",
          required: true,
          options: breeds.map((b) => ({ value: b.id, label: b.name })),
        },
        {
          kind: "select",
          name: "gender",
          label: "Gender",
          required: true,
          options: [
            { value: "MALE", label: "Male (Bull / Ram / Buck / Cock)" },
            { value: "FEMALE", label: "Female (Cow / Heifer / Ewe / Doe / Hen)" },
          ],
        },
        { kind: "date", name: "birthDate", label: "Birth Date" },
        { kind: "number", name: "weight", label: "Weight (kg)", placeholder: "e.g. 480" },
        {
          kind: "select",
          name: "status",
          label: "Status",
          required: true,
          default: "AVAILABLE",
          options: [
            { value: "AVAILABLE", label: "Available for Sale" },
            { value: "BREEDING_STOCK", label: "Active Breeding Stock" },
            { value: "RESERVED", label: "Reserved / Deposit Paid" },
            { value: "SOLD", label: "Sold" },
          ],
        },
        { kind: "textarea", name: "notes", label: "Pedigree Notes / Sire & Dam Info", placeholder: "Bloodline history, veterinary clearance, vaccination logs..." },
      ]}
    />
  )
}

import EntityForm from "@/components/admin/EntityForm"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Add Product — Admin" }

export default async function NewProductPage() {
  const categories = await prisma.productCategory.findMany({ orderBy: { name: "asc" } })

  return (
    <EntityForm
      title="Add Barn Product"
      action="/api/products"
      backHref="/admin/products"
      fields={[
        { kind: "text", name: "name", label: "Product Name", placeholder: "e.g. Boran Sirloin Steak", required: true },
        { kind: "text", name: "slug", label: "Product Slug (url identifier)", placeholder: "e.g. boran-sirloin-steak", required: true },
        {
          kind: "select",
          name: "categoryId",
          label: "Category",
          required: true,
          options: categories.map((c) => ({ value: c.id, label: c.name })),
        },
        { kind: "textarea", name: "description", label: "Description", required: true, placeholder: "Describe cut, origin, preservation notes..." },
        { kind: "number", name: "price", label: "Price (KES)", required: true, default: 0 },
        { kind: "text", name: "unit", label: "Unit of Measurement", placeholder: "kg / litre / 500g pack", required: true, default: "kg" },
        { kind: "number", name: "stockQty", label: "Available Stock Quantity", default: 10 },
        { kind: "checkbox", name: "inStock", label: "In Stock (Visible in Barn)", default: true },
        { kind: "checkbox", name: "featured", label: "Featured on Homepage", default: false },
        { kind: "text", name: "image", label: "Image URL / Path" },
      ]}
    />
  )
}

import EntityForm from "@/components/admin/EntityForm"

export const metadata = { title: "Create Menu — Admin" }

export default function NewMenuPage() {
  return (
    <EntityForm
      title="Create Barn Menu"
      action="/api/menus"
      backHref="/admin/menus"
      fields={[
        { kind: "text", name: "name", label: "Menu Name", placeholder: "Sunday Roast Box", required: true },
        { kind: "text", name: "slug", label: "Slug", placeholder: "sunday-roast-box", required: true },
        { kind: "textarea", name: "description", label: "Description", required: true },
        { kind: "number", name: "price", label: "Price (KES)", required: true, default: 0 },
        { kind: "number", name: "servings", label: "Servings", default: 1 },
        { kind: "date", name: "weekOf", label: "Week Of" },
        { kind: "checkbox", name: "available", label: "Available now", default: true },
      ]}
    />
  )
}

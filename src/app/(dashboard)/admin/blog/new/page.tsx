import EntityForm from "@/components/admin/EntityForm"

export const metadata = { title: "New Article — Admin" }

export default async function NewBlogPostPage() {
  return (
    <EntityForm
      title="Create New Editorial / Story"
      action="/api/blog"
      backHref="/admin/blog"
      fields={[
        { kind: "text", name: "title", label: "Article Title", placeholder: "e.g. Pasture Conservation in Arid Kajiado", required: true },
        { kind: "text", name: "slug", label: "Article Slug (URL)", placeholder: "e.g. pasture-conservation-in-arid-kajiado", required: true },
        { kind: "text", name: "category", label: "Category", placeholder: "e.g. Livestock, Ecology, Agronomy", required: true, default: "Livestock" },
        { kind: "textarea", name: "excerpt", label: "Summary Excerpt", required: true, placeholder: "Brief summary shown on the blog index..." },
        { kind: "textarea", name: "content", label: "Article Content (Markdown supported)", required: true, placeholder: "Full article text..." },
        { kind: "text", name: "coverImage", label: "Cover Image URL / Path" },
        { kind: "checkbox", name: "published", label: "Publish Immediately", default: false },
      ]}
    />
  )
}

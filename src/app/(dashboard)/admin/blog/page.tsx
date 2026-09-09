import { prisma } from "@/lib/prisma"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Blog — Admin · Osotua Farming" }

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Blog Posts"
        sub={`${posts.length} posts · ${posts.filter(p => p.published).length} published`}
        action={
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-95"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-plus-lg text-sm" /> New Post
          </Link>
        }
      />
      <div className="p-4 sm:p-8">
        <DataTable
          columns={[
            { key: "title",     label: "Title" },
            { key: "category",  label: "Category",  width: "140px" },
            { key: "status",    label: "Status",    width: "120px" },
            { key: "published", label: "Published", width: "140px" },
            { key: "created",   label: "Created",   width: "130px" },
          ]}
          rows={posts.map(p => ({
            title:     <span className="font-medium" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{p.title}</span>,
            category:  <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{p.category}</span>,
            status:    <Badge label={p.published ? "Published" : "Draft"} variant={p.published ? "green" : "yellow"} />,
            published: <span className="text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "—"}</span>,
            created:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>{new Date(p.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No posts yet. Start writing to build your knowledge hub."
        />
      </div>
    </div>
  )
}

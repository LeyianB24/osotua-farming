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
        eyebrow="Ranch Publications & Knowledge Hub"
        title="Journal & Articles"
        sub={`${posts.length} posts · ${posts.filter(p => p.published).length} published`}
        action={
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
          >
            <i className="bi bi-plus-lg text-xs" /> New Post
          </Link>
        }
      />
      <div className="p-6 sm:p-8">
        <DataTable
          columns={[
            { key: "title",     label: "Title" },
            { key: "category",  label: "Category",  width: "140px" },
            { key: "status",    label: "Status",    width: "120px" },
            { key: "published", label: "Published", width: "140px" },
            { key: "created",   label: "Created",   width: "130px" },
          ]}
          rows={posts.map(p => ({
            title:     <span className="font-bold text-[#1A1208]">{p.title}</span>,
            category:  <span className="text-xs text-[#7A6C5B]">{p.category}</span>,
            status:    <Badge label={p.published ? "Published" : "Draft"} variant={p.published ? "green" : "yellow"} />,
            published: <span className="text-xs font-mono text-[#7A6C5B]">{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "—"}</span>,
            created:   <span className="text-xs font-mono text-[#7A6C5B]">{new Date(p.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No journal articles published yet."
        />
      </div>
    </div>
  )
}

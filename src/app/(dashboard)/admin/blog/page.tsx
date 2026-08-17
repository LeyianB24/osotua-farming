import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Blog — Osotua Admin" }

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } })
  const published = posts.filter((p) => p.published).length

  return (
    <AdminSection
      eyebrow="Content Management"
      title="Blog & Stories"
      count={published}
      countLabel={`published · ${posts.length - published} drafts`}
      icon="bi-newspaper"
      action={
        <Link
          href="/admin/blog/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-pencil-square" /> Write Article
        </Link>
      }
    >

      <AdminTable
        headers={["Title", "Category", "Status", "Published Date"]}
        empty={posts.length === 0}
        emptyIcon="bi-file-earmark-text"
        emptyText="No blog posts yet."
      >
        {posts.map((post, i) => (
          <AdminRow key={post.id} index={i}>
            <TD>{post.title}</TD>
            <TD muted>{post.category}</TD>
            <TD><StatusBadge status={post.published ? "ACTIVE" : "PENDING"} /></TD>
            <TD muted mono>
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-KE") : "—"}
            </TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}

import { prisma } from "@/lib/prisma"

export const metadata = { title: "Blog — Admin" }

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Blog Posts</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{posts.length} posts</p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Title", "Category", "Status", "Published Date"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{post.title}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{post.category}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${post.published ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#1C1208]/40 text-xs">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No posts yet.</div>
        )}
      </div>
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Blog — Osotua Farming" }

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Knowledge Hub
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            From the <em className="text-[#C4882A]">ranch</em>
          </h1>
          <p className="text-[#F5EFE4]/50 max-w-xl">
            Farming guides, breed profiles, seasonal updates, and stories from Osotua Farming.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white border border-[#1C1208]/08 rounded overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-40 bg-gradient-to-br from-[#3D6B3E] to-[#2a4a2b] flex items-center justify-center text-4xl">
                  🌿
                </div>
                <div className="p-5">
                  <span className="font-mono text-[9px] text-[#C4882A] tracking-widest uppercase">{post.category}</span>
                  <h2 className="font-serif text-lg text-[#1C1208] mt-1 mb-2 group-hover:text-[#C4882A] transition-colors">{post.title}</h2>
                  <p className="text-[#1C1208]/55 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-3 font-mono text-[9px] text-[#1C1208]/30">
                    {post.publishedAt ? new Date(post.publishedAt).toDateString() : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[#1C1208]/40">
            <div className="text-5xl mb-4">📝</div>
            <p className="font-serif text-xl">Stories coming soon.</p>
            <p className="text-sm mt-2">We&apos;re writing up our first farm updates. Check back shortly.</p>
          </div>
        )}
      </div>
    </div>
  )
}

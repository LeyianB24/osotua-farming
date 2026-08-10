import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight, BookOpen, Calendar } from "lucide-react"

export const metadata = {
  title: "Blog — Osotua Farming",
  description: "Farming guides, breed profiles, seasonal updates and stories from Osotua Farming, Kajiado.",
}

const CATEGORY_COLORS: Record<string, string> = {
  "Livestock": "bg-[#C4882A]/10 text-[#C4882A] border-[#C4882A]/25",
  "Farming": "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/25",
  "News": "bg-blue-50 text-blue-700 border-blue-200",
  "Investment": "bg-purple-50 text-purple-700 border-purple-200",
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  const BLOG_EMOJIS = ["🐂", "🌿", "🌾", "🐐", "🐑", "🌱", "🏡", "🔬"]

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Hero */}
      <div className="relative bg-[#0E0A04] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(#C4882A 1px, transparent 1px), linear-gradient(90deg, #C4882A 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
          <div className="absolute -bottom-20 right-0 w-96 h-96 bg-[#3D6B3E]/08 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-[0.25em] uppercase flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C4882A]" />
            Knowledge Hub
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            From the <em className="text-[#C4882A]">ranch</em>
          </h1>
          <p className="text-[#F5EFE4]/45 max-w-xl leading-relaxed">
            Farming guides, breed profiles, seasonal updates, and stories from Kajiado&apos;s most innovative agribusiness.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const categoryClass = CATEGORY_COLORS[post.category ?? ""] || "bg-[#1C1208]/06 text-[#1C1208]/50 border-[#1C1208]/10"
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-[#1C1208]/06 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Cover */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#1C1208] via-[#2e1e0e] to-[#3D6B3E]">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-25 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-110 transform">
                      {BLOG_EMOJIS[i % BLOG_EMOJIS.length]}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A04]/70 to-transparent" />
                    {post.category && (
                      <div className="absolute bottom-4 left-4">
                        <span className={`font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${categoryClass}`}>
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="font-serif text-lg text-[#1C1208] font-light leading-snug mb-2 group-hover:text-[#C4882A] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[#1C1208]/50 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1C1208]/06">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1.5 text-[#1C1208]/30 text-xs">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      )}
                      <span className="text-[#C4882A] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-[#C4882A]/08 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-9 h-9 text-[#C4882A]/50" />
            </div>
            <h3 className="font-serif text-2xl text-[#1C1208] font-light mb-3">Stories Coming Soon</h3>
            <p className="text-[#1C1208]/45 text-sm max-w-sm leading-relaxed mb-6">
              We&apos;re writing up our first farm updates and farming guides. Check back shortly.
            </p>
            <Link
              href="/"
              className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

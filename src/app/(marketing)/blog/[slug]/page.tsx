import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  })

  if (!post) notFound()

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="font-mono text-[10px] text-[#1C1208]/40 tracking-wide mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-[#C4882A] transition-colors">Blog</Link>
          <span>/</span>
          <span className="truncate">{post.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase">{post.category}</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1208] mt-2 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-[#1C1208]/55 text-lg leading-relaxed border-l-2 border-[#C4882A] pl-4">
            {post.excerpt}
          </p>
          {post.publishedAt && (
            <div className="font-mono text-[10px] text-[#1C1208]/30 tracking-wide mt-4">
              Published {new Date(post.publishedAt).toDateString()}
            </div>
          )}
        </div>

        {/* Cover image placeholder */}
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded mb-10" />
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-[#3D6B3E] to-[#2a4a2b] rounded mb-10 flex items-center justify-center text-6xl">
            🌿
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-[#1C1208]/75 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-[#1C1208]/10">
          <Link
            href="/blog"
            className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

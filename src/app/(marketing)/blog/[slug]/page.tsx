import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug, published: true } })
  if (!post) return { title: "Story — Osotua Farming" }
  return {
    title: `${post.title} — Osotua Farming Blog`,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title: `${post.title} — Osotua Farming Blog`,
      description: post.excerpt.slice(0, 160),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  })

  if (!post) notFound()

  // Format paragraphs if plain text
  const isHtml = post.content.includes("<p>") || post.content.includes("<div>")
  const paragraphs = !isHtml ? post.content.split("\n\n").filter(Boolean) : []

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-[#786550] tracking-wide mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-[#C4882A] transition-colors font-bold">Blog</Link>
          <span>/</span>
          <span className="truncate text-[#1C1208]">{post.title}</span>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.22)",
            borderRadius: "28px",
            boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
          }}
          className="p-8 sm:p-12"
        >
          {/* Header */}
          <div className="mb-10">
            <span className="font-mono text-[10px] text-[#8E5E16] font-bold tracking-widest uppercase">{post.category}</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1208] mt-2 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-[#5C4835] text-lg leading-relaxed border-l-2 border-[#C4882A] pl-4 italic">
              {post.excerpt}
            </p>
            {post.publishedAt && (
              <div className="font-mono text-[11px] text-[#786550] tracking-wide mt-4">
                Published {new Date(post.publishedAt).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            )}
          </div>

          {/* Cover image */}
          {post.coverImage ? (
            <div className="relative mb-10 h-72 sm:h-96 w-full overflow-hidden rounded-2xl border border-[#C4882A]/20 shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-[#FAF5EB] to-[#F5EFE4] border border-[#C4882A]/20 rounded-2xl mb-10 flex items-center justify-center text-5xl text-[#C4882A]/50">
              <i className="bi bi-newspaper" />
            </div>
          )}

          {/* Content */}
          {isHtml ? (
            <div
              className="prose prose-lg max-w-none text-[#1C1208] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-6 text-[#1C1208] text-base sm:text-lg leading-relaxed font-sans">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Back */}
          <div className="mt-16 pt-8 border-t border-[#C4882A]/15 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/blog"
              className="font-mono text-[11px] text-[#8E5E16] font-bold tracking-widest uppercase hover:text-[#C4882A] inline-flex items-center gap-1.5"
            >
              <i className="bi bi-arrow-left" />
              <span>Back to Stories</span>
            </Link>

            <Link
              href="/barn"
              className="btn-primary text-xs py-2 px-4 shadow-xs"
            >
              <span>Visit Barn Store</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

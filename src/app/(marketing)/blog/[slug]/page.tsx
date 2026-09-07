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
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-[#8E7E70] tracking-wider uppercase mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-[#C99A2E] transition-colors font-bold">
            Blog
          </Link>
          <span>/</span>
          <span className="truncate text-[#1C1208] font-semibold">{post.title}</span>
        </div>

        <article className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-8 sm:p-14 shadow-sm">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block text-[10px] font-mono font-bold tracking-[0.16em] uppercase px-3 py-1 bg-[#6B7A3F] text-white rounded-[2px] mb-4">
              {post.category || "Ranch Story"}
            </span>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1C1208] leading-[1.08] mb-6"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              }}
            >
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-[#5C4A2A] leading-relaxed border-l-4 border-[#C99A2E] pl-5 italic mb-6">
              {post.excerpt}
            </p>

            {post.publishedAt && (
              <div className="font-mono text-xs text-[#8E7E70] tracking-wider uppercase">
                Published on{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </div>

          {/* Cover image */}
          {post.coverImage ? (
            <div className="relative mb-10 h-72 sm:h-96 w-full overflow-hidden rounded-[2px] border border-[#D4C9B0]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          {/* Content */}
          {isHtml ? (
            <div
              className="prose prose-lg max-w-none text-[#1C1208] leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-6 text-[#1C1208] text-base sm:text-lg leading-relaxed font-sans">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed text-[#1C1208]">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Back & CTA Footer */}
          <div className="mt-14 pt-8 border-t border-[#D4C9B0] flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/blog"
              className="btn-outline"
            >
              <i className="bi bi-arrow-left" />
              <span>Back to Stories</span>
            </Link>

            <Link
              href="/barn"
              className="btn-gold"
            >
              <span>Visit Farm Barn</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </article>

      </div>
    </div>
  )
}

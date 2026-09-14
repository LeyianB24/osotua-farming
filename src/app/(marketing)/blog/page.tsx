import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Field Dispatch & Rangeland Stories",
  description: "Farming guides, breed profiles, seasonal updates and stories from Osotua Farming, Kajiado.",
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F0E8] text-[#1C1208]">

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white mb-6">
            <i className="bi bi-journal-text text-xs" />
            <span>KNOWLEDGE HUB &amp; FIELD STORIES</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.02] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            }}
          >
            From the <br />
            <em className="font-normal italic text-[#C99A2E]">rangeland</em>
          </h1>

          <p className="text-base sm:text-xl text-[#F5F0E8]/85 max-w-2xl leading-relaxed font-normal">
            Farming guides, purebred profiles, seasonal harvest updates, and stories from Kajiado&apos;s most innovative pastoral enterprise.
          </p>
        </div>
      </section>

      {/* ── BLOG POSTS ── */}
      <section className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="os-container">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col no-underline bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A2E] hover:shadow-lg rounded-[2px] overflow-hidden"
                >
                  {/* Cover */}
                  <div className="h-52 relative bg-[#1C1208] flex items-center justify-center border-b border-[#D4C9B0] overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <i className="bi bi-journal-text text-5xl text-[#C99A2E]/40" />
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase px-2.5 py-1 bg-[#6B7A3F] text-white rounded-[2px]">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2
                        className="text-2xl font-bold text-[#1C1208] leading-snug mb-3 group-hover:text-[#C4602A] transition-colors"
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                        }}
                      >
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-[#5C4A2A] leading-relaxed mb-6 font-normal">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#D4C9B0]/60 flex items-center justify-between text-xs font-mono">
                      {post.publishedAt && (
                        <span className="text-[#8E7E70]">
                          {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      <span className="text-[#C99A2E] font-bold tracking-wider uppercase flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Read Story
                        <i className="bi bi-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 px-6 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] max-w-xl mx-auto shadow-sm">
              <i className="bi bi-journal-album text-5xl text-[#C99A2E]/40 block mb-4" />
              <h3
                className="text-3xl font-bold text-[#1C1208] mb-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Stories Coming Soon
              </h3>
              <p className="text-sm text-[#5C4A2A]">
                We are preparing upcoming ranch updates and breeding guides. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

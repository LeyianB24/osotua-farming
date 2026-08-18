import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = {
  title: "Blog — Osotua Farming",
  description: "Farming guides, breed profiles, seasonal updates and stories from Osotua Farming, Kajiado.",
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1.5rem", fontWeight: 700 }}>
            Knowledge Hub &amp; Field Stories
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            From the
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>ranch</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "540px", lineHeight: 1.8, fontSize: "1.05rem" }}>
            Farming guides, purebred profiles, seasonal harvest updates, and stories from Kajiado&apos;s most innovative agribusiness.
          </p>
        </div>
      </div>

      {/* ── BLOG POSTS ── */}
      <section
        style={{ padding: "5rem 0 8rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#FFFFFF",
                    border: "1px solid rgba(196, 136, 42, 0.22)",
                    boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                  }}
                  className="group hover:-translate-y-2 hover:border-[#C4882A] hover:shadow-lg transition-all duration-300 flex flex-col no-underline"
                >
                  {/* Cover */}
                  <div
                    style={{
                      height: "180px",
                      position: "relative",
                      background: "linear-gradient(135deg, #FAF5EB 0%, #F5EFE4 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottom: "1px solid rgba(196, 136, 42, 0.15)",
                    }}
                  >
                    <i className="bi bi-journal-text" style={{ fontSize: "3.5rem", color: "rgba(196,136,42,0.4)" }} />
                    {post.category && (
                      <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            padding: "0.3rem 0.75rem",
                            borderRadius: "100px",
                            background: "rgba(196,136,42,0.15)",
                            border: "1px solid rgba(196,136,42,0.35)",
                            color: "#8E5E16",
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                        fontSize: "1.5rem",
                        fontWeight: 500,
                        color: "#1C1208",
                        lineHeight: 1.25,
                        marginBottom: "0.75rem",
                      }}
                      className="group-hover:text-[#C4882A] transition-colors"
                    >
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p style={{ color: "#5C4835", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                        {post.excerpt}
                      </p>
                    )}

                    <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(196, 136, 42, 0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {post.publishedAt && (
                        <span style={{ color: "#786550", fontSize: "0.8rem", fontFamily: "var(--font-space-grotesk), monospace" }}>
                          {new Date(post.publishedAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      )}
                      <span style={{ color: "#C4882A", fontSize: "0.75rem", fontFamily: "var(--font-space-grotesk), monospace", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        Read Post
                        <i className="bi bi-arrow-right" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                borderRadius: "24px",
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.22)",
                boxShadow: "0 10px 32px rgba(196, 136, 42, 0.06)",
              }}
            >
              <i className="bi bi-journal-album" style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }} />
              <h3 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2rem", fontWeight: 400, color: "#1C1208", marginBottom: "0.75rem" }}>
                Stories Coming Soon
              </h3>
              <p style={{ color: "#5C4835", fontSize: "0.9rem" }}>
                We are preparing upcoming ranch updates and breeding guides. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

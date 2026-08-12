import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = {
  title: "Careers — Osotua Farming",
  description: "Join the Osotua Farming team in Kajiado. Open roles for farmers, technologists, vets, and agribusiness professionals.",
}

const PERKS = [
  { icon: "bi-tree-fill", title: "Work With the Land", desc: "Run and manage operations on a thriving modern ranch in Kajiado County." },
  { icon: "bi-graph-up-arrow", title: "Rapid Growth", desc: "We're scaling quickly — early team members grow with the enterprise." },
  { icon: "bi-people-fill", title: "Community Impact", desc: "Every role contributes directly to regional food security across East Africa." },
  { icon: "bi-cpu-fill", title: "Agri-Tech Innovation", desc: "We deploy cutting-edge smart farm tools alongside proven traditional methods." },
]

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Join Our Team
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Build something
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>that lasts</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem" }}>
            We&apos;re building a world-class team of farmers, technologists, veterinarians, and agribusiness professionals committed to transforming East African agriculture.
          </p>
        </div>
      </div>

      {/* ── PERKS ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "6rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="glass-dark"
                style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", borderRadius: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(196,136,42,0.12)",
                    border: "1px solid rgba(196,136,42,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className={`bi ${p.icon}`} style={{ fontSize: "1.3rem", color: "#C4882A" }} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "#F5EFE4",
                  }}
                >
                  {p.title}
                </div>
                <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section
        className="bg-mesh-earth noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                Current Opportunities
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 4rem)",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  lineHeight: 1.1,
                }}
              >
                Open Positions
              </h2>
            </div>
            {jobs.length > 0 && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 1rem",
                  borderRadius: "100px",
                  background: "rgba(61,107,62,0.2)",
                  border: "1px solid rgba(61,107,62,0.4)",
                  color: "#5a9e5c",
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <i className="bi bi-briefcase-fill" />
                {jobs.length} Open Roles
              </span>
            )}
          </div>

          {jobs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="glass-dark group hover:-translate-y-1 hover:border-[#C4882A]/50 transition-all duration-300 block no-underline p-6"
                  style={{ borderRadius: "16px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "rgba(196,136,42,0.15)",
                          border: "1px solid rgba(196,136,42,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <i className="bi bi-briefcase-fill" style={{ fontSize: "1.2rem", color: "#C4882A" }} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                            fontSize: "1.5rem",
                            fontWeight: 400,
                            color: "#F5EFE4",
                            marginBottom: "0.35rem",
                          }}
                        >
                          {job.title}
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          {job.department && (
                            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-space-grotesk), monospace", color: "#C4882A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                              <i className="bi bi-people-fill" style={{ marginRight: "4px" }} />
                              {job.department}
                            </span>
                          )}
                          {job.location && (
                            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-space-grotesk), monospace", color: "rgba(245,239,228,0.45)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                              <i className="bi bi-geo-alt-fill" style={{ marginRight: "4px" }} />
                              {job.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#C4882A", fontSize: "0.7rem", fontFamily: "var(--font-space-grotesk), monospace", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      Apply Role
                      <i className="bi bi-arrow-right" style={{ fontSize: "0.85rem" }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-dark" style={{ textAlign: "center", padding: "5rem 2rem", borderRadius: "20px" }}>
              <i className="bi bi-briefcase" style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }} />
              <h3 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.75rem" }}>
                No Open Roles Right Now
              </h3>
              <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: "420px", margin: "0 auto 2rem" }}>
                We don&apos;t have active job openings at the moment, but we always welcome exceptional talent in agriculture and tech.
              </p>
              <a href="mailto:careers@osotuafarming.co.ke" className="btn-primary">
                <i className="bi bi-envelope-fill" />
                Send General Application
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── INTERNSHIPS ── */}
      <section
        id="internships"
        className="bg-mesh-gold noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="glass-gold" style={{ padding: "3.5rem", borderRadius: "24px", position: "relative", overflow: "hidden" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.25rem" }}>
              Student Program
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Internships &amp; Attachments
            </h2>
            <p style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "540px", marginBottom: "2.5rem" }}>
              We welcome university students and recent graduates in agriculture, veterinary medicine, software engineering, and agribusiness for structured 3–6 month attachments at our Kajiado ranch.
            </p>

            <Link href="/contact" className="btn-primary">
              <i className="bi bi-mortarboard-fill" />
              Apply for Internship
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

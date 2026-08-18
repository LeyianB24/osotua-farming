import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function SubscriptionsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "6rem", paddingBottom: "3rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "0.75rem" }}>
            Member Subscriptions
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 1.05,
            }}
          >
            My <em style={{ color: "#C4882A", fontStyle: "italic" }}>Subscriptions</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "520px", marginTop: "0.75rem", fontSize: "0.95rem" }}>
            Manage your recurring farm-to-table delivery boxes, dairy supplies, and seasonal harvests.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section
        style={{ padding: "3rem 0 6rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          {subscriptions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    padding: "1.75rem",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    background: "#FFFFFF",
                    border: "1px solid rgba(196,136,42,0.22)",
                    boxShadow: "0 8px 24px rgba(196,136,42,0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    <div
                      style={{
                        width: "48px", height: "48px", borderRadius: "12px",
                        background: "rgba(196,136,42,0.12)", border: "1px solid rgba(196,136,42,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        color: "#C4882A",
                      }}
                    >
                      <i className="bi bi-arrow-repeat" style={{ fontSize: "1.4rem" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                          fontSize: "1.6rem", fontWeight: 500, color: "#1C1208", lineHeight: 1.1,
                        }}
                      >
                        {sub.product.name}
                      </div>
                      <div style={{ color: "#786550", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                        {sub.product.category.name} · {sub.frequency}
                      </div>
                      {sub.nextDelivery && (
                        <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", color: "#8E5E16", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.35rem" }}>
                          Next Delivery: {new Date(sub.nextDelivery).toDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.35rem 0.85rem",
                      borderRadius: "100px", background: sub.status === "ACTIVE" ? "rgba(46,125,50,0.12)" : "rgba(196,136,42,0.12)",
                      border: sub.status === "ACTIVE" ? "1px solid rgba(46,125,50,0.35)" : "1px solid rgba(196,136,42,0.35)",
                      color: sub.status === "ACTIVE" ? "#2E7D32" : "#8E5E16",
                    }}
                  >
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                borderRadius: "24px",
                background: "#FFFFFF",
                border: "1px solid rgba(196,136,42,0.22)",
                boxShadow: "0 10px 32px rgba(196,136,42,0.06)",
              }}
            >
              <i className="bi bi-arrow-repeat" style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }} />
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.4rem", fontWeight: 400, color: "#1C1208", marginBottom: "0.75rem",
                }}
              >
                No Active Subscriptions
              </h2>
              <p style={{ color: "#5C4835", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Subscribe to weekly organic produce boxes or fresh dairy deliveries from our Barn Store.
              </p>
              <Link href="/barn" className="btn-primary">
                <i className="bi bi-shop" />
                Visit Barn Store
              </Link>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

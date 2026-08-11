import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import CountUp from "@/components/shared/CountUp"

export const metadata = { title: "Member Command Center — Osotua Farming" }

interface OrderItem {
  id: string
  type: string
  totalAmount: number
  status: string
  createdAt: Date | string
}

export default async function CustomerDashboard() {
  const session = await auth()

  let userOrders: OrderItem[] = []
  if (session?.user?.id) {
    try {
      userOrders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 8,
      })
    } catch {
      userOrders = []
    }
  }

  const userName = session?.user?.name || "Ranch Circle Member"
  const userEmail = session?.user?.email || "member@osotuafarming.co.ke"

  // Aggregate stats
  const totalSpent = userOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  const activeOrdersCount = userOrders.filter(o => o.status === "PENDING" || o.status === "PROCESSING" || o.status === "CONFIRMED").length

  return (
    <div
      className="bg-mesh-earth noise min-h-screen"
      style={{ padding: "2.5rem 2rem 5rem", position: "relative" }}
    >
      {/* ── HERO BANNER ── */}
      <div
        className="glass-dark"
        style={{
          padding: "2.5rem 2.5rem 2.25rem",
          borderRadius: "24px",
          marginBottom: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: "-4rem",
            right: "-4rem",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,136,42,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "100px",
                  background: "rgba(196,136,42,0.15)",
                  border: "1px solid rgba(196,136,42,0.35)",
                  color: "#C4882A",
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <i className="bi bi-stars" />
                Osotua Ranch Circle — Tier 1 VIP Member
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Welcome back, <em style={{ color: "#C4882A", fontStyle: "italic" }}>{userName}</em>
            </h1>

            <p style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.9rem", maxWidth: "520px", lineHeight: 1.7 }}>
              Track your active rangeland livestock reservations, cold-chain Barn Store orders, and scheduled Kajiado estate tours in real-time.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/barn" className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.75rem 1.5rem" }}>
              <i className="bi bi-bag-plus-fill" />
              Shop Barn Store
            </Link>
            <Link href="/breeds" className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.75rem 1.5rem" }}>
              <i className="bi bi-bullseye" />
              Pedigree Breeds
            </Link>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ fontSize: "0.75rem", padding: "0.75rem 1.25rem", color: "#25D366", borderColor: "rgba(37,211,102,0.3)" }}
            >
              <i className="bi bi-whatsapp" />
              Concierge
            </a>
          </div>
        </div>
      </div>

      {/* ── METRICS GRID (4 GLASS CARDS) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: "2.5rem" }}>

        {/* Card 1: Total Orders */}
        <div
          className="glass-gold"
          style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", overflow: "hidden" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "rgba(196,136,42,0.15)", border: "1px solid rgba(196,136,42,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="bi bi-bag-check-fill" style={{ fontSize: "1.2rem", color: "#C4882A" }} />
            </div>
            <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", color: "#C4882A", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Orders
            </span>
          </div>

          <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2.4rem", fontWeight: 300, color: "#F5EFE4", lineHeight: 1, marginTop: "0.5rem" }}>
            <CountUp target={userOrders.length} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(245,239,228,0.5)" }}>Active purchases</span>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-space-grotesk), monospace", color: "#3D6B3E", fontWeight: 600 }}>
              {activeOrdersCount} Pending
            </span>
          </div>
        </div>

        {/* Card 2: Total Spent */}
        <div
          className="glass-dark"
          style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", overflow: "hidden" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "rgba(61,107,62,0.15)", border: "1px solid rgba(61,107,62,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="bi bi-receipt" style={{ fontSize: "1.2rem", color: "#3D6B3E" }} />
            </div>
            <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", color: "#3D6B3E", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Total Volume
            </span>
          </div>

          <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2.2rem", fontWeight: 300, color: "#F5EFE4", lineHeight: 1, marginTop: "0.5rem" }}>
            KES <CountUp target={totalSpent} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(245,239,228,0.5)" }}>Direct farm trade</span>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-space-grotesk), monospace", color: "#C4882A" }}>
              M-Pesa Verified
            </span>
          </div>
        </div>

        {/* Card 3: Scheduled Visits */}
        <div
          className="glass-green"
          style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", overflow: "hidden" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "rgba(61,107,62,0.2)", border: "1px solid rgba(61,107,62,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="bi bi-calendar-check-fill" style={{ fontSize: "1.2rem", color: "#5a9e5c" }} />
            </div>
            <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", color: "#5a9e5c", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Estate Tours
            </span>
          </div>

          <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2.4rem", fontWeight: 300, color: "#F5EFE4", lineHeight: 1, marginTop: "0.5rem" }}>
            <CountUp target={1} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(245,239,228,0.5)" }}>Next Kajiado Visit</span>
            <Link href="/visit" style={{ fontSize: "0.7rem", fontFamily: "var(--font-space-grotesk), monospace", color: "#5a9e5c", textDecoration: "none", fontWeight: 600 }}>
              Schedule →
            </Link>
          </div>
        </div>

        {/* Card 4: Ecological Footprint */}
        <div
          className="glass-dark"
          style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative", overflow: "hidden" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "rgba(196,136,42,0.15)", border: "1px solid rgba(196,136,42,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className="bi bi-tree-fill" style={{ fontSize: "1.2rem", color: "#C4882A" }} />
            </div>
            <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", color: "#C4882A", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Impact Score
            </span>
          </div>

          <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2.2rem", fontWeight: 300, color: "#F5EFE4", lineHeight: 1, marginTop: "0.5rem" }}>
            <CountUp target={142} suffix=" kg" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(245,239,228,0.5)" }}>CO₂ Sequestered</span>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-space-grotesk), monospace", color: "#3D6B3E", fontWeight: 600 }}>
              Pasture Guard
            </span>
          </div>
        </div>

      </div>

      {/* ── 2-COLUMN DASHBOARD CONTENT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column (8 Cols): Recent Orders Table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-dark" style={{ padding: "2rem", borderRadius: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", color: "#C4882A", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Active Transactions
                </div>
                <h2 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: "#F5EFE4" }}>
                  Your Recent Farm Orders
                </h2>
              </div>
              <Link href="/barn" className="btn-ghost" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem" }}>
                Shop Barn →
              </Link>
            </div>

            {userOrders.length > 0 ? (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                      {["Order Ref", "Category / Type", "Amount", "Status", "Date"].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.58rem",
                            fontWeight: 600,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(245,239,228,0.4)",
                            textAlign: "left",
                            padding: "0.875rem 1rem",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order, i) => (
                      <tr
                        key={order.id}
                        style={{
                          borderBottom: i < userOrders.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          transition: "background 0.2s ease",
                        }}
                        className="hover:bg-white/[0.03]"
                      >
                        <td style={{ padding: "1rem", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.8rem", fontWeight: 700, color: "#C4882A" }}>
                          #{order.id.slice(-6).toUpperCase()}
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", color: "rgba(245,239,228,0.7)" }}>
                          {order.type || "Farm Produce"}
                        </td>
                        <td style={{ padding: "1rem", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.85rem", fontWeight: 600, color: "#F5EFE4" }}>
                          KES {order.totalAmount ? order.totalAmount.toLocaleString() : "0"}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "100px",
                              background: order.status === "COMPLETED" ? "rgba(61,107,62,0.2)" : "rgba(196,136,42,0.2)",
                              border: `1px solid ${order.status === "COMPLETED" ? "rgba(61,107,62,0.4)" : "rgba(196,136,42,0.4)"}`,
                              color: order.status === "COMPLETED" ? "#5a9e5c" : "#C4882A",
                              fontSize: "0.58rem",
                              fontFamily: "var(--font-space-grotesk), monospace",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            <i className={`bi ${order.status === "COMPLETED" ? "bi-check-circle-fill" : "bi-clock-history"}`} />
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.78rem", fontFamily: "var(--font-space-grotesk), monospace", color: "rgba(245,239,228,0.4)" }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
                <i className="bi bi-basket3" style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.5rem" }}>
                  No orders placed yet
                </h3>
                <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.88rem", maxWidth: "360px", margin: "0 auto 1.5rem" }}>
                  Explore our certified livestock breeds or order fresh organic produce from the Barn Store.
                </p>
                <Link href="/barn" className="btn-primary">
                  <i className="bi bi-bag-check-fill" />
                  Explore Barn Store
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 Cols): Member Perks & Estate Passport */}
        <div className="lg:col-span-4 space-y-6">

          {/* Member Passport Card */}
          <div className="glass-gold" style={{ padding: "1.75rem", borderRadius: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208", fontWeight: 700, fontSize: "1.2rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-cormorant), Georgia, serif",
                boxShadow: "0 4px 16px rgba(196,136,42,0.4)",
              }}>
                {userName.charAt(0)}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 400, color: "#F5EFE4", lineHeight: 1.1 }}>
                  {userName}
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(245,239,228,0.5)", fontFamily: "var(--font-space-grotesk), monospace" }}>
                  {userEmail}
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(196,136,42,0.2)", paddingTop: "1rem", marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "rgba(245,239,228,0.7)", marginBottom: "0.5rem" }}>
                <span>Ranch Membership:</span>
                <strong style={{ color: "#C4882A", fontFamily: "var(--font-space-grotesk), monospace" }}>Verified VIP</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "rgba(245,239,228,0.7)", marginBottom: "0.5rem" }}>
                <span>Cold-Chain Delivery:</span>
                <strong style={{ color: "#5a9e5c", fontFamily: "var(--font-space-grotesk), monospace" }}>Priority Express</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "rgba(245,239,228,0.7)" }}>
                <span>Pastoral Concierge:</span>
                <strong style={{ color: "#C4882A", fontFamily: "var(--font-space-grotesk), monospace" }}>Assigned</strong>
              </div>
            </div>
          </div>

          {/* Harvest & Breed Early Access Notice */}
          <div className="glass-green" style={{ padding: "1.75rem", borderRadius: "20px" }}>
            <div className="eyebrow" style={{ color: "#5a9e5c", marginBottom: "0.75rem" }}>
              <i className="bi bi-bell-fill" />
              Member Exclusive Alert
            </div>
            <h4 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.4rem", fontWeight: 400, color: "#F5EFE4", marginBottom: "0.5rem", lineHeight: 1.2 }}>
              Spring Boran Bull Calves & Raw Honey Drop
            </h4>
            <p style={{ fontSize: "0.82rem", color: "rgba(245,239,228,0.6)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              VIP members receive 48-hour early reservation window before public listing. Reserve purebred Boran genetics directly from Kajiado.
            </p>
            <Link href="/breeds" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.7rem", padding: "0.7rem" }}>
              View Exclusive Listing
              <i className="bi bi-arrow-right" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}

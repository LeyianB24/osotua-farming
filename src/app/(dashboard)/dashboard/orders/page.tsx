import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function CustomerOrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { breed: true, product: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "4rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
            Member Orders
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 1,
            }}
          >
            My <em style={{ color: "#C4882A", fontStyle: "italic" }}>Order History</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "520px", marginTop: "1rem" }}>
            Complete audit ledger of your livestock purchases, Barn Store orders, and delivery statuses.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "5rem 0 8rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1, maxWidth: "960px" }}>
          {orders.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="glass-dark"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid rgba(196,136,42,0.25)",
                  }}
                >
                  {/* Order header row */}
                  <div
                    style={{
                      padding: "1.25rem 1.75rem",
                      background: "rgba(0,0,0,0.3)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.85rem", fontWeight: 700, color: "#C4882A" }}>
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span style={{ color: "rgba(245,239,228,0.45)", fontSize: "0.8rem" }}>
                        {new Date(order.createdAt).toDateString()}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      <span style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.6rem", fontWeight: 400, color: "#F5EFE4" }}>
                        KES {order.totalAmount.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600,
                          letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem",
                          borderRadius: "100px", background: "rgba(61,107,62,0.2)",
                          border: "1px solid rgba(61,107,62,0.4)", color: "#5a9e5c",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div style={{ padding: "1.25rem 1.75rem" }}>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.65rem 0",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <span style={{ color: "#F5EFE4", fontSize: "0.9rem" }}>
                          {item.breed?.name || item.product?.name || "Farm Item"}
                        </span>
                        <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "rgba(245,239,228,0.5)", fontSize: "0.8rem" }}>
                          {item.quantity} × KES {item.unitPrice.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="glass-dark"
              style={{ textAlign: "center", padding: "5rem 2rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)" }}
            >
              <i className="bi bi-box-seam" style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }} />
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.4rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.75rem",
                }}
              >
                No Orders Yet
              </h2>
              <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
                You haven&apos;t placed any orders yet. Visit the Barn Store or explore our livestock catalog.
              </p>
              <Link href="/barn" className="btn-primary">
                <i className="bi bi-shop" />
                Shop Barn Store
              </Link>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

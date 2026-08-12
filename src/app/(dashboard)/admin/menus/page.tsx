import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Barn Menus — Osotua Admin" }

export default async function AdminMenusPage() {
  const menus = await prisma.menu.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <AdminSection
      eyebrow="The Barn Restaurant"
      title="Menu Management"
      count={menus.length}
      countLabel="menus published"
      icon="bi-menu-button-wide-fill"
      action={
        <Link
          href="/admin/menus/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Create Menu
        </Link>
      }
    >
      {menus.length === 0 ? (
        <div
          className="glass-dark"
          style={{
            borderRadius: "20px",
            border: "1px solid rgba(196,136,42,0.2)",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <i
            className="bi bi-menu-button-wide"
            style={{ fontSize: "2.5rem", color: "rgba(196,136,42,0.25)", display: "block", marginBottom: "1rem" }}
          />
          <p style={{ color: "rgba(245,239,228,0.35)", fontSize: "0.9rem" }}>No menus created yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {menus.map((m) => (
            <Link
              key={m.id}
              href={`/admin/menus/${m.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="glass-dark hover:-translate-y-1 transition-all duration-300"
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "1.5rem",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "1.25rem", fontWeight: 300,
                      color: "#F5EFE4", lineHeight: 1.2,
                    }}
                  >
                    {m.name}
                  </h3>
                  <StatusBadge status={m.available ? "ACTIVE" : "PENDING"} />
                </div>
                <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.82rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                  {m.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.9rem", fontWeight: 700,
                      color: "#C4882A",
                    }}
                  >
                    KES {m.price.toLocaleString()}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.62rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "rgba(245,239,228,0.35)",
                    }}
                  >
                    {m.servings} servings · {m.items.length} items
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminSection>
  )
}

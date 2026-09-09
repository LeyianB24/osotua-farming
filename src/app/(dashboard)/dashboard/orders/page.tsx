import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "My Orders & Receipts — Osotua Farming" }

export default async function CustomerOrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard/orders")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { breed: true, product: true } } },
    orderBy: { createdAt: "desc" },
  })

  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

  return (
    <div>
      <PageHeader
        eyebrow="Patron Ledger"
        title="My Order History"
        sub="Complete history of your pedigree livestock purchases, cold room pantry orders, and live delivery status."
        action={
          <div className="flex items-center gap-3">
            <div
              className="px-4 py-2 rounded-xl text-right hidden sm:block"
              style={{
                background: "rgba(245,239,228,0.03)",
                border: "1px solid rgba(196,136,42,0.2)",
              }}
            >
              <div
                className="text-[9px] font-mono uppercase tracking-wider"
                style={{ color: "rgba(245,239,228,0.4)" }}
              >
                Lifetime Spent
              </div>
              <div className="font-mono text-base font-bold" style={{ color: "#C4882A" }}>
                KES {totalSpent.toLocaleString()}
              </div>
            </div>
            <Link
              href="/barn"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
                boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
              }}
            >
              <i className="bi bi-shop text-sm" />
              Shop Barn
            </Link>
          </div>
        }
      />

      <div className="p-4 sm:p-8 space-y-4">
        {orders.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: "rgba(245,239,228,0.02)",
              border: "1px solid rgba(196,136,42,0.12)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(196,136,42,0.1)",
                border: "1px solid rgba(196,136,42,0.25)",
              }}
            >
              <i className="bi bi-bag-x text-2xl" style={{ color: "#C4882A" }} />
            </div>
            <h3
              className="text-lg font-light mb-1"
              style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
            >
              No Orders Found
            </h3>
            <p
              className="text-xs mb-6 max-w-sm mx-auto"
              style={{ color: "rgba(245,239,228,0.45)" }}
            >
              You haven&apos;t placed any orders yet. Visit our rangelands barn store or explore pedigree breeds to place your first reservation.
            </p>
            <Link
              href="/barn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
              }}
            >
              Explore Farm Barn
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl p-6 transition-all duration-300 group"
              style={{
                background: "rgba(245,239,228,0.02)",
                border: "1px solid rgba(196,136,42,0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Order Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b"
                style={{ borderColor: "rgba(196,136,42,0.1)" }}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="font-mono text-sm font-bold tracking-wider"
                    style={{ color: "#C4882A" }}
                  >
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgba(245,239,228,0.4)" }}
                  >
                    &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <Badge label={order.type} variant="muted" />
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="font-medium text-lg"
                    style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
                  >
                    KES {order.totalAmount.toLocaleString()}
                  </div>
                  <Badge label={order.status} />
                </div>
              </div>

              {/* Order Items */}
              <div className="py-4 space-y-2.5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-xs py-1.5 border-b last:border-b-0"
                    style={{ borderColor: "rgba(245,239,228,0.03)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#C4882A" }}
                      />
                      <span
                        className="font-medium"
                        style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
                      >
                        {item.breed?.name || item.product?.name || "Farm Produce"}
                      </span>
                      <span style={{ color: "rgba(245,239,228,0.4)", fontFamily: "monospace" }}>
                        &times; {item.quantity}
                      </span>
                    </div>
                    <span
                      className="font-mono"
                      style={{ color: "rgba(245,239,228,0.6)" }}
                    >
                      KES {((item.unitPrice || 0) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div
                className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
                style={{ borderColor: "rgba(196,136,42,0.08)", color: "rgba(245,239,228,0.35)", fontFamily: "monospace" }}
              >
                <div>
                  Payment: <span style={{ color: "rgba(245,239,228,0.7)" }}>{order.paymentMethod || "M-Pesa"}</span>
                  {order.deliveryAddress && (
                    <span className="ml-3">
                      Dispatch to: <span style={{ color: "rgba(245,239,228,0.7)" }}>{order.deliveryAddress}</span>
                    </span>
                  )}
                </div>
                <div style={{ color: "#C4882A" }}>
                  Verified Pastoral Chain &bull; Osotua Ranch
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

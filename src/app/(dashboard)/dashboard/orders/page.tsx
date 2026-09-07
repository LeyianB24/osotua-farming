import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = { title: "My Orders — Osotua Farming" }

export default async function CustomerOrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { breed: true, product: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208]">
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white mb-4">
            <i className="bi bi-clock-history text-xs" />
            <span>MEMBER PORTAL</span>
          </div>
          <h1
            className="text-4xl sm:text-6xl font-bold text-[#F5F0E8] leading-tight m-0"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            My <em className="font-normal italic text-[#C99A2E]">Order History</em>
          </h1>
          <p className="text-sm text-[#F5F0E8]/80 max-w-lg mt-2 font-normal">
            Complete audit ledger of your livestock purchases, Barn Store orders, and live delivery tracking.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16 sm:py-24 bg-[#F5F0E8]">
        <div className="os-container max-w-4xl">
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] overflow-hidden shadow-sm"
                >
                  {/* Order header row */}
                  <div className="p-5 sm:p-6 bg-white border-b border-[#D4C9B0] flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#C4602A]">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-[#8E7E70]">
                        &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className="text-xl font-bold text-[#1C1208]"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                      >
                        KES {order.totalAmount.toLocaleString()}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-[2px] ${
                          order.status === "DELIVERED"
                            ? "bg-[#6B7A3F] text-white"
                            : "bg-[#C99A2E] text-[#1C1208]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b border-[#D4C9B0]/50 text-xs"
                      >
                        <span className="font-semibold text-[#1C1208]">
                          {item.breed?.name || item.product?.name || "Farm Item"}
                        </span>
                        <span className="font-mono text-[#5C4A2A]">
                          {item.quantity} × KES {item.unitPrice.toLocaleString()}
                        </span>
                      </div>
                    ))}

                    <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
                      <div className="text-xs text-[#5C4A2A]">
                        <i className="bi bi-geo-alt-fill text-[#C99A2E] mr-1.5" />
                        {order.deliveryAddress || "Ranch Collection Depot"}
                      </div>
                      <Link
                        href={`/orders/${order.id}`}
                        className="btn-gold text-xs"
                      >
                        <i className="bi bi-eye-fill" />
                        <span>View Order Details &amp; Tracking</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm">
              <i className="bi bi-box-seam text-5xl text-[#C99A2E]/40 block mb-4" />
              <h2
                className="text-3xl font-bold text-[#1C1208] mb-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                No Orders Yet
              </h2>
              <p className="text-sm text-[#5C4A2A] mb-8 max-w-sm mx-auto">
                You haven&apos;t placed any orders yet. Visit the Barn Store or explore our livestock catalog.
              </p>
              <Link href="/barn" className="btn-gold">
                <i className="bi bi-shop" />
                <span>Shop Barn Store</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

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
            <div className="px-4 py-2 rounded-[2px] bg-white border border-[#DDD4C4] text-right hidden sm:block shadow-xs">
              <div className="text-[9px] font-mono uppercase tracking-wider text-[#7A6C5B] font-bold">
                Lifetime Spent
              </div>
              <div className="font-mono text-sm font-bold text-[#BA5932]">
                KES {totalSpent.toLocaleString()}
              </div>
            </div>
            <Link
              href="/barn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
            >
              <i className="bi bi-shop text-xs" />
              Shop Barn
            </Link>
          </div>
        }
      />

      <div className="p-6 sm:p-8 space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] flex items-center justify-center mx-auto mb-4 text-[#C58F28]">
              <i className="bi bi-bag-x text-2xl" />
            </div>
            <h3
              className="text-xl font-bold text-[#1A1208] mb-1"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              No Orders Placed Yet
            </h3>
            <p className="text-xs text-[#7A6C5B] mb-6 max-w-sm mx-auto">
              You haven&apos;t placed any orders yet. Visit our rangelands barn store or explore pedigree breeds to place your first reservation.
            </p>
            <Link
              href="/barn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-wider font-bold bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] transition-colors"
            >
              Explore Farm Barn
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#E5DDD0] rounded-[2px] p-6 shadow-xs hover:border-[#C48D2A] transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE9DF]">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#7A6C5B]">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-[#7A6C5B]">
                    &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <Badge label={order.type} variant="muted" />
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="font-bold text-lg text-[#BA5932]"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
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
                    className="flex justify-between items-center text-xs py-1.5 border-b border-[#FAF7F2] last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C58F28]" />
                      <span className="font-semibold text-[#1A1208]">
                        {item.breed?.name || item.product?.name || "Farm Produce"}
                      </span>
                      <span className="text-[#7A6C5B] font-mono">
                        &times; {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#BA5932]">
                      KES {((item.unitPrice || 0) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="pt-3 border-t border-[#EFE9DF] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 font-mono text-[#7A6C5B]">
                <div>
                  Payment: <span className="text-[#1A1208] font-bold">{order.paymentMethod || "M-Pesa"}</span>
                  {order.deliveryAddress && (
                    <span className="ml-3">
                      Dispatch to: <span className="text-[#1A1208] font-bold">{order.deliveryAddress}</span>
                    </span>
                  )}
                </div>
                <div className="text-[#C58F28] font-bold">
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

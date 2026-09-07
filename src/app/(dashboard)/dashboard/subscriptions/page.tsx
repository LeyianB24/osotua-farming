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
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208]">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white mb-4">
            <i className="bi bi-arrow-repeat text-xs" />
            <span>MEMBER SUBSCRIPTIONS</span>
          </div>
          <h1
            className="text-4xl sm:text-6xl font-bold text-[#F5F0E8] leading-tight m-0"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            My <em className="font-normal italic text-[#C99A2E]">Subscriptions</em>
          </h1>
          <p className="text-sm text-[#F5F0E8]/80 max-w-lg mt-2 font-normal">
            Manage your recurring farm-to-table delivery boxes, dairy supplies, and seasonal harvests.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16 sm:py-24 bg-[#F5F0E8]">
        <div className="os-container max-w-4xl">
          {subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-[#FAF7F2] border border-[#D4C9B0] p-6 rounded-[2px] flex items-center justify-between flex-wrap gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/25 flex items-center justify-center text-xl text-[#C99A2E] shrink-0">
                      <i className="bi bi-arrow-repeat" />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold text-[#1C1208] m-0"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                      >
                        {sub.product.name}
                      </h3>
                      <div className="text-xs text-[#5C4A2A] mt-1 font-mono uppercase tracking-wider">
                        {sub.product.category.name} &bull; {sub.frequency}
                      </div>
                      {sub.nextDelivery && (
                        <div className="font-mono text-[11px] text-[#C99A2E] font-bold tracking-wider uppercase mt-1">
                          Next Delivery: {new Date(sub.nextDelivery).toDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-[2px] ${
                      sub.status === "ACTIVE"
                        ? "bg-[#6B7A3F] text-white"
                        : "bg-[#C99A2E] text-[#1C1208]"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm">
              <i className="bi bi-arrow-repeat text-5xl text-[#C99A2E]/40 block mb-4" />
              <h2
                className="text-3xl font-bold text-[#1C1208] mb-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                No Active Subscriptions
              </h2>
              <p className="text-sm text-[#5C4A2A] mb-8 max-w-sm mx-auto">
                Subscribe to weekly organic produce boxes or fresh dairy deliveries from our Barn Store.
              </p>
              <Link href="/barn" className="btn-gold">
                <i className="bi bi-shop" />
                <span>Visit Farm Barn</span>
              </Link>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = { title: "My Subscriptions — Osotua Farming" }

export default async function SubscriptionsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard/subscriptions")

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-[#FBF7F0] p-4 sm:p-8 lg:p-10 text-[#1C1208]">
      {/* Header Panel */}
      <div className="os-panel mb-8 p-6 sm:p-8 bg-white border border-[#C4882A]/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] mb-3">
              <i className="bi bi-arrow-repeat text-[#2E7D32]" />
              <span>Recurring Farm Harvests</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal">
              My Subscriptions
            </h1>
            <p className="text-xs text-[#786550] font-mono mt-1 max-w-xl">
              Manage your recurring farm-to-table delivery boxes, dairy supplies, and seasonal harvests.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/barn"
              className="btn-primary py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold shadow-xs flex items-center gap-1.5"
            >
              <i className="bi bi-plus-lg" />
              <span>Add Farm Box</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subscriptions Grid */}
      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white border border-[#C4882A]/20 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-[#C4882A]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E5E16] bg-[#C4882A]/10 px-2.5 py-0.5 rounded-full border border-[#C4882A]/25">
                    {sub.product.category.name}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                      sub.status === "ACTIVE"
                        ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                        : "bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/35"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EB] border border-[#C4882A]/20 flex items-center justify-center text-xl text-[#C4882A] shrink-0">
                    <i className="bi bi-box-seam" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1C1208]">
                      {sub.product.name}
                    </h2>
                    <div className="text-xs text-[#786550] font-mono mt-0.5">
                      Delivery Frequency: <span className="font-bold text-[#1C1208]">{sub.frequency}</span>
                    </div>
                  </div>
                </div>

                {sub.nextDelivery && (
                  <div className="text-xs font-mono text-[#2E7D32] bg-[#2E7D32]/6 p-3 rounded-xl border border-[#2E7D32]/20 flex items-center gap-2">
                    <i className="bi bi-calendar-check" />
                    <span>Next dispatch: {new Date(sub.nextDelivery).toLocaleDateString("en-KE", { dateStyle: "full" })}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#C4882A]/15 flex items-center justify-between text-xs font-mono">
                <span className="text-[#786550]">Automated Recurring Billing</span>
                <Link href="/barn" className="text-[#8E5E16] hover:text-[#C4882A] font-bold">
                  Edit Delivery &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-12 text-center shadow-xs">
          <i className="bi bi-arrow-repeat text-5xl text-[#C4882A]/30 block mb-3" />
          <h2 className="font-serif text-2xl text-[#1C1208] mb-1">No Active Subscriptions</h2>
          <p className="text-xs text-[#786550] font-mono max-w-sm mx-auto mb-6">
            Subscribe to weekly organic produce boxes or fresh pasture dairy deliveries from our Kajiado ranch.
          </p>
          <Link href="/barn" className="btn-primary py-2.5 px-6 text-xs font-mono font-bold uppercase tracking-wider">
            Discover Farm Boxes
          </Link>
        </div>
      )}
    </div>
  )
}

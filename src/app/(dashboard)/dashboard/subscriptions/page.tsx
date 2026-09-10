import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import Badge from "@/components/dashboard/Badge"

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
    <div>
      <PageHeader
        eyebrow="Recurring Farm Harvests"
        title="My Subscriptions"
        sub="Manage your weekly and monthly farm-to-table delivery boxes, dairy supplies, and seasonal harvests."
        action={
          <Link
            href="/barn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
          >
            <i className="bi bi-plus-lg text-xs" />
            Add Farm Box
          </Link>
        }
      />

      <div className="p-6 sm:p-8">
        {subscriptions.length === 0 ? (
          <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] flex items-center justify-center mx-auto mb-4 text-[#C58F28]">
              <i className="bi bi-arrow-repeat text-2xl" />
            </div>
            <h3
              className="text-xl font-bold text-[#1A1208] mb-1"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              No Active Subscriptions
            </h3>
            <p className="text-xs text-[#7A6C5B] mb-6 max-w-sm mx-auto">
              Set up automated recurring deliveries of pure pasture milk, artisanal ghee, or organic seasonal produce directly to your doorstep.
            </p>
            <Link
              href="/barn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-wider font-bold bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] transition-colors"
            >
              Browse Barn Pantry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white border border-[#E5DDD0] rounded-[2px] p-6 flex flex-col justify-between shadow-xs hover:border-[#C48D2A] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A6C5B] border border-[#DDD4C4]">
                      {sub.product.category?.name ?? "Pantry"}
                    </span>
                    <Badge label={sub.status} />
                  </div>

                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] flex items-center justify-center text-xl shrink-0 text-[#C58F28]">
                      <i className="bi bi-box-seam" />
                    </div>
                    <div>
                      <h2
                        className="text-lg font-bold text-[#1A1208]"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                      >
                        {sub.product.name}
                      </h2>
                      <div className="text-xs font-mono text-[#7A6C5B] mt-0.5">
                        Frequency: <span className="font-bold text-[#BA5932]">{sub.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {sub.nextDelivery && (
                    <div className="text-xs font-mono p-3 rounded-[2px] bg-[#E8EEDC] border border-[#D2DCBE] text-[#486326] flex items-center gap-2 mb-4 font-semibold">
                      <i className="bi bi-calendar-check" />
                      <span>Next dispatch: {new Date(sub.nextDelivery).toLocaleDateString("en-KE", { dateStyle: "full" })}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-[#EFE9DF] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#7A6C5B]">Automated Recurring Harvest</span>
                  <Link
                    href="/barn"
                    className="text-[#BA5932] hover:underline flex items-center gap-1 font-bold"
                  >
                    Manage Box <i className="bi bi-arrow-right text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

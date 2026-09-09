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
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-plus-lg text-sm" />
            Add Farm Box
          </Link>
        }
      />

      <div className="p-4 sm:p-8">
        {subscriptions.length === 0 ? (
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
              <i className="bi bi-arrow-repeat text-2xl" style={{ color: "#C4882A" }} />
            </div>
            <h3
              className="text-lg font-light mb-1"
              style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
            >
              No Active Subscriptions
            </h3>
            <p
              className="text-xs mb-6 max-w-sm mx-auto"
              style={{ color: "rgba(245,239,228,0.45)" }}
            >
              Set up automated recurring deliveries of pure pasture milk, artisanal ghee, or organic seasonal produce directly to your doorstep.
            </p>
            <Link
              href="/barn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
              }}
            >
              Browse Barn Pantry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group"
                style={{
                  background: "rgba(245,239,228,0.02)",
                  border: "1px solid rgba(196,136,42,0.14)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs"
                      style={{
                        background: "rgba(196,136,42,0.1)",
                        color: "#C4882A",
                        border: "1px solid rgba(196,136,42,0.25)",
                      }}
                    >
                      {sub.product.category?.name ?? "Pantry"}
                    </span>
                    <Badge label={sub.status} />
                  </div>

                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(196,136,42,0.2)",
                        color: "#C4882A",
                      }}
                    >
                      <i className="bi bi-box-seam" />
                    </div>
                    <div>
                      <h2
                        className="text-lg font-light"
                        style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
                      >
                        {sub.product.name}
                      </h2>
                      <div
                        className="text-xs font-mono mt-0.5"
                        style={{ color: "rgba(245,239,228,0.45)" }}
                      >
                        Frequency: <span style={{ color: "#C4882A" }}>{sub.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {sub.nextDelivery && (
                    <div
                      className="text-xs font-mono p-3 rounded-xl flex items-center gap-2 mb-4"
                      style={{
                        background: "rgba(61,107,62,0.1)",
                        border: "1px solid rgba(61,107,62,0.25)",
                        color: "#4E8A4F",
                      }}
                    >
                      <i className="bi bi-calendar-check" />
                      <span>Next dispatch: {new Date(sub.nextDelivery).toLocaleDateString("en-KE", { dateStyle: "full" })}</span>
                    </div>
                  )}
                </div>

                <div
                  className="mt-4 pt-4 border-t flex items-center justify-between text-xs font-mono"
                  style={{ borderColor: "rgba(196,136,42,0.1)" }}
                >
                  <span style={{ color: "rgba(245,239,228,0.4)" }}>Automated Recurring Delivery</span>
                  <Link
                    href="/barn"
                    className="hover:underline flex items-center gap-1 font-medium"
                    style={{ color: "#C4882A" }}
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

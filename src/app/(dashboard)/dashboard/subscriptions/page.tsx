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
    <div className="min-h-screen bg-[#FBF7F0] pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl text-[#1C1208] mb-2">My Subscriptions</h1>
        <p className="text-[#1C1208]/50 text-sm mb-10">Manage your recurring delivery subscriptions.</p>

        {subscriptions.length > 0 ? (
          <div className="flex flex-col gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-white border border-[#1C1208]/08 rounded p-6 flex items-center justify-between">
                <div>
                  <div className="font-serif text-lg text-[#1C1208]">{sub.product.name}</div>
                  <div className="text-[#1C1208]/50 text-sm">{sub.product.category.name} · {sub.frequency}</div>
                  {sub.nextDelivery && (
                    <div className="font-mono text-[10px] text-[#C4882A] mt-1">
                      Next delivery: {new Date(sub.nextDelivery).toDateString()}
                    </div>
                  )}
                </div>
                <span className={`font-mono text-[9px] px-3 py-1.5 rounded-sm border ${sub.status === "ACTIVE" ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[#1C1208]/40">
            <div className="text-5xl mb-4">🔄</div>
            <p className="font-serif text-xl">No subscriptions yet.</p>
            <p className="text-sm mt-2">
              <Link href="/barn" className="text-[#C4882A]">Visit the Barn Store</Link> to subscribe to a weekly box.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

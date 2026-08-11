import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Menus — Admin" }

export default async function AdminMenusPage() {
  const menus = await prisma.menu.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Barn Menus</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{menus.length} menus published</p>
        </div>
        <Link href="/admin/menus/new" className="bg-[#C4882A] text-[#1C1208] px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors">
          + Create Menu
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {menus.map((m) => (
          <Link
            key={m.id}
            href={`/admin/menus/${m.id}`}
            className="os-card p-5 block"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-serif text-xl text-[#1C1208]">{m.name}</h3>
              <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${m.available ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" : "bg-[#1C1208]/05 text-[#1C1208]/40 border-[#1C1208]/10"}`}>
                {m.available ? "AVAILABLE" : "OFF"}
              </span>
            </div>
            <p className="text-[#1C1208]/60 text-xs line-clamp-2 mb-3">{m.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#C4882A] font-medium">KES {m.price.toLocaleString()}</span>
              <span className="font-mono text-[10px] text-[#1C1208]/40">{m.servings} servings · {m.items.length} items</span>
            </div>
          </Link>
        ))}
      </div>
      {menus.length === 0 && <div className="text-center py-10 text-[#1C1208]/40 text-sm">No menus yet.</div>}
    </div>
  )
}

import { prisma } from "@/lib/prisma"

export const metadata = { title: "Customers — Admin" }

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#1C1208]">Customers</h1>
        <p className="text-[#1C1208]/50 text-sm mt-1">{customers.length} registered customers</p>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Email", "Phone", "Orders", "Joined"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, i) => (
              <tr key={customer.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{customer.name || "—"}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{customer.email}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{customer.phone || "—"}</td>
                <td className="px-4 py-3 text-center font-mono text-xs text-[#C4882A] font-semibold">{customer._count.orders}</td>
                <td className="px-4 py-3 text-[#1C1208]/40 text-xs">{new Date(customer.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No customers yet.</div>
        )}
      </div>
    </div>
  )
}

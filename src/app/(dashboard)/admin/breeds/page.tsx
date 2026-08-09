import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Breeds — Admin" }

export default async function AdminBreedsPage() {
  const breeds = await prisma.breed.findMany({
    include: { species: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Breeds</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{breeds.length} breeds registered</p>
        </div>
        <Link
          href="/admin/breeds/new"
          className="bg-[#C4882A] text-[#1C1208] px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors"
        >
          + Add Breed
        </Link>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Species", "Purpose", "Price/Head", "In Stock", "Featured", "Actions"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {breeds.map((breed, i) => (
              <tr key={breed.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{breed.name}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{breed.species.name}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{breed.purpose}</td>
                <td className="px-4 py-3 text-[#C4882A] font-medium">KES {breed.pricePerHead.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#1C1208]">{breed.inStock}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm ${breed.featured ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border border-[#3D6B3E]/20" : "bg-[#1C1208]/05 text-[#1C1208]/40 border border-[#1C1208]/10"}`}>
                    {breed.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/breeds/${breed.id}`} className="text-[#C4882A] text-xs hover:underline mr-3">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {breeds.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No breeds yet. Add your first breed.</div>
        )}
      </div>
    </div>
  )
}

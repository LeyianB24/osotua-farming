import { prisma } from "@/lib/prisma"

export const metadata = { title: "Livestock — Admin" }

export default async function AdminLivestockPage() {
  const livestock = await prisma.livestock.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Livestock</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{livestock.length} animals registered</p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Tag #", "Breed", "Species", "Gender", "Weight", "Status", "Birth Date"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {livestock.map((animal, i) => (
              <tr key={animal.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-mono text-xs text-[#C4882A]">{animal.tagNumber}</td>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{animal.breed.name}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{animal.breed.species.name}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{animal.gender}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{animal.weight ? `${animal.weight}kg` : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${
                    animal.status === "AVAILABLE" ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" :
                    animal.status === "SOLD" ? "bg-red-50 text-red-700 border-red-200" :
                    animal.status === "RESERVED" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                    "bg-blue-50 text-blue-700 border-blue-200"
                  }`}>
                    {animal.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#1C1208]/40 text-xs">
                  {animal.birthDate ? new Date(animal.birthDate).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {livestock.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No livestock records yet.</div>
        )}
      </div>
    </div>
  )
}

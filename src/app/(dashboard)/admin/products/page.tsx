import { prisma } from "@/lib/prisma"

export const metadata = { title: "Products — Admin" }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Products</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{products.length} products</p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Category", "Price", "Unit", "Stock Qty", "In Stock", "Featured"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{product.name}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{product.category.name}</td>
                <td className="px-4 py-3 text-[#C4882A] font-medium">KES {product.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{product.unit}</td>
                <td className="px-4 py-3 text-[#1C1208]">{product.stockQty}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${product.inStock ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" : "bg-red-50 text-red-700 border-red-200"}`}>
                    {product.inStock ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${product.featured ? "bg-[#C4882A]/10 text-[#C4882A] border-[#C4882A]/20" : "bg-[#1C1208]/05 text-[#1C1208]/40 border-[#1C1208]/10"}`}>
                    {product.featured ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No products yet.</div>
        )}
      </div>
    </div>
  )
}

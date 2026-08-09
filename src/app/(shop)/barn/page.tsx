import { prisma } from "@/lib/prisma"
import ProductCard from "@/components/farm/ProductCard"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export const metadata = { title: "The Barn Store — Osotua Farming" }

async function getProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { category: { name: "asc" } },
  })
}

async function getCategories() {
  return prisma.productCategory.findMany({ orderBy: { name: "asc" } })
}

export default async function BarnPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  const grouped = categories.map((c) => ({
    ...c,
    products: products.filter((p) => p.categoryId === c.id),
  }))

  return (
    <>
      <Navbar />
      <div className="bg-[#FBF7F0] pt-24 min-h-screen">
        {/* Header */}
        <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#C4882A]" />
              The Barn Store
            </div>
            <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
              Everything fresh,{" "}
              <em className="text-[#C4882A]">everything ours</em>
            </h1>
            <p className="text-[#F5EFE4]/50 max-w-xl leading-relaxed">
              Walk into our Barn or order online. Every product carries the Osotua promise — raised here, handled with care, delivered to you.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {grouped.map((group) => (
            group.products.length > 0 && (
              <div key={group.id} className="mb-16">
                <h2 className="font-serif text-2xl text-[#1C1208] mb-8">{group.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          ))}

          {products.length === 0 && (
            <div className="text-center py-24 text-[#1C1208]/40">
              <div className="text-5xl mb-4">🌿</div>
              <p className="font-serif text-xl">Products coming soon.</p>
              <p className="text-sm mt-2">Our barn is stocking up. Check back shortly.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

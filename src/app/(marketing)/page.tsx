import { prisma } from "@/lib/prisma"
import HomeMarketplaceClient, { HarvestProduct } from "@/components/farm/HomeMarketplaceClient"
import BreedCard from "@/components/farm/BreedCard"
import Link from "next/link"

export const metadata = {
  title: "Osotua Farming — Fresh Produce & Pastoral Livestock",
  description: "Connecting smallholder farmer cooperatives across Kajiado, Nakuru, and Kiambu with direct buyers for fresh produce and certified pedigree livestock.",
}

export default async function HomePage() {
  // Fetch fresh harvest products from DB
  const products = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  })

  // Fetch featured breeds
  const breeds = await prisma.breed.findMany({
    where: { featured: true },
    include: { species: true },
    take: 4,
  })

  const harvestData: HarvestProduct[] = products.length > 0
    ? products.map((p) => {
        const lower = p.name.toLowerCase()
        const farmName = lower.includes("sukuma") || lower.includes("spinach") || lower.includes("maize") || lower.includes("greens")
          ? "Kiambu Greens"
          : lower.includes("milk") || lower.includes("avocado") || lower.includes("fruit") || lower.includes("dorper")
          ? "Nakuru Farms"
          : "Kajiado Co-op"

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          unit: p.unit,
          image: p.image,
          farmName,
          categoryName: p.category.name,
          tag: p.featured ? "Featured Item" : "Fresh Harvest",
        }
      })
    : [
        {
          id: "h1",
          name: "Sukuma Wiki (Collard Greens)",
          slug: "sukuma-wiki",
          price: 30,
          unit: "bunch",
          image: "/images/cabbages.jpeg",
          farmName: "Kiambu Greens",
          categoryName: "Vegetables",
          tag: "Daily Harvest",
        },
        {
          id: "h2",
          name: "Heritage Sun-Ripened Tomatoes",
          slug: "heritage-tomatoes",
          price: 90,
          unit: "kg",
          image: "/images/ripe tomatoes.jpg",
          farmName: "Kajiado Co-op",
          categoryName: "Vegetables",
          tag: "Vine Ripened",
        },
        {
          id: "h3",
          name: "Hass Avocados",
          slug: "hass-avocados",
          price: 25,
          unit: "pc",
          image: "/images/pineapples.jpg",
          farmName: "Nakuru Farms",
          categoryName: "Fruit",
          tag: "Rich Butterfat",
        },
        {
          id: "h4",
          name: "Free-Range Kienyeji Eggs",
          slug: "kienyeji-eggs",
          price: 420,
          unit: "tray of 30",
          image: "/images/chickens.jpg",
          farmName: "Kajiado Co-op",
          categoryName: "Dairy and Eggs",
          tag: "Pasture Fed",
        },
        {
          id: "h5",
          name: "Raw Whole Sahiwal Milk",
          slug: "raw-sahiwal-milk",
          price: 60,
          unit: "L",
          image: "/images/sahiwal cow.jpg",
          farmName: "Nakuru Farms",
          categoryName: "Dairy and Eggs",
          tag: "Unpasteurised",
        },
        {
          id: "h6",
          name: "Stone-Ground Maize Flour",
          slug: "stone-ground-maize-flour",
          price: 150,
          unit: "2kg pack",
          image: "/images/vegetables.jpg",
          farmName: "Kiambu Greens",
          categoryName: "Grains",
          tag: "Artisan Milled",
        },
      ]

  return (
    <div style={{ background: "#FBF7F0" }}>
      {/* ── 1. HERO, HARVEST & VALUE PILLARS ── */}
      <HomeMarketplaceClient harvest={harvestData} />

      {/* ── 2. FEATURED LIVESTOCK & RANCH GENETICS ── */}
      {breeds.length > 0 && (
        <section
          style={{
            background: "linear-gradient(180deg, #FAF5EB 0%, #FFFFFF 100%)",
            padding: "5rem 0 8rem",
            position: "relative",
          }}
        >
          <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 text-[#8E5E16] border border-[#C4882A]/30 mb-2">
                  <i className="bi bi-shield-check text-[#C4882A]" />
                  Certified Pastoral Genetics
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                    fontWeight: 400,
                    color: "#1C1208",
                    lineHeight: 1.1,
                  }}
                >
                  Pedigree Livestock &amp; Breeding Stock
                </h2>
              </div>
              <Link
                href="/breeds"
                className="btn-ghost text-xs py-2 px-4 flex items-center gap-2 bg-[#FFFFFF]"
                style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
              >
                <span>View All Breeds</span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {breeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import HeroSection from "@/components/farm/HeroSection"
import HomeMarketplaceClient, { HarvestProduct } from "@/components/farm/HomeMarketplaceClient"
import FarmStats from "@/components/farm/FarmStats"
import BreedCard from "@/components/farm/BreedCard"
import ProductCard from "@/components/farm/ProductCard"
import NewsletterForm from "@/components/shared/NewsletterForm"
import TerrainWave from "@/components/shared/TerrainWave"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Osotua Farming — Perfecting the Art of Kenyan Pastoral Farming",
  description:
    "12,500+ acres of sustainable pastoral ranching in Kajiado, Kenya. Purebred Boran cattle, Sahiwal dairy genetics, Dorper sheep, and organic farm-to-table produce from smallholder cooperatives.",
}

const photoStripImages = [
  { src: "/images/grazing.jpg", alt: "Boran herd grazing at sunrise" },
  { src: "/images/cabbages.jpeg", alt: "Organic farm harvest" },
  { src: "/images/sahiwal cow.jpg", alt: "Champion Sahiwal cow" },
  { src: "/images/ripe tomatoes.jpg", alt: "Vine-ripened tomatoes" },
  { src: "/images/boer.jpg", alt: "Pedigree Boer stud" },
  { src: "/images/pineapples.jpg", alt: "Fresh orchard harvest" },
  { src: "/images/dorper sheep.jpg", alt: "Dorper sheep flock" },
  { src: "/images/vegetables.jpg", alt: "Ranch farm basket" },
]

export default async function HomePage() {
  const [featuredBreeds, featuredProducts, dbHarvest] = await Promise.all([
    prisma.breed.findMany({
      where: { featured: true },
      include: { species: true },
      take: 4,
    }),
    prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true },
      take: 6,
    }),
    prisma.product.findMany({
      where: { inStock: true },
      include: { category: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
  ])

  const harvestData: HarvestProduct[] = dbHarvest.length > 0
    ? dbHarvest.map((p) => {
        const lower = p.name.toLowerCase()
        const farmName = lower.includes("sukuma") || lower.includes("spinach") || lower.includes("maize") || lower.includes("greens")
          ? "Kiambu Greens"
          : lower.includes("milk") || lower.includes("avocado") || lower.includes("fruit")
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
          name: "Carrots",
          slug: "carrots",
          price: 80,
          unit: "kg",
          image: "/images/carrots.jpg",
          farmName: "Kiambu Greens",
          categoryName: "Vegetables",
          tag: "Daily Harvest",
        },
        {
          id: "h2",
          name: "Avocados",
          slug: "avocados",
          price: 25,
          unit: "pc",
          image: "/images/pineapples.jpg",
          farmName: "Nakuru Farms",
          categoryName: "Fruit",
          tag: "Hass Variety",
        },
        {
          id: "h3",
          name: "Farm Eggs",
          slug: "farm-eggs",
          price: 420,
          unit: "tray",
          image: "/images/eggs.jpg",
          farmName: "Kajiado Co-op",
          categoryName: "Dairy and Eggs",
          tag: "Pasture Fed",
        },
        {
          id: "h4",
          name: "Fresh Milk",
          slug: "fresh-milk",
          price: 60,
          unit: "L",
          image: "/images/sahiwal cow.jpg",
          farmName: "Nakuru Farms",
          categoryName: "Dairy and Eggs",
          tag: "Raw Pasture",
        },
        {
          id: "h5",
          name: "Sukuma Wiki",
          slug: "sukuma-wiki",
          price: 30,
          unit: "bunch",
          image: "/images/cabbages.jpeg",
          farmName: "Kiambu Greens",
          categoryName: "Vegetables",
          tag: "Collard Greens",
        },
        {
          id: "h6",
          name: "Tomatoes",
          slug: "tomatoes",
          price: 90,
          unit: "kg",
          image: "/images/ripe tomatoes.jpg",
          farmName: "Kajiado Co-op",
          categoryName: "Vegetables",
          tag: "Vine Ripened",
        },
      ]

  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>
      
      {/* ── 1. CINEMATIC PASTORAL HERO ── */}
      <HeroSection />

      {/* ── 2. SHAMBA PRODUCE MARKETPLACE & COMMUNITY HARVEST ── */}
      <section className="py-20 w-full">
        <div className="os-container">
          <HomeMarketplaceClient harvest={harvestData} />
        </div>
      </section>

      {/* ── 3. RANGELAND IMPACT & HERD ROI CALCULATOR (AACo Style) ── */}
      <FarmStats />

      {/* ── 4. FEATURED PEDIGREE LIVESTOCK & GENETICS ── */}
      <section className="py-24 w-full">
        <div className="os-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 text-[#8E5E16] border border-[#C4882A]/30 mb-3">
                <i className="bi bi-shield-check text-[#C4882A]" />
                Certified Genetics &bull; Kajiado Stud Book
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  fontWeight: 400,
                  color: "#1C1208",
                  lineHeight: 1.05,
                }}
              >
                Pedigree Livestock &amp; Breeding Stock
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4835] font-mono mt-1 max-w-xl">
                Acclimatised, disease-resistant genetics bred for arid and semi-arid African rangelands.
              </p>
            </div>

            <Link
              href="/breeds"
              className="btn-ghost text-xs py-2.5 px-5 flex items-center gap-2 bg-[#FFFFFF] shadow-xs"
              style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
            >
              <span>Explore All Breeds</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {featuredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. THE BARN STORE (Beef Cuts, Raw Dairy & Pantry) ── */}
      <section
        className="w-full"
        style={{
          background: "linear-gradient(180deg, #FAF5EB 0%, #FFFFFF 100%)",
          padding: "6rem 0",
          borderTop: "1px solid rgba(196,136,42,0.15)",
          borderBottom: "1px solid rgba(196,136,42,0.15)",
        }}
      >
        <div className="os-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30 mb-3">
                <i className="bi bi-basket3-fill text-[#2E7D32]" />
                Fresh From The Pasture
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  fontWeight: 400,
                  color: "#1C1208",
                  lineHeight: 1.05,
                }}
              >
                The Farm Barn
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4835] font-mono mt-1 max-w-xl">
                100% pasture-raised beef cuts, fresh dairy, and organic garden harvests delivered cold-chain.
              </p>
            </div>

            <Link
              href="/barn"
              className="btn-ghost text-xs py-2.5 px-5 flex items-center gap-2 bg-[#FFFFFF] shadow-xs"
              style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
            >
              <span>View Full Barn Store</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AGRITOURISM & FARM TOUR INVITATION ── */}
      <section className="py-24 w-full">
        <div className="os-container">
          <div className="bg-gradient-to-br from-[#1C1208] via-[#2A1D10] to-[#1C1208] rounded-3xl p-8 sm:p-14 text-[#FFFFFF] shadow-2xl relative overflow-hidden border border-[#C4882A]/30">
            
            {/* Subtle gold glow behind */}
            <div
              className="absolute -right-20 -top-20 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(196,136,42,0.25) 0%, transparent 70%)" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/20 text-[#E59A24] border border-[#C4882A]/40">
                  <i className="bi bi-geo-alt-fill text-[#E59A24]" />
                  Ranch Tours &bull; Kajiado County
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                    fontWeight: 400,
                    lineHeight: 1.05,
                  }}
                >
                  Experience Osotua: Visit Our Rangelands
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-2xl">
                  Immerse yourself in authentic Kenyan pastoral life. Tour our Boran herds, inspect purebred breeding stock, learn regenerative rotational grazing practices, and enjoy a farm-to-table bush breakfast.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/visit"
                  className="btn-primary py-3.5 px-6 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-[#C4882A]/30 text-center"
                >
                  <i className="bi bi-calendar-check" />
                  <span>Book a Farm Visit</span>
                </Link>
                <Link
                  href="/invest"
                  className="btn-ghost py-3.5 px-6 text-xs font-mono uppercase tracking-wider font-bold text-center border-white/20 text-white hover:bg-white/10"
                >
                  <i className="bi bi-graph-up-arrow" />
                  <span>Ranch Investment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PHOTO STRIP GALLERY CAROUSEL ── */}
      <section className="py-8 overflow-hidden w-full">
        <div className="photo-strip-track flex gap-4">
          {[...photoStripImages, ...photoStripImages].map((img, i) => (
            <div
              key={i}
              className="photo-strip-item w-64 sm:w-80 h-52 shrink-0 rounded-2xl overflow-hidden border border-[#C4882A]/20 relative shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. NEWSLETTER & TERRAIN WAVE ── */}
      <section className="pt-16 pb-20 w-full text-center">
        <div className="os-container max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 text-[#8E5E16] border border-[#C4882A]/30">
            <i className="bi bi-envelope-paper-heart-fill text-[#C4882A]" />
            Stay Connected
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              color: "#1C1208",
            }}
          >
            Subscribe to The Osotua Gazette
          </h2>
          <p className="text-xs text-[#5C4835] font-mono max-w-md mx-auto">
            Seasonal harvest announcements, breeding stock availability, and pastoral ranching updates directly to your inbox.
          </p>

          <div className="pt-2">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Terrain wave */}
      <div className="w-full">
        <TerrainWave fillColor="#FAF5EB" />
      </div>

    </div>
  )
}

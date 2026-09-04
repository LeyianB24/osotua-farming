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
    <div style={{ background: "#F6F1E6", color: "#211C15", width: "100%", overflowX: "hidden" }}>
      
      {/* ── 1. CINEMATIC PASTORAL HERO ── */}
      <HeroSection />

      {/* ── 2. SHAMBA PRODUCE MARKETPLACE & COMMUNITY HARVEST ── */}
      <section className="py-16 w-full">
        <div className="os-container">
          <HomeMarketplaceClient harvest={harvestData} />
        </div>
      </section>

      {/* ── 3. RANGELAND IMPACT & HERD ROI CALCULATOR ── */}
      <FarmStats />

      {/* ── 4. FEATURED PEDIGREE LIVESTOCK & GENETICS ── */}
      <section className="py-16 w-full">
        <div className="os-container">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-[#EDE6D6] mb-6">
            <div>
              <div
                style={{
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "9px",
                  color: "#C4922E",
                  fontWeight: 700,
                  background: "rgba(196,146,46,0.12)",
                  padding: "3px 8px",
                  borderRadius: "100px",
                  display: "inline-block",
                  marginBottom: "6px",
                }}
              >
                Certified Genetics &bull; Kajiado Stud Book
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(22px, 3.5vw, 30px)",
                  fontWeight: 400,
                  color: "#211C15",
                  margin: 0,
                }}
              >
                Pedigree Livestock &amp; Breeding Stock
              </h2>
            </div>

            <Link
              href="/breeds"
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "10px",
                color: "#C4922E",
                fontWeight: 700,
                textDecoration: "none",
              }}
              className="hover:underline flex items-center gap-1.5"
            >
              <span>VIEW ALL BREEDS →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {featuredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. THE BARN STORE (Beef Cuts, Raw Dairy & Pantry) ── */}
      <section
        className="py-16 w-full"
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #EDE6D6",
          borderBottom: "1px solid #EDE6D6",
        }}
      >
        <div className="os-container">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-[#EDE6D6] mb-6">
            <div>
              <div
                style={{
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "9px",
                  color: "#3F6B3F",
                  fontWeight: 700,
                  background: "rgba(63,107,63,0.12)",
                  padding: "3px 8px",
                  borderRadius: "100px",
                  display: "inline-block",
                  marginBottom: "6px",
                }}
              >
                Fresh From The Pasture
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(22px, 3.5vw, 30px)",
                  fontWeight: 400,
                  color: "#211C15",
                  margin: 0,
                }}
              >
                The Farm Barn
              </h2>
            </div>

            <Link
              href="/barn"
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "10px",
                color: "#C4922E",
                fontWeight: 700,
                textDecoration: "none",
              }}
              className="hover:underline flex items-center gap-1.5"
            >
              <span>VIEW ALL PRODUCE →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AGRITOURISM & FARM TOUR INVITATION ── */}
      <section className="py-16 w-full">
        <div className="os-container">
          <div
            style={{
              background: "#211C15",
              borderRadius: "14px",
              overflow: "hidden",
            }}
            className="p-8 sm:p-12 text-[#FFFFFF] shadow-xl relative border border-[#C4882A]/30"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "9px",
                    color: "#C4922E",
                    fontWeight: 700,
                    background: "rgba(196,146,46,0.15)",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="bi bi-geo-alt-fill text-[#C4922E]" />
                  <span>Ranch Tours &bull; Kajiado County</span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(24px, 3.5vw, 36px)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  Experience Osotua: Visit Our Rangelands
                </h2>

                <p style={{ fontSize: "14px", color: "#CFC7B4", lineHeight: 1.6, maxWidth: "540px", margin: 0 }}>
                  Immerse yourself in authentic Kenyan pastoral life. Tour our Boran herds, inspect purebred breeding stock, learn regenerative rotational grazing practices, and enjoy a farm-to-table bush breakfast.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/visit"
                  style={{
                    background: "#C4922E",
                    color: "#211C15",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="hover:bg-[#A97B22] transition-colors"
                >
                  BOOK A FARM VISIT →
                </Link>
                <Link
                  href="/invest"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  className="hover:bg-white/15 transition-colors"
                >
                  RANCH INVESTMENT →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PHOTO STRIP GALLERY CAROUSEL ── */}
      <section className="py-6 overflow-hidden w-full">
        <div className="photo-strip-track flex gap-3">
          {[...photoStripImages, ...photoStripImages].map((img, i) => (
            <div
              key={i}
              className="photo-strip-item w-56 sm:w-72 h-44 shrink-0 rounded-xl overflow-hidden border border-[#EDE6D6] relative shadow-xs"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. NEWSLETTER & TERRAIN WAVE ── */}
      <section className="pt-12 pb-16 w-full text-center">
        <div className="os-container max-w-2xl space-y-3">
          <div
            style={{
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "9px",
              color: "#C4922E",
              fontWeight: 700,
            }}
          >
            Stay Connected
          </div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 400,
              color: "#211C15",
            }}
          >
            Subscribe to The Osotua Gazette
          </h2>
          <p style={{ fontSize: "13px", color: "#6B6558", maxWidth: "440px", margin: "0 auto" }}>
            Seasonal harvest announcements, breeding stock availability, and pastoral ranching updates directly to your inbox.
          </p>

          <div className="pt-2">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Terrain wave */}
      <div className="w-full">
        <TerrainWave fillColor="#EDE6D6" />
      </div>

    </div>
  )
}

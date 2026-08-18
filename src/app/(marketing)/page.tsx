import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import BreedCard from "@/components/farm/BreedCard"
import ProductCard from "@/components/farm/ProductCard"
import HeroSection from "@/components/farm/HeroSection"
import FarmStats from "@/components/farm/FarmStats"
import TerrainWave from "@/components/shared/TerrainWave"
import NewsletterForm from "@/components/shared/NewsletterForm"
import { RANCH_GALLERY } from "@/lib/images"

async function getFeaturedBreeds() {
  return prisma.breed.findMany({
    where: { featured: true },
    include: { species: true },
    take: 4,
  })
}

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, inStock: true },
    include: { category: true },
    take: 6,
  })
}

export default async function HomePage() {
  const [breeds, products] = await Promise.all([
    getFeaturedBreeds(),
    getFeaturedProducts(),
  ])

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── 1. HERO ── */}
      <HeroSection />

      {/* ── 2. FARM STATS + CALCULATOR ── */}
      <FarmStats />

      {/* ── 3. FEATURED BREEDS ── */}
      {breeds.length > 0 && (
        <section
          style={{
            background: "linear-gradient(180deg, #FBF7F0 0%, #FAF5EB 50%, #FFFFFF 100%)",
            padding: "6rem 0 8rem",
            position: "relative",
          }}
        >
          <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
              <div
                className="eyebrow"
                style={{ color: "#C4882A", marginBottom: "1rem" }}
              >
                What We Raise
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  color: "#1C1208",
                  lineHeight: 1.05,
                  marginBottom: "1rem",
                }}
              >
                Premium livestock,{" "}
                <em style={{ color: "#C4882A", fontStyle: "italic" }}>bred for Africa</em>
              </h2>
              <p style={{ color: "#5C4835", lineHeight: 1.8, maxWidth: "480px" }}>
                Every animal at Osotua is selected for genetic superiority, climate resilience, tick tolerance, and commercial value.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {breeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </div>

            {/* View all CTA */}
            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <Link href="/breeds" className="btn-primary">
                <i className="bi bi-heart-pulse-fill" />
                View All Breeds
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Wave to next section */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <TerrainWave fillColor="#FFFFFF" />
          </div>
        </section>
      )}

      {/* ── 4. HERD PHOTOGRAPHY FULL-BLEED QUOTE ── */}
      <section
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 50%, #FAF5EB 100%)",
          padding: "7rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — quote glass panel */}
            <div
              style={{
                padding: "3rem",
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5EB 100%)",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                borderRadius: "24px",
                boxShadow: "0 20px 60px rgba(196, 136, 42, 0.08)",
              }}
            >
              <div
                className="eyebrow"
                style={{ color: "#C4882A", marginBottom: "1.5rem" }}
              >
                Our Philosophy
              </div>
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#1C1208",
                  lineHeight: 1.3,
                  marginBottom: "2rem",
                  borderLeft: "3px solid #C4882A",
                  paddingLeft: "1.5rem",
                }}
              >
                &ldquo;Osotua — a bond of friendship that endures through care, trust, and the land we share.&rdquo;
              </blockquote>
              <p style={{ color: "#5C4835", lineHeight: 1.8, fontSize: "0.95rem" }}>
                At Osotua Farming, we believe that extraordinary livestock begins with extraordinary care — ethical breeding, regenerative pastures, and deep respect for the Maasai pastoral tradition.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/about" className="btn-primary">
                  <i className="bi bi-tree-fill" />
                  Our Story
                </Link>
              </div>
            </div>

            {/* Right — gallery grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem",
              }}
            >
              {RANCH_GALLERY.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                    borderRadius: "18px",
                    border: "1px solid rgba(196, 136, 42, 0.2)",
                    boxShadow: "0 8px 24px rgba(196, 136, 42, 0.08)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Ranch life at Osotua ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 60%, rgba(28,18,8,0.4) 100%)",
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave to next section */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <TerrainWave fillColor="#FAF5EB" />
        </div>
      </section>

      {/* ── 5. BARN STORE ── */}
      {products.length > 0 && (
        <section
          style={{
            background: "linear-gradient(180deg, #FAF5EB 0%, #FBF7F0 50%, #FFFFFF 100%)",
            padding: "7rem 0 8rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
                The Barn Store
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  color: "#1C1208",
                  lineHeight: 1.05,
                  marginBottom: "1rem",
                }}
              >
                Everything fresh,{" "}
                <em style={{ color: "#C4882A", fontStyle: "italic" }}>everything ours</em>
              </h2>
              <p style={{ color: "#5C4835", lineHeight: 1.8 }}>
                Walk into our Barn or order online. Every product carries the Osotua promise — raised here in Kajiado, handled with artisanal care.
              </p>
            </div>

            {/* Auto-scroll photo strip */}
            <div
              style={{ overflow: "hidden", position: "relative", marginBottom: "3.5rem", borderRadius: "18px" }}
            >
              <div className="photo-strip-track">
                {[...products, ...products].map((product, i) => (
                  <div
                    key={`${product.id}-${i}`}
                    className="photo-strip-item"
                    style={{ width: "200px", height: "140px" }}
                  >
                    <div style={{
                      width: "200px",
                      height: "140px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      position: "relative",
                      background: "#FFFFFF",
                      border: "1px solid rgba(196, 136, 42, 0.2)",
                      boxShadow: "0 4px 16px rgba(196, 136, 42, 0.08)",
                    }}>
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="bi bi-basket3" style={{ fontSize: "2.5rem", color: "rgba(196,136,42,0.3)" }} />
                        </div>
                      )}
                      {/* Glass hover label */}
                      <div style={{
                        position: "absolute",
                        bottom: "0.5rem",
                        left: "0.5rem",
                        right: "0.5rem",
                        padding: "0.35rem 0.65rem",
                        borderRadius: "8px",
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        background: "rgba(28,18,8,0.75)",
                        backdropFilter: "blur(6px)",
                        letterSpacing: "0.06em",
                      }}>
                        {product.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} dark={false} />
              ))}
            </div>

            <div style={{ marginTop: "3.5rem", textAlign: "center" }}>
              <Link href="/barn" className="btn-primary">
                <i className="bi bi-bag-check-fill" />
                Shop the Barn Store
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <TerrainWave fillColor="#FAF5EB" />
          </div>
        </section>
      )}

      {/* ── 6. GET INVOLVED ── */}
      <section
        style={{
          background: "linear-gradient(180deg, #FAF5EB 0%, #FBF7F0 50%, #FFFFFF 100%)",
          padding: "7rem 0 8rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 4rem" }}>
            <div className="eyebrow justify-center" style={{ color: "#C4882A", marginBottom: "1rem" }}>
              Get Involved
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                color: "#1C1208",
                lineHeight: 1.05,
                marginBottom: "1rem",
              }}
            >
              This farm belongs{" "}
              <em style={{ color: "#C4882A", fontStyle: "italic" }}>to all of us</em>
            </h2>
            <p style={{ color: "#5C4835", lineHeight: 1.8 }}>
              Whether you want to work, invest, partner, or learn — there is a place for you at Osotua Farming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "bi-briefcase-fill",     title: "Careers",         desc: "Join our world-class team of farmers, technologists, and agribusiness professionals.", href: "/careers" },
              { icon: "bi-graph-up-arrow",     title: "Invest",          desc: "Partner with us and participate in Kenya's most exciting farm venture.", href: "/invest" },
              { icon: "bi-people-fill",        title: "Partner Farmers", desc: "Supply vegetables, fodder, or eggs under our outgrower scheme.", href: "/partners" },
              { icon: "bi-mortarboard-fill",   title: "Internships",     desc: "Students in agriculture, IT, and business are welcome for attachments.", href: "/careers#internships" },
              { icon: "bi-building-fill",      title: "B2B Supply",      desc: "Hotels, restaurants, and supermarkets — get consistent quality supply.", href: "/contact#b2b" },
              { icon: "bi-calendar-check-fill",title: "Farm Visits",     desc: "Book a guided tour and experience Osotua Farming for yourself.", href: "/visit" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(196,136,42,0.18)] transition-all duration-300 block no-underline flex flex-col p-7"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 100%)",
                  border: "1px solid rgba(196, 136, 42, 0.22)",
                  borderRadius: "20px",
                  boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                }}
              >
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "rgba(196,136,42,0.12)",
                  border: "1px solid rgba(196,136,42,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <i className={`bi ${item.icon}`} style={{ fontSize: "1.4rem", color: "#C4882A" }} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: "#1C1208",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </div>
                <p style={{ color: "#5C4835", fontSize: "0.9rem", lineHeight: 1.7, flex: 1 }}>
                  {item.desc}
                </p>
                <div
                  style={{
                    marginTop: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#C4882A",
                  }}
                >
                  Learn more
                  <i className="bi bi-arrow-right" style={{ fontSize: "0.8rem" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <TerrainWave fillColor="#C4882A" />
        </div>
      </section>

      {/* ── 7. BRAND QUOTE — TYPOGRAPHIC ── */}
      <section style={{ background: "#C4882A", padding: "6rem 0" }}>
        <div className="os-container">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#1C1208",
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}
            >
              &ldquo;From our land, to your table — nothing less than extraordinary.&rdquo;
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <span style={{ display: "block", width: "3rem", height: "1px", background: "rgba(28,18,8,0.35)" }} />
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "rgba(28,18,8,0.7)",
                }}
              >
                Osotua Farming, Kajiado County
              </span>
              <span style={{ display: "block", width: "3rem", height: "1px", background: "rgba(28,18,8,0.35)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. NEWSLETTER (Warm Cream & Savanna) ── */}
      <section
        style={{
          background: "linear-gradient(180deg, #FAF5EB 0%, #F5EFE4 100%)",
          padding: "5rem 0",
          borderTop: "1px solid rgba(196,136,42,0.2)",
        }}
      >
        <div className="os-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "2rem",
            }}
          >
            <div>
              <div className="eyebrow justify-center" style={{ color: "#C4882A", marginBottom: "1rem" }}>
                Stay Connected
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "#1C1208",
                  marginBottom: "0.75rem",
                }}
              >
                Stay close to the land
              </h3>
              <p style={{ color: "#5C4835", fontSize: "0.95rem" }}>
                Monthly updates — new breeds, seasonal harvests, farm stories, and exclusive offers.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  )
}

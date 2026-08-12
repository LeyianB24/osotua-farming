import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BarnClient from "@/components/farm/BarnClient"
import Slideshow from "@/components/shared/Slideshow"
import { RANCH_PANO, PRODUCE_SLIDESHOW } from "@/lib/images"

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

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        {/* Full-bleed background photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={RANCH_PANO}
            alt="The Barn Store at Osotua Farming"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.2, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,18,8,0.95) 0%, rgba(28,18,8,0.7) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1C1208 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Direct Farm Store &amp; Kitchen Supply
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Everything fresh,
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>everything ours</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2.5rem" }}>
            Walk into our Barn or order directly online. Every product carries the Osotua promise — raised here in Kajiado, handled with artisanal care, and delivered fresh to your doorstep.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(196,136,42,0.2)" }}>
            {[
              { icon: "bi-lightning-fill", label: "Daily Harvest Active", pulse: true },
              { icon: "bi-leaf-fill", label: "Pesticide-Free Produce" },
              { icon: "bi-arrow-repeat", label: "Traceable Farm-to-Fork" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ position: "relative" }}>
                  <i className={`bi ${item.icon}`} style={{ color: "#C4882A", fontSize: "0.95rem" }} />
                  {item.pulse && (
                    <span style={{
                      position: "absolute", top: "-1px", right: "-3px",
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: "#86efac", display: "block",
                      animation: "whatsappRing 2s ease-out infinite",
                    }} />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,228,0.55)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FRESHNESS FEATURE BAR ── */}
      <div style={{ background: "#1C1208", paddingBottom: "3rem", position: "relative", zIndex: 10 }}>
        <div className="os-container" style={{ transform: "translateY(-3rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Produce slideshow */}
            <div className="lg:col-span-2" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
              <Slideshow slides={PRODUCE_SLIDESHOW} heightClass="h-72 sm:h-80" interval={3200} />
            </div>

            {/* Feature card */}
            <div
              className="glass-dark"
              style={{
                padding: "2.25rem",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid rgba(196,136,42,0.25)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div>
                <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.25rem" }}>
                  Fresh From The Ranch
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                  }}
                >
                  Garden, orchard &amp; pasture
                </h2>
                <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.85rem", lineHeight: 1.75 }}>
                  Every Barn item originates right here — pesticide-free leafy greens, vine-ripened crops, free-range eggs, and dry-aged grass-fed beef raised on the Osotua rangelands.
                </p>
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.35)" }}>
                  Next Delivery
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    color: "#C4882A",
                  }}
                >
                  Same-Day Express
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BARN CATALOG ── */}
      <BarnClient initialProducts={products} categories={categories} />
    </div>
  )
}

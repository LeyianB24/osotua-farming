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
        {/* Pastoral background overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={RANCH_PANO}
            alt="The Barn Store at Osotua Farming"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.18, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(251,247,240,0.95) 0%, rgba(251,247,240,0.8) 60%, rgba(251,247,240,0.5) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #FBF7F0 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1.5rem", fontWeight: 700 }}>
            Direct Farm Store &amp; Kitchen Supply
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Everything fresh,
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>everything ours</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "540px", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
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
                      background: "#2E7D32", display: "block",
                      animation: "whatsappRing 2s ease-out infinite",
                    }} />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#8E5E16",
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
      <div style={{ background: "#FBF7F0", paddingBottom: "2rem", position: "relative", zIndex: 10 }}>
        <div className="os-container" style={{ transform: "translateY(-2rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Produce slideshow */}
            <div className="lg:col-span-2" style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(196, 136, 42, 0.25)", boxShadow: "0 20px 60px rgba(196,136,42,0.12)" }}>
              <Slideshow slides={PRODUCE_SLIDESHOW} heightClass="h-72 sm:h-80" interval={3200} />
            </div>

            {/* Feature card */}
            <div
              style={{
                padding: "2.25rem",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                boxShadow: "0 12px 36px rgba(196, 136, 42, 0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div>
                <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1.25rem", fontWeight: 700 }}>
                  Fresh From The Ranch
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#1C1208",
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                  }}
                >
                  Garden, orchard &amp; pasture
                </h2>
                <p style={{ color: "#5C4835", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  Every Barn item originates right here — pesticide-free leafy greens, vine-ripened crops, free-range eggs, and dry-aged grass-fed beef raised on the Osotua rangelands.
                </p>
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(196, 136, 42, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8E5E16" }}>
                  Next Delivery
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.3rem",
                    fontWeight: 600,
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

import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BreedsClient from "@/components/farm/BreedsClient"
import Slideshow from "@/components/shared/Slideshow"
import { HERD_FIELD, LIVESTOCK_SLIDESHOW } from "@/lib/images"

export const metadata = { title: "Our Breeds — Osotua Farming" }

async function getBreeds() {
  try {
    return await prisma.breed.findMany({
      include: { species: true },
      orderBy: { species: { name: "asc" } },
    })
  } catch {
    return []
  }
}

async function getSpecies() {
  try {
    return await prisma.species.findMany({ orderBy: { name: "asc" } })
  } catch {
    return []
  }
}

export default async function BreedsPage() {
  const [breeds, species] = await Promise.all([getBreeds(), getSpecies()])

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-green noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        {/* Pastoral background overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={HERD_FIELD}
            alt="Osotua herd at pasture"
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
            Certified Purebred Livestock &amp; Superior Genetics
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
            Premium breeds,
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>bred for Africa</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "540px", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
            Every bull, cow, ram, and buck in our herd is rigorously selected for genetic superiority, tick &amp; drought tolerance, rapid weight gain, and long-term commercial yield.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(196,136,42,0.2)" }}>
            {[
              { icon: "bi-patch-check-fill", label: "Veterinary Certified &amp; Vaccinated" },
              { icon: "bi-clipboard2-check", label: "Movement Permits Coordinated" },
              { icon: "bi-geo-alt-fill", label: "Kajiado Rangeland Adapted" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <i className={`bi ${item.icon}`} style={{ color: "#C4882A", fontSize: "0.95rem" }} />
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#8E5E16",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIVESTOCK SLIDESHOW ── */}
      <div
        style={{
          background: "#FBF7F0",
          paddingBottom: "2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="os-container" style={{ transform: "translateY(-2rem)" }}>
          <div style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(196, 136, 42, 0.25)", boxShadow: "0 20px 60px rgba(196,136,42,0.12)" }}>
            <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3500} />
          </div>
        </div>
      </div>

      {/* ── BREEDS CATALOG (client) ── */}
      <BreedsClient initialBreeds={breeds} speciesList={species} />
    </div>
  )
}

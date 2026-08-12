import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BreedsClient from "@/components/farm/BreedsClient"
import Slideshow from "@/components/shared/Slideshow"
import { HERD_FIELD, LIVESTOCK_SLIDESHOW } from "@/lib/images"

export const metadata = { title: "Our Breeds — Osotua Farming" }

async function getBreeds() {
  return prisma.breed.findMany({
    include: { species: true },
    orderBy: { species: { name: "asc" } },
  })
}

async function getSpecies() {
  return prisma.species.findMany({ orderBy: { name: "asc" } })
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
        {/* Full-bleed background photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={HERD_FIELD}
            alt="Osotua herd at pasture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.2, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,18,8,0.95) 0%, rgba(28,18,8,0.7) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1a2010 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Certified Purebred Livestock &amp; Superior Genetics
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
            Premium breeds,
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>bred for Africa</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2.5rem" }}>
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
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,228,0.55)",
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
          background: "#1C1208",
          paddingBottom: "3rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="os-container" style={{ transform: "translateY(-3rem)" }}>
          <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
            <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3500} />
          </div>
        </div>
      </div>

      {/* ── BREEDS CATALOG (client) ── */}
      <BreedsClient initialBreeds={breeds} speciesList={species} />
    </div>
  )
}

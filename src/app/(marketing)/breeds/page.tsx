import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BreedsClient from "@/components/farm/BreedsClient"
import Slideshow from "@/components/shared/Slideshow"
import { HERD_FIELD, LIVESTOCK_SLIDESHOW } from "@/lib/images"

export const metadata = {
  title: "Our Breeds — Osotua Farming",
  description: "Explore Kenya Stud Book registered pedigree Boran cattle, Sahiwal dairy cows, Boer goats, and Dorper sheep from Osotua Farming.",
}

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
    <div style={{ background: "#F5F0E8", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERD_FIELD}
            alt="Osotua herd at pasture"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8]/95 via-[#F5F0E8]/85 to-[#F5F0E8]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-6 text-white"
            style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
          >
            <i className="bi bi-patch-check text-xs" aria-hidden="true" />
            <span>CERTIFIED PUREBRED LIVESTOCK · SUPERIOR GENETICS</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Pedigree Breeds, <br />
            <span style={{ color: "#C99A2E" }}>Bred for Africa</span>
          </h1>

          <p
            className="text-base sm:text-xl text-[#8E7E70] max-w-2xl leading-relaxed mb-10 font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Every bull, cow, ram, and buck in our herd is rigorously selected for genetic superiority, drought hardiness, rapid weight gain, and long-term pastoral yield.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[#D4C9B0]">
            {[
              { icon: "bi-shield-check", label: "Veterinary Certified & Vaccinated" },
              { icon: "bi-file-earmark-check", label: "Movement Permits Coordinated" },
              { icon: "bi-geo-alt", label: "Kajiado Rangeland Adapted" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <i className={`bi ${item.icon} text-[#C99A2E] text-base`} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208]"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVESTOCK SLIDESHOW ── */}
      <section className="bg-[#F5F0E8] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
          <div
            className="overflow-hidden border border-[#D4C9B0] shadow-xl bg-[#FAF7F2]"
            style={{ borderRadius: "2px" }}
          >
            <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3500} />
          </div>
        </div>
      </section>

      {/* ── BREEDS CATALOG (client) ── */}
      <BreedsClient initialBreeds={breeds} speciesList={species} />
    </div>
  )
}

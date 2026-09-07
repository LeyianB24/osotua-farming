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
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-green noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERD_FIELD}
            alt="Osotua herd at pasture"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F0]/95 via-[#FBF7F0]/85 to-[#FBF7F0]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7F0] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-amber-500/10 text-[#8E5E16] border border-amber-500/25">
            <span>CERTIFIED PUREBRED LIVESTOCK &bull; SUPERIOR GENETICS</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Premium breeds, <br />
            <em className="font-normal italic text-gradient-gold">bred for Africa</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed mb-10 font-normal">
            Every bull, cow, ram, and buck in our herd is rigorously selected for genetic superiority, tick &amp; drought tolerance, rapid weight gain, and long-term commercial yield.
          </p>

          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-amber-900/15">
            {[
              { icon: "ti-certificate", label: "Veterinary Certified & Vaccinated" },
              { icon: "ti-clipboard-check", label: "Movement Permits Coordinated" },
              { icon: "ti-map-pin", label: "Kajiado Rangeland Adapted" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <i className={`ti ${item.icon} text-[#C4882A] text-lg`} />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8E5E16]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVESTOCK SLIDESHOW ── */}
      <section className="bg-[#FBF7F0] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
          <div className="rounded-3xl overflow-hidden border border-amber-900/15 shadow-2xl">
            <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3500} />
          </div>
        </div>
      </section>

      {/* ── BREEDS CATALOG (client) ── */}
      <BreedsClient initialBreeds={breeds} speciesList={species} />
    </div>
  )
}

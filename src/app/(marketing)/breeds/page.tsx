import { prisma } from "@/lib/prisma"
import BreedsClient from "@/components/farm/BreedsClient"
import PageHero from "@/components/farm/PageHero"
import Slideshow from "@/components/shared/Slideshow"
import ConservationSection from "@/components/farm/ConservationSection"
import { HERD_FIELD, LIVESTOCK_SLIDESHOW } from "@/lib/images"

export const metadata = {
  title: "Pedigree Livestock & Certified Genetics",
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
    <div className="w-full overflow-x-hidden bg-[#F5F0E8] text-[#1C1208]">
      {/* ── STANDARDIZED CINEMATIC PAGE HERO ── */}
      <PageHero
        image={{
          src: HERD_FIELD,
          alt: "Osotua pedigree cattle and sheep herd at pasture in Kajiado",
        }}
        eyebrow="CERTIFIED PUREBRED LIVESTOCK · SUPERIOR GENETICS"
        title={
          <>
            Pedigree Breeds, <br />
            <span className="text-[#C99A2E]">Bred for Africa</span>
          </>
        }
        lead="Every bull, cow, ram, and buck in our herd is rigorously selected for genetic superiority, drought hardiness, rapid weight gain, and long-term pastoral yield."
        trustChips={[
          { label: "Veterinary Certified & Vaccinated" },
          { label: "Movement Permits Coordinated" },
          { label: "Kajiado Rangeland Adapted" },
        ]}
        ctaText="View Pedigree Catalog"
        ctaHref="#breeds-catalog"
        secondaryCtaText="WhatsApp Livestock Desk"
        secondaryCtaHref="https://wa.me/254755758208"
        stats={[
          { value: "4", label: "Purebred Species" },
          { value: "850+", label: "Livestock Head" },
          { value: "100%", label: "Stud Book Registered" },
        ]}
      />

      {/* ── LIVESTOCK SLIDESHOW ── */}
      <section className="bg-[#F5F0E8] pb-12 pt-8 relative z-10">
        <div className="os-container">
          <div
            className="overflow-hidden border border-[#D4C9B0] shadow-xl bg-[#FAF7F2]"
            style={{ borderRadius: "2px" }}
          >
            <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-72 sm:h-96" interval={3500} />
          </div>
        </div>
      </section>

      {/* ── BREEDS CATALOG (client) ── */}
      <div id="breeds-catalog">
        <BreedsClient initialBreeds={breeds} speciesList={species} />
      </div>

      {/* ── CONSERVATION & WILDLIFE STEWARDSHIP ── */}
      <ConservationSection />
    </div>
  )
}

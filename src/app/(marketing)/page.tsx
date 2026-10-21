import { prisma } from "@/lib/prisma";
import HeroMaster from "@/components/farm/HeroMaster";
import RanchAuthoritySection from "@/components/farm/RanchAuthoritySection";
import WhatWeAreBento from "@/components/farm/WhatWeAreBento";
import BarnStoreBento from "@/components/farm/BarnStoreBento";
import PastoralStandardsTimeline from "@/components/farm/PastoralStandardsTimeline";
import ExperienceBannerSection from "@/components/farm/ExperienceBannerSection";
import ConservationSection from "@/components/farm/ConservationSection";
import SocialShowcaseSection from "@/components/farm/SocialShowcaseSection";
import BrandQuoteSection from "@/components/farm/BrandQuoteSection";

async function getFeaturedBreeds() {
  try {
    return await prisma.breed.findMany({
      where: { featured: true },
      include: { species: true },
      orderBy: { pricePerHead: "desc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: {
    absolute: "Osotua Farming — Indigenous Livestock, Dairy & Organic Produce Kenya",
  },
  description:
    "Osotua Farming is a premier Kenyan smart farm raising purebred indigenous livestock (Boran, Bonsmara, Sahiwal, Dorper, Red Maasai), artisanal dairy, and organic provisions across 4,200 acres in Kajiado County.",
  keywords: [
    "Osotua Farming",
    "Osotua",
    "Osotua Farm Kenya",
    "Osotua Ranches",
    "Kajiado farm",
    "purebred livestock Kenya",
    "Boran cattle",
    "Sahiwal cows",
    "Red Maasai sheep",
  ],
};

export default async function HomePage() {
  const featuredBreeds = await getFeaturedBreeds();

  return (
    <div className="w-full overflow-x-hidden bg-[#FAF7F2]">

      {/* ── 01. HERO MASTER: Dark Pastoral · Left Scrim · 4 Stats Strip ── */}
      <HeroMaster />

      {/* ── 02. RANCH AUTHORITY: 2-Column Trust Breakdown (Modeled after Compass Cartage AboutAuthority) ── */}
      <RanchAuthoritySection />

      {/* ── 03. PEDIGREE LIVESTOCK: 3 Cards Matrix (Modeled after Compass Cartage FeaturedServicesMatrix) ── */}
      <WhatWeAreBento initialBreeds={featuredBreeds} />

      {/* ── 04. THE FARM BARN & HARVEST PANTRY: 6 Provisions Grid · Add to Basket ── */}
      <BarnStoreBento />

      {/* ── 05. PASTORAL STANDARDS WORKFLOW: 4-Step Process on Deep Obsidian Bedrock ── */}
      <PastoralStandardsTimeline />

      {/* ── 06. EXPERIENCE OSOTUA: Guided Pastoral Tours Banner ── */}
      <ExperienceBannerSection />

      {/* ── 07. CONSERVATION & WILDLIFE: Livestock & Wildlife Living as One ── */}
      <ConservationSection />

      {/* ── 08. OFFICIAL SOCIAL SHOWCASE: Instagram & TikTok Feed ── */}
      <SocialShowcaseSection />

      {/* ── 09. BRAND COVENANT AUTHORITY QUOTE ── */}
      <BrandQuoteSection />
    </div>
  );
}

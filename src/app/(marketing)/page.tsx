import HeroMaster from "@/components/farm/HeroMaster";
import WhatWeAreBento from "@/components/farm/WhatWeAreBento";
import BarnStoreBento from "@/components/farm/BarnStoreBento";
import ExperienceBannerSection from "@/components/farm/ExperienceBannerSection";
import RangelandsGallerySection from "@/components/farm/RangelandsGallerySection";
import SocialShowcaseSection from "@/components/farm/SocialShowcaseSection";
import BrandQuoteSection from "@/components/farm/BrandQuoteSection";

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

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: "#F5F0E8" }}>

      {/* ── 01. HERO MASTER: Dark Pastoral · Left Scrim · 4 Stats Strip ── */}
      <HeroMaster />

      {/* ── 02. PEDIGREE LIVESTOCK: 3 Cards (Boran, Bonsmara, Sahiwal) · Certified Genetics ── */}
      <WhatWeAreBento />

      {/* ── 03. THE FARM BARN & HARVEST PANTRY: 6 Provisions Grid · Add to Cart ── */}
      <BarnStoreBento />

      {/* ── 04. EXPERIENCE OSOTUA: Visit Our Rangelands Pastoral Banner ── */}
      <ExperienceBannerSection />

      {/* ── 05. EXPERIENCE OUR RANGELANDS: Dark Savanna Photo Gallery ── */}
      <RangelandsGallerySection />

      {/* ── 06. OFFICIAL SOCIAL SHOWCASE: Instagram & TikTok Feed ── */}
      <SocialShowcaseSection />

      {/* ── 07. BRAND COVENANT QUOTE ── */}
      <BrandQuoteSection />
    </div>
  );
}

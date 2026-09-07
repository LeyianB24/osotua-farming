import HeroMaster from "@/components/farm/HeroMaster";
import WhatWeAreBento from "@/components/farm/WhatWeAreBento";
import BarnStoreBento from "@/components/farm/BarnStoreBento";
import ExperienceBannerSection from "@/components/farm/ExperienceBannerSection";
import RangelandsGallerySection from "@/components/farm/RangelandsGallerySection";
import SocialShowcaseSection from "@/components/farm/SocialShowcaseSection";
import BrandQuoteSection from "@/components/farm/BrandQuoteSection";

export const metadata = {
  title: "Osotua Farming — From Our Land, To Your Table",
  description:
    "A world-class Kenyan agribusiness platform raising purebred indigenous livestock, cold-pressing artisanal dairy, and harvesting organic provisions across 4,200 acres in Kajiado County.",
};

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: "#F5F0E8" }}>
      <h1 className="sr-only">
        Osotua Farming — Premium Kenyan Agribusiness and Pastoral Rangelands Platform
      </h1>

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

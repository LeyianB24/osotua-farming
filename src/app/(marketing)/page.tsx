import HeroMaster from "@/components/farm/HeroMaster";
import MarqueeStrip from "@/components/farm/MarqueeStrip";
import WhatWeAreBento from "@/components/farm/WhatWeAreBento";
import BarnStoreBento from "@/components/farm/BarnStoreBento";
import ScrollytellingSection from "@/components/farm/ScrollytellingSection";
import TrustBento from "@/components/farm/TrustBento";
import GetInvolvedBento from "@/components/farm/GetInvolvedBento";
import SocialShowcaseSection from "@/components/farm/SocialShowcaseSection";
import BrandQuoteSection from "@/components/farm/BrandQuoteSection";
import NewsletterSection from "@/components/farm/NewsletterSection";

export const metadata = {
  title: "Osotua Farming — From Our Land, To Your Table",
  description:
    "A world-class Kenyan agribusiness platform raising purebred indigenous livestock, cold-pressing artisanal dairy, and harvesting organic provisions across 3,200 acres in Kajiado County.",
};

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ background: "#FBF7F0" }}>
      <h2 className="sr-only">
        Osotua Farming — Premium Kenyan Agribusiness and Pastoral Rangelands Platform
      </h2>

      {/* ── 02. HERO: Dark Soil · Full Viewport · Type-First ── */}
      <HeroMaster />

      {/* ── 03. MARQUEE STRIP: Gold Text · Scrolling Breed Names ── */}
      <MarqueeStrip theme="gold" />

      {/* ── 04. WHAT WE ARE: Dark Soil · 12-Column Bento Grid ── */}
      <WhatWeAreBento />

      {/* ── 05. THE BARN STORE: Cream Background (#FBF7F0) · Product Bento ── */}
      <BarnStoreBento />

      {/* ── 06. MARQUEE STRIP: Green Text · Pasture & Provision Names (Reverse) ── */}
      <MarqueeStrip theme="green" reverse />

      {/* ── 07. SCROLLYTELLING: Dark Soil · Sticky 3-Chapter Narrative ── */}
      <ScrollytellingSection />

      {/* ── 08. TRUST BENTO: Three Architectural Pillars ── */}
      <TrustBento />

      {/* ── 09. SOCIAL SHOWCASE: Instagram & TikTok Rangeland Feed ── */}
      <SocialShowcaseSection />

      {/* ── 10. GET INVOLVED: Hide Brown · 6-Cell Bento ── */}
      <GetInvolvedBento />

      {/* ── 11. BRAND QUOTE: Cream · Pure Editorial Typography Moment ── */}
      <BrandQuoteSection />

      {/* ── 11. NEWSLETTER: Savanna Gold (#C4882A) · Split Layout Gazette ── */}
      <NewsletterSection />

    </div>
  );
}

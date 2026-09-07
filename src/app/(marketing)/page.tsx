import { prisma } from "@/lib/prisma"
import HarvestProduceGrid from "@/components/farm/HarvestProduceGrid"
import HarvestCalendar from "@/components/farm/HarvestCalendar"
import HomeTraceabilitySection from "@/components/farm/HomeTraceabilitySection"
import BreedCard from "@/components/farm/BreedCard"
import NewsletterForm from "@/components/shared/NewsletterForm"
import TerrainWave from "@/components/shared/TerrainWave"
import Link from "next/link"
import Image from "next/image"
import { LOGO } from "@/lib/images"

export const metadata = {
  title: "Osotua Farming — Fresh Produce & Pastoral Livestock from Kenya",
  description:
    "Buy seasonal vegetables, organic fruit, pasture dairy, and purebred livestock from a cooperative of small-scale farmers near you in Kajiado, Kenya.",
}

const photoStripImages = [
  { src: "/images/grazing.jpg", alt: "Boran herd grazing at sunrise" },
  { src: "/images/cabbages.jpeg", alt: "Organic farm harvest" },
  { src: "/images/sahiwal cow.jpg", alt: "Champion Sahiwal cow" },
  { src: "/images/ripe tomatoes.jpg", alt: "Vine-ripened tomatoes" },
  { src: "/images/boer goat.jpg", alt: "Pedigree Boer stud" },
  { src: "/images/pineapples.jpg", alt: "Fresh orchard harvest" },
  { src: "/images/dorper ram.jpg", alt: "Dorper sheep flock" },
  { src: "/images/vegetables.jpg", alt: "Ranch farm basket" },
  { src: "/images/boran bulls.jpg", alt: "Stud book Boran bulls" },
  { src: "/images/apples.jpg", alt: "Highland orchard apples" },
  { src: "/images/beef cuts.jpg", alt: "Dry-aged grass-fed beef" },
  { src: "/images/eggs.jpg", alt: "Free-range pasture eggs" },
]

export default async function HomePage() {
  const featuredBreeds = await prisma.breed.findMany({
    where: { featured: true },
    include: { species: true },
    take: 3,
  })

  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>
      <h2 className="sr-only">
        Homepage for Osotua Farming, a farm-to-market website with a hero banner, featured produce, and community story sections
      </h2>

      {/* ── 1. CINEMATIC LUXURY HERO SECTION ── */}
      <section className="relative min-h-[92vh] sm:min-h-[98vh] flex flex-col justify-between pt-36 sm:pt-44 pb-16 overflow-hidden">
        {/* Background photo layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/grazing.jpg"
            alt="Osotua pastoral rangelands and grazing cattle herd at sunrise"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105"
            style={{ filter: "brightness(0.85) saturate(1.15)" }}
          />
          {/* Rich cinematic overlays */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 25%, rgba(196,136,42,0.18) 0%, transparent 60%),
                linear-gradient(180deg, rgba(20, 14, 6, 0.75) 0%, rgba(20, 14, 6, 0.45) 45%, rgba(20, 14, 6, 0.85) 85%, #FBF7F0 100%)
              `,
            }}
          />
        </div>

        {/* Ambient floating glow points */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none z-1" />

        {/* Main Hero Content */}
        <div className="os-container relative z-10 text-center flex flex-col items-center my-auto">
          {/* Eyebrow badge with official circular Logo */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.24em] mb-8 shadow-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.16)",
              border: "1px solid rgba(245, 199, 109, 0.5)",
              color: "#F5C76D",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-amber-300 shrink-0 bg-white">
              <Image
                src={LOGO}
                alt="Osotua Seal"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span>LIVE FROM KAJIADO RANGELANDS &bull; KENYA SMART FARM</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.04] tracking-tight max-w-5xl drop-shadow-md mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Pure Pastoral Heritage, <br className="hidden sm:inline" />
            <em className="font-normal italic text-gradient-gold">From Our Land</em> To Your Table
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-200/90 leading-relaxed max-w-2xl mx-auto mb-11 font-normal drop-shadow-sm">
            Ethically raised indigenous livestock, sunrise-harvested organic produce, pure pasture dairy, and raw honey delivered direct from our smallholder farmer cooperative.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-5 w-full max-w-lg">
            <Link
              href="/barn"
              className="btn-primary flex-1 min-w-[200px] py-4 text-center text-xs tracking-widest shadow-xl"
            >
              <i className="ti ti-shopping-cart text-lg" />
              <span>SHOP THE BARN</span>
            </Link>

            <Link
              href="/breeds"
              className="btn-ghost flex-1 min-w-[200px] py-4 text-center text-xs tracking-widest"
            >
              <i className="ti ti-dna-2 text-lg" />
              <span>PEDIGREE BREEDS</span>
            </Link>
          </div>
        </div>

        {/* ── REAL-TIME STATS / TRUST BAR (Floating luxury glass panel) ── */}
        <div className="os-container relative z-10 mt-16 sm:mt-20">
          <div
            className="rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            style={{
              background: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(196, 136, 42, 0.28)",
              boxShadow: "0 24px 60px rgba(20, 14, 6, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
            }}
          >
            {/* Stat 1 */}
            <div className="flex items-center gap-4 p-2 border-r border-stone-200/60 last:border-none">
              <div className="w-13 h-13 rounded-2xl bg-emerald-700/10 text-[#2E6B34] flex items-center justify-center shrink-0 text-2xl font-bold">
                <i className="ti ti-users-group" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1C1208]" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  40+ Co-ops
                </div>
                <div className="text-[11px] font-semibold text-[#6B6558] uppercase tracking-wider mt-0.5">
                  Direct Fair Trade
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 p-2 border-r border-stone-200/60 last:border-none">
              <div className="w-13 h-13 rounded-2xl bg-amber-600/10 text-[#C4882A] flex items-center justify-center shrink-0 text-2xl font-bold">
                <i className="ti ti-certificate" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1C1208]" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  1,200+ Studs
                </div>
                <div className="text-[11px] font-semibold text-[#6B6558] uppercase tracking-wider mt-0.5">
                  Kenya Stud Book
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 p-2 border-r border-stone-200/60 last:border-none">
              <div className="w-13 h-13 rounded-2xl bg-emerald-700/10 text-[#2E6B34] flex items-center justify-center shrink-0 text-2xl font-bold">
                <i className="ti ti-leaf" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1C1208]" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  100% Organic
                </div>
                <div className="text-[11px] font-semibold text-[#6B6558] uppercase tracking-wider mt-0.5">
                  Zero Hormones
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 p-2">
              <div className="w-13 h-13 rounded-2xl bg-teal-600/10 text-[#0D6E67] flex items-center justify-center shrink-0 text-2xl font-bold">
                <i className="ti ti-truck-delivery" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1C1208]" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  6 AM Harvest
                </div>
                <div className="text-[11px] font-semibold text-[#6B6558] uppercase tracking-wider mt-0.5">
                  Same-Day Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THIS WEEK'S HARVEST (Interactive Produce Grid & Seasonal Calendar) ── */}
      <section className="py-24 sm:py-32 w-full space-y-16">
        <div className="os-container">
          <HarvestProduceGrid />
        </div>
        <div className="os-container">
          <HarvestCalendar />
        </div>
      </section>

      {/* ── 2B. DIGITAL TRACEABILITY PASSPORT (Interactive Verification) ── */}
      <HomeTraceabilitySection />


      {/* ── 3. VISUAL STORY SPLIT: RANGELANDS HERITAGE (New Image Rich Feature) ── */}
      <section className="py-24 sm:py-36 bg-mesh-earth noise">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Photo Stack */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/15">
                <Image
                  src="/images/osotua-rangelands-herd.jpg"
                  alt="Osotua rangelands grazing herd"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Inset Photo */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/boran heifers.jpg"
                  alt="Pedigree Boran heifers"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>

              {/* Verified Stamp */}
              <div className="absolute top-6 left-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-amber-500/30 shadow-lg">
                <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-amber-500 shrink-0">
                  <Image src={LOGO} alt="Osotua Seal" fill sizes="24px" className="object-cover" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8E5E16]">
                  3,200 Titled Acres &bull; Kajiado
                </span>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-amber-500/10 text-[#8E5E16] border border-amber-500/25">
                <span>AUTHENTIC PASTORAL HERITAGE</span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                Where Maa Tradition Meets <span className="text-gradient-gold font-semibold">Agribusiness Innovation</span>
              </h2>

              <p className="text-base sm:text-lg text-[#5C4835] leading-relaxed m-0">
                Osotua was founded on the belief that centuries-old pastoral intuition and modern rotational science produce the healthiest livestock and sweetest organic harvests in East Africa.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="card-luxury p-5 space-y-1 bg-white">
                  <div className="font-serif text-2xl font-bold text-[#C4882A]">100% Traceable</div>
                  <div className="text-xs text-[#5C4835]">From pasture paddock to kitchen table</div>
                </div>
                <div className="card-luxury p-5 space-y-1 bg-white">
                  <div className="font-serif text-2xl font-bold text-[#2E6B34]">Zero Hormones</div>
                  <div className="text-xs text-[#5C4835]">Pure natural rangeland forage</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/about" className="btn-primary py-3.5 px-8 text-xs tracking-widest shadow-lg">
                  <span>DISCOVER OUR STORY</span>
                  <i className="ti ti-arrow-right" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. FOUR CORE PILLARS OF OSOTUA ── */}
      <section className="py-24 sm:py-36 w-full bg-gradient-to-b from-transparent via-[#F5EFE4]/60 to-transparent">
        <div className="os-container space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-amber-500/10 text-[#8E5E16] border border-amber-500/25">
              <span>THE OSOTUA COVENANT</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              Four Pillars of <span className="text-gradient-gold font-semibold">Smart Pastoralism</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6B6558] max-w-2xl mx-auto leading-relaxed">
              We unite centuries of Maasai rangeland stewardship with cutting-edge agribusiness logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="card-luxury p-8 sm:p-9 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#2E6B34] border border-emerald-200/80 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <i className="ti ti-plant" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Regenerative Grazing
                </h3>
                <p className="text-[14px] text-[#5C4835] leading-relaxed m-0">
                  Rotational pasture cycles revitalise degraded savanna soils, enhance water tables, and preserve biodiversity across Kajiado rangelands.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-stone-100 flex items-center text-[11px] font-bold uppercase tracking-wider text-[#2E6B34]">
                <span>100% Eco-Restorative</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="card-luxury p-8 sm:p-9 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#C4882A] border border-amber-200/80 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <i className="ti ti-dna" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Pedigree Genetics
                </h3>
                <p className="text-[14px] text-[#5C4835] leading-relaxed m-0">
                  Kenya Stud Book certified Boran, Sahiwal, Boer, and Dorper breeding stock selected for drought tolerance, rapid gain, and high milk yields.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-stone-100 flex items-center text-[11px] font-bold uppercase tracking-wider text-[#C4882A]">
                <span>Stud Book Certified</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="card-luxury p-8 sm:p-9 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#0D6E67] border border-teal-200/80 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <i className="ti ti-truck" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Cold-Chain Dispatch
                </h3>
                <p className="text-[14px] text-[#5C4835] leading-relaxed m-0">
                  Harvested at dawn, temperature-controlled, and dispatched the exact same day directly to kitchens and hospitality partners in Nairobi.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-stone-100 flex items-center text-[11px] font-bold uppercase tracking-wider text-[#0D6E67]">
                <span>Zero Storage Decay</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="card-luxury p-8 sm:p-9 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#2E6B34] border border-emerald-200/80 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <i className="ti ti-coin" />
                </div>
                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Fair Farm-Gate Value
                </h3>
                <p className="text-[14px] text-[#5C4835] leading-relaxed m-0">
                  Bypassing exploitative brokers: 100% of fair-market value flows directly to the pastoral families and smallholder growers who tend the land.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-stone-100 flex items-center text-[11px] font-bold uppercase tracking-wider text-[#2E6B34]">
                <span>Empowering 40+ Co-ops</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PEDIGREE LIVESTOCK & BREEDING STOCK ── */}
      <section className="py-24 sm:py-36 w-full border-t border-[#EDE6D6] bg-white">
        <div className="os-container space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#EDE6D6]">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-3 text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
                Certified Genetics &bull; Kajiado Stud Book
              </div>
              <h2
                className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                }}
              >
                Pedigree Livestock &amp; <span className="text-gradient-gold font-semibold">Breeding Stock</span>
              </h2>
              <p className="text-base text-[#6B6558] mt-2">
                Purebred genetics vaccinated, registered, and adapted to thrive in harsh arid climates.
              </p>
            </div>

            <Link
              href="/breeds"
              className="text-xs font-bold uppercase tracking-widest text-[#8E5E16] hover:text-[#C4882A] no-underline inline-flex items-center gap-2 shrink-0 py-2"
            >
              <span>VIEW FULL STUD CATALOG</span>
              <i className="ti ti-arrow-right text-base" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full">
            {featuredBreeds.slice(0, 3).map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AGRITOURISM & RANCH TOUR INVITATION (Obsidian Luxury Glass) ── */}
      <section className="py-24 sm:py-36 w-full">
        <div className="os-container">
          <div
            className="rounded-3xl p-10 sm:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl border border-amber-500/30"
            style={{
              background: "linear-gradient(135deg, #1C1208 0%, #291A0C 50%, #170E05 100%)",
            }}
          >
            {/* Background ranch texture */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <Image
                src="/images/grazing.jpg"
                alt="Osotua rangeland tour"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300 bg-amber-400/15 border border-amber-400/30">
                  <i className="ti ti-map-pin text-amber-400" />
                  <span>Ranch Agritourism &bull; Kajiado County, Kenya</span>
                </div>

                <h2
                  className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight m-0"
                  style={{
                    fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  }}
                >
                  Experience Osotua: <br className="hidden sm:inline" />
                  <em className="font-normal italic text-gradient-gold">Visit Our Rangelands</em>
                </h2>

                <p className="text-base sm:text-lg text-stone-300/90 leading-relaxed max-w-2xl m-0">
                  Immerse yourself in authentic Kenyan pastoral life. Tour our champion Boran herds, inspect purebred breeding stock, learn regenerative rotational grazing practices, and enjoy a farm-to-table bush breakfast.
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-3 pt-3">
                  {["Guided Herd Walk", "Bush Breakfast", "Genetics Consultation", "Barn Sampling"].map((h) => (
                    <span key={h} className="text-xs font-semibold px-4 py-1.5 rounded-xl bg-white/10 border border-white/15 text-stone-200">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <Link
                  href="/visit"
                  className="btn-primary justify-center text-center py-4 text-xs tracking-widest shadow-xl"
                >
                  <i className="ti ti-calendar-check text-lg" />
                  <span>BOOK A FARM VISIT</span>
                </Link>
                <Link
                  href="/partners"
                  className="btn-ghost justify-center text-center py-4 text-xs tracking-widest"
                >
                  <i className="ti ti-users text-lg" />
                  <span>PARTNER WITH US</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PHOTO STRIP GALLERY CAROUSEL (12 Images) ── */}
      <section className="py-12 overflow-hidden w-full">
        <div className="photo-strip-track flex gap-6">
          {[...photoStripImages, ...photoStripImages].map((img, i) => (
            <div
              key={i}
              className="photo-strip-item w-72 sm:w-96 h-56 sm:h-64 shrink-0 rounded-3xl overflow-hidden border border-[#EDE6D6] relative shadow-md group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="384px"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                {img.alt}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. NEWSLETTER & GAZETTE ── */}
      <section className="py-24 sm:py-32 w-full text-center">
        <div className="os-container max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
            <div className="relative w-4 h-4 rounded-full overflow-hidden ring-1 ring-amber-400 shrink-0">
              <Image src={LOGO} alt="" fill sizes="16px" className="object-cover" />
            </div>
            <span>STAY CONNECTED</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Subscribe to <span className="text-gradient-gold font-semibold">The Osotua Gazette</span>
          </h2>
          <p className="text-base text-[#6B6558] max-w-xl mx-auto leading-relaxed">
            Seasonal harvest alerts, breeding stock drops, and pastoral ranching updates directly to your inbox.
          </p>

          <div className="pt-4 max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Terrain wave */}
      <div className="w-full">
        <TerrainWave fillColor="#FAF5EB" />
      </div>

    </div>
  )
}

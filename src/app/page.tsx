import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import BreedCard from "@/components/farm/BreedCard"
import ProductCard from "@/components/farm/ProductCard"
import NewsletterForm from "@/components/shared/NewsletterForm"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { HERD_FIELD, RANCH_WIDE, FIELD_DAY, RANCH_PANO } from "@/lib/images"

async function getFeaturedBreeds() {
  try {
    return await prisma.breed.findMany({ where: { featured: true }, include: { species: true }, take: 4 })
  } catch { return [] }
}

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({ where: { featured: true, inStock: true }, include: { category: true }, take: 6 })
  } catch { return [] }
}

export default async function HomePage() {
  const [breeds, products] = await Promise.all([getFeaturedBreeds(), getFeaturedProducts()])

  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════════════
            1. FULL-VIEWPORT HERO
        ══════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#1C1208" }}>
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={HERD_FIELD}
              alt="Osotua Farming — Kajiado Rangeland Herd"
              fill priority sizes="100vw"
              className="object-cover object-center"
              style={{ opacity: 0.55 }}
            />
            {/* Warm layered overlay */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, rgba(28,18,8,0.85) 0%, rgba(28,18,8,0.55) 50%, rgba(28,18,8,0.3) 100%)"
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(0deg, rgba(28,18,8,0.95) 0%, transparent 50%)"
            }} />
          </div>

          {/* Ambient warm glow */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(196,136,42,0.08) 0%, transparent 70%)" }}
          />

          {/* Content */}
          <div className="os-container relative z-10 pt-28 pb-24">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="eyebrow text-[#C4882A] mb-8 anim-fade-up" style={{ animationDelay: "0ms" }}>
                Kajiado County, Kenya
              </div>

              {/* Headline */}
              <h1
                className="font-serif text-[#F5EFE4] mb-6 anim-fade-up"
                style={{
                  fontSize: "clamp(3.2rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  animationDelay: "80ms",
                }}
              >
                Where the land<br />
                <em style={{ color: "#C4882A", fontStyle: "italic" }}>feeds the future</em>
              </h1>

              {/* Subtext */}
              <p
                className="text-[#F5EFE4] mb-10 max-w-xl anim-fade-up"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  opacity: 0.75,
                  animationDelay: "160ms",
                }}
              >
                A modern smart farm raising premium indigenous livestock, growing organic produce,
                and delivering directly from our rangelands to your table. Authentic genetics,
                sustainable stewardship — from Kajiado to Kenya.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 anim-fade-up" style={{ animationDelay: "240ms" }}>
                <Link href="/breeds" className="btn-primary">
                  Explore Our Breeds
                  <i className="bi bi-arrow-right" />
                </Link>
                <Link href="/barn" className="btn-ghost">
                  <i className="bi bi-bag-check" />
                  Shop the Barn
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll chevron */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#C4882A]/60 anim-chevron">
            <i className="bi bi-chevron-down text-2xl" />
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            2. LIVESTOCK COUNTER STRIP
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(28,18,8,0.08)" }}>
          <div className="os-container">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { num: "150+", label: "Boran Cattle",   sub: "Beef enterprise",  icon: "bi-shield-check" },
                { num: "80+",  label: "Dorper Sheep",   sub: "Wool & meat breed", icon: "bi-arrow-up-circle" },
                { num: "60+",  label: "Boer Goats",     sub: "Premium meat breed", icon: "bi-geo-alt" },
                { num: "40+",  label: "Sahiwal Dairy",  sub: "Heritage dairy breed", icon: "bi-droplet" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="reveal flex flex-col items-center text-center py-10 px-6"
                  style={{
                    borderRight: i < 3 ? "1px solid rgba(28,18,8,0.07)" : "none",
                    borderBottom: "1px solid rgba(28,18,8,0.07)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <i className={`bi ${item.icon} mb-4`} style={{ fontSize: "2rem", color: "#C4882A" }} />
                  <div
                    className="font-serif"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "#C4882A", lineHeight: 1 }}
                  >
                    {item.num}
                  </div>
                  <div className="font-serif mt-1" style={{ fontSize: "1.15rem", fontWeight: 400, color: "#1C1208" }}>
                    {item.label}
                  </div>
                  <div className="eyebrow-plain mt-2" style={{ color: "rgba(28,18,8,0.45)", fontSize: "0.6rem" }}>
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            3. WHAT WE RAISE
        ══════════════════════════════════════════════════ */}
        <section className="os-section-lg" style={{ background: "#F5EFE4" }}>
          <div className="os-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
              <div>
                <div className="eyebrow mb-6">What We Raise</div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.08, color: "#1C1208" }}
                >
                  Premium livestock,<br />
                  <em style={{ color: "#3D6B3E", fontStyle: "italic" }}>bred for Africa</em>
                </h2>
              </div>
              <p style={{ color: "rgba(28,18,8,0.65)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Every animal at Osotua Farming is selected for genetic superiority, climate resilience,
                and commercial value. Our breeding programme champions indigenous East African genetics
                combined with proven exotic lines — producing livestock tailored for profitability
                in Kenya&apos;s diverse agro-climatic zones.
              </p>
            </div>

            {/* 4 breed category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
              {[
                { icon: "bi-bullseye",   label: "Beef Cattle",  desc: "Boran · Bonsmara · Brahman · Simmental",  count: "4 breeds",  bg: "#1C1208" },
                { icon: "bi-droplet",    label: "Dairy Cattle", desc: "Sahiwal · Friesian × Sahiwal crosses",    count: "2 breeds",  bg: "#3D6B3E" },
                { icon: "bi-scissors",   label: "Goats",        desc: "Boer · Galla · Boer × Galla crosses",     count: "3 breeds",  bg: "#3B2506" },
                { icon: "bi-flower1",    label: "Sheep",        desc: "Dorper · Red Maasai × Dorper cross",      count: "2 breeds",  bg: "#1C1208" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href="/breeds"
                  className="reveal group block relative overflow-hidden rounded transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(28,18,8,0.25)]"
                  style={{
                    background: item.bg,
                    padding: "2.25rem 2rem",
                    minHeight: "260px",
                    textDecoration: "none",
                  }}
                >
                  {/* Count badge */}
                  <div className="eyebrow-plain absolute top-5 right-5"
                    style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.58rem" }}>
                    {item.count}
                  </div>

                  <i className={`bi ${item.icon}`}
                    style={{ fontSize: "2.5rem", color: "#C4882A", display: "block", marginBottom: "1.5rem" }}
                  />

                  <div className="font-serif" style={{ fontSize: "1.6rem", fontWeight: 400, color: "#F5EFE4", marginBottom: "0.5rem" }}>
                    {item.label}
                  </div>
                  <div style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {item.desc}
                  </div>
                  <div className="btn-outline-dark" style={{ color: "#C4882A", borderColor: "rgba(196,136,42,0.4)", fontSize: "0.68rem" }}>
                    Browse Catalogue
                    <i className="bi bi-arrow-right" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Featured breeds from DB */}
            {breeds.length > 0 && (
              <>
                <div className="flex items-center justify-between mt-20 mb-10 pb-4"
                  style={{ borderBottom: "1px solid rgba(28,18,8,0.08)" }}>
                  <h3 className="font-serif" style={{ fontSize: "1.8rem", fontWeight: 300, color: "#1C1208" }}>
                    Featured Genetics
                  </h3>
                  <Link href="/breeds" className="btn-outline-dark">
                    View All Breeds
                    <i className="bi bi-arrow-right" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
                  {breeds.map((breed) => (
                    <div key={breed.id} className="reveal">
                      <BreedCard breed={breed} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            4. FULL-WIDTH CATTLE IMAGE SECTION
        ══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ minHeight: "520px", display: "flex", alignItems: "center" }}>
          <div className="absolute inset-0">
            <Image
              src={RANCH_WIDE}
              alt="Osotua Cattle Herd — Kajiado Rangeland"
              fill sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: "rgba(28,18,8,0.58)" }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(90deg, rgba(28,18,8,0.8) 0%, rgba(28,18,8,0.2) 60%, transparent 100%)"
            }} />
          </div>

          <div className="os-container relative z-10 py-20">
            <div className="max-w-xl">
              <div className="eyebrow text-[#C4882A] mb-6">Our Herds</div>
              <h2
                className="font-serif text-[#F5EFE4] mb-6"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  fontStyle: "italic",
                }}
              >
                High-quality genetics<br />
                for your family to enjoy
              </h2>
              <p className="text-[#F5EFE4] mb-8" style={{ opacity: 0.7, lineHeight: 1.8, maxWidth: "38rem" }}>
                Our breeding programme is built on decades of East African pastoral knowledge, combined with
                modern veterinary science. Every animal carries a verified genetic profile and full health
                certification before leaving our ranch.
              </p>
              <Link href="/breeds" className="btn-primary">
                View All Breeds
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            5. THE BARN STORE
        ══════════════════════════════════════════════════ */}
        <section className="os-section-lg" style={{ background: "#1C1208", position: "relative", overflow: "hidden" }}>
          {/* Subtle bg image */}
          <div className="absolute inset-0 opacity-10">
            <Image src={FIELD_DAY} alt="" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "#1C1208" }} />
          </div>

          {/* Watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
            <span className="font-serif" style={{ fontSize: "18rem", fontWeight: 700, color: "rgba(196,136,42,0.04)", lineHeight: 1 }}>
              BARN
            </span>
          </div>

          <div className="os-container relative z-10">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
              <div>
                <div className="eyebrow mb-6">The Barn Store</div>
                <h2
                  className="font-serif text-[#F5EFE4]"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.08 }}
                >
                  Everything fresh,<br />
                  <em style={{ color: "#C4882A", fontStyle: "italic" }}>everything ours</em>
                </h2>
              </div>
              <p style={{ color: "rgba(245,239,228,0.6)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Walk in or order online. Every product on our shelves carries the Osotua promise —
                raised on this land, handled with artisanal care, and delivered directly to you.
                No middlemen. No compromises.
              </p>
            </div>

            {/* Category tiles */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12 stagger">
              {[
                { icon: "bi-basket",   name: "Beef Cuts",    note: "Aged & portioned" },
                { icon: "bi-droplet",  name: "Dairy",        note: "Milk, yoghurt, ghee" },
                { icon: "bi-scissors", name: "Goat Meat",    note: "Whole or portioned" },
                { icon: "bi-tree",     name: "Vegetables",   note: "Pesticide-free" },
                { icon: "bi-flower1",  name: "Fresh Fruits", note: "Seasonal orchards" },
                { icon: "bi-box-seam", name: "Ranch Box",    note: "Weekly subscription" },
              ].map((item, i) => (
                <Link
                  key={item.name}
                  href="/barn"
                  className="reveal group block text-center rounded p-6 transition-all duration-300 bg-white/5 border border-white/10 hover:bg-[#C4882A]/12 hover:border-[#C4882A]/45"
                  style={{
                    textDecoration: "none",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <i className={`bi ${item.icon}`}
                    style={{ fontSize: "1.75rem", color: "#C4882A", display: "block", marginBottom: "0.75rem" }}
                  />
                  <div className="font-serif" style={{ fontSize: "0.95rem", color: "#F5EFE4", marginBottom: "0.25rem" }}>
                    {item.name}
                  </div>
                  <div style={{ color: "rgba(245,239,228,0.4)", fontSize: "0.72rem" }}>{item.note}</div>
                </Link>
              ))}
            </div>

            {/* Horizontal photo strip */}
            {products.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-[#F5EFE4]" style={{ fontSize: "1.6rem", fontWeight: 300 }}>
                    Fresh Today
                  </h3>
                  <Link href="/barn" className="btn-outline-dark" style={{ color: "#C4882A", borderColor: "rgba(196,136,42,0.4)" }}>
                    Shop All Items
                    <i className="bi bi-arrow-right" />
                  </Link>
                </div>

                {/* Horizontal photo strip (5-column landscape thumbnails) */}
                <div className="flex gap-0 overflow-hidden mb-12 rounded" style={{ height: "200px" }}>
                  {products.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/barn/${product.slug}`}
                      className="relative flex-1 min-w-0 overflow-hidden group block"
                    >
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="20vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"
                          style={{ background: "#2D1F0E" }}>
                          <i className="bi bi-basket text-4xl" style={{ color: "#C4882A" }} />
                        </div>
                      )}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(28,18,8,0.6)" }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div style={{ color: "#F5EFE4", fontSize: "0.75rem", fontWeight: 600 }}>{product.name}</div>
                        <div style={{ color: "#C4882A", fontSize: "0.7rem" }}>KES {product.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Full product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
                  {products.map((product) => (
                    <div key={product.id} className="reveal">
                      <ProductCard product={product} dark />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-center mt-14">
              <Link href="/barn" className="btn-primary">
                <i className="bi bi-cart3" />
                Shop the Full Barn Store
              </Link>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            6. THREE TRUST COLUMNS
        ══════════════════════════════════════════════════ */}
        <section className="os-section" style={{ background: "#FBF7F0" }}>
          <div className="os-container">
            <div className="text-center mb-14">
              <div className="eyebrow justify-center mb-4">Our Standards</div>
              <h2
                className="font-serif"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: "#1C1208" }}
              >
                Built on three pillars of excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 stagger rounded overflow-hidden"
              style={{ border: "1px solid rgba(28,18,8,0.08)" }}>
              {[
                {
                  icon: "bi-heart-pulse",
                  title: "Animal Health",
                  color: "#C4882A",
                  desc: "Every animal at Osotua undergoes routine veterinary inspections, vaccinations, parasite control, and nutritional monitoring. Our resident vet team maintains individual health records for every head of livestock on the farm.",
                },
                {
                  icon: "bi-tree",
                  title: "Land Health",
                  color: "#3D6B3E",
                  desc: "We practice regenerative rangeland management — rotational grazing, water harvesting, indigenous grass restoration, and soil carbon programmes. Our land improves every season, not degrades.",
                },
                {
                  icon: "bi-award",
                  title: "Food Quality",
                  color: "#1C1208",
                  desc: "From the ranch to your table, every Osotua product carries a QR code linking to its source batch, processing records, and nutritional data. Full transparency, zero compromise on quality or freshness.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="reveal p-10"
                  style={{
                    borderRight: i < 2 ? "1px solid rgba(28,18,8,0.08)" : "none",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <i className={`bi ${item.icon}`}
                    style={{ fontSize: "2.5rem", color: item.color, display: "block", marginBottom: "1.5rem" }}
                  />
                  <h3
                    className="font-serif"
                    style={{ fontSize: "1.6rem", fontWeight: 400, color: "#1C1208", marginBottom: "1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(28,18,8,0.62)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                    {item.desc}
                  </p>
                  <Link href="/about" className="btn-outline-dark" style={{ fontSize: "0.68rem" }}>
                    READ MORE
                    <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            7. HOW IT WORKS
        ══════════════════════════════════════════════════ */}
        <section className="os-section" style={{ background: "#F5EFE4" }}>
          <div className="os-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14">
              <div>
                <div className="eyebrow mb-6">How It Works</div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: "#1C1208", lineHeight: 1.1 }}
                >
                  Ordering livestock &amp; produce<br />
                  <em style={{ color: "#C4882A", fontStyle: "italic" }}>the right way</em>
                </h2>
              </div>
              <p style={{ color: "rgba(28,18,8,0.65)", lineHeight: 1.8 }}>
                Our ordering process is designed to be transparent, secure, and stress-free.
                From browsing our catalogue to receiving your animals or produce, every step
                is handled with professional care and full documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
              {[
                { num: "01", icon: "bi-search",          title: "Browse the Catalogue",   desc: "Explore our full livestock and fresh product catalogue with genetic profiles, availability, and transparent pricing." },
                { num: "02", icon: "bi-credit-card",      title: "Place Your Reservation", desc: "Submit your order online and secure your reservation via M-Pesa or card deposit." },
                { num: "03", icon: "bi-clipboard2-pulse", title: "Veterinary Prep",        desc: "Animals receive comprehensive health checks, vaccinations, and official movement permits." },
                { num: "04", icon: "bi-truck",            title: "Pickup or Transit",      desc: "Collect directly from the ranch or let us coordinate licensed livestock transport to you." },
              ].map((item, i) => (
                <div
                  key={item.num}
                  className="reveal os-card p-8"
                  style={{ transitionDelay: `${i * 80}ms`, borderLeftWidth: "3px", borderLeftColor: "#C4882A" }}
                >
                  <div className="eyebrow-plain mb-4" style={{ color: "#C4882A", fontSize: "0.6rem" }}>
                    Step {item.num}
                  </div>
                  <i className={`bi ${item.icon}`}
                    style={{ fontSize: "1.8rem", color: "#1C1208", display: "block", marginBottom: "1rem", opacity: 0.5 }}
                  />
                  <div className="font-serif" style={{ fontSize: "1.2rem", fontWeight: 400, color: "#1C1208", marginBottom: "0.75rem" }}>
                    {item.title}
                  </div>
                  <p style={{ color: "rgba(28,18,8,0.62)", fontSize: "0.85rem", lineHeight: 1.8 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            8. WHY OSOTUA
        ══════════════════════════════════════════════════ */}
        <section className="os-section-lg" style={{ background: "#FBF7F0" }}>
          <div className="os-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Image panel */}
              <div className="reveal relative overflow-hidden rounded shadow-2xl" style={{ minHeight: "520px" }}>
                <Image
                  src={FIELD_DAY}
                  alt="Osotua Farming — Pastoral Field"
                  fill sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(28,18,8,0.85) 0%, rgba(28,18,8,0.2) 60%, transparent 100%)" }} />

                {/* Floating quote card */}
                <div
                  className="absolute bottom-8 left-8 right-8 rounded p-6"
                  style={{
                    background: "rgba(28,18,8,0.7)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(196,136,42,0.25)",
                  }}
                >
                  <div className="eyebrow-plain mb-2" style={{ color: "#C4882A", fontSize: "0.58rem" }}>
                    Maa Language · Kajiado County, Kenya
                  </div>
                  <p className="font-serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#F5EFE4", fontStyle: "italic", lineHeight: 1.4 }}>
                    &ldquo;A bond of friendship that endures&rdquo;
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="reveal">
                <div className="eyebrow mb-6">Why Osotua</div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 300, color: "#1C1208", lineHeight: 1.1, marginBottom: "1.5rem" }}
                >
                  A farm built on<br />
                  <em style={{ color: "#C4882A", fontStyle: "italic" }}>trust and stewardship</em>
                </h2>
                <p style={{ color: "rgba(28,18,8,0.65)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2.5rem" }}>
                  Osotua means a covenant of peace and enduring friendship in the Maa language —
                  between the land, the farmer, and the families we feed. Our name is our promise.
                </p>

                <div className="flex flex-col gap-5">
                  {[
                    { icon: "bi-tree",       title: "Indigenous breeds, modern methods",  desc: "We champion Africa's finest livestock genetics combined with smart farming technology and sustainable land management." },
                    { icon: "bi-qr-code",    title: "Full farm-to-fork traceability",     desc: "Every product carries a QR code linking back to its source animal or batch — full transparency guaranteed." },
                    { icon: "bi-people",     title: "Community-first enterprise",         desc: "We partner with smallholder outgrowers, support youth internships, and invest in community projects." },
                    { icon: "bi-geo-alt",    title: "Rooted in Kajiado County",           desc: "Ideal rangeland climate, heritage, and genetics to raise Kenya's most premium livestock." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 p-4 rounded transition-colors duration-200 hover:bg-[#F5EFE4]"
                    >
                      <div
                        style={{
                          width: "44px", height: "44px", borderRadius: "2px",
                          background: "rgba(196,136,42,0.1)",
                          border: "1px solid rgba(196,136,42,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <i className={`bi ${item.icon}`} style={{ fontSize: "1.2rem", color: "#C4882A" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#1C1208", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                          {item.title}
                        </div>
                        <div style={{ color: "rgba(28,18,8,0.58)", fontSize: "0.85rem", lineHeight: 1.75 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            9. GET INVOLVED
        ══════════════════════════════════════════════════ */}
        <section className="os-section-lg relative overflow-hidden" style={{ background: "#3B2506" }}>
          <div className="absolute inset-0 opacity-15">
            <Image src={RANCH_PANO} alt="" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "#3B2506" }} />
          </div>
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,136,42,0.07) 0%, transparent 60%)" }}
          />

          <div className="os-container relative z-10">
            <div className="text-center mb-14">
              <div className="eyebrow justify-center mb-4">Get Involved</div>
              <h2
                className="font-serif text-[#F5EFE4]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, lineHeight: 1.1 }}
              >
                This farm belongs<br />
                <em style={{ color: "#C4882A", fontStyle: "italic" }}>to all of us</em>
              </h2>
              <p style={{ color: "rgba(245,239,228,0.55)", maxWidth: "38rem", margin: "1rem auto 0", lineHeight: 1.8, fontSize: "0.9rem" }}>
                Whether you want to work with us, invest in the venture, partner as a supplier,
                or simply visit — there is a place for you at Osotua Farming.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
              {[
                { icon: "bi-briefcase",       title: "Careers",        desc: "Join our team of farmers, veterinarians, technologists, and agribusiness professionals.",       href: "/careers",             cta: "View Open Roles" },
                { icon: "bi-graph-up-arrow",  title: "Invest",         desc: "Partner with us as an investor and participate in Kenya's most exciting farm venture.",          href: "/invest",             cta: "See Investment Brief" },
                { icon: "bi-people",          title: "Partner Farmers",desc: "Supply vegetables, fodder, or eggs under our outgrower scheme with guaranteed offtake prices.", href: "/partners",           cta: "Join the Network" },
                { icon: "bi-mortarboard",     title: "Internships",    desc: "Students in agriculture, IT, and business are welcome for structured 3–6 month attachments.",    href: "/careers#internships", cta: "Apply Now" },
                { icon: "bi-building",        title: "B2B Supply",     desc: "Hotels, restaurants, and supermarkets — consistent quality supply direct from our ranch.",        href: "/contact#b2b",        cta: "Request a Quote" },
                { icon: "bi-calendar-check",  title: "Farm Visits",    desc: "Book a guided tour of the ranch. See the herds, the fields, the Barn Store, and more.",          href: "/visit",              cta: "Book a Tour" },
              ].map((item, i) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="reveal group block p-8 rounded border transition-all duration-300 bg-white/5 border-white/10 hover:bg-[#C4882A]/10 hover:border-[#C4882A]/40 hover:-translate-y-1"
                  style={{
                    textDecoration: "none",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <i className={`bi ${item.icon}`}
                    style={{ fontSize: "2rem", color: "#C4882A", display: "block", marginBottom: "1.25rem" }}
                  />
                  <div className="font-serif" style={{ fontSize: "1.4rem", fontWeight: 400, color: "#F5EFE4", marginBottom: "0.75rem" }}>
                    {item.title}
                  </div>
                  <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                    {item.desc}
                  </p>
                  <div className="btn-outline-dark" style={{ color: "#C4882A", borderColor: "rgba(196,136,42,0.4)", fontSize: "0.65rem" }}>
                    {item.cta}
                    <i className="bi bi-arrow-right" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            10. BRAND QUOTE
        ══════════════════════════════════════════════════ */}
        <section className="os-section-sm" style={{ background: "#FBF7F0", borderTop: "1px solid rgba(28,18,8,0.08)", borderBottom: "1px solid rgba(28,18,8,0.08)" }}>
          <div className="os-container">
            <div className="max-w-4xl mx-auto text-center py-8">
              {/* Gold rule lines */}
              <div className="flex items-center gap-6 justify-center mb-8">
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,136,42,0.4))" }} />
                <i className="bi bi-flower2" style={{ color: "#C4882A", fontSize: "1.2rem" }} />
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(196,136,42,0.4), transparent)" }} />
              </div>

              <div className="font-serif" style={{ fontSize: "clamp(0.7rem, 2vw, 1rem)", color: "rgba(196,136,42,0.3)", lineHeight: 1, marginBottom: "0.5rem" }}>
                &ldquo;
              </div>
              <blockquote
                className="font-serif"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#1C1208",
                  lineHeight: 1.3,
                  marginBottom: "2rem",
                }}
              >
                We don&apos;t just raise animals and grow food. We build relationships that
                nourish Kenya — one farm, one family, one table at a time.
              </blockquote>

              <div className="eyebrow-plain justify-center" style={{ color: "#C4882A", display: "flex", justifyContent: "center" }}>
                Osotua Farming · Kajiado County, Kenya
              </div>

              {/* Gold rule lines */}
              <div className="flex items-center gap-6 justify-center mt-8">
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,136,42,0.4))" }} />
                <i className="bi bi-flower2" style={{ color: "#C4882A", fontSize: "1.2rem" }} />
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(196,136,42,0.4), transparent)" }} />
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════
            11. NEWSLETTER
        ══════════════════════════════════════════════════ */}
        <section className="os-section" style={{ background: "#C4882A", position: "relative", overflow: "hidden" }}>
          {/* Dot pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, rgba(28,18,8,0.6) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />

          <div className="os-container relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div>
                <div className="eyebrow-plain mb-3" style={{ color: "rgba(28,18,8,0.6)", letterSpacing: "0.2em" }}>
                  Stay Connected
                </div>
                <h3
                  className="font-serif"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1C1208", lineHeight: 1.1, marginBottom: "0.75rem" }}
                >
                  Stay close to the land
                </h3>
                <p style={{ color: "rgba(28,18,8,0.65)", fontSize: "0.9rem", maxWidth: "38rem", lineHeight: 1.8 }}>
                  Monthly updates — new breeds, seasonal harvest drops, farm stories, and exclusive ranch offers.
                </p>
              </div>
              <div className="w-full lg:w-auto flex-shrink-0 min-w-[320px]">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
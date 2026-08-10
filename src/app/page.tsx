import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import BreedCard from "@/components/farm/BreedCard"
import ProductCard from "@/components/farm/ProductCard"
import NewsletterForm from "@/components/shared/NewsletterForm"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { Sun, Droplets, CheckCircle2, ArrowRight } from "lucide-react"
import { HERD_FIELD, RANCH_WIDE, FIELD_DAY, RANCH_PANO } from "@/lib/images"

async function getFeaturedBreeds() {
  try {
    return await prisma.breed.findMany({
      where: { featured: true },
      include: { species: true },
      take: 4,
    })
  } catch {
    return []
  }
}

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true },
      take: 6,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [breeds, products] = await Promise.all([
    getFeaturedBreeds(),
    getFeaturedProducts(),
  ])

  return (
    <>
      <Navbar />
      <div className="bg-[#FBF7F0] pt-16">

        {/* ── HERO SECTION WITH BACKGROUND IMAGE ─────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1C1208]">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={HERD_FIELD}
              alt="Osotua Rangeland Herd"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40 scale-105"
            />
            {/* Multi-stage dark gradient overlays for luxury contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1208] via-[#1C1208]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-transparent to-[#1C1208]/70" />
          </div>

          {/* Ambient glow lights */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#C4882A]/15 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#3D6B3E]/20 blur-3xl" />
          </div>

          {/* Live Rangeland Weather Widget */}
          <div className="absolute top-24 right-8 z-20 hidden xl:flex items-center gap-4 bg-[#1C1208]/85 backdrop-blur-xl border border-[#C4882A]/35 p-4 rounded-md text-[#F5EFE4] text-xs shadow-2xl">
            <div className="flex items-center gap-2 text-[#C4882A]">
              <Sun size={18} className="animate-spin-slow" />
              <span className="font-mono font-bold">28°C Kajiado</span>
            </div>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-1.5 text-white/80 font-mono">
              <Droplets size={14} className="text-sky-400" />
              <span>Humidity: 48%</span>
            </div>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 size={14} />
              <span>Pasture: Optimal</span>
            </div>
          </div>

          {/* Floating breed tags */}
          <div className="absolute top-0 right-0 bottom-0 w-2/5 hidden lg:flex flex-col justify-center gap-3.5 pr-16 pt-24 pointer-events-none select-none z-10">
            {[
              { label: "Boran Beef Cattle",  delay: "0s",   indent: "0px" },
              { label: "Sahiwal Dairy",       delay: "1.2s", indent: "28px" },
              { label: "Boer × Galla Goats", delay: "2.4s", indent: "10px" },
              { label: "Dorper Sheep",        delay: "3.6s", indent: "40px" },
              { label: "Bonsmara Bulls",      delay: "4.8s", indent: "16px" },
              { label: "Simmental Cross",     delay: "6.0s", indent: "32px" },
            ].map((tag) => (
              <span
                key={tag.label}
                className="eyebrow-plain text-[#C4882A] border border-[#C4882A]/40 bg-[#1C1208]/80 backdrop-blur-md px-3.5 py-2 w-fit rounded-xs text-[10px] shadow-lg tracking-widest font-mono"
                style={{
                  marginLeft: tag.indent,
                  animation: `tagFloat 7s ease-in-out ${tag.delay} infinite`,
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* Hero Content */}
          <div className="container relative z-10 py-32 sm:py-40">
            <div className="max-w-2xl">
              <div className="eyebrow text-[#C4882A] mb-8 font-mono">
                Kajiado County, Kenya · Smart Agriculture
              </div>

              <h1
                className="font-serif text-[#F5EFE4] mb-6 tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 6.5vw, 6rem)", fontWeight: 300, lineHeight: 1.02 }}
              >
                Where the land<br />
                <em className="text-[#C4882A] not-italic font-normal">feeds</em> the future
              </h1>

              <p className="text-[#F5EFE4]/85 text-lg leading-relaxed max-w-lg mb-10 font-sans font-light">
                A modern smart farm raising premium indigenous livestock, growing organic produce,
                and delivering directly from our rangelands to your table. Authentic genetics, sustainable stewardship.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/breeds" className="btn btn-primary btn-lg font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(196,136,42,0.4)]">
                  Explore Our Breeds
                </Link>
                <Link href="/barn" className="btn btn-ghost btn-lg font-semibold tracking-wider uppercase backdrop-blur-md">
                  Visit Barn Store
                </Link>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-20 pt-8 border-t border-[#C4882A]/25 flex flex-wrap gap-10 sm:gap-16">
              {[
                { num: "6+",   label: "Purebred Species" },
                { num: "4",    label: "Farm Enterprises" },
                { num: "100%", label: "Traceable Supply" },
                { num: "2026", label: "Est. Kajiado" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-serif text-[#C4882A] font-medium"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1 }}
                  >
                    {stat.num}
                  </div>
                  <div className="eyebrow-plain text-[#F5EFE4]/60 text-[10px] tracking-[0.2em] mt-1.5 font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terrain wave divider */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 sm:h-24" fill="none">
              <path d="M0,70 C180,30 360,90 540,60 C720,30 900,80 1080,50 C1260,20 1380,65 1440,55 L1440,100 L0,100 Z" fill="rgba(61,107,62,0.18)" />
              <path d="M0,82 C240,55 480,88 720,70 C960,52 1200,82 1440,68 L1440,100 L0,100 Z" fill="rgba(196,136,42,0.12)" />
              <path d="M0,92 C360,78 720,95 1440,85 L1440,100 L0,100 Z" fill="#FBF7F0" />
            </svg>
          </div>
        </section>

        {/* ── WHAT WE RAISE ─────────────────────────────────────── */}
        <section className="section bg-[#FBF7F0] relative z-10">
          <div className="container">

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <div className="eyebrow mb-4">What We Raise</div>
                <h2 className="font-serif text-[#1C1208] text-display-lg">
                  Premium livestock,<br />
                  <em className="text-[#3D6B3E] not-italic font-normal">bred for Africa</em>
                </h2>
              </div>
              <p className="text-[#1C1208]/65 max-w-sm leading-relaxed text-sm">
                Every animal is selected for genetic superiority, climate resilience,
                and commercial value — tailored for East Africa&apos;s conditions.
              </p>
            </div>

            {/* Livestock Enterprise Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {[
                { icon: "🐂", label: "Beef Cattle",  desc: "Boran · Bonsmara · Brahman · Simmental",  bg: "gradient-hide",  count: "4 breeds" },
                { icon: "🐄", label: "Dairy Cattle", desc: "Sahiwal · Friesian × Sahiwal crosses",     bg: "gradient-grass", count: "2 breeds" },
                { icon: "🐐", label: "Goats",        desc: "Boer · Galla · Boer × Galla",             bg: "gradient-hide",  count: "3 breeds" },
                { icon: "🐑", label: "Sheep",        desc: "Dorper · Red Maasai × Dorper",            bg: "gradient-grass", count: "2 breeds" },
              ].map((item, i) => (
                <Link
                  key={item.label}
                  href="/breeds"
                  className={`reveal ${item.bg} p-8 relative overflow-hidden group block rounded-md shadow-xl hover:-translate-y-2 transition-all duration-300 border border-white/10`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute top-4 right-4 font-mono text-[9px] text-white/60 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-xs uppercase tracking-widest">
                    {item.count}
                  </div>
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="font-serif text-white text-2xl font-medium mb-2">{item.label}</div>
                  <div className="text-white/70 text-xs leading-relaxed mb-4">{item.desc}</div>
                  <div className="eyebrow-plain text-[#C4882A] text-[10px] font-mono group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                    <span>Browse Catalogue</span>
                    <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Featured Breeds Grid from DB */}
            {breeds.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#1C1208]/08">
                  <h3 className="font-serif text-3xl text-[#1C1208] font-light">Featured Genetics</h3>
                  <Link href="/breeds" className="btn btn-outline btn-sm font-mono text-xs uppercase">View All Breeds</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {breeds.map((breed) => (
                    <BreedCard key={breed.id} breed={breed} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── TERRAIN DIVIDER ────────────────────────────────────── */}
        <div className="terrain-divider bg-[#FBF7F0]">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10" fill="none">
            <path d="M0,30 C360,10 720,50 1440,25 L1440,60 L0,60 Z" fill="#1C1208" />
          </svg>
        </div>

        {/* ── THE BARN STORE WITH BACKGROUND IMAGE ───────────────── */}
        <section className="section bg-[#1C1208] relative overflow-hidden text-[#F5EFE4]">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <Image
              src={RANCH_WIDE}
              alt="Osotua Ranch Store Background"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208] via-[#1C1208]/90 to-[#1C1208]" />
          </div>

          {/* Background Watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
            <span className="font-serif text-[18rem] font-bold text-[#C4882A]/05 leading-none">
              BARN
            </span>
          </div>

          <div className="container relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <div className="eyebrow mb-4 text-[#C4882A]">The Barn Store</div>
                <h2 className="font-serif text-[#F5EFE4] text-display-lg">
                  Everything fresh,<br />
                  <em className="text-[#C4882A] not-italic font-normal">everything ours</em>
                </h2>
              </div>
              <p className="text-[#F5EFE4]/65 max-w-sm leading-relaxed text-sm">
                Walk in or order online. Every product carries the Osotua promise —
                raised here, handled with artisanal care, delivered to you.
              </p>
            </div>

            {/* Product Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
              {[
                { icon: "🥩", name: "Beef Cuts",    note: "Aged & portioned" },
                { icon: "🥛", name: "Dairy",        note: "Milk, yoghurt, ghee" },
                { icon: "🐐", name: "Goat Meat",    note: "Whole or portioned" },
                { icon: "🥬", name: "Vegetables",   note: "Pesticide-free" },
                { icon: "🍋", name: "Fresh Fruits", note: "Seasonal orchards" },
                { icon: "📦", name: "Ranch Box",    note: "Weekly subscription" },
              ].map((item, i) => (
                <Link
                  key={item.name}
                  href="/barn"
                  className="reveal glass-card-dark p-5 rounded-md hover:border-[#C4882A]/60 hover:bg-[#C4882A]/10 transition-all duration-300 group block"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="font-serif text-[#F5EFE4] text-lg font-medium mb-1">{item.name}</div>
                  <div className="text-[#F5EFE4]/50 text-xs font-sans">{item.note}</div>
                </Link>
              ))}
            </div>

            {/* Featured Products from DB */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} dark />
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <Link href="/barn" className="btn btn-primary btn-lg font-bold uppercase tracking-wider shadow-xl">
                Shop the Barn Store
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────── */}
        <section className="section bg-[#F5EFE4] relative z-10">
          <div className="container">
            <div className="text-center mb-14">
              <div className="eyebrow justify-center mb-4">Ordering Workflow</div>
              <h2 className="font-serif text-[#1C1208] text-display-md">
                Ordering livestock & produce{" "}
                <em className="text-[#3D6B3E] not-italic font-normal">the right way</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Browse the Catalogue", desc: "Explore our full livestock and fresh product catalogue with detailed genetic profiles, availability, and transparent pricing." },
                { step: "02", title: "Place Your Reservation", desc: "Submit your order online and lock in your reservation via M-Pesa or Card deposit." },
                { step: "03", title: "Veterinary Prep",      desc: "Animals receive comprehensive health checks, vaccinations, and official movement permits." },
                { step: "04", title: "Ranch Pickup or Transit", desc: "Collect directly from the ranch or let us coordinate licensed livestock transport." },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="reveal bg-white p-7 rounded-md border border-[#1C1208]/08 store-card-shadow border-l-4 border-l-[#C4882A] hover:border-l-[#3D6B3E] transition-all"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="eyebrow-plain text-[#C4882A] text-[11px] font-mono font-bold mb-3">Step {item.step}</div>
                  <div className="font-serif text-[#1C1208] text-xl font-medium mb-3">{item.title}</div>
                  <div className="text-[#1C1208]/65 text-xs sm:text-sm leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY OSOTUA WITH RANCH PHOTO ────────────────────────── */}
        <section className="section bg-[#FBF7F0] relative z-10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* Visual Panel with Background Image */}
              <div className="relative rounded-md overflow-hidden min-h-[460px] flex flex-col justify-between p-10 reveal shadow-2xl border border-[#C4882A]/30">
                <Image
                  src={FIELD_DAY}
                  alt="Osotua Pastoral Field"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-[#1C1208]/75 to-[#1C1208]/40" />

                <div className="relative z-10">
                  <div className="eyebrow-plain text-[#C4882A] text-[10px] mb-2 font-mono uppercase tracking-widest">
                    Heritage & Culture
                  </div>
                  <div className="font-serif text-white/30 text-7xl font-light leading-none mb-4">
                    Osotua
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="font-serif text-3xl text-[#F5EFE4] font-light italic leading-tight mb-3">
                    &ldquo;A bond of friendship that endures&rdquo;
                  </p>
                  <span className="eyebrow-plain text-[#C4882A] text-[10px] font-mono">
                    Maa Language · Kajiado County, Kenya
                  </span>
                </div>
              </div>

              {/* Content Column */}
              <div className="reveal">
                <div className="eyebrow mb-5">Why Osotua</div>
                <h2 className="font-serif text-display-md text-[#1C1208] mb-5">
                  A farm built on<br />
                  <em className="text-[#C4882A] not-italic font-normal">trust and stewardship</em>
                </h2>
                <p className="text-[#1C1208]/70 leading-relaxed mb-8 text-base">
                  Our name says it all. Osotua means a covenant of peace and enduring friendship in the Maa language — between the land, the farmer, and the families we feed.
                </p>

                <div className="flex flex-col gap-5">
                  {[
                    { icon: "🌱", title: "Indigenous breeds, modern methods",  desc: "We champion Africa's finest livestock genetics combined with smart farming technology and sustainable land management." },
                    { icon: "🔗", title: "Full farm-to-fork traceability",     desc: "Every product carries a QR code linking back to its source animal, field, or batch — full transparency guaranteed." },
                    { icon: "🤝", title: "Community-first enterprise",         desc: "We partner with smallholder outgrowers, support youth internships, and invest in sustainable community projects." },
                    { icon: "📍", title: "Rooted in Kajiado County",          desc: "Our land possesses the ideal rangeland climate, heritage, and genetics to raise Kenya's premium livestock." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-3 rounded-md hover:bg-[#F5EFE4] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-[#C4882A]/15 border border-[#C4882A]/30 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1C1208] text-sm mb-1">{item.title}</div>
                        <div className="text-[#1C1208]/60 text-xs sm:text-sm leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GET INVOLVED WITH DARK BACKGROUND IMAGE ───────────── */}
        <section className="section bg-[#3B2506] relative overflow-hidden text-[#F5EFE4]">
          {/* Background Image Layer */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <Image
              src={RANCH_PANO}
              alt="Get Involved Background"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B2506] via-[#3B2506]/90 to-[#1C1208]" />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-14">
              <div className="eyebrow justify-center mb-4 text-[#C4882A]">Get Involved</div>
              <h2 className="font-serif text-[#F5EFE4] text-display-md">
                This farm belongs<br />
                <em className="text-[#C4882A] not-italic font-normal">to all of us</em>
              </h2>
              <p className="text-[#F5EFE4]/65 text-sm max-w-md mx-auto mt-4 leading-relaxed">
                Whether you want to work with us, invest, partner, or learn — there is a place for you at Osotua Farming.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "💼", title: "Careers",        desc: "Join our world-class team of farmers, veterinarians, technologists, and agribusiness professionals.", href: "/careers",             cta: "View open roles" },
                { icon: "📈", title: "Invest",          desc: "Partner with us as an investor or sponsor and participate in Kenya's most exciting farm venture.",    href: "/invest",             cta: "See investment brief" },
                { icon: "🌾", title: "Partner Farmers", desc: "Supply vegetables, fodder, or eggs under our outgrower scheme with guaranteed offtake prices.",        href: "/partners",           cta: "Join the network" },
                { icon: "🎓", title: "Internships",     desc: "Students in agriculture, IT, and business are welcome for structured 3–6 month attachments.",         href: "/careers#internships", cta: "Apply now" },
                { icon: "🏨", title: "B2B Supply",      desc: "Hotels, restaurants, and supermarkets — consistent quality supply direct from our ranch.",             href: "/contact#b2b",        cta: "Request a quote" },
                { icon: "🗓️", title: "Farm Visits",    desc: "Book a guided tour of the ranch. See the herds, the fields, the Barn Store, and more.",               href: "/visit",              cta: "Book a tour" },
              ].map((item, i) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="reveal glass-card-dark rounded-md p-7 hover:border-[#C4882A] hover:bg-[#C4882A]/10 transition-all duration-300 group block border border-white/10"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="font-serif text-[#F5EFE4] text-2xl mb-2 font-medium">{item.title}</div>
                  <div className="text-[#F5EFE4]/65 text-xs sm:text-sm leading-relaxed mb-6">{item.desc}</div>
                  <span className="eyebrow-plain text-[#C4882A] text-[10px] font-mono group-hover:translate-x-1 transition-transform flex items-center gap-1.5 font-bold uppercase">
                    <span>{item.cta}</span>
                    <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRAND STATEMENT ───────────────────────────────────── */}
        <section className="section-sm bg-[#FBF7F0] border-y border-[#EDE5D8]">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="font-serif text-[#C4882A]/30 text-8xl leading-none mb-2">&ldquo;</div>
              <blockquote className="font-serif text-[#1C1208] text-display-sm font-light italic leading-snug mb-6">
                We don&apos;t just raise animals and grow food. We build relationships that nourish Kenya —
                one farm, one family, one table at a time.
              </blockquote>
              <div className="eyebrow-plain text-[#C4882A] text-[11px] font-mono uppercase tracking-widest font-bold">
                Osotua Farming · Kajiado County, Kenya
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ────────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-[#C4882A] via-[#D99A30] to-[#C4882A] py-16 shadow-2xl">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
              <div>
                <h3 className="font-serif text-[#1C1208] text-display-sm font-light mb-2">
                  Stay close to the land
                </h3>
                <p className="text-[#1C1208]/75 text-sm font-sans">
                  Monthly updates — new breeds, seasonal harvest drops, farm stories, and exclusive ranch offers.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
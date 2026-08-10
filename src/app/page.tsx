import Link from "next/link"
import { prisma } from "@/lib/prisma"
import BreedCard from "@/components/farm/BreedCard"
import ProductCard from "@/components/farm/ProductCard"
import NewsletterForm from "@/components/shared/NewsletterForm"

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
    <div className="bg-[#FBF7F0]">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden gradient-earth">

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C4882A]/08 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/6 w-80 h-80 rounded-full bg-[#3D6B3E]/10 blur-3xl" />
        </div>

        {/* Floating breed tags */}
        <div className="absolute top-0 right-0 bottom-0 w-2/5 hidden lg:flex flex-col justify-center gap-3 pr-16 pt-24 pointer-events-none select-none">
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
              className="eyebrow-plain text-[#C4882A] border border-[#C4882A]/20 px-3 py-1.5 w-fit rounded-sm text-[9px]"
              style={{
                marginLeft: tag.indent,
                animation: `tagFloat 7s ease-in-out ${tag.delay} infinite`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Hero content */}
        <div className="container relative z-10 py-36">
          <div className="max-w-2xl">
            <div className="eyebrow text-[#C4882A] mb-8">
              Kajiado County, Kenya
            </div>

            <h1
              className="font-serif text-[#F5EFE4] mb-6"
              style={{ fontSize: "clamp(3.2rem, 6vw, 5.8rem)", fontWeight: 300, lineHeight: 1.05 }}
            >
              Where the land<br />
              <em className="text-[#C4882A]">feeds</em> the future
            </h1>

            <p className="text-[#F5EFE4]/60 text-lg leading-relaxed max-w-lg mb-12">
              A modern smart farm raising premium indigenous livestock, growing wholesome food,
              and bringing it all to your table. Authentic breeds. Sustainable methods. African excellence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/breeds" className="btn btn-primary btn-lg">
                Explore Our Breeds
              </Link>
              <Link href="/barn" className="btn btn-ghost btn-lg">
                Visit the Barn Store
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-24 pt-8 border-t border-[#C4882A]/15 flex flex-wrap gap-10 sm:gap-16">
            {[
              { num: "6+",   label: "Livestock Breeds" },
              { num: "4",    label: "Farm Enterprises" },
              { num: "100%", label: "Farm-to-Fork" },
              { num: "2026", label: "Est. Kajiado" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-serif text-[#C4882A] font-semibold"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1 }}
                >
                  {stat.num}
                </div>
                <div className="eyebrow-plain text-[#F5EFE4]/35 text-[9px] tracking-[0.18em] mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terrain wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 sm:h-24" fill="none">
            <path d="M0,70 C180,30 360,90 540,60 C720,30 900,80 1080,50 C1260,20 1380,65 1440,55 L1440,100 L0,100 Z" fill="rgba(61,107,62,0.12)" />
            <path d="M0,82 C240,55 480,88 720,70 C960,52 1200,82 1440,68 L1440,100 L0,100 Z" fill="rgba(196,136,42,0.08)" />
            <path d="M0,92 C360,78 720,95 1440,85 L1440,100 L0,100 Z" fill="rgba(28,18,8,0.6)" />
          </svg>
        </div>
      </section>

      {/* ── WHAT WE RAISE ─────────────────────────────────────── */}
      <section className="section bg-[#FBF7F0]">
        <div className="container">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow mb-4">What We Raise</div>
              <h2 className="font-serif text-[#1C1208] text-display-lg">
                Premium livestock,<br />
                <em className="text-[#3D6B3E]">bred for Africa</em>
              </h2>
            </div>
            <p className="text-[#1C1208]/55 max-w-sm leading-relaxed text-sm">
              Every animal is selected for genetic superiority, climate resilience,
              and commercial value — ready for East Africa's conditions.
            </p>
          </div>

          {/* Livestock enterprise tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mb-12">
            {[
              { icon: "🐂", label: "Beef Cattle",  desc: "Boran · Bonsmara · Brahman · Simmental",  bg: "gradient-hide",  count: "4 breeds" },
              { icon: "🐄", label: "Dairy Cattle", desc: "Sahiwal · Friesian × Sahiwal crosses",     bg: "gradient-grass", count: "2 breeds" },
              { icon: "🐐", label: "Goats",        desc: "Boer · Galla · Boer × Galla",             bg: "gradient-hide",  count: "3 breeds" },
              { icon: "🐑", label: "Sheep",        desc: "Dorper · Red Maasai × Dorper",            bg: "gradient-grass", count: "2 breeds" },
            ].map((item, i) => (
              <Link
                key={item.label}
                href="/breeds"
                className={`reveal ${item.bg} p-8 relative overflow-hidden group block`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-4 right-4 eyebrow-plain text-white/40 text-[9px]">
                  {item.count}
                </div>
                <div className="text-5xl mb-6">{item.icon}</div>
                <div className="font-serif text-white text-2xl mb-2">{item.label}</div>
                <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
                <div className="mt-6 eyebrow-plain text-[#C4882A] text-[9px] group-hover:translate-x-1 transition-transform">
                  Browse breeds →
                </div>
              </Link>
            ))}
          </div>

          {/* Featured breeds from DB */}
          {breeds.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-[#1C1208]">Featured Breeds</h3>
                <Link href="/breeds" className="btn btn-outline btn-sm">View All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {breeds.map((breed) => (
                  <BreedCard key={breed.id} breed={breed} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── TERRAIN BREAK ─────────────────────────────────────── */}
      <div className="terrain-divider bg-[#FBF7F0]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10" fill="none">
          <path d="M0,30 C360,10 720,50 1440,25 L1440,60 L0,60 Z" fill="#1C1208" opacity="0.04" />
        </svg>
      </div>

      {/* ── THE BARN STORE ─────────────────────────────────────── */}
      <section className="section bg-[#1C1208] relative overflow-hidden">

        {/* Background watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
          <span className="font-serif text-[16rem] font-semibold text-[#C4882A]/04 leading-none">
            BARN
          </span>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow mb-4">The Barn Store</div>
              <h2 className="font-serif text-[#F5EFE4] text-display-lg">
                Everything fresh,<br />
                <em className="text-[#C4882A]">everything ours</em>
              </h2>
            </div>
            <p className="text-[#F5EFE4]/45 max-w-sm leading-relaxed text-sm">
              Walk in or order online. Every product carries the Osotua promise —
              raised here, handled with care, delivered to you.
            </p>
          </div>

          {/* Product category tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
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
                className="reveal border border-[#F5EFE4]/08 p-5 rounded-sm hover:border-[#C4882A]/40 hover:bg-[#C4882A]/06 transition-all group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="font-serif text-[#F5EFE4] text-base mb-1">{item.name}</div>
                <div className="text-[#F5EFE4]/35 text-xs">{item.note}</div>
              </Link>
            ))}
          </div>

          {/* Featured products from DB */}
          {products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} dark />
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Link href="/barn" className="btn btn-primary btn-lg">
              Shop the Barn Store
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="section bg-[#F5EFE4]">
        <div className="container">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center mb-4">How It Works</div>
            <h2 className="font-serif text-[#1C1208] text-display-md">
              Ordering livestock{" "}
              <em className="text-[#3D6B3E]">the right way</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse the Catalogue", desc: "Explore our full livestock and product catalogue with breed profiles, availability, and pricing." },
              { step: "02", title: "Place Your Order",     desc: "Submit your order and pay a deposit via M-Pesa or card to confirm your reservation." },
              { step: "03", title: "We Prepare",           desc: "Animals are health-checked, vaccinated, and documented with movement permits and certificates." },
              { step: "04", title: "Collect or Deliver",   desc: "Pick up from the ranch or arrange transport. We coordinate with licensed livestock transporters." },
            ].map((item, i) => (
              <div
                key={item.step}
                className="reveal pl-5 border-l-2 border-[#C4882A]/25 hover:border-[#C4882A] transition-colors"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="eyebrow-plain text-[#C4882A] text-[10px] mb-3">Step {item.step}</div>
                <div className="font-serif text-[#1C1208] text-xl mb-3">{item.title}</div>
                <div className="text-[#1C1208]/55 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OSOTUA ────────────────────────────────────────── */}
      <section className="section bg-[#FBF7F0]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Visual panel */}
            <div className="gradient-grass rounded p-12 relative overflow-hidden min-h-96 flex flex-col justify-between reveal">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/05 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#C4882A]/10 translate-y-1/3 -translate-x-1/3" />
              <div className="relative">
                <div className="eyebrow-plain text-white/40 text-[9px] mb-4">The Maa Word</div>
                <div className="font-serif text-white/20 text-8xl font-light leading-none mb-6">
                  Osotua
                </div>
              </div>
              <div className="relative">
                <p className="font-serif text-3xl text-white font-light italic leading-tight mb-3">
                  "A bond of friendship that endures"
                </p>
                <span className="eyebrow-plain text-white/40 text-[9px]">
                  Maa Language · Kajiado, Kenya
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="reveal">
              <div className="eyebrow mb-5">Why Osotua</div>
              <h2 className="font-serif text-display-md text-[#1C1208] mb-5">
                A farm built on<br />
                <em className="text-[#C4882A]">trust and land</em>
              </h2>
              <p className="text-[#1C1208]/55 leading-relaxed mb-10">
                Our name says it all. Osotua means a bond of friendship in the Maa language —
                a covenant between the land, the farmer, and the community it feeds.
              </p>

              <div className="flex flex-col gap-6">
                {[
                  { icon: "🌱", title: "Indigenous breeds, modern methods",  desc: "We champion Africa's finest livestock genetics combined with smart farming technology and sustainable land management." },
                  { icon: "🔗", title: "Full farm-to-fork traceability",     desc: "Every product carries a QR code linking back to its source animal, field, or batch — full transparency guaranteed." },
                  { icon: "🤝", title: "Community-first enterprise",         desc: "We partner with smallholder farmers, support youth through internships, and invest in communities around us." },
                  { icon: "📍", title: "Rooted in Kajiado County",          desc: "Our land has the climate, the heritage, and the genetics to produce Kenya's finest livestock and food." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#C4882A]/10 border border-[#C4882A]/20 flex items-center justify-center text-base flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-[#1C1208] text-sm mb-1">{item.title}</div>
                      <div className="text-[#1C1208]/50 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GET INVOLVED ──────────────────────────────────────── */}
      <section className="section bg-[#3B2506]">
        <div className="container">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center mb-4">Get Involved</div>
            <h2 className="font-serif text-[#F5EFE4] text-display-md">
              This farm belongs<br />
              <em className="text-[#C4882A]">to all of us</em>
            </h2>
            <p className="text-[#F5EFE4]/45 text-sm max-w-md mx-auto mt-4 leading-relaxed">
              Whether you want to work with us, invest, partner, or learn — there is a place for you at Osotua Farming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="reveal border border-[#F5EFE4]/08 rounded-sm p-7 hover:border-[#C4882A] hover:bg-[#C4882A]/05 transition-all group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-5">{item.icon}</div>
                <div className="font-serif text-[#F5EFE4] text-xl mb-2">{item.title}</div>
                <div className="text-[#F5EFE4]/40 text-sm leading-relaxed mb-5">{item.desc}</div>
                <span className="eyebrow-plain text-[#C4882A] text-[9px] group-hover:translate-x-1 transition-transform inline-block">
                  {item.cta} →
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
            <div className="font-serif text-[#1C1208]/20 text-8xl leading-none mb-4">"</div>
            <blockquote className="font-serif text-[#1C1208] text-display-sm font-light italic leading-snug mb-6">
              We don't just raise animals and grow food. We build relationships that nourish Kenya —
              one farm, one family, one table at a time.
            </blockquote>
            <div className="eyebrow-plain text-[#C4882A] text-[10px]">
              Osotua Farming · Kajiado, Kenya
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────── */}
      <section className="bg-[#C4882A] py-16">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
            <div>
              <h3 className="font-serif text-[#1C1208] text-display-sm font-light mb-2">
                Stay close to the land
              </h3>
              <p className="text-[#1C1208]/60 text-sm">
                Monthly updates — new breeds, seasonal harvests, farm stories, exclusive offers.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  )
}
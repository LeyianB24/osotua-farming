import Link from "next/link"
import { prisma } from "@/lib/prisma"
import BreedCard from "@/components/farm/BreedCard"
import ProductCard from "@/components/farm/ProductCard"

async function getFeaturedBreeds() {
  return prisma.breed.findMany({
    where: { featured: true },
    include: { species: true },
    take: 4,
  })
}

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, inStock: true },
    include: { category: true },
    take: 6,
  })
}

export default async function HomePage() {
  const [breeds, products] = await Promise.all([
    getFeaturedBreeds(),
    getFeaturedProducts(),
  ])

  return (
    <div className="bg-[#FBF7F0]">

      {/* HERO */}
      <section className="relative min-h-screen bg-[#1C1208] flex items-center overflow-hidden">
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 70% 60%, rgba(61,107,62,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(196,136,42,0.12) 0%, transparent 50%), linear-gradient(160deg, #1C1208 0%, #2a1a0a 40%, #1a2010 100%)"
          }}
        />

        {/* Floating breed tags */}
        <div className="absolute top-0 right-0 bottom-0 w-1/3 hidden lg:flex flex-col justify-center gap-3 pr-16 pt-24 opacity-50">
          {["Boran Beef Cattle", "Sahiwal Dairy", "Boer Goats", "Dorper Sheep", "Bonsmara Bulls", "Galla Goats"].map((tag, i) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase border border-[#C4882A]/25 px-3 py-1.5 w-fit rounded-sm"
              style={{ marginLeft: `${[0, 24, 8, 32, 12, 20][i]}px` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C4882A]" />
            Kajiado County, Kenya
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#F5EFE4] leading-tight mb-6">
            Where the land<br />
            <em className="text-[#C4882A]">feeds</em> the future
          </h1>

          <p className="text-[#F5EFE4]/60 text-lg max-w-xl leading-relaxed mb-10">
            A modern smart farm raising premium livestock, growing wholesome food, and bringing it all to your table. Indigenous breeds. Sustainable methods. African excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/breeds"
              className="bg-[#C4882A] text-[#1C1208] px-7 py-3 text-sm font-medium hover:bg-[#d99a30] transition-colors rounded-sm"
            >
              Explore Our Breeds
            </Link>
            <Link
              href="/barn"
              className="border border-[#F5EFE4]/30 text-[#F5EFE4] px-7 py-3 text-sm hover:border-[#C4882A] hover:text-[#C4882A] transition-colors rounded-sm"
            >
              Visit the Barn Store
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 pt-8 border-t border-[#C4882A]/20 flex flex-wrap gap-12">
            {[
              { num: "6+", label: "Livestock Breeds" },
              { num: "4", label: "Farm Enterprises" },
              { num: "100%", label: "Farm-to-Fork" },
              { num: "2026", label: "Est. Kajiado" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl text-[#C4882A] font-semibold">{stat.num}</div>
                <div className="font-mono text-[10px] text-[#F5EFE4]/40 tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BREEDS */}
      {breeds.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#C4882A]" />
            What We Raise
          </div>
          <h2 className="font-serif text-4xl font-light text-[#1C1208] mb-3">
            Premium livestock,{" "}
            <em className="text-[#3D6B3E]">bred for Africa</em>
          </h2>
          <p className="text-[#1C1208]/55 max-w-xl mb-12 leading-relaxed">
            Every animal at Osotua is selected for genetic superiority, climate resilience, and commercial value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {breeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/breeds"
              className="border border-[#1C1208]/20 text-[#1C1208] px-7 py-3 text-sm hover:border-[#C4882A] hover:text-[#C4882A] transition-colors rounded-sm inline-block"
            >
              View All Breeds
            </Link>
          </div>
        </section>
      )}

      {/* BARN STORE */}
      {products.length > 0 && (
        <section className="bg-[#1C1208] py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-[#C4882A]" />
              The Barn Store
            </div>
            <h2 className="font-serif text-4xl font-light text-[#F5EFE4] mb-3">
              Everything fresh, everything ours
            </h2>
            <p className="text-[#F5EFE4]/50 max-w-xl mb-12 leading-relaxed">
              Walk into our Barn or order online. Every product carries the Osotua promise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} dark />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/barn"
                className="bg-[#C4882A] text-[#1C1208] px-7 py-3 text-sm font-medium hover:bg-[#d99a30] transition-colors rounded-sm inline-block"
              >
                Shop the Barn Store
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* GET INVOLVED */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#3B2506]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#C4882A]" />
            Get Involved
          </div>
          <h2 className="font-serif text-4xl font-light text-[#F5EFE4] mb-3">
            This farm belongs to all of us
          </h2>
          <p className="text-[#F5EFE4]/50 max-w-xl mb-12 leading-relaxed">
            Whether you want to work with us, invest, partner, or learn — there is a place for you at Osotua Farming.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "💼", title: "Careers", desc: "Join our world-class team of farmers, technologists, and agribusiness professionals.", href: "/careers" },
              { icon: "📈", title: "Invest", desc: "Partner with us and participate in Kenya's most exciting farm venture.", href: "/invest" },
              { icon: "🌾", title: "Partner Farmers", desc: "Supply vegetables, fodder, or eggs under our outgrower scheme.", href: "/partners" },
              { icon: "🎓", title: "Internships", desc: "Students in agriculture, IT, and business are welcome for attachments.", href: "/careers#internships" },
              { icon: "🏨", title: "B2B Supply", desc: "Hotels, restaurants, and supermarkets — get consistent quality supply.", href: "/contact#b2b" },
              { icon: "🗓️", title: "Farm Visits", desc: "Book a guided tour and experience Osotua Farming for yourself.", href: "/visit" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="border border-[#F5EFE4]/10 p-6 rounded-sm hover:border-[#C4882A] hover:bg-[#C4882A]/05 transition-all group"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="font-serif text-lg text-[#F5EFE4] mb-2">{item.title}</div>
                <div className="text-[#F5EFE4]/45 text-sm leading-relaxed mb-4">{item.desc}</div>
                <span className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#C4882A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl font-light text-[#1C1208] mb-2">
              Stay close to the land
            </h3>
            <p className="text-[#1C1208]/60 text-sm">
              Monthly updates — new breeds, seasonal harvests, farm stories, and exclusive offers.
            </p>
          </div>
          <form className="flex gap-3 flex-wrap">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-3 bg-[#1C1208]/10 rounded-sm text-[#1C1208] placeholder-[#1C1208]/40 outline-none min-w-[240px] text-sm"
            />
            <button
              type="submit"
              className="bg-[#1C1208] text-[#C4882A] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#3B2506] transition-colors"
            >
              Join the Farm
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

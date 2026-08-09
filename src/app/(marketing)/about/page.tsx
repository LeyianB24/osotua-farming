export const metadata = { title: "About — Osotua Farming" }

export default function AboutPage() {
  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Our Story
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            A farm built on{" "}
            <em className="text-[#C4882A]">trust and land</em>
          </h1>
          <p className="text-[#F5EFE4]/50 max-w-xl leading-relaxed">
            Osotua means a bond of friendship in the Maa language — a relationship between the land, the farmer, and the community.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="bg-[#3D6B3E] rounded p-10 flex flex-col justify-end min-h-64">
            <p className="font-serif text-3xl italic text-white font-light leading-tight mb-3">
              &quot;From Our Land, To Your Table&quot;
            </p>
            <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
              Maa · Kajiado, Kenya
            </span>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-[#1C1208] font-light mb-6">Our Mission</h2>
            <p className="text-[#1C1208]/60 leading-relaxed mb-4">
              Osotua Farming is a modern, smart agribusiness enterprise based in Kajiado County, Kenya. We raise premium indigenous livestock, grow wholesome food, and connect producers directly to consumers through our Barn Store.
            </p>
            <p className="text-[#1C1208]/60 leading-relaxed">
              We champion Africa&apos;s finest livestock genetics combined with smart farming technology and sustainable land management - proving that indigenous breeds and modern methods can coexist beautifully.
            </p>
          </div>
        </div>

        {/* Values */}
        <h2 className="font-serif text-3xl text-[#1C1208] font-light mb-10">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {[
            { icon: "🌱", title: "Indigenous breeds, modern methods", desc: "We champion Africa's finest livestock genetics combined with smart farming technology." },
            { icon: "📍", title: "Rooted in Kajiado", desc: "Our ranch has the climate, land, and heritage to produce the finest animals and food in East Africa." },
            { icon: "🔗", title: "Full traceability", desc: "Every product carries a QR code linking back to its source — so you always know exactly what you're eating." },
            { icon: "🤝", title: "Community-first", desc: "We partner with smallholder farmers, support youth through internships, and invest in surrounding communities." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-6 bg-white border border-[#1C1208]/08 rounded">
              <div className="w-10 h-10 rounded-full bg-[#C4882A]/10 border border-[#C4882A]/25 flex items-center justify-center text-lg flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-medium text-[#1C1208] mb-1">{item.title}</div>
                <div className="text-[#1C1208]/55 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="bg-[#1C1208] rounded p-10 text-center">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase mb-3">Find Us</div>
          <h3 className="font-serif text-3xl text-[#F5EFE4] font-light mb-3">Kajiado County, Kenya</h3>
          <p className="text-[#F5EFE4]/50 text-sm mb-6">Located in the heart of Kenya&apos;s livestock country, with the climate and heritage to produce the finest animals and food.</p>
          <a
            href="/visit"
            className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors inline-block"
          >
            Book a Farm Visit
          </a>
        </div>
      </div>
    </div>
  )
}

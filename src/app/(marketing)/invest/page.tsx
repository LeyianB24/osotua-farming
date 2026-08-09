import Link from "next/link"

export const metadata = { title: "Invest — Osotua Farming" }

export default function InvestPage() {
  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Investment
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Invest in <em className="text-[#C4882A]">Africa's future</em>
          </h1>
          <p className="text-[#F5EFE4]/50 max-w-xl leading-relaxed">
            Osotua Farming offers a rare combination of agricultural heritage, modern technology, and strong market demand. Partner with us and grow together.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            { label: "Livestock Enterprise", desc: "Breeding, importing, and selling premium livestock breeds to farmers across East Africa." },
            { label: "Barn Store", desc: "Direct-to-consumer and B2B sales of dairy, beef, vegetables, and seasonal produce." },
            { label: "Digital Platform", desc: "A modern web platform handling orders, subscriptions, and farmer partnerships." },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-[#1C1208]/08 rounded p-6">
              <div className="font-mono text-[9px] text-[#C4882A] tracking-widest uppercase mb-3">Enterprise</div>
              <div className="font-serif text-lg text-[#1C1208] mb-3">{item.label}</div>
              <div className="text-[#1C1208]/55 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#1C1208] rounded p-12 text-center">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase mb-3">Get the Full Picture</div>
          <h2 className="font-serif text-3xl text-[#F5EFE4] font-light mb-4">Request Our Investment Brief</h2>
          <p className="text-[#F5EFE4]/50 text-sm mb-8 max-w-md mx-auto">
            Our detailed investment brief covers financials, projections, farm plans, and partnership tiers. Request it below.
          </p>
          <Link
            href="/contact"
            className="bg-[#C4882A] text-[#1C1208] px-8 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors inline-block"
          >
            Request Investment Brief
          </Link>
        </div>
      </div>
    </div>
  )
}

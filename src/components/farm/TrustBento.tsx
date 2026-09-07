"use client";

import Link from "next/link";

export default function TrustBento() {
  const pillars = [
    {
      icon: "bi-heart-pulse",
      title: "Animal Dignity & Health",
      body: "Our herds range freely across vast natural paddocks with uninhibited social structures, clean bore-hole water, and veterinary supervision that favors natural pasture minerals over preventative antibiotics.",
      link: "/breeds",
      cta: "Explore Herd Standards",
    },
    {
      icon: "bi-tree",
      title: "Regenerative Land Health",
      body: "Pasture resting cycles, indigenous shade tree conservation, and native grass reseeding restore degraded savanna topsoils and create biodiversity corridors for local wildlife in Kajiado.",
      link: "/about",
      cta: "Our Land Practices",
    },
    {
      icon: "bi-award",
      title: "Uncompromising Food Quality",
      body: "From zero hormone grass-fed beef to unpasteurized raw honey and same-day dawn harvests, every provision undergoes stringent quality control before arriving in your kitchen.",
      link: "/barn",
      cta: "Inspect Provisions",
    },
  ];

  return (
    <section className="section-dark relative bg-[#1C1208] text-[#FBF7F0]">
      <div className="os-container space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3" data-reveal data-delay="1">
          <div className="t-eye">
            <span>Our Principles</span>
          </div>
          <h2 className="t-section text-[#FBF7F0] m-0">
            The Three Pillars of <br />
            <em className="text-[#C4882A] font-normal italic">Pastoral Integrity</em>
          </h2>
        </div>

        {/* 3-Cell Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" data-reveal data-delay="2">
          {pillars.map((p, i) => (
            <Link
              key={p.title}
              href={p.link}
              className="cell-dark p-8 sm:p-10 rounded-3xl flex flex-col justify-between group no-underline transition-all duration-300 hover:border-[#C4882A]/60 hover:shadow-[0_24px_80px_rgba(196,136,42,0.18)]"
              style={{
                border: "1px solid rgba(196, 136, 42, 0.18)",
                background: "linear-gradient(145deg, #2E1C08 0%, #1C1208 100%)",
              }}
            >
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#C4882A]/10 border border-[#C4882A]/30 flex items-center justify-center text-[#C4882A] text-3xl group-hover:scale-110 group-hover:bg-[#C4882A]/20 transition-all">
                  <i className={`bi ${p.icon}`} aria-hidden="true" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF7F0] font-light leading-snug m-0">
                  {p.title}
                </h3>

                <p className="t-body text-sm text-[#FBF7F0]/70 leading-relaxed m-0">
                  {p.body}
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C4882A] group-hover:text-[#F5C76D] transition-colors">
                <span>{p.cta}</span>
                <i className="bi bi-arrow-right text-sm group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

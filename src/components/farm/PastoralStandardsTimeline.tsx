"use client";

import { Compass, Dna, Leaf, ShieldCheck, Truck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Purebred Stud Selection",
    tagline: "Certified Foundation Genetics",
    description:
      "We source and breed certified Boran, Bonsmara, Sahiwal, and Dorper foundation stock registered with the Kenya Stud Book for disease tolerance and rapid grass conversion.",
    icon: Dna,
    protocol: "Stud Book Registered Pedigree",
  },
  {
    number: "02",
    title: "Holistic Pasture Grazing",
    tagline: "4,200+ Acres Rotational Stewardship",
    description:
      "Herds roam expansive, sunshine-drenched rangelands under low-stress pastoral methods. Pastures regenerate naturally without chemical sprays or synthetic hormones.",
    icon: Leaf,
    protocol: "Zero-Chemical Savanna Management",
  },
  {
    number: "03",
    title: "Direct Farm Offtake",
    tagline: "Traceable Cold-Chain Logistics",
    description:
      "Harvested organic produce, artisanal dairy, and butchered provisions move directly into our Kajiado cold rooms and ambient packhouse — zero broker transfers.",
    icon: Truck,
    protocol: "Direct Farm-Gate Integrity",
  },
  {
    number: "04",
    title: "Table & Kitchen Delivery",
    tagline: "Health Passport & Verification",
    description:
      "Each batch arrives at your door, dining table, or breeding station with digital pedigree documentation, certified harvest dates, and veterinary sign-off.",
    icon: Sparkles,
    protocol: "Verified Consumer Transparency",
  },
];

export default function PastoralStandardsTimeline() {
  return (
    <section className="relative overflow-hidden bg-[#0A100B] py-20 text-white md:py-28 border-y border-[#C99A2E]/20">
      {/* Background architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1] bg-[linear-gradient(to_right,rgba(201,154,46,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,154,46,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]"
      />

      <div className="os-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C99A2E]/40 bg-[#C99A2E]/10 px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4C9B0] mb-4">
            <Compass className="h-3.5 w-3.5 text-[#C99A2E]" />
            <span>OUR PASTORAL PROTOCOL</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#F5F0E8]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            From Savanna Pasture{" "}
            <span className="text-[#C99A2E] italic">To Direct Supply</span>
          </h2>

          <p className="text-sm sm:text-base text-[#F5F0E8]/75 leading-relaxed font-normal">
            Every stud animal, harvest basket, and educational ranch visit adheres to a verified four-stage pastoral workflow designed for quality and generational sustainability.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-[0px] border border-white/10 bg-[#121A13]/90 p-7 transition-all duration-300 hover:border-[#C99A2E]/60 hover:bg-[#152016] hover-lift"
              >
                <div>
                  {/* Top row: Big number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-4xl font-bold text-[#C99A2E]/40 group-hover:text-[#C99A2E] transition-colors leading-none"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-[0px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#C99A2E] group-hover:border-[#C99A2E]/50 group-hover:bg-[#C99A2E]/10 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C99A2E] mb-1">
                    {step.tagline}
                  </div>
                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#F5F0E8]/70 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Bottom protocol badge */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] font-mono text-[#D4C9B0] uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#6B7A3F]" />
                  <span>{step.protocol}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#F5F0E8]/60 uppercase tracking-wider m-0">
            Want to see our rangeland protocols in person?
          </p>
          <Link
            href="/visit"
            className="inline-flex items-center justify-center gap-2 rounded-[0px] bg-[#C99A2E] hover:bg-[#D9AA3E] text-[#1C1208] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition-all no-underline active:scale-[0.98]"
          >
            <span>BOOK A GUIDED RANCH TOUR</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

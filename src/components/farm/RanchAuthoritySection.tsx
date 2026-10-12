"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Award, ClipboardCheck, Sprout } from "lucide-react";

export default function RanchAuthoritySection() {
  return (
    <section className="relative overflow-hidden border-b border-[#D4C9B0]/50 bg-[#FAF7F2] py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1] bg-[linear-gradient(to_right,rgba(201,154,46,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,154,46,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]"
      />

      <div className="os-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -left-5 -top-5 hidden h-28 w-28 border border-[#C99A2E]/35 md:block" aria-hidden="true" />
            <div className="relative aspect-[4/3] overflow-hidden border border-[#D4C9B0] bg-[#1C1208] shadow-[0_24px_70px_rgba(28,18,8,0.16)]">
              <Image
                src="/images/brahmangreen.jpeg"
                alt="Osotua pastoral rangelands and certified Brahman cattle herd, Kajiado County Kenya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/85 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 z-10 border border-white/20 bg-[#1C1208]/90 px-3.5 py-1.5 backdrop-blur shadow-md rounded-[0px]">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C99A2E] m-0">
                  Registered Stud Stock
                </p>
                <p className="text-xs font-semibold text-white/95 m-0 mt-0.5">
                  Kenya Stud Book Registered Herds
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 border border-[#C99A2E]/40 bg-[#1C1208]/92 backdrop-blur p-4 shadow-xl flex items-center justify-between gap-4 rounded-[0px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C99A2E]/15 border border-[#C99A2E]/40 flex items-center justify-center text-[#C99A2E] shrink-0 rounded-[0px]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C99A2E]">
                      Titled Estate
                    </div>
                    <div className="text-sm font-bold text-white">
                      4,200+ Free Acres
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-[11px] text-[#D4C9B0] leading-snug m-0 max-w-[210px]">
                    Rotational rangeland grazing with 100% veterinary pedigree traceability.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-6 ml-6 grid max-w-xl grid-cols-2 border border-[#D4C9B0] bg-white shadow-[0_18px_48px_rgba(28,18,8,0.12)] sm:grid-cols-3">
              {[
                ["40+", "Co-op partners"],
                ["100%", "Traceable batches"],
                ["0", "Broker transfers"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-[#E8E0D2] p-4 last:border-r-0">
                  <p className="m-0 font-serif text-3xl font-bold leading-none text-[#C4602A]">
                    {value}
                  </p>
                  <p className="m-0 mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6D6253]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:pl-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-[#C99A2E]" aria-hidden="true" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99A2E]">
                  OUR PASTORAL COVENANT
                </span>
              </div>
              
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1208] leading-tight"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Pastoral Excellence Built on{" "}
                <span className="text-[#C99A2E] italic">Trust &amp; Soil</span>
              </h2>
            </div>

            <p className="text-base text-[#5C4A2A] leading-relaxed font-normal">
              In Maa, <em className="text-[#1C1208] font-semibold not-italic">Osotua</em> represents an inviolable covenant of friendship and peace. We bring that sacred standard to modern agriculture — uniting indigenous genetics with rigorous traceability, ethical husbandry, and ecological balance.
            </p>

            <div className="grid gap-3 pt-2">
              {[
                {
                  title: "100% Direct Pedigree Traceability",
                  desc: "Every animal carries verified lineage back to certified Boran, Bonsmara, and Sahiwal foundation genetics.",
                  icon: ClipboardCheck,
                },
                {
                  title: "Holistic Regenerative Pastures",
                  desc: "Rotational savanna grazing restores native grasses, captures groundwater, and eliminates synthetic inputs.",
                  icon: Sprout,
                },
                {
                  title: "Fair-Trade Outgrower Offtake",
                  desc: "Direct market linkage for 40+ pastoral co-ops, paying premium market-pegged prices without middlemen markups.",
                  icon: CheckCircle2,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                <div key={item.title} className="grid grid-cols-[44px_1fr] gap-4 border border-[#E8E0D2] bg-white/72 p-4 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#6B7A3F]/12 text-[#6B7A3F]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1C1208] m-0">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5C4A2A] leading-relaxed m-0 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-[0px] bg-[#C99A2E] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] shadow-sm transition-all hover:bg-[#D9AA3E] no-underline active:scale-[0.98]"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] hover:text-[#C99A2E] transition-colors group no-underline py-3.5"
              >
                <span>Plan A Ranch Visit</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-[#C99A2E]" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

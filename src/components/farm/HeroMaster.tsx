"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Beef,
  CalendarDays,
  Leaf,
  MapPin,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const assurances = [
  {
    label: "Stud book genetics",
    icon: BadgeCheck,
  },
  {
    label: "Chemical-free grazing",
    icon: Leaf,
  },
  {
    label: "Farm-gate delivery",
    icon: Truck,
  },
];

const provenanceNotes = [
  {
    title: "Rotational grazing",
    description: "Low-stress movement across rested Kajiado pasture blocks.",
    icon: Sprout,
  },
  {
    title: "Verified health records",
    description: "Pedigree, vaccination, and harvest data kept batch by batch.",
    icon: ShieldCheck,
  },
  {
    title: "Direct ranch supply",
    description: "Fresh cuts, dairy, and produce shipped without broker handling.",
    icon: Beef,
  },
];

export default function HeroMaster() {
  const { count: acresCount, ref: acresRef } = useCountUp(4200, 1600, 4200);
  const { count: livestockCount, ref: livestockRef } = useCountUp(850, 1600, 850);
  const { count: familiesCount, ref: familiesRef } = useCountUp(127, 1600, 127);
  const { count: yieldCount, ref: yieldRef } = useCountUp(380, 1600, 380);

  const stats = [
    {
      value: acresCount.toLocaleString(),
      suffix: "+",
      label: "Acres",
      description: "Rotational pasture blocks",
      ref: acresRef,
    },
    {
      value: livestockCount.toLocaleString(),
      suffix: "+",
      label: "Livestock Head",
      description: "Boran, Dorper, Sahiwal",
      ref: livestockRef,
    },
    {
      value: familiesCount.toLocaleString(),
      suffix: "+",
      label: "Partner Families",
      description: "Pastoral co-op offtake",
      ref: familiesRef,
    },
    {
      value: yieldCount.toLocaleString(),
      suffix: "+ t",
      label: "Annual Yield",
      description: "Beef, mutton, dairy",
      ref: yieldRef,
    },
  ];

  return (
    <div className="relative isolate w-full overflow-hidden bg-[#1C1208] text-[#F5F0E8]">
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/brahmangreen.jpeg"
          alt="Osotua pastoral Brahman cattle herd grazing the Kajiado rangelands"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,18,8,0.96)_0%,rgba(28,18,8,0.84)_36%,rgba(28,18,8,0.48)_68%,rgba(28,18,8,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,18,8,0.72)_0%,rgba(28,18,8,0.08)_34%,rgba(28,18,8,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,154,46,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,154,46,0.035)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <section className="relative flex min-h-[86vh] w-full flex-col justify-end pt-28 pb-12 sm:pt-32 lg:min-h-[92vh] lg:pb-16">
        <div className="os-container relative z-10 w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="max-w-4xl space-y-7" data-reveal data-delay="1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="h-px w-10 bg-[#C99A2E]" aria-hidden="true" />
                <div className="inline-flex items-center gap-2 border border-[#C99A2E]/35 bg-[#6B7A3F]/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Kajiado County, Kenya</span>
                </div>
                <div className="hidden border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4C9B0] backdrop-blur sm:inline-flex">
                  4,200-acre working ranch
                </div>
              </div>

              <div className="space-y-5">
                <h1
                  className="m-0 max-w-4xl text-5xl font-bold leading-[1.02] text-[#F5F0E8] sm:text-6xl md:text-7xl lg:text-[82px]"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Pristine livestock
                  <span className="block text-[#C99A2E]">&amp; farm harvests,</span>
                  direct from Kajiado.
                </h1>

                <p
                  className="m-0 max-w-2xl text-base leading-8 text-[#F5F0E8]/88 sm:text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-source-sans), var(--font-jakarta), system-ui, sans-serif" }}
                >
                  Ethical breeding, grass-fed livestock, artisanal dairy, and seasonal
                  produce from a Kenyan ranch built around traceability, soil health,
                  and direct supply.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <Link
                  href="/barn"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#C99A2E] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1C1208] shadow-[0_16px_42px_rgba(201,154,46,0.28)] transition-all hover:bg-[#D9AA3E] hover:translate-y-[-1px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
                >
                  <span>Shop Farm Barn</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/visit"
                  className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/35 bg-black/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8] backdrop-blur-sm transition-all hover:border-[#C99A2E] hover:bg-black/40 hover:text-[#C99A2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E]"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Book a Visit</span>
                </Link>
              </div>

              <div className="grid gap-3 pt-3 sm:grid-cols-3">
                {assurances.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-[#F5F0E8] backdrop-blur"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#C99A2E]" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside
              className="relative hidden border border-[#C99A2E]/30 bg-[#1C1208]/78 p-5 shadow-2xl backdrop-blur-xl lg:block"
              data-reveal
              data-delay="2"
              aria-label="Osotua ranch provenance"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#0F0904]">
                <Image
                  src="/images/WhatsApp Image 2026-08-10 at 11.56.42.jpeg"
                  alt="Osotua cattle herd grazing the lush Kenyan bush rangelands"
                  fill
                  sizes="430px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(28,18,8,0.84)_100%)]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="m-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C99A2E]">
                    Today on the ranch
                  </p>
                  <p className="m-0 mt-1 text-lg font-bold leading-tight text-white">
                    Herd checks, pasture rotation, and fresh barn orders.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {provenanceNotes.map((note) => {
                  const Icon = note.icon;

                  return (
                    <div key={note.title} className="grid grid-cols-[42px_1fr] gap-3 border border-white/10 bg-white/[0.045] p-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#C99A2E]/12 text-[#C99A2E]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="m-0 text-sm font-bold text-white">{note.title}</h2>
                        <p className="m-0 mt-1 text-xs leading-5 text-[#D4C9B0]/82">
                          {note.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full border-t border-white/10 bg-[#1C1208]/82 py-5 backdrop-blur-md sm:py-6">
        <div className="os-container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/12" data-reveal data-delay="2">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-white/10 bg-white/[0.035] p-4 md:border-0 md:bg-transparent md:px-7 md:py-2 md:first:pl-0">
                <div
                  className="text-3xl font-bold leading-none text-[#C99A2E] sm:text-4xl"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  <span ref={stat.ref}>{stat.value}</span>
                  {stat.suffix}
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-wider text-white">
                  {stat.label}
                </div>
                <div className="mt-1 text-[11px] leading-relaxed text-[#D4C9B0]/75">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

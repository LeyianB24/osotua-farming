"use client"

import { useState } from "react"
import Image from "next/image"
import TraceabilityModal from "./TraceabilityModal"
import { LOGO } from "@/lib/images"

export default function HomeTraceabilitySection() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState({
    batchNumber: "OST-2026-KAJ-8842",
    itemName: "Pasture Dry-Aged Boran Steer & Organic Dawn Harvest",
    origin: "Kajiado South Rangelands (Sector 4-B)",
    grazingPaddock: "Sector 4-B Rotational Savanna & Indigenous Legumes",
  })

  const openPassport = (batchNumber: string, itemName: string, origin: string, grazingPaddock: string) => {
    setSelectedBatch({ batchNumber, itemName, origin, grazingPaddock })
    setIsOpen(true)
  }

  return (
    <>
      <section className="py-24 sm:py-36 w-full bg-gradient-to-b from-[#FAF6EE] to-white relative overflow-hidden">
        <div className="os-container space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-emerald-500/10 text-[#2E6B34] border border-emerald-500/25">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ZERO COMPROMISE &bull; RADICAL TRANSPARENCY</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                Trace Every Bite to the <span className="text-gradient-gold font-semibold">Exact Rangeland Paddock</span>
              </h2>
              <p className="text-base sm:text-lg text-[#5C4835] max-w-2xl leading-relaxed">
                Scan or verify any Osotua dispatch to view GPS rangeland coordinates, attending veterinarian clearance, pasture forage composition, and negative net carbon impact.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400 shadow-md shrink-0 bg-white">
                <Image src={LOGO} alt="Osotua Seal" fill sizes="48px" className="object-cover" />
              </div>
              <div className="text-xs font-mono text-[#8E5E16]">
                <div className="font-bold uppercase">Kenya Stud Book &amp; KVB</div>
                <div>Official Certified System</div>
              </div>
            </div>
          </div>

          {/* Interactive Passport Verification Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sample Passport 1: Boran Beef & Livestock */}
            <div className="card-luxury p-8 flex flex-col justify-between space-y-6 group hover:border-amber-500/50 transition-all bg-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-[#8E5E16] font-bold uppercase">
                    LIVESTOCK LOT #8842
                  </span>
                  <span className="text-[#2E6B34] font-bold flex items-center gap-1">
                    <i className="ti ti-shield-check" /> Verified
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Boran Stud &amp; Pasture Beef
                </h3>

                <p className="text-xs font-mono text-[#5C4835] space-y-1">
                  <div><strong>Paddock:</strong> Sector 4-B Savanna Grasslands</div>
                  <div><strong>Soil Organic Index:</strong> 4.2% SOM</div>
                  <div><strong>Vet Clearance:</strong> KVB #8812 &bull; Dr. Omondi</div>
                </p>
              </div>

              <button
                onClick={() =>
                  openPassport(
                    "OST-2026-KAJ-8842",
                    "Champion Boran Steer & Pasture Beef",
                    "Kajiado South Rangelands (Sector 4-B)",
                    "Sector 4-B Rotational Savanna & Indigenous Legumes"
                  )
                }
                className="btn-ghost w-full justify-center py-3 text-xs tracking-wider font-bold"
              >
                <i className="ti ti-file-certificate text-base text-[#C4882A]" />
                <span>INSPECT DIGITAL PASSPORT</span>
              </button>
            </div>

            {/* Sample Passport 2: Dawn Harvest Produce */}
            <div className="card-luxury p-8 flex flex-col justify-between space-y-6 group hover:border-emerald-500/50 transition-all bg-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#2E6B34] font-bold uppercase">
                    HARVEST BATCH #2026-H19
                  </span>
                  <span className="text-[#2E6B34] font-bold flex items-center gap-1">
                    <i className="ti ti-shield-check" /> 6:00 AM Harvest
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Organic Crisp Cabbages &amp; Greens
                </h3>

                <p className="text-xs font-mono text-[#5C4835] space-y-1">
                  <div><strong>Orchard Plot:</strong> Kajiado Bio-Intensive Plot 2</div>
                  <div><strong>Pesticides:</strong> 0% (Neem &amp; Garlic Bio-Extracts)</div>
                  <div><strong>Water Source:</strong> Deep Solar Aquifer</div>
                </p>
              </div>

              <button
                onClick={() =>
                  openPassport(
                    "OST-2026-H19-CAB",
                    "Organic Crisp Cabbages & Seasonal Greens",
                    "Kajiado Bio-Intensive Plot 2",
                    "Permaculture Swale Block A & Compost Beds"
                  )
                }
                className="btn-ghost w-full justify-center py-3 text-xs tracking-wider font-bold"
              >
                <i className="ti ti-file-certificate text-base text-[#2E6B34]" />
                <span>INSPECT DIGITAL PASSPORT</span>
              </button>
            </div>

            {/* Sample Passport 3: Sahiwal Pure Dairy */}
            <div className="card-luxury p-8 flex flex-col justify-between space-y-6 group hover:border-teal-500/50 transition-all bg-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 text-[#0D6E67] font-bold uppercase">
                    DAIRY VAT #DAIRY-77
                  </span>
                  <span className="text-[#2E6B34] font-bold flex items-center gap-1">
                    <i className="ti ti-shield-check" /> Pure A2 Raw
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#1C1208] m-0" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                  Pasture Sahiwal Whole Milk
                </h3>

                <p className="text-xs font-mono text-[#5C4835] space-y-1">
                  <div><strong>Butterfat Content:</strong> 4.8% Natural Cream</div>
                  <div><strong>Forage:</strong> 100% Chloris Gayana Hay</div>
                  <div><strong>Cold-Chain Temp:</strong> 3.8&deg;C Constant</div>
                </p>
              </div>

              <button
                onClick={() =>
                  openPassport(
                    "OST-2026-DAIRY-77",
                    "Pasture Sahiwal Whole Milk (A2 Certified)",
                    "Kajiado Stud Dairy Paddock 3",
                    "Chloris Gayana & Kikuyu Grass Sweet Meadow"
                  )
                }
                className="btn-ghost w-full justify-center py-3 text-xs tracking-wider font-bold"
              >
                <i className="ti ti-file-certificate text-base text-[#0D6E67]" />
                <span>INSPECT DIGITAL PASSPORT</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Traceability Passport Modal */}
      <TraceabilityModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        batchNumber={selectedBatch.batchNumber}
        itemName={selectedBatch.itemName}
        origin={selectedBatch.origin}
        grazingPaddock={selectedBatch.grazingPaddock}
      />
    </>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { LOGO } from "@/lib/images"

interface Props {
  isOpen: boolean
  onClose: () => void
  batchNumber?: string
  itemName?: string
  origin?: string
  grazingPaddock?: string
}

export default function TraceabilityModal({
  isOpen,
  onClose,
  batchNumber = "OST-2026-B8842",
  itemName = "Champion Boran Herd Selection / Dawn Harvest",
  origin = "Kajiado County Rangelands, Kenya (Lot 14)",
  grazingPaddock = "Sector 4-B Rotational Savanna Pasture",
}: Props) {
  const [activeTab, setActiveTab] = useState<"origin" | "veterinary" | "ecology">("origin")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="card-luxury p-8 sm:p-12 max-w-2xl w-full bg-white shadow-2xl relative my-8 border-amber-500/40">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <i className="ti ti-x text-xl" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-400 shadow-md shrink-0 bg-white">
            <Image src={LOGO} alt="Osotua Seal" fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-[#2E6B34] border border-emerald-500/25 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              VERIFIED DIGITAL PASSPORT
            </div>
            <h3
              className="text-2xl sm:text-3xl font-light text-[#1C1208]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Farm-to-Fork Traceability Passport
            </h3>
            <p className="font-mono text-xs text-[#8E5E16] mt-0.5 font-bold">
              Batch Certificate: {batchNumber}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 mb-6 gap-2">
          {[
            { id: "origin", label: "Paddock & Origin", icon: "ti-map-pin" },
            { id: "veterinary", label: "Vet & Pedigree", icon: "ti-certificate" },
            { id: "ecology", label: "Carbon & Ecology", icon: "ti-leaf" },
          ].map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  active
                    ? "border-[#C4882A] text-[#C4882A] bg-amber-50/50"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <i className={`ti ${tab.icon} text-sm`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content 1: Origin */}
        {activeTab === "origin" && (
          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Item Designation</span>
                <strong className="text-sm text-[#1C1208] block mt-1">{itemName}</strong>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Ranch Estate Origin</span>
                <strong className="text-sm text-[#1C1208] block mt-1">{origin}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">GPS Coordinates</span>
              <strong className="text-sm text-[#8E5E16] block mt-1 font-mono">
                1&deg;45&apos;18.4&quot;S 36&deg;47&apos;22.1&quot;E &bull; Elevation 1,680m ASL
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Active Pasture Rotation</span>
              <strong className="text-sm text-[#2E6B34] block mt-1">{grazingPaddock}</strong>
              <p className="text-[11px] text-stone-500 font-sans mt-1">
                Rotated every 21 days across indigenous African grass species (Chloris gayana, Themeda triandra, and Cenchrus ciliaris).
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 2: Veterinary & Pedigree */}
        {activeTab === "veterinary" && (
          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Kenya Stud Book No.</span>
                <strong className="text-sm text-[#C4882A] block mt-1">KSB-2024-8849-B</strong>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Vaccination Status</span>
                <strong className="text-sm text-[#2E6B34] block mt-1">FMD, CBPP, Anthrax Certified</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Attending Chief Veterinarian</span>
              <strong className="text-sm text-[#1C1208] block mt-1">Dr. S. Omondi, BVM, MSc (KVB #8812)</strong>
              <p className="text-[11px] text-stone-500 font-sans mt-1">
                Zero preventive antibiotics. Zero synthetic growth hormones. 100% natural herbal rangeland health protocol.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 3: Ecology */}
        {activeTab === "ecology" && (
          <div className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Carbon Balance</span>
                <strong className="text-sm text-[#2E6B34] block mt-1">-14.2 kg CO₂e / head (Net Sink)</strong>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Water Source</span>
                <strong className="text-sm text-[#0D6E67] block mt-1">Solar Deep Borehole &amp; Swale Catchment</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-amber-900/10">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Soil Organic Matter</span>
              <strong className="text-sm text-[#1C1208] block mt-1">4.2% (Savanna Average 1.8%)</strong>
              <p className="text-[11px] text-stone-500 font-sans mt-1">
                Measured independently via annual Maasai rangeland soil carbon monitoring.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-8 mt-8 border-t border-stone-100 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <i className="ti ti-lock text-[#2E6B34]" />
            <span>Cryptographically Verified on Server</span>
          </div>

          <button
            onClick={onClose}
            className="btn-primary py-3 px-6 text-xs tracking-widest shadow-md"
          >
            <span>CLOSE PASSPORT</span>
          </button>
        </div>

      </div>
    </div>
  )
}

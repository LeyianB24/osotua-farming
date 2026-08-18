"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import OrderForm from "./OrderForm"

export interface LivestockItemProps {
  id: string
  tagNumber: string
  name: string
  species: string
  breedName: string
  ageMonths: number
  weightKg: number
  price: number
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "BREEDING_STOCK"
  image?: string | null
  origin?: string
  diet?: string
}

export default function LivestockCard({ item }: { item: LivestockItemProps }) {
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const isAvailable = item.status === "AVAILABLE"

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(196, 136, 42, 0.22)",
          borderRadius: "24px",
          boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
        }}
        className="overflow-hidden flex flex-col justify-between group hover:border-[#C4882A] hover:shadow-xl transition-all"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FAF5EB] to-[#F5EFE4] text-[#C4882A] font-mono text-sm">
              [No Image Available]
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 text-[#8E5E16] backdrop-blur-md border border-[#C4882A]/30 shadow-xs">
              #{item.tagNumber}
            </span>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="pointer-events-auto p-2 rounded-full bg-white/90 backdrop-blur-md text-[#1C1208] hover:text-[#C2410C] hover:scale-110 transition-all shadow-xs flex items-center justify-center"
              aria-label="Wishlist"
            >
              <i className={`bi ${isLiked ? "bi-heart-fill text-[#C2410C]" : "bi-heart"} text-xs`} />
            </button>
          </div>

          {/* Status Overlay Badge */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
                item.status === "AVAILABLE"
                  ? "bg-[#2E7D32] text-white"
                  : item.status === "RESERVED"
                  ? "bg-[#C4882A] text-white"
                  : "bg-[#1C1208]/80 text-white/70"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold">
              <span>{item.species}</span>
              <span className="text-[#786550] font-normal">&bull; {item.origin ?? "Osotua Farm Estate"}</span>
            </div>

            <h3 className="font-serif text-xl text-[#1C1208] font-bold mt-1 group-hover:text-[#C4882A] transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-[#5C4835] font-sans">{item.breedName}</p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 gap-2 py-3 px-3 rounded-xl bg-[#FAF6EE] border border-[#C4882A]/15 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#1C1208]">
              <i className="bi bi-speedometer text-[#C4882A] text-base" />
              <div>
                <p className="text-[10px] font-mono text-[#786550] uppercase font-semibold">Live Weight</p>
                <p className="font-bold text-[#1C1208]">{item.weightKg} kg</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1C1208]">
              <i className="bi bi-calendar3 text-[#2E7D32] text-base" />
              <div>
                <p className="text-[10px] font-mono text-[#786550] uppercase font-semibold">Age</p>
                <p className="font-bold text-[#1C1208]">{item.ageMonths} mos</p>
              </div>
            </div>
          </div>

          {/* Verification Tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#2E7D32] font-semibold">
            <i className="bi bi-shield-check text-sm" />
            <span>Organic Pasture &amp; Vet Certified</span>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-3 border-t border-[#C4882A]/15 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase text-[#786550] font-bold">Price per Head</p>
              <p className="font-serif text-xl font-bold text-[#1C1208]">
                KES {item.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setShowOrderModal(true)}
              disabled={!isAvailable}
              className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              <span>{isAvailable ? "Reserve Head" : "Unavailable"}</span>
              <i className="bi bi-chevron-right text-xs" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Order & Customization Modal */}
      {showOrderModal && (
        <OrderForm
          item={item}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </>
  )
}

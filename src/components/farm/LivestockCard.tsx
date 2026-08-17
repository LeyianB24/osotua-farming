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
        className="os-card bg-white border border-[#1C1208]/08 rounded-xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl hover:border-[#C4882A]/30"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-[#F5EFE4] overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C1208]/10 to-[#C4882A]/20 text-[#1C1208]/40 font-mono text-sm">
              [No Image Available]
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded bg-[#1C1208]/80 text-[#C4882A] backdrop-blur-md border border-[#C4882A]/30">
              #{item.tagNumber}
            </span>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-md text-[#1C1208] hover:text-[#A0431E] hover:scale-110 transition-all shadow flex items-center justify-center"
              aria-label="Wishlist"
            >
              <i className={`bi ${isLiked ? "bi-heart-fill text-[#A0431E]" : "bi-heart"} text-xs`} />
            </button>
          </div>

          {/* Status Overlay Badge */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`font-mono text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded backdrop-blur-md ${
                item.status === "AVAILABLE"
                  ? "bg-[#3D6B3E]/90 text-white"
                  : item.status === "RESERVED"
                  ? "bg-[#C4882A]/90 text-white"
                  : "bg-[#1C1208]/80 text-white/60"
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#C4882A]">
              <span>{item.species}</span>
              <span className="text-[#1C1208]/40">&bull; {item.origin ?? "Osotua Farm Estate"}</span>
            </div>

            <h3 className="font-serif text-xl text-[#1C1208] font-semibold mt-1 group-hover:text-[#C4882A] transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-[#1C1208]/60 font-sans">{item.breedName}</p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 gap-2 py-3 px-3 rounded-lg bg-[#FBF7F0] border border-[#1C1208]/05 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#1C1208]/80">
              <i className="bi bi-speedometer text-[#C4882A] text-sm" />
              <div>
                <p className="text-[10px] font-mono text-[#1C1208]/40 uppercase">Live Weight</p>
                <p className="font-semibold">{item.weightKg} kg</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1C1208]/80">
              <i className="bi bi-calendar3 text-[#3D6B3E] text-sm" />
              <div>
                <p className="text-[10px] font-mono text-[#1C1208]/40 uppercase">Age</p>
                <p className="font-semibold">{item.ageMonths} mos</p>
              </div>
            </div>
          </div>

          {/* Verification Tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#3D6B3E] font-medium">
            <i className="bi bi-shield-check text-sm" />
            <span>Organic Pasture &amp; Vet Certified</span>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 border-t border-[#1C1208]/08 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase text-[#1C1208]/40">Price per Head</p>
              <p className="font-serif text-xl font-bold text-[#1C1208]">
                KES {item.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => setShowOrderModal(true)}
              disabled={!isAvailable}
              className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
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


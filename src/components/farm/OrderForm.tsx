"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../shared/CartContext"
import { LivestockItemProps } from "./LivestockCard"

export default function OrderForm({
  item,
  onClose,
}: {
  item: LivestockItemProps
  onClose: () => void
}) {
  const { addToCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [fulfillmentType, setFulfillmentType] = useState<"LIVE_TRANSPORT" | "BUTCHER_CUTS" | "FARM_PICKUP">("BUTCHER_CUTS")
  const [packagingPref, setPackagingPref] = useState<"VACUUM_SEALED" | "CRATE_COLD_CHAIN" | "STANDARD">("VACUUM_SEALED")
  const [notes, setNotes] = useState("")
  const [added, setAdded] = useState(false)

  // Extra cost per head based on processing options
  const processingSurcharge = fulfillmentType === "BUTCHER_CUTS" ? 4500 : 0
  const packagingSurcharge = packagingPref === "VACUUM_SEALED" ? 1500 : packagingPref === "CRATE_COLD_CHAIN" ? 2500 : 0

  const headUnitPrice = item.price + processingSurcharge + packagingSurcharge
  const totalPrice = headUnitPrice * quantity

  const handleAddToCart = () => {
    addToCart({
      id: `${item.id}-${fulfillmentType}-${packagingPref}`,
      name: `${item.name} (${item.breedName} - #${item.tagNumber})`,
      price: headUnitPrice,
      unit: "head",
      image: item.image,
      categoryName: item.species,
      type: "breed",
    }, quantity)

    setAdded(true)
    setTimeout(() => {
      onClose()
    }, 1200)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C1208]/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "28px",
            boxShadow: "0 24px 60px rgba(196, 136, 42, 0.15)",
          }}
          className="relative w-full max-w-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5EB 100%)",
              borderBottom: "1px solid rgba(196, 136, 42, 0.2)",
            }}
            className="p-6 flex items-start justify-between relative"
          >
            <div>
              <span className="eyebrow text-[#8E5E16] mb-1 font-bold">Custom Livestock Order</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1208]">
                {item.name} <span className="text-[#C4882A] text-lg font-mono font-bold">#{item.tagNumber}</span>
              </h2>
              <p className="text-xs text-[#5C4835] font-sans mt-0.5">
                {item.breedName} &bull; {item.weightKg} kg Live Weight &bull; {item.species}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#786550] hover:text-[#1C1208] hover:bg-black/5 transition-colors"
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* 1. Fulfillment Preference */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-[#8E5E16] font-bold mb-3">
                1. Select Fulfillment &amp; Preparation Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "BUTCHER_CUTS",
                    title: "Artisanal Cuts",
                    desc: "Slaughtered, prime-cut & vacuum packed",
                    badge: "+ KES 4,500",
                  },
                  {
                    id: "LIVE_TRANSPORT",
                    title: "Live Transport",
                    desc: "Live animal delivery to your ranch/estate",
                    badge: "Included",
                  },
                  {
                    id: "FARM_PICKUP",
                    title: "Farm Pick-Up",
                    desc: "Direct pickup at Osotua Estate Barn",
                    badge: "Self-collect",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFulfillmentType(opt.id as "LIVE_TRANSPORT" | "BUTCHER_CUTS" | "FARM_PICKUP")}
                    style={{
                      background: fulfillmentType === opt.id ? "rgba(196, 136, 42, 0.08)" : "#FAF8F5",
                      borderColor: fulfillmentType === opt.id ? "#C4882A" : "rgba(196, 136, 42, 0.2)",
                    }}
                    className={`p-4 rounded-xl border text-left transition-all relative ${
                      fulfillmentType === opt.id ? "ring-2 ring-[#C4882A]/30 shadow-xs" : "hover:border-[#C4882A]/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-xs text-[#1C1208]">{opt.title}</span>
                      {fulfillmentType === opt.id && <i className="bi bi-check-lg text-[#C4882A] font-bold" />}
                    </div>
                    <p className="text-[11px] text-[#5C4835] leading-tight mb-2">{opt.desc}</p>
                    <span className="font-mono text-[10px] text-[#C4882A] font-bold">{opt.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Packaging Options */}
            {fulfillmentType === "BUTCHER_CUTS" && (
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#8E5E16] font-bold mb-3">
                  2. Cold-Chain Packaging &amp; Preservation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "VACUUM_SEALED",
                      title: "Vacuum Sealed",
                      desc: "Flash-chilled portion packs",
                      badge: "+ KES 1,500",
                    },
                    {
                      id: "CRATE_COLD_CHAIN",
                      title: "Refrigerated Crate",
                      desc: "Insulated ice-box delivery",
                      badge: "+ KES 2,500",
                    },
                    {
                      id: "STANDARD",
                      title: "Standard Butcher Wrap",
                      desc: "Traditional paper wrap",
                      badge: "Standard",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPackagingPref(opt.id as "VACUUM_SEALED" | "CRATE_COLD_CHAIN" | "STANDARD")}
                      style={{
                        background: packagingPref === opt.id ? "rgba(46, 125, 50, 0.08)" : "#FAF8F5",
                        borderColor: packagingPref === opt.id ? "#2E7D32" : "rgba(196, 136, 42, 0.2)",
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        packagingPref === opt.id ? "ring-2 ring-[#2E7D32]/30 shadow-xs" : "hover:border-[#2E7D32]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-xs text-[#1C1208]">{opt.title}</span>
                        {packagingPref === opt.id && <i className="bi bi-check-lg text-[#2E7D32] font-bold" />}
                      </div>
                      <p className="text-[11px] text-[#5C4835] leading-tight mb-1">{opt.desc}</p>
                      <span className="font-mono text-[10px] text-[#2E7D32] font-bold">{opt.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Quantity & Special Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4">
                <label className="block font-mono text-xs uppercase tracking-widest text-[#8E5E16] font-bold mb-2">
                  Head Count
                </label>
                <div className="flex items-center border border-[#C4882A]/30 bg-[#FAF6EE] rounded-xl p-1 w-full justify-between">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-[#1C1208] hover:bg-white rounded-lg"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm text-[#1C1208]">{quantity} Head</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-[#1C1208] hover:bg-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="sm:col-span-8">
                <label className="block font-mono text-xs uppercase tracking-widest text-[#8E5E16] font-bold mb-2">
                  Custom Cutting &amp; Aging Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 21-day dry aging requested, separate organ meats..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>
            </div>

            {/* Guarantee Callout */}
            <div className="p-4 rounded-xl bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] flex items-center gap-3 text-xs">
              <i className="bi bi-shield-check text-lg shrink-0" />
              <span>
                <strong>Osotua Quality Guarantee:</strong> Every animal comes with full genetic pedigree certificate, 
                veterinary health record, and 100% grass-fed guarantee.
              </span>
            </div>
          </div>

          {/* Footer Summary & Action */}
          <div
            style={{
              background: "#FAF8F5",
              borderTop: "1px solid rgba(196, 136, 42, 0.2)",
            }}
            className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-[#786550] font-bold">Total Reservation Deposit</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#1C1208]">
                  KES {totalPrice.toLocaleString()}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-[#786550]">({quantity} &times; KES {headUnitPrice.toLocaleString()})</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className="w-full sm:w-auto btn-primary py-3.5 px-8 text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              {added ? (
                <>
                  <i className="bi bi-check-lg text-white font-bold" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <i className="bi bi-bag-check" />
                  <span>Add Custom Order to Cart</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

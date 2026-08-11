"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Trees, Award, Users, TrendingUp, CheckCircle2 } from "lucide-react"

export default function FarmStats() {
  const [monthlyVolumeKg, setMonthlyVolumeKg] = useState<number>(15)

  // Calculated metrics based on monthly organic consumption
  const carbonSequesteredKg = Math.round(monthlyVolumeKg * 4.2)
  const pastureSupportedM2 = Math.round(monthlyVolumeKg * 28.5)
  const pastoralistIncomeKes = Math.round(monthlyVolumeKg * 850)

  const stats = [
    { label: "Acres of Regenerative Land", value: "12,500+", subtext: "Chemical-free rotational pastures", icon: Trees },
    { label: "Pedigree Livestock Head", value: "4,800+", subtext: "Dorper, Boran & Dairy Crosses", icon: Award },
    { label: "Partner Pastoralist Families", value: "180+", subtext: "Direct fair-trade empowerment", icon: Users },
    { label: "Annual Organic Yield", value: "450+ Tons", subtext: "Grass-fed beef, mutton & dairy", icon: TrendingUp },
  ]

  return (
    <section className="os-section bg-[#FBF7F0] border-y border-[#1C1208]/10 py-20 relative overflow-hidden">
      <div className="os-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow justify-center mb-3">Estates & Impact Metrics</div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1208] leading-tight">
            Regenerative Farming by the Numbers
          </h2>
          <p className="mt-4 text-[#1C1208]/70 text-sm sm:text-base">
            Every Osotua subscription directly rejuvenates Kenyan grasslands and supports indigenous pastoral communities.
          </p>
        </div>

        {/* 4-Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-lg border border-[#1C1208]/08 shadow-sm hover:shadow-md transition-shadow relative group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#C4882A]/10 border border-[#C4882A]/20 text-[#C4882A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-medium tracking-tight">
                  {stat.value}
                </div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#1C1208]/60 mt-1 font-semibold">
                  {stat.label}
                </h3>
                <p className="text-xs text-[#1C1208]/50 mt-2 font-light">
                  {stat.subtext}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Interactive Impact Calculator Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1C1208] text-[#FBF7F0] rounded-2xl p-6 sm:p-10 border border-[#C4882A]/30 relative overflow-hidden shadow-2xl"
        >
          {/* Accent glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C4882A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Calculator Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4882A]/20 text-[#C4882A] text-xs font-mono tracking-widest uppercase">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Sustainability Calculator</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF7F0] font-light">
                Calculate Your Personal Pastoral Footprint
              </h3>

              <p className="text-sm text-[#FBF7F0]/70 font-light leading-relaxed">
                Adjust your estimated monthly farm order volume to see your direct ecological & economic contribution:
              </p>

              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-xs text-[#C4882A]">
                  <span>Monthly Farm Order Volume:</span>
                  <span className="text-lg font-bold text-[#FBF7F0]">{monthlyVolumeKg} kg / month</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={monthlyVolumeKg}
                  onChange={(e) => setMonthlyVolumeKg(Number(e.target.value))}
                  className="w-full h-2 bg-[#FBF7F0]/20 rounded-lg appearance-none cursor-pointer accent-[#C4882A]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#FBF7F0]/40 mt-1">
                  <span>5 kg (Small Family)</span>
                  <span>50 kg (Estate/Host)</span>
                  <span>100 kg (Commercial)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Results */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#C4882A] font-semibold border-b border-white/10 pb-3">
                Estimated Monthly Ecological Impact
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3D6B3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xl text-[#FBF7F0] font-semibold">{carbonSequesteredKg} kg CO₂e</span>
                    <p className="text-xs text-[#FBF7F0]/60">Carbon soil-sequestered via managed rotational grazing</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C4882A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xl text-[#FBF7F0] font-semibold">{pastureSupportedM2.toLocaleString()} m²</span>
                    <p className="text-xs text-[#FBF7F0]/60">Native grassland preserved from commercial overgrazing</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3D6B3E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xl text-[#FBF7F0] font-semibold">KES {pastoralistIncomeKes.toLocaleString()}</span>
                    <p className="text-xs text-[#FBF7F0]/60">Direct fair wages paid to partner Maasai & pastoral herders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

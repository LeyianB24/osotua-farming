"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Award, Sparkles, Sprout, HeartPulse } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#1C1208] text-[#FBF7F0] overflow-hidden pt-24 pb-16">
      {/* Dynamic Background Glows & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C4882A]/20 via-[#1C1208]/80 to-[#1C1208] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C4882A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#3D6B3E]/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#C4882A 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
      />

      <div className="os-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C4882A]/10 border border-[#C4882A]/30 text-[#C4882A] text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Sustainable Pastoral Excellence & Artisanal Harvest</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight font-light text-[#FBF7F0]"
          >
            Pristine Livestock & <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#C4882A]">Artisanal Farm</span> Produce
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-base sm:text-lg md:text-xl text-[#F5EFE4]/80 max-w-2xl mx-auto font-sans font-light leading-relaxed"
          >
            Directly from Kenya’s sun-drenched pastures to your table. Ethical breeding, 
            100% grass-fed livestock, organic dairy, and unpasteurized raw honey harvested with centuries of pastoral heritage.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/barn"
              className="w-full sm:w-auto btn-primary px-8 py-4 text-sm font-semibold tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-[#C4882A]/20 hover:shadow-[#C4882A]/40 transition-all"
            >
              <span>Explore Farm Barn</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/breeds"
              className="w-full sm:w-auto btn-ghost px-8 py-4 text-sm font-semibold tracking-wider flex items-center justify-center gap-3 hover:bg-[#C4882A]/10 transition-all"
            >
              <span>View Pedigree Breeds</span>
            </Link>
          </motion.div>

          {/* Trust Highlights Bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#3D6B3E]/20 border border-[#3D6B3E]/30 text-[#3D6B3E]">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#FBF7F0]/90 font-semibold">100% Grass-Fed</p>
                <p className="text-[11px] text-[#FBF7F0]/50">Pasture grazing only</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#C4882A]/20 border border-[#C4882A]/30 text-[#C4882A]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#FBF7F0]/90 font-semibold">Vet Verified</p>
                <p className="text-[11px] text-[#FBF7F0]/50">Health & genetic tracking</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#C4882A]/20 border border-[#C4882A]/30 text-[#C4882A]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#FBF7F0]/90 font-semibold">Organic Certified</p>
                <p className="text-[11px] text-[#FBF7F0]/50">Zero hormones & antibiotics</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#3D6B3E]/20 border border-[#3D6B3E]/30 text-[#3D6B3E]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#FBF7F0]/90 font-semibold">Farm-to-Door</p>
                <p className="text-[11px] text-[#FBF7F0]/50">Cold-chain delivery</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

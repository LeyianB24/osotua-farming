"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCountUp } from "@/hooks/use-count-up";

export default function ScrollytellingSection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const { count: pastureAcres, ref: acresRef } = useCountUp(3200, 1800);
  const { count: coopsCount, ref: coopsRef } = useCountUp(40, 1400);

  const chapters = [
    {
      number: "01",
      title: "The Land",
      subtitle: "3,200 Acres of Regenerative Savanna",
      body: "Nestled in the sun-drenched plains of Kajiado County, our rangeland operates on holistic rotational grazing. We move herds systematically to mimic historical wildlife migrations, aerating deep savanna topsoil and recharging ancient aquifer tables without synthetic fertilizers.",
      meta: "Kajiado South &bull; 1,650m Elevation",
      icon: "bi-tree",
    },
    {
      number: "02",
      title: "The Breeds",
      subtitle: "Adapted Genetics Built for Arid Brilliance",
      body: "Centuries of natural selection refined indigenous Kenyan breeds—like the Boran beef steer and Red Maasai sheep—to endure seasonal droughts, resist tick-borne illnesses, and thrive exclusively on native grasses while yielding superior, nutrient-dense protein.",
      meta: "Kenya Stud Book &bull; Zero Hormones",
      icon: "bi-award",
    },
    {
      number: "03",
      title: "The Promise",
      subtitle: "100% Traceability & Fair Farm-Gate Value",
      body: "Every single animal and produce crate carries an immutable digital passport. By eliminating speculative middlemen, 100% of fair-market value directly reaches the pastoral families and smallholder cooperatives tending the herd.",
      meta: "QR Verification &bull; Direct Trade",
      icon: "bi-patch-check-fill",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("scrolly-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      if (progress < 0.33) setActiveChapter(0);
      else if (progress < 0.66) setActiveChapter(1);
      else setActiveChapter(2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="scrolly-section" className="relative bg-[#1C1208] text-[#FBF7F0] py-20 lg:py-0">
      <div className="os-container">
        
        {/* Mobile Linear View / Desktop Sticky Layout */}
        <div className="lg:min-h-[220vh] relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Chapters (Scrolls through) */}
          <div className="lg:col-span-6 space-y-20 lg:py-40">
            {chapters.map((ch, idx) => (
              <div
                key={ch.number}
                className={`transition-all duration-500 space-y-5 p-6 sm:p-8 rounded-3xl ${
                  activeChapter === idx
                    ? "bg-white/5 border border-[#C4882A]/30 shadow-2xl opacity-100"
                    : "opacity-40 hover:opacity-75"
                }`}
                data-reveal
                data-delay={String(idx + 1)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#C4882A] px-3 py-1 rounded-full bg-[#C4882A]/15 border border-[#C4882A]/30">
                    CHAPTER {ch.number}
                  </span>
                  <span className="text-xs font-mono text-[#FBF7F0]/50" dangerouslySetInnerHTML={{ __html: ch.meta }} />
                </div>

                <h3 className="font-serif text-3xl sm:text-5xl text-[#FBF7F0] font-light m-0">
                  {ch.title}: <em className="text-[#C4882A] font-normal italic">{ch.subtitle}</em>
                </h3>

                <p className="t-body text-base text-[#FBF7F0]/75 leading-relaxed m-0">
                  {ch.body}
                </p>

                {idx === 2 && (
                  <div className="pt-2">
                    <Link href="/about" className="btn-primary text-xs py-3 px-6 tracking-wider">
                      <span>Read The Full Manifesto</span>
                      <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Interactive Visual Stage (Desktop Sticky) */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 lg:h-[75vh] flex items-center justify-center">
            <div className="w-full h-full min-h-[420px] rounded-3xl p-8 sm:p-12 cell-dark border border-[#C4882A]/20 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              
              {/* Top Bar of Stage */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C4882A] animate-ping" />
                  <span className="t-label text-[11px] text-[#C4882A]">
                    Live Telemetry &bull; Chapter {chapters[activeChapter].number}
                  </span>
                </div>
                <i className={`bi ${chapters[activeChapter].icon} text-2xl text-[#C4882A]`} aria-hidden="true" />
              </div>

              {/* Dynamic Chapter Visual Content */}
              <div className="my-auto space-y-6">
                {activeChapter === 0 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="font-serif text-5xl sm:text-6xl text-[#FBF7F0] font-light">
                      <span ref={acresRef}>{pastureAcres}</span> Acres
                    </div>
                    <p className="text-sm font-mono text-[#C4882A] uppercase tracking-wider">
                      Contiguous Maasai Rotational Savanna
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-[#FBF7F0]/60 font-mono">Soil Carbon</div>
                        <div className="text-xl font-bold text-emerald-400 font-serif">+34% Growth</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-[#FBF7F0]/60 font-mono">Water Tables</div>
                        <div className="text-xl font-bold text-[#C4882A] font-serif">Recharged</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeChapter === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="font-serif text-5xl sm:text-6xl text-[#FBF7F0] font-light">
                      100% Indigenous
                    </div>
                    <p className="text-sm font-mono text-[#C4882A] uppercase tracking-wider">
                      Naturally Disease &amp; Drought Resistant
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-[10px] font-mono text-[#FBF7F0]/60">Boran Bull</div>
                        <div className="text-sm font-bold text-[#C4882A]">Prime Beef</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-[10px] font-mono text-[#FBF7F0]/60">Sahiwal Cow</div>
                        <div className="text-sm font-bold text-emerald-400">A2 Milk</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-[10px] font-mono text-[#FBF7F0]/60">Red Maasai</div>
                        <div className="text-sm font-bold text-amber-300">Immunity</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeChapter === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="font-serif text-5xl sm:text-6xl text-[#FBF7F0] font-light">
                      <span ref={coopsRef}>{coopsCount}</span>+ Co-ops
                    </div>
                    <p className="text-sm font-mono text-[#C4882A] uppercase tracking-wider">
                      Fair Trade &bull; Direct Farm-Gate Settlement
                    </p>
                    <div className="p-4 rounded-xl bg-white/5 border border-[#C4882A]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className="bi bi-qr-code text-3xl text-[#C4882A]" aria-hidden="true" />
                        <div>
                          <div className="text-xs font-bold text-[#FBF7F0]">Digital Batch Passport</div>
                          <div className="text-[10px] font-mono text-[#FBF7F0]/60">Batch #OS-2026-KAJ</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/40">
                        VERIFIED
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Stepper of Stage */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="t-label text-[10px] text-[#FBF7F0]/50">
                  Osotua Rangeland Chronicle
                </span>
                <div className="flex items-center gap-2">
                  {chapters.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveChapter(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeChapter === i ? "w-8 bg-[#C4882A]" : "w-2 bg-white/20"
                      }`}
                      aria-label={`Jump to chapter ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

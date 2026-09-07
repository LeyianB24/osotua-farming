"use client";

import Link from "next/link";
import { useState } from "react";

export default function GetInvolvedBento() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    partySize: "2",
  });

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: `${formData.fullName.toLowerCase().replace(/\s+/g, ".")}@guest.osotuafarming.co.ke`,
          phone: formData.phone,
          visitDate: formData.date || new Date().toISOString().split("T")[0],
          partySize: parseInt(formData.partySize, 10),
          notes: "Booked via homepage Get Involved bento",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-hide relative bg-[#2E1C08] text-[#FBF7F0]">
      <div className="os-container space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3" data-reveal data-delay="1">
          <div className="t-eye">
            <span>Get Involved</span>
          </div>
          <h2 className="t-section text-[#FBF7F0] m-0">
            Join the Pastoral <br />
            <em className="text-[#C4882A] font-normal italic">Ecosystem</em>
          </h2>
        </div>

        {/* 6-Cell Bento Grid */}
        <div className="bento" data-reveal data-delay="2">
          
          {/* 1. Careers (Tall, 4 cols, 2 rows) */}
          <div className="bento-2 bento-t2 bento-cell cell-dark p-8 sm:p-10 flex flex-col justify-between group hover:border-[#C4882A]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <i className="bi bi-briefcase text-3xl text-[#C4882A]" aria-hidden="true" />
                <span className="t-label text-[10px] text-[#C4882A] px-2.5 py-1 rounded-full bg-[#C4882A]/15 border border-[#C4882A]/30">
                  3 Open Roles
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF7F0] font-light m-0">
                  Careers at Osotua
                </h3>
                <p className="t-body text-xs sm:text-sm text-[#FBF7F0]/70 mt-2 m-0">
                  We are looking for passionate pioneers in regenerative pasture management, veterinary science, and cold-chain logistics.
                </p>
              </div>

              {/* Role Teasers */}
              <div className="space-y-3 pt-2">
                {[
                  { title: "Rangeland Veterinarian", loc: "Kajiado Full-Time" },
                  { title: "Pasture Operations Manager", loc: "Ranch Site" },
                  { title: "Agronomy Fellow (Graduate)", loc: "Research Hub" },
                ].map((r) => (
                  <div key={r.title} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#FBF7F0]">{r.title}</div>
                      <div className="text-[10px] font-mono text-[#C4882A]">{r.loc}</div>
                    </div>
                    <i className="bi bi-arrow-right text-xs text-white/50" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10">
              <Link href="/careers" className="t-label text-xs text-[#C4882A] hover:text-[#F5C76D] inline-flex items-center gap-2 no-underline tracking-widest">
                <span>View Job Portal</span>
                <i className="bi bi-arrow-right text-sm" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 2. Invest (4 cols) */}
          <Link
            href="/invest"
            className="bento-2 bento-cell cell-dark p-8 sm:p-10 flex flex-col justify-between group no-underline hover:border-[#C4882A]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[#C4882A]">
                <i className="bi bi-graph-up-arrow text-3xl" aria-hidden="true" />
                <span className="t-label text-[10px] text-[#C4882A]/70">Growth</span>
              </div>
              <h3 className="font-serif text-2xl text-[#FBF7F0] font-light m-0">
                Impact Capital &amp; Land Trust
              </h3>
              <p className="t-body text-xs text-[#FBF7F0]/70 m-0">
                Support high-yield sustainable livestock breeding, carbon offset projects, and water retention infrastructure.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C4882A]">
              <span>Investor Dossier</span>
              <i className="bi bi-arrow-right text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </Link>

          {/* 3. Partners (4 cols) */}
          <Link
            href="/partners"
            className="bento-2 bento-cell cell-dark p-8 sm:p-10 flex flex-col justify-between group no-underline hover:border-[#C4882A]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-emerald-400">
                <i className="bi bi-people text-3xl" aria-hidden="true" />
                <span className="t-label text-[10px] text-emerald-400/70">Cooperative</span>
              </div>
              <h3 className="font-serif text-2xl text-[#FBF7F0] font-light m-0">
                Partner Farmer Network
              </h3>
              <p className="t-body text-xs text-[#FBF7F0]/70 m-0">
                Are you a smallholder livestock or vegetable grower in Kajiado? Access direct fair-trade markets with zero broker fees.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <span>Join As Farmer</span>
              <i className="bi bi-arrow-right text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </Link>

          {/* 4. Internships (4 cols) */}
          <Link
            href="/careers"
            className="bento-2 bento-cell cell-dark p-8 sm:p-10 flex flex-col justify-between group no-underline hover:border-[#C4882A]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-amber-300">
                <i className="bi bi-mortarboard text-3xl" aria-hidden="true" />
                <span className="t-label text-[10px] text-amber-300/70">Education</span>
              </div>
              <h3 className="font-serif text-2xl text-[#FBF7F0] font-light m-0">
                Ranch Internships &amp; Research
              </h3>
              <p className="t-body text-xs text-[#FBF7F0]/70 m-0">
                Hands-on field placements for agricultural students, veterinary interns, and pastoral ecologists.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300">
              <span>Apply For Intake</span>
              <i className="bi bi-arrow-right text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </Link>

          {/* 5. B2B / Hospitality Supply (4 cols) */}
          <Link
            href="/contact"
            className="bento-2 bento-cell cell-dark p-8 sm:p-10 flex flex-col justify-between group no-underline hover:border-[#C4882A]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[#C4882A]">
                <i className="bi bi-building text-3xl" aria-hidden="true" />
                <span className="t-label text-[10px] text-[#C4882A]/70">Commercial</span>
              </div>
              <h3 className="font-serif text-2xl text-[#FBF7F0] font-light m-0">
                Hospitality &amp; Chef Supply
              </h3>
              <p className="t-body text-xs text-[#FBF7F0]/70 m-0">
                Wholesale provisioning of dry-aged beef, artisanal dairy, and organic herbs for top restaurants and safari lodges.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C4882A]">
              <span>Inquire For Wholesale</span>
              <i className="bi bi-arrow-right text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </Link>

          {/* 6. Farm Visits (Wide, 12 cols or 8 cols + form) */}
          <div className="bento-5 bento-cell cell-dark p-8 sm:p-12 border border-[#C4882A]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C4882A] px-3 py-1 rounded-full bg-[#C4882A]/15 border border-[#C4882A]/30">
                <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                <span>Ranch Agritourism &bull; Kajiado County</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FBF7F0] font-light m-0">
                Book a Pasture Tour &amp; Bush Breakfast
              </h3>

              <p className="t-body text-sm text-[#FBF7F0]/70 m-0">
                Walk among champion Boran bulls, inspect purebred breeding stock, learn rotational grazing principles, and enjoy an authentic pastoral morning in the Maasai heartland.
              </p>
            </div>

            {/* Inline Mini Booking Form */}
            <div className="w-full lg:w-96 p-6 rounded-2xl bg-white/5 border border-white/10 shrink-0">
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                    <i className="bi bi-check-lg" aria-hidden="true" />
                  </div>
                  <h4 className="font-serif text-xl text-[#FBF7F0] m-0">Visit Requested</h4>
                  <p className="text-xs text-[#FBF7F0]/70 m-0">
                    Our concierge will reach out to confirm your itinerary and directions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVisitSubmit} className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C4882A] mb-1">
                    Quick Booking
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/15 text-[#FBF7F0] placeholder-white/40 focus:border-[#C4882A] focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone (07...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-xs font-mono px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/15 text-[#FBF7F0] placeholder-white/40 focus:border-[#C4882A] focus:outline-none"
                    />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="text-xs font-mono px-3 py-2.5 rounded-xl bg-black/30 border border-white/15 text-[#FBF7F0] focus:border-[#C4882A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-xs py-3 tracking-wider justify-center"
                    style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
                  >
                    <span>{loading ? "Confirming..." : "Reserve Date"}</span>
                    <i className="bi bi-calendar-check text-xs" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

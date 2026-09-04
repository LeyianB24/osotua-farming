"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface DashboardProps {
  coopName?: string
  userName?: string
  metrics?: {
    portfolioValue: number
    headCount: number
    yieldYtd: string
    nextPayout: string
  }
  categories?: Array<{ id: string; name: string }>
}

export default function FarmerDashboardClient({
  coopName = "Kajiado Co-op",
  userName = "Amina",
  metrics = {
    portfolioValue: 480000,
    headCount: 14,
    yieldYtd: "+8.2%",
    nextPayout: "Sep 18",
  },
  categories = [],
}: DashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [adding, setAdding] = useState(false)
  const [statementModal, setStatementModal] = useState(false)
  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "kg",
    categoryId: categories[0]?.id || "",
    stockQty: "20",
    description: "",
  })

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    try {
      const slug = form.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "-")
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          price: Number(form.price),
          unit: form.unit,
          categoryId: form.categoryId || categories[0]?.id,
          stockQty: Number(form.stockQty),
          description: form.description || `Freshly harvested ${form.name} from ${coopName}.`,
          inStock: true,
        }),
      })
      if (res.ok) {
        setShowAddModal(false)
        window.location.reload()
      } else {
        alert("Could not save listing")
      }
    } catch {
      alert("Error saving listing")
    } finally {
      setAdding(false)
    }
  }

  return (
    <div
      style={{
        background: "#F6F1E6",
        minHeight: "100vh",
        color: "#211C15",
        fontFamily: "var(--font-inter, 'Inter'), sans-serif",
      }}
      className="pb-24"
    >
      {/* ── 1. PORTAL HEADER BAR ── */}
      <header
        style={{
          background: "#F6F1E6",
          borderBottom: "1px solid #E4DCC8",
          padding: "16px 28px",
        }}
        className="flex items-center justify-between sticky top-0 z-30 shadow-xs"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-9 h-9 rounded-full bg-[#211C15] flex items-center justify-center text-[#C4922E] text-sm shrink-0 transition-transform hover:scale-105"
            aria-label="Osotua Farming Home"
          >
            ◈
          </Link>
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                fontSize: "16px",
                lineHeight: 1.1,
                color: "#211C15",
                textDecoration: "none",
              }}
              className="font-normal block hover:text-[#C4922E] transition-colors"
            >
              Osotua Farming
            </Link>
            <div
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "9px",
                color: "#C4922E",
                fontWeight: 700,
              }}
            >
              Partner Portal
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#211C15] text-[#FFFFFF] hover:bg-[#C4922E] transition-all"
          >
            <i className="bi bi-plus-lg text-[#C4922E]" />
            <span>List Produce</span>
          </button>

          <div
            style={{
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "10px",
              color: "#211C15",
              fontWeight: 600,
            }}
          >
            Welcome back, {userName}
          </div>
        </div>
      </header>

      {/* ── 2. DASHBOARD BODY ── */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 pt-8">
        
        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(26px, 3.5vw, 34px)",
              color: "#211C15",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "4px",
            }}
          >
            Your <span style={{ fontStyle: "italic", color: "#C4922E" }}>portfolio</span>
          </h1>
          <p style={{ fontSize: "14px", color: "#6B6558", margin: 0 }}>
            A snapshot of your livestock holdings and produce shares in the Kajiado herd.
          </p>
        </div>

        {/* ── 3. STAT STRIP (4 Spacious Floating White Cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
          {/* Stat 1: Portfolio Value */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#EDE6D6] shadow-[0_10px_30px_rgba(33,28,21,0.04)] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C4922E] flex items-center justify-center mb-4">
                <i className="bi bi-wallet2 text-lg" />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 30px)",
                  color: "#211C15",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                KSh {metrics.portfolioValue.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  color: "#8E5E16",
                  fontWeight: 700,
                  marginTop: "8px",
                }}
              >
                PORTFOLIO VALUE
              </div>
            </div>
            <p className="text-xs text-[#6B6558] mt-3 leading-relaxed">
              Total estimated livestock and harvest equity.
            </p>
          </div>

          {/* Stat 2: Livestock Owned */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#EDE6D6] shadow-[0_10px_30px_rgba(33,28,21,0.04)] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B3F] flex items-center justify-center mb-4">
                <i className="bi bi-award text-lg" />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 30px)",
                  color: "#211C15",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                {metrics.headCount} head
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  color: "#3F6B3F",
                  fontWeight: 700,
                  marginTop: "8px",
                }}
              >
                LIVESTOCK OWNED
              </div>
            </div>
            <p className="text-xs text-[#6B6558] mt-3 leading-relaxed">
              Tagged &amp; registered in Kajiado stud registry.
            </p>
          </div>

          {/* Stat 3: Yield YTD */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#EDE6D6] shadow-[0_10px_30px_rgba(33,28,21,0.04)] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C4922E] flex items-center justify-center mb-4">
                <i className="bi bi-graph-up-arrow text-lg" />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 30px)",
                  color: "#211C15",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                {metrics.yieldYtd}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  color: "#8E5E16",
                  fontWeight: 700,
                  marginTop: "8px",
                }}
              >
                YIELD, YTD
              </div>
            </div>
            <p className="text-xs text-[#6B6558] mt-3 leading-relaxed">
              Herd weight gain and milk production return.
            </p>
          </div>

          {/* Stat 4: Next Payout */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#EDE6D6] shadow-[0_10px_30px_rgba(33,28,21,0.04)] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3F6B3F] flex items-center justify-center mb-4">
                <i className="bi bi-calendar-check text-lg" />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 30px)",
                  color: "#211C15",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                {metrics.nextPayout}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  color: "#3F6B3F",
                  fontWeight: 700,
                  marginTop: "8px",
                }}
              >
                NEXT PAYOUT
              </div>
            </div>
            <p className="text-xs text-[#6B6558] mt-3 leading-relaxed">
              M-Pesa automatic settlement date.
            </p>
          </div>
        </div>

        {/* ── 4. TWO-COLUMN GRID: HOLDINGS + SIDE PANEL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: HOLDINGS & ACTIVITY (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Holdings Section */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h2
                  style={{
                    fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                    fontSize: "19px",
                    color: "#211C15",
                    margin: 0,
                  }}
                >
                  Your holdings
                </h2>
                <Link
                  href="/breeds"
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "10px",
                    color: "#C4922E",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                  className="hover:underline"
                >
                  VIEW ALL →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Holding Card 1: Boran Herd */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #EDE6D6",
                  }}
                  className="shadow-xs hover:shadow-lg hover:border-[#C4922E]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-36 w-full bg-stone-100">
                      <Image
                        src="/images/boran bulls.jpg"
                        alt="Boran East Africa Herd"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#14100A]/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider">
                        BEEF CATTLE
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-[#3F6B3F] text-white px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider">
                        6 HEAD
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <div
                        style={{
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontSize: "10px",
                          color: "#C4922E",
                          fontWeight: 700,
                        }}
                      >
                        BORAN
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                          fontSize: "17px",
                          color: "#211C15",
                          lineHeight: 1.25,
                        }}
                      >
                        East Africa herd
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-2 flex justify-between items-center border-t border-stone-100 mt-2">
                    <div>
                      <div
                        style={{
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontSize: "9px",
                          color: "#6B6558",
                          fontWeight: 600,
                        }}
                      >
                        SHARE VALUE
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                          fontSize: "16px",
                          color: "#211C15",
                          fontWeight: 500,
                          marginTop: "2px",
                        }}
                      >
                        KSh 270,000
                      </div>
                    </div>

                    <Link
                      href="/breeds"
                      style={{
                        background: "#211C15",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                      className="hover:bg-[#C4922E] hover:text-[#211C15] transition-colors"
                    >
                      VIEW →
                    </Link>
                  </div>
                </div>

                {/* Holding Card 2: Boer x Galla Flock */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #EDE6D6",
                  }}
                  className="shadow-xs hover:shadow-lg hover:border-[#C4922E]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-36 w-full bg-stone-100">
                      <Image
                        src="/images/boer goat.jpg"
                        alt="Boer and Galla Goats Flock"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#14100A]/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider">
                        GOATS
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-[#3F6B3F] text-white px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider">
                        8 HEAD
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <div
                        style={{
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontSize: "10px",
                          color: "#C4922E",
                          fontWeight: 700,
                        }}
                      >
                        BOER × GALLA
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                          fontSize: "17px",
                          color: "#211C15",
                          lineHeight: 1.25,
                        }}
                      >
                        Nakuru flock
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-2 flex justify-between items-center border-t border-stone-100 mt-2">
                    <div>
                      <div
                        style={{
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontSize: "9px",
                          color: "#6B6558",
                          fontWeight: 600,
                        }}
                      >
                        SHARE VALUE
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                          fontSize: "16px",
                          color: "#211C15",
                          fontWeight: 500,
                          marginTop: "2px",
                        }}
                      >
                        KSh 210,000
                      </div>
                    </div>

                    <Link
                      href="/breeds"
                      style={{
                        background: "#211C15",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                      className="hover:bg-[#C4922E] hover:text-[#211C15] transition-colors"
                    >
                      VIEW →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "19px",
                  color: "#211C15",
                  marginBottom: "12px",
                }}
              >
                Recent activity
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #EDE6D6",
                  overflow: "hidden",
                }}
                className="shadow-xs"
              >
                <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#EDE6D6] text-[13px]">
                  <span>Quarterly payout — Boran herd</span>
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                      color: "#3F6B3F",
                      fontWeight: 500,
                    }}
                  >
                    +KSh 18,400
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#EDE6D6] text-[13px]">
                  <span>Share purchase — Nakuru flock</span>
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                      color: "#211C15",
                      fontWeight: 500,
                    }}
                  >
                    KSh 210,000
                  </span>
                </div>

                <div className="flex justify-between items-center px-4 py-3.5 text-[13px]">
                  <span>Produce credit — Ranch Box x4</span>
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                      color: "#3F6B3F",
                      fontWeight: 500,
                    }}
                  >
                    +KSh 2,100
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: UPCOMING PAYOUTS & HERD HEALTH (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Upcoming Payouts Dark Card */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "19px",
                  color: "#211C15",
                  marginBottom: "12px",
                }}
              >
                Upcoming payouts
              </div>

              <div
                style={{
                  background: "#211C15",
                  color: "#F6F1E6",
                  borderRadius: "14px",
                  padding: "20px",
                }}
                className="shadow-md"
              >
                <div
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "9px",
                    color: "#C4922E",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  NEXT PAYOUT &bull; SEP 18
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                    fontSize: "26px",
                    marginBottom: "8px",
                  }}
                >
                  KSh 24,600
                </div>

                <p style={{ fontSize: "12px", color: "#CFC7B4", margin: "0 0 16px", lineHeight: 1.5 }}>
                  Quarterly distribution across your Boran and Nakuru shares.
                </p>

                <button
                  type="button"
                  onClick={() => setStatementModal(true)}
                  style={{
                    background: "#C4922E",
                    color: "#211C15",
                    width: "100%",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="hover:bg-[#A97B22] transition-colors"
                >
                  VIEW STATEMENT →
                </button>
              </div>
            </div>

            {/* Herd Health */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                  fontSize: "19px",
                  color: "#211C15",
                  marginBottom: "12px",
                }}
              >
                Herd health
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #EDE6D6",
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
                className="shadow-xs"
              >
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Boran herd</span>
                    <span style={{ color: "#3F6B3F", fontWeight: 700 }}>Healthy</span>
                  </div>
                  <div style={{ height: "6px", background: "#EDE6D6", borderRadius: "3px" }}>
                    <div style={{ width: "92%", height: "100%", background: "#3F6B3F", borderRadius: "3px" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Nakuru flock</span>
                    <span style={{ color: "#C4922E", fontWeight: 700 }}>Monitoring</span>
                  </div>
                  <div style={{ height: "6px", background: "#EDE6D6", borderRadius: "3px" }}>
                    <div style={{ width: "70%", height: "100%", background: "#C4922E", borderRadius: "3px" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action: List Available Produce */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "14px",
                border: "1px dashed #C4922E",
                padding: "16px",
              }}
              className="text-center space-y-2"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8E5E16]">
                Cooperative Produce Hub
              </div>
              <p className="text-xs text-[#6B6558]">
                List available shamba harvests or eggs directly to the online marketplace.
              </p>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <i className="bi bi-plus-circle-fill" />
                <span>Add Available Product</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ── 5. ADD PRODUCE MODAL (For Farmers & Admins) ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#C4882A]/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#EDE6D6] pb-4">
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces, 'Fraunces'), Georgia, serif",
                    fontSize: "20px",
                    color: "#211C15",
                  }}
                >
                  List Available Produce
                </h3>
                <p className="text-xs text-[#6B6558]">Add seasonal crops to Osotua Marketplace</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
              >
                <i className="bi bi-x-lg text-sm" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6558] block mb-1">
                  Product / Crop Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Crisp Carrots, Kienyeji Eggs"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#FAF5EB] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-[#211C15] focus:outline-[#C4922E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6558] block mb-1">
                    Price (KSh)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="80"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-[#FAF5EB] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-[#211C15] focus:outline-[#C4922E]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6558] block mb-1">
                    Unit
                  </label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full bg-[#FAF5EB] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-[#211C15] focus:outline-[#C4922E]"
                  >
                    <option value="kg">per kg</option>
                    <option value="bunch">per bunch</option>
                    <option value="tray of 30">per tray of 30</option>
                    <option value="L">per Litre</option>
                    <option value="pc">per piece</option>
                    <option value="box">per box</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6558] block mb-1">
                    Category
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-[#FAF5EB] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-[#211C15] focus:outline-[#C4922E]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6558] block mb-1">
                    Available Qty
                  </label>
                  <input
                    type="number"
                    required
                    value={form.stockQty}
                    onChange={(e) => setForm({ ...form, stockQty: e.target.value })}
                    className="w-full bg-[#FAF5EB] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-[#211C15] focus:outline-[#C4922E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6558] block mb-1">
                  Harvest Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Freshly harvested from organic shamba fields..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#FAF5EB] border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-[#211C15] focus:outline-[#C4922E]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-stone-300 rounded-xl text-xs font-bold uppercase tracking-wider text-[#6B6558] hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 py-2.5 bg-[#C4922E] hover:bg-[#A97B22] text-[#211C15] rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm disabled:opacity-50"
                >
                  {adding ? "Saving..." : "Publish Produce"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 6. STATEMENT MODAL ── */}
      {statementModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#C4882A]/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE6D6] pb-3">
              <h3
                style={{
                  fontFamily: "var(--font-fraunces, 'Fraunces'), Georgia, serif",
                  fontSize: "18px",
                  color: "#211C15",
                }}
              >
                Upcoming Payout Statement
              </h3>
              <button
                onClick={() => setStatementModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600"
              >
                <i className="bi bi-x-lg text-sm" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#211C15]">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#6B6558]">Boran Herd Dividend (6 Head)</span>
                <span className="font-bold">KSh 16,800</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-[#6B6558]">Nakuru Flock Dividend (8 Head)</span>
                <span className="font-bold">KSh 7,800</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-sm text-[#211C15] pt-2">
                <span>Total Expected Distribution</span>
                <span className="text-[#3F6B3F]">KSh 24,600</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStatementModal(false)}
              className="w-full py-2.5 bg-[#211C15] hover:bg-[#C4922E] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

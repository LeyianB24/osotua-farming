"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"

const FIELDS = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Jane Wanjiku", autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+254 700 000 000", autoComplete: "tel" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const data = Object.fromEntries(new FormData(e.currentTarget))

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      router.push("/login?registered=true")
    } else {
      const json = await res.json()
      setError(json.error || "Registration failed. Please try again.")
      setLoading(false)
    }
  }

  const benefits = [
    "Track purebred livestock orders & movement permits",
    "Direct Barn Store farm-to-table deliveries",
    "Priority booking for rangeland tours & consultations",
    "Exclusive updates on new breeding herd releases",
  ]

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16 overflow-hidden bg-mesh-earth noise">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3D6B3E]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C4882A]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative w-full max-w-4xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl glass-dark border border-[#C4882A]/25 shadow-2xl">

          {/* Left panel — benefits */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-r border-white/10" style={{ background: "rgba(0,0,0,0.3)" }}>
            <div>
              <div className="flex flex-col items-start mb-8">
                <div className="mb-4 p-2.5 rounded-full bg-[#C4882A]/15 ring-1 ring-[#C4882A]/35">
                  <Logo size="md" stacked wordmark={false} asLink={false} />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    lineHeight: 1.1,
                  }}
                >
                  Osotua Farming
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-6 h-px bg-[#C4882A]/40" />
                  <span className="font-mono text-[#C4882A] text-[9px] tracking-[0.25em] uppercase font-semibold">
                    Member Benefits
                  </span>
                </div>
              </div>

              <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Join our growing network of pastoralists, buyers, and investors connected to Kajiado&apos;s finest ranch.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        background: "rgba(61,107,62,0.25)", border: "1px solid rgba(61,107,62,0.5)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: "2px", color: "#5a9e5c", fontSize: "0.65rem",
                      }}
                    >
                      <i className="bi bi-check-lg" />
                    </div>
                    <span style={{ color: "rgba(245,239,228,0.65)", fontSize: "0.82rem", lineHeight: 1.5 }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "2rem" }}>
              <p style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(245,239,228,0.4)" }}>
                &ldquo;From Our Land, To Your Table&rdquo;
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-7 p-8 sm:p-10">
            <div style={{ marginBottom: "2rem" }}>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.4rem",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                Create your account
              </h1>
              <p style={{ color: "rgba(245,239,228,0.45)", fontSize: "0.88rem" }}>
                Already registered?{" "}
                <Link href="/login" className="text-[#C4882A] hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 bg-[#A0431E]/20 border border-[#A0431E]/40 text-[#F5EFE4] text-xs p-3.5 rounded-lg">
                  <i className="bi bi-exclamation-triangle-fill text-[#c55f3a] text-sm flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Standard text fields */}
              {FIELDS.map((field) => (
                <div key={field.name}>
                  <label className="font-mono text-[9px] text-[#F5EFE4]/45 tracking-[0.2em] uppercase block mb-1.5 font-semibold">
                    {field.label}
                  </label>
                  <input
                    id={`register-${field.name}`}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    placeholder={field.placeholder}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px", padding: "0.75rem 1rem", color: "#F5EFE4", outline: "none", fontSize: "0.88rem",
                    }}
                  />
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="font-mono text-[9px] text-[#F5EFE4]/45 tracking-[0.2em] uppercase block mb-1.5 font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="Min. 8 characters"
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px", padding: "0.75rem 2.5rem 0.75rem 1rem", color: "#F5EFE4", outline: "none", fontSize: "0.88rem",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EFE4]/40 hover:text-[#F5EFE4] transition-colors"
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="font-mono text-[9px] text-[#F5EFE4]/45 tracking-[0.2em] uppercase block mb-1.5 font-semibold">
                  Confirm Password
                </label>
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Repeat password"
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px", padding: "0.75rem 1rem", color: "#F5EFE4", outline: "none", fontSize: "0.88rem",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="register-submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-3"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1C1208]/30 border-t-[#1C1208] rounded-full animate-spin" />
                    Creating Account…
                  </>
                ) : (
                  <>
                    <i className="bi bi-[#C4882A] bi-person-check-fill" />
                    Complete Registration
                    <i className="bi bi-arrow-right" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

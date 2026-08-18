"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"

export function LoginClient() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password. Please try again.")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBF7F0 50%, #FAF5EB 100%)" }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C4882A]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#3D6B3E]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 p-3 rounded-full bg-white ring-1 ring-[#C4882A]/35 shadow-md">
            <Logo size="lg" stacked wordmark={false} asLink={false} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "2.4rem",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 1.1,
            }}
          >
            Osotua Farming
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-6 h-px bg-[#C4882A]/40" />
            <span className="font-mono text-[#8E5E16] text-[9px] tracking-[0.25em] uppercase font-bold">
              Member Portal
            </span>
            <span className="w-6 h-px bg-[#C4882A]/40" />
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "24px",
            boxShadow: "0 24px 60px rgba(196, 136, 42, 0.1)",
          }}
          className="p-8 relative"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs p-3.5 rounded-xl">
                <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-sm flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-mono text-[9px] text-[#8E5E16] tracking-[0.2em] uppercase block mb-2 font-bold">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  background: "#FAF6EE",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  borderRadius: "12px",
                  padding: "0.875rem 1.125rem",
                  color: "#1C1208",
                  outline: "none",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[9px] text-[#8E5E16] tracking-[0.2em] uppercase font-bold">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    background: "#FAF6EE",
                    border: "1px solid rgba(196, 136, 42, 0.25)",
                    borderRadius: "12px",
                    padding: "0.875rem 2.75rem 0.875rem 1.125rem",
                    color: "#1C1208",
                    outline: "none",
                    fontSize: "0.9rem",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786550] hover:text-[#C4882A] transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} text-sm`} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 py-3.5 shadow-sm"
            >
              {loading ? (
                <>
                  <i className="bi bi-arrow-repeat animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <i className="bi bi-arrow-right" />
                </>
              )}
            </button>
          </form>

          {/* Footer inside card */}
          <div className="mt-6 pt-5 border-t border-[#C4882A]/15 text-center">
            <p className="text-[#5C4835] text-xs font-sans">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#C4882A] font-bold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-[11px] font-mono text-[#8E5E16] hover:text-[#C4882A] font-bold transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <i className="bi bi-arrow-left" />
            Back to Osotua Home
          </Link>
        </div>
      </div>
    </div>
  )
}

const REGISTER_FIELDS = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Jane Wanjiku", autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+254 700 000 000", autoComplete: "tel" },
]

export function RegisterClient() {
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
      const json = await res.json().catch(() => ({}))
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
    <div
      className="min-h-screen relative flex items-center justify-center px-4 py-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FBF7F0 50%, #FAF5EB 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3D6B3E]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C4882A]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl z-10">
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "24px",
            boxShadow: "0 24px 60px rgba(196, 136, 42, 0.1)",
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden shadow-2xl"
        >
          {/* Left panel — benefits */}
          <div
            className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-r border-[#C4882A]/20"
            style={{ background: "linear-gradient(180deg, #FAF5EB 0%, #F5EFE4 100%)" }}
          >
            <div>
              <div className="flex flex-col items-start mb-8">
                <div className="mb-4 p-2.5 rounded-full bg-white ring-1 ring-[#C4882A]/35 shadow-sm">
                  <Logo size="md" stacked wordmark={false} asLink={false} />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#1C1208",
                    lineHeight: 1.1,
                  }}
                >
                  Osotua Farming
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-6 h-px bg-[#C4882A]/40" />
                  <span className="font-mono text-[#8E5E16] text-[9px] tracking-[0.25em] uppercase font-bold">
                    Member Benefits
                  </span>
                </div>
              </div>

              <p style={{ color: "#5C4835", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Join our growing network of pastoralists, buyers, and investors connected to Kajiado&apos;s finest ranch.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        background: "rgba(46,125,50,0.15)", border: "1px solid rgba(46,125,50,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#2E7D32", flexShrink: 0, marginTop: "0.1rem", fontSize: "0.65rem",
                      }}
                    >
                      <i className="bi bi-check-lg" />
                    </div>
                    <span style={{ color: "#4A3B2C", fontSize: "0.82rem", lineHeight: 1.5 }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[#C4882A]/15">
              <span className="font-mono text-[9px] text-[#8E5E16] uppercase tracking-widest block mb-1 font-bold">
                Security Assurance
              </span>
              <p className="text-[11px] text-[#786550] flex items-center gap-1.5 font-medium">
                <i className="bi bi-shield-check text-[#2E7D32]" />
                Password encrypted via bcrypt &bull; Auth.js v5 standard
              </p>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <div className="eyebrow text-[#C4882A] mb-1">Registration</div>
              <h1 className="font-serif text-3xl text-[#1C1208] font-light">Create Member Account</h1>
              <p className="text-xs text-[#5C4835] mt-1">
                Already registered?{" "}
                <Link href="/login" className="text-[#C4882A] hover:underline font-bold">
                  Sign in here
                </Link>
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs p-3.5 rounded-xl mb-6">
                <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-sm flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {REGISTER_FIELDS.map((f) => (
                <div key={f.name}>
                  <label className="font-mono text-[9px] text-[#8E5E16] tracking-[0.2em] uppercase block mb-1.5 font-bold">
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required
                    placeholder={f.placeholder}
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[9px] text-[#8E5E16] tracking-[0.2em] uppercase block mb-1.5 font-bold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786550] hover:text-[#C4882A]"
                      aria-label="Toggle password visibility"
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} text-xs`} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-[#8E5E16] tracking-[0.2em] uppercase block mb-1.5 font-bold">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-3 py-3.5 text-xs shadow-sm"
              >
                {loading ? (
                  <>
                    <i className="bi bi-arrow-repeat animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
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

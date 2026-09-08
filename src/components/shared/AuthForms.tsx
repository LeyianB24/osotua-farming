"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"

export function LoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
      const callbackUrl = searchParams.get("callbackUrl")
      router.push(callbackUrl?.startsWith("/") ? callbackUrl : "/dashboard")
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 bg-[#F5F0E8] text-[#1C1208] overflow-hidden">
      <div className="relative w-full max-w-md z-10 py-12">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 p-3 rounded-full bg-white ring-1 ring-[#D4C9B0] shadow-sm">
            <Logo size="lg" stacked wordmark={false} asLink={false} />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#1C1208]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Osotua Farming
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-6 h-px bg-[#C99A2E]/40" />
            <span className="font-mono text-[#6B7A3F] text-[10px] tracking-[0.2em] uppercase font-bold">
              Member Portal Sign In
            </span>
            <span className="w-6 h-px bg-[#C99A2E]/40" />
          </div>
        </div>

        {/* Card */}
        <div className="p-8 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm relative">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs p-3.5 rounded-[2px]">
                <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-sm flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="os-input"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase font-bold">
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
                  className="os-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7E70] hover:text-[#C99A2E] transition-colors p-1 cursor-pointer"
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
              className="w-full btn-gold justify-center mt-2 py-3 text-xs"
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
          <div className="mt-6 pt-5 border-t border-[#D4C9B0] text-center">
            <p className="text-[#5C4A2A] text-xs font-normal">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#C99A2E] font-bold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-mono text-[#8E7E70] hover:text-[#C99A2E] font-bold transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <i className="bi bi-arrow-left" />
            <span>Back to Osotua Home</span>
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
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16 bg-[#F5F0E8] text-[#1C1208] overflow-hidden">
      <div className="relative w-full max-w-4xl z-10">
        <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden shadow-sm">
          {/* Left panel — benefits */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-r border-[#D4C9B0] bg-white">
            <div>
              <div className="flex flex-col items-start mb-8">
                <div className="mb-4 p-2.5 rounded-full bg-white ring-1 ring-[#D4C9B0] shadow-sm">
                  <Logo size="md" stacked wordmark={false} asLink={false} />
                </div>
                <h2
                  className="text-2xl font-bold text-[#1C1208]"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Osotua Farming
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-6 h-px bg-[#C99A2E]/40" />
                  <span className="font-mono text-[#6B7A3F] text-[10px] tracking-[0.2em] uppercase font-bold">
                    Member Benefits
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#5C4A2A] leading-relaxed mb-6 font-normal">
                Join our growing network of pastoralists, buyers, and partners connected to Kajiado&apos;s finest ranch.
              </p>

              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#6B7A3F]/15 border border-[#6B7A3F]/35 flex items-center justify-center text-[#6B7A3F] shrink-0 mt-0.5 text-xs">
                      <i className="bi bi-check-lg" />
                    </div>
                    <span className="text-xs text-[#5C4A2A] leading-normal font-normal">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#D4C9B0]">
              <span className="font-mono text-[10px] text-[#5C4A2A] uppercase tracking-wider block mb-1 font-bold">
                Security Assurance
              </span>
              <p className="text-xs text-[#8E7E70] flex items-center gap-1.5 font-normal">
                <i className="bi bi-shield-check text-[#6B7A3F]" />
                Password encrypted via bcrypt &bull; Auth.js v5 standard
              </p>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-[#FAF7F2]">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-2">
                <span>MEMBER REGISTRATION</span>
              </div>
              <h1
                className="text-3xl font-bold text-[#1C1208]"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Create Member Account
              </h1>
              <p className="text-xs text-[#5C4835] mt-1">
                Already registered?{" "}
                <Link href="/login" className="text-[#C99A2E] hover:underline font-bold">
                  Sign in here
                </Link>
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs p-3.5 rounded-[2px] mb-6">
                <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-sm flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {REGISTER_FIELDS.map((f) => (
                <div key={f.name}>
                  <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required
                    placeholder={f.placeholder}
                    className="os-input"
                  />
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="os-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7E70] hover:text-[#C99A2E] cursor-pointer p-1"
                      aria-label="Toggle password visibility"
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} text-xs`} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="os-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold justify-center mt-3 py-3 text-xs"
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

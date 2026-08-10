"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react"

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
  const [showConfirm, setShowConfirm] = useState(false)

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
    "Track all your orders & deliveries",
    "Book farm visits & consultations",
    "Access member-only livestock deals",
    "Direct farm-to-table subscriptions",
  ]

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16 overflow-hidden bg-[#0E0A04]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3D6B3E]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C4882A]/08 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#C4882A]/05 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-2xl border border-[#F5EFE4]/[0.06] shadow-2xl">

          {/* Left sidebar — benefits */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between bg-gradient-to-b from-[#1C1208] to-[#0E0A04] p-10 border-r border-[#F5EFE4]/[0.06]">
            <div>
              <div className="flex flex-col items-start mb-8">
                <div className="mb-4 p-2.5 rounded-full bg-[#C4882A]/10 ring-1 ring-[#C4882A]/25">
                  <Logo size="md" stacked wordmark={false} asLink={false} />
                </div>
                <h2 className="font-serif text-[#F5EFE4] text-xl font-light mt-3">Osotua Farming</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-6 h-px bg-[#C4882A]/40" />
                  <span className="font-mono text-[#C4882A] text-[9px] tracking-[0.3em] uppercase">Member Benefits</span>
                </div>
              </div>

              <p className="text-[#F5EFE4]/50 text-sm leading-relaxed mb-8">
                Join our growing community of farmers, investors, and food lovers connected to Kajiado&apos;s finest ranch.
              </p>

              <div className="space-y-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3D6B3E]/20 border border-[#3D6B3E]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#6BA86D]" />
                    </div>
                    <span className="text-[#F5EFE4]/60 text-sm leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#F5EFE4]/[0.06] pt-6 mt-6">
              <p className="font-serif text-[#F5EFE4]/20 text-xs italic leading-relaxed">
                &ldquo;A bond of friendship that endures&rdquo; — Osotua, Maa Language
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-3 backdrop-blur-xl bg-white/[0.03] p-8 lg:p-10">
            <div className="mb-8">
              <h1 className="font-serif text-[#F5EFE4] text-2xl font-light mb-1">Create your account</h1>
              <p className="text-[#F5EFE4]/35 text-sm">
                Already a member?{" "}
                <Link href="/login" className="text-[#C4882A] hover:text-[#d9993b] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 bg-[#A0431E]/15 border border-[#A0431E]/30 text-[#F5EFE4] text-sm px-4 py-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-[#E06040] flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Standard text fields */}
              {FIELDS.map((field) => (
                <div key={field.name} className="group">
                  <label className="font-mono text-[9px] text-[#F5EFE4]/35 tracking-[0.2em] uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                    {field.label}
                  </label>
                  <input
                    id={`register-${field.name}`}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    placeholder={field.placeholder}
                    className="w-full bg-white/[0.05] border border-[#F5EFE4]/10 rounded-lg px-4 py-3 text-sm text-[#F5EFE4] placeholder-[#F5EFE4]/20 outline-none focus:border-[#C4882A]/60 focus:bg-white/[0.08] transition-all duration-200"
                  />
                </div>
              ))}

              {/* Password */}
              <div className="group">
                <label className="font-mono text-[9px] text-[#F5EFE4]/35 tracking-[0.2em] uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
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
                    className="w-full bg-white/[0.05] border border-[#F5EFE4]/10 rounded-lg px-4 py-3 pr-10 text-sm text-[#F5EFE4] placeholder-[#F5EFE4]/20 outline-none focus:border-[#C4882A]/60 focus:bg-white/[0.08] transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EFE4]/30 hover:text-[#F5EFE4]/60 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label className="font-mono text-[9px] text-[#F5EFE4]/35 tracking-[0.2em] uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Repeat password"
                    className="w-full bg-white/[0.05] border border-[#F5EFE4]/10 rounded-lg px-4 py-3 pr-10 text-sm text-[#F5EFE4] placeholder-[#F5EFE4]/20 outline-none focus:border-[#C4882A]/60 focus:bg-white/[0.08] transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EFE4]/30 hover:text-[#F5EFE4]/60 transition-colors">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="register-submit"
                disabled={loading}
                className="relative mt-2 w-full bg-[#C4882A] text-[#1C1208] px-6 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-[#d9993b] hover:shadow-lg hover:shadow-[#C4882A]/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1C1208]/30 border-t-[#1C1208] rounded-full animate-spin" />
                    Creating Account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-[#F5EFE4]/20 text-[10px] text-center leading-relaxed">
                By creating an account, you agree to our{" "}
                <span className="text-[#F5EFE4]/35">Terms of Service</span> and{" "}
                <span className="text-[#F5EFE4]/35">Privacy Policy</span>.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-[#F5EFE4]/[0.06] text-center">
              <Link href="/" className="font-mono text-[10px] text-[#F5EFE4]/15 tracking-widest uppercase hover:text-[#F5EFE4]/35 transition-colors">
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"

export default function LoginPage() {
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
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[#0E0A04]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C4882A]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#3D6B3E]/08 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C4882A]/04 rounded-full blur-3xl" />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative w-full max-w-sm z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4 p-3 rounded-full bg-[#C4882A]/10 ring-1 ring-[#C4882A]/25">
            <Logo size="lg" stacked wordmark={false} asLink={false} />
          </div>
          <h1 className="font-serif text-[#F5EFE4] text-xl font-light tracking-wide">Osotua Farming</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-8 h-px bg-[#C4882A]/40" />
            <span className="font-mono text-[#C4882A] text-[9px] tracking-[0.3em] uppercase">Member Portal</span>
            <span className="w-8 h-px bg-[#C4882A]/40" />
          </div>
        </div>

        {/* Card */}
        <div className="relative backdrop-blur-xl bg-white/[0.04] border border-[#F5EFE4]/[0.08] rounded-xl p-8 shadow-2xl">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-[#A0431E]/15 border border-[#A0431E]/30 text-[#F5EFE4] text-sm px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
                <AlertCircle className="w-4 h-4 mt-0.5 text-[#E06040] flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="group">
              <label className="font-mono text-[9px] text-[#F5EFE4]/35 tracking-[0.2em] uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full bg-white/[0.05] border border-[#F5EFE4]/10 rounded-lg px-4 py-3 text-sm text-[#F5EFE4] placeholder-[#F5EFE4]/20 outline-none focus:border-[#C4882A]/60 focus:bg-white/[0.08] transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="group">
              <label className="font-mono text-[9px] text-[#F5EFE4]/35 tracking-[0.2em] uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.05] border border-[#F5EFE4]/10 rounded-lg px-4 py-3 pr-10 text-sm text-[#F5EFE4] placeholder-[#F5EFE4]/20 outline-none focus:border-[#C4882A]/60 focus:bg-white/[0.08] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EFE4]/30 hover:text-[#F5EFE4]/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="relative mt-2 w-full bg-[#C4882A] text-[#1C1208] px-6 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-[#d9993b] hover:shadow-lg hover:shadow-[#C4882A]/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#1C1208]/30 border-t-[#1C1208] rounded-full animate-spin" />
                  Signing In…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-[#F5EFE4]/30 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#C4882A] hover:text-[#d9993b] transition-colors font-medium">
              Create one
            </Link>
          </p>
          <Link
            href="/"
            className="font-mono text-[10px] text-[#F5EFE4]/15 tracking-widest uppercase hover:text-[#F5EFE4]/35 transition-colors block"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}

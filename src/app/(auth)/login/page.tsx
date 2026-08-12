"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"

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
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-mesh-earth noise">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C4882A]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#3D6B3E]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative w-full max-w-sm z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 p-3 rounded-full bg-[#C4882A]/15 ring-1 ring-[#C4882A]/35 shadow-lg">
            <Logo size="lg" stacked wordmark={false} asLink={false} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "2.2rem",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 1.1,
            }}
          >
            Osotua Farming
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-6 h-px bg-[#C4882A]/40" />
            <span className="font-mono text-[#C4882A] text-[9px] tracking-[0.25em] uppercase font-semibold">
              Member Portal
            </span>
            <span className="w-6 h-px bg-[#C4882A]/40" />
          </div>
        </div>

        {/* Card */}
        <div className="glass-dark p-8 rounded-2xl shadow-2xl border border-[#C4882A]/25 relative">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-[#A0431E]/20 border border-[#A0431E]/40 text-[#F5EFE4] text-xs p-3.5 rounded-lg">
                <i className="bi bi-exclamation-triangle-fill text-[#c55f3a] text-sm flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="font-mono text-[9px] text-[#F5EFE4]/45 tracking-[0.2em] uppercase block mb-2 font-semibold">
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
                  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-mono text-[9px] text-[#F5EFE4]/45 tracking-[0.2em] uppercase block mb-2 font-semibold">
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
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "10px", padding: "0.875rem 2.5rem 0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
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

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#1C1208]/30 border-t-[#1C1208] rounded-full animate-spin" />
                  Signing In…
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right" />
                  Sign In
                  <i className="bi bi-arrow-right" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-[#F5EFE4]/40 text-xs">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#C4882A] hover:underline font-semibold">
              Create one
            </Link>
          </p>
          <Link
            href="/"
            className="font-mono text-[9px] text-[#F5EFE4]/30 tracking-widest uppercase hover:text-[#C4882A] transition-colors block"
          >
            ← Back to Osotua Home
          </Link>
        </div>
      </div>
    </div>
  )
}

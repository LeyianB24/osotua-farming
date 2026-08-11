"use client"

import { useState, useEffect } from "react"
import Logo from "./Logo"

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Only show loader on fresh page loads, not client navigations
    const hasLoaded = sessionStorage.getItem("os-loaded")
    if (hasLoaded) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem("os-loaded", "1")
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        background: "linear-gradient(135deg, #1C1208 0%, #2a1a0a 60%, #1C1208 100%)",
        animation: "loaderFadeOut 2s ease-out 1.5s forwards",
      }}
    >
      {/* Radial glow behind logo */}
      <div style={{
        position: "absolute",
        width: "320px",
        height: "320px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,136,42,0.2) 0%, transparent 70%)",
        animation: "goldGlow 2s ease-in-out infinite",
      }} />

      {/* Logo mark */}
      <div style={{ animation: "logoPulse 1.5s ease-in-out infinite", position: "relative" }}>
        <Logo size="xl" stacked wordmark asLink={false} />
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
        fontSize: "0.6rem",
        fontWeight: 600,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(196,136,42,0.7)",
        position: "relative",
        animation: "fadeIn 0.8s ease 0.4s both",
      }}>
        From our land, to your table
      </p>

      {/* Spinner bar */}
      <div style={{ position: "relative", width: "120px", height: "2px", background: "rgba(196,136,42,0.15)", borderRadius: "1px", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, #C4882A, transparent)",
          backgroundSize: "200% 100%",
          animation: "goldShimmer 1.2s linear infinite",
        }} />
      </div>
    </div>
  )
}

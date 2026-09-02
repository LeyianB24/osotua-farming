"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import Logo from "./Logo"

const emptySubscribe = () => () => {}

export default function PageLoader() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const [isExiting, setIsExiting] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // If already loaded this session, skip immediately
    try {
      if (sessionStorage.getItem("os-loaded") === "1") {
        setIsFinished(true)
        return
      }
    } catch {}

    // Trigger smooth fade-out after 450ms
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      try {
        sessionStorage.setItem("os-loaded", "1")
      } catch {}
    }, 450)

    // Complete exit and unmount from DOM at 750ms
    const finishTimer = setTimeout(() => {
      setIsFinished(true)
    }, 750)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(finishTimer)
    }
  }, [])

  if (!isClient || isFinished) return null

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
        gap: "1rem",
        backgroundColor: "rgba(251, 247, 240, 0.96)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.02)" : "scale(1)",
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* Brand Mark */}
      <div
        style={{
          transition: "transform 300ms ease",
          transform: isExiting ? "scale(0.96)" : "scale(1)",
        }}
      >
        <Logo size="md" wordmark={false} asLink={false} textColor="dark" />
      </div>

      {/* Brand Title */}
      <div className="flex flex-col items-center">
        <span
          style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: "#1C1208",
          }}
        >
          Osotua Farming
        </span>
      </div>

      {/* Micro Shimmer Progress Line */}
      <div
        style={{
          position: "relative",
          width: "72px",
          height: "2px",
          backgroundColor: "rgba(196, 136, 42, 0.15)",
          borderRadius: "1px",
          overflow: "hidden",
          marginTop: "0.25rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, #C4882A, transparent)",
            backgroundSize: "200% 100%",
            animation: "goldShimmer 0.9s linear infinite",
          }}
        />
      </div>
    </div>
  )
}


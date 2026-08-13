"use client"

import { useState } from "react"

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  return (
    <div>
      <form
        className="flex gap-3 flex-wrap"
        onSubmit={async (e) => {
          e.preventDefault()
          setStatus("loading")
          const form = e.currentTarget
          const email = new FormData(form).get("email")
          try {
            const res = await fetch("/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            })
            if (res.ok) {
              setStatus("success")
              form.reset()
            } else {
              setStatus("error")
            }
          } catch {
            setStatus("error")
          }
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={status === "loading" || status === "success"}
          style={{
            background: "rgba(28,18,8,0.12)",
            borderColor: "rgba(28,18,8,0.2)",
            color: "#1C1208",
            border: "1px solid rgba(28,18,8,0.2)",
            borderRadius: "2px",
            padding: "0.8rem 1rem",
            fontSize: "0.9rem",
            outline: "none",
            minWidth: "260px",
            opacity: status === "success" ? 0.5 : 1,
          }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          style={{
            background: "#1C1208",
            color: "#C4882A",
            padding: "0.8rem 1.75rem",
            borderRadius: "2px",
            fontSize: "0.875rem",
            fontWeight: 500,
            border: "none",
            cursor: status === "loading" || status === "success" ? "not-allowed" : "pointer",
            opacity: status === "loading" || status === "success" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "Subscribing…" : "Join the Ranch"}
        </button>
      </form>

      {status === "success" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", color: "#3D6B3E", fontSize: "0.85rem", fontWeight: 500 }}>
          <i className="bi bi-check-circle-fill" />
          You&apos;re subscribed! Welcome to the Osotua ranch family.
        </div>
      )}
      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", color: "#A0431E", fontSize: "0.85rem" }}>
          <i className="bi bi-exclamation-triangle-fill" />
          Subscription failed. Please enter a valid email and try again.
        </div>
      )}
    </div>
  )
}
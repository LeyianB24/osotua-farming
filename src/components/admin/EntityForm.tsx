"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export type FieldDef =
  | { kind: "text" | "number" | "date" | "textarea" | "select"; name: string; label: string; placeholder?: string; required?: boolean; default?: string | number; options?: { value: string; label: string }[] }
  | { kind: "checkbox"; name: string; label: string; default?: boolean }

export default function EntityForm({
  title,
  action,
  fields,
  backHref,
  submitLabel = "Save",
}: {
  title: string
  action: string
  fields: FieldDef[]
  backHref: string
  submitLabel?: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const body: Record<string, unknown> = {}

    for (const f of fields) {
      if (f.kind === "checkbox") {
        body[f.name] = (form.get(f.name) as string) === "on"
      } else if (f.kind === "number") {
        const raw = form.get(f.name)
        body[f.name] = raw === "" || raw === null ? null : Number(raw)
      } else if (f.kind === "date") {
        const raw = form.get(f.name)
        body[f.name] = raw === "" || raw === null ? null : new Date(raw as string).toISOString()
      } else if (f.kind === "select") {
        const raw = form.get(f.name)
        body[f.name] = raw === "" || raw === null ? null : raw
      } else {
        const raw = form.get(f.name)
        body[f.name] = raw === "" || raw === null ? null : raw
      }
    }

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to save")
        return
      }
      router.push(backHref)
      router.refresh()
    } catch {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl text-[#F5EFE4]">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href={backHref}
          className="text-xs font-mono uppercase tracking-wider flex items-center gap-1 hover:text-[#C4882A] transition-colors"
          style={{ color: "rgba(245,239,228,0.5)" }}
        >
          <i className="bi bi-arrow-left" /> Back
        </Link>
        <h1
          className="font-light text-2xl sm:text-3xl"
          style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
        >
          {title}
        </h1>
      </div>

      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-lg text-xs font-mono"
          style={{
            background: "rgba(160,67,30,0.15)",
            border: "1px solid rgba(160,67,30,0.3)",
            color: "#C05A2A",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl p-6"
        style={{
          background: "rgba(245,239,228,0.02)",
          border: "1px solid rgba(196,136,42,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {fields.map((f) => {
          if (f.kind === "textarea") {
            return (
              <div key={f.name}>
                <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "rgba(245,239,228,0.6)" }}>
                  {f.label}{f.required && <span className="text-[#A0431E]"> *</span>}
                </label>
                <textarea
                  name={f.name}
                  placeholder={f.placeholder}
                  defaultValue={(f as { default?: string }).default ?? ""}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono min-h-[100px] focus:outline-none transition-all"
                  style={{
                    background: "rgba(245,239,228,0.04)",
                    border: "1px solid rgba(196,136,42,0.2)",
                    color: "#F5EFE4",
                  }}
                />
              </div>
            )
          }
          if (f.kind === "select") {
            return (
              <div key={f.name}>
                <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "rgba(245,239,228,0.6)" }}>
                  {f.label}{f.required && <span className="text-[#A0431E]"> *</span>}
                </label>
                <select
                  name={f.name}
                  defaultValue={(f as { default?: string }).default ?? ""}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                  style={{
                    background: "#181006",
                    border: "1px solid rgba(196,136,42,0.2)",
                    color: "#F5EFE4",
                  }}
                >
                  {(f as { options: { value: string; label: string }[] }).options?.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            )
          }
          if (f.kind === "checkbox") {
            return (
              <div key={f.name} className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name={f.name}
                  defaultChecked={(f as { default?: boolean }).default ?? false}
                  className="w-4 h-4 accent-[#C4882A]"
                />
                <label className="text-xs font-mono text-[#F5EFE4]">{f.label}</label>
              </div>
            )
          }
          return (
            <div key={f.name}>
              <label className="block font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color: "rgba(245,239,228,0.6)" }}>
                {f.label}{f.required && <span className="text-[#A0431E]"> *</span>}
              </label>
              <input
                type={f.kind}
                name={f.name}
                placeholder={f.placeholder}
                step={f.kind === "number" ? "0.01" : undefined}
                defaultValue={(f as { default?: string | number }).default ?? ""}
                className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                style={{
                  background: "rgba(245,239,228,0.04)",
                  border: "1px solid rgba(196,136,42,0.2)",
                  color: "#F5EFE4",
                }}
              />
            </div>
          )
        })}

        <div className="flex items-center gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            {loading ? "Saving…" : submitLabel}
          </button>
          <Link
            href={backHref}
            className="text-xs font-mono uppercase tracking-wider hover:text-white transition-colors"
            style={{ color: "rgba(245,239,228,0.5)" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

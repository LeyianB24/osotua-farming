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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setFieldErrors({})

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
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href={backHref} className="text-[#1C1208]/50 hover:text-[#C4882A] text-sm">
          <i className="bi bi-arrow-left mr-1" /> Back
        </Link>
        <h1 className="font-serif text-3xl text-[#1C1208]">{title}</h1>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-[#A0431E]/10 border border-[#A0431E]/20 text-[#A0431E] text-sm rounded">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5 bg-white border border-[#1C1208]/08 rounded p-6">
        {fields.map((f) => {
          if (f.kind === "textarea") {
            return (
              <div key={f.name}>
                <label className="block font-mono text-[10px] tracking-widest uppercase text-[#1C1208]/50 mb-1.5">
                  {f.label}{f.required && <span className="text-[#A0431E]"> *</span>}
                </label>
                <textarea
                  name={f.name}
                  placeholder={f.placeholder}
                  defaultValue={(f as { default?: string }).default ?? ""}
                  className="os-input min-h-[100px]"
                />
              </div>
            )
          }
          if (f.kind === "select") {
            return (
              <div key={f.name}>
                <label className="block font-mono text-[10px] tracking-widest uppercase text-[#1C1208]/50 mb-1.5">
                  {f.label}{f.required && <span className="text-[#A0431E]"> *</span>}
                </label>
                <select name={f.name} defaultValue={(f as { default?: string }).default ?? ""} className="os-input">
                  {(f as { options: { value: string; label: string }[] }).options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            )
          }
          if (f.kind === "checkbox") {
            return (
              <div key={f.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={f.name}
                  defaultChecked={(f as { default?: boolean }).default ?? false}
                  className="w-4 h-4 accent-[#C4882A]"
                />
                <label className="text-sm text-[#1C1208]">{f.label}</label>
              </div>
            )
          }
          return (
            <div key={f.name}>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-[#1C1208]/50 mb-1.5">
                {f.label}{f.required && <span className="text-[#A0431E]"> *</span>}
              </label>
              <input
                type={f.kind}
                name={f.name}
                placeholder={f.placeholder}
                step={f.kind === "number" ? "0.01" : undefined}
                defaultValue={(f as { default?: string | number }).default ?? ""}
                className="os-input"
              />
            </div>
          )
        })}

        <div className="flex items-center gap-3 pt-3">
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? "Saving…" : submitLabel}
          </button>
          <Link href={backHref} className="text-sm text-[#1C1208]/50 hover:text-[#1C1208]">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

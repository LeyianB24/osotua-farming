"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"

type TerminalLine = {
  type: "input" | "output" | "error" | "system" | "success"
  text: string | React.ReactNode
}

type ResultRow = Record<string, unknown>

export default function AdminTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: "OSOTUA FARMING ADMIN TERMINAL v3.0.0 [build 2026.08.11]" },
    { type: "system", text: "Live DB-backed command console. Real CRUD against the Osotua core API." },
    { type: "system", text: "Type 'help' to view commands. Mutations require ADMIN session." },
  ])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const api = useCallback(async <T,>(path: string, init?: RequestInit): Promise<T | null> => {
    setLoading(true)
    try {
      const res = await fetch(path, init)
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = (data as { error?: string }).error || `HTTP ${res.status}`
        throw new Error(msg)
      }
      return data as T
    } finally {
      setLoading(false)
    }
  }, [])

  const fmtTable = (rows: ResultRow[], cols: string[]) => {
    if (rows.length === 0) return <span className="text-white/40 italic">No records.</span>
    return (
      <div className="font-mono text-xs text-[#F5EFE4]/90 space-y-1">
        <div className="grid gap-2 border-b border-white/10 pb-1 text-white/50 text-[10px]" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
          {cols.map((c) => <span key={c}>{c.toUpperCase()}</span>)}
        </div>
        {rows.map((r, idx) => (
          <div key={idx} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
            {cols.map((c) => <span key={c}>{String(r[c] ?? "—")}</span>)}
          </div>
        ))}
      </div>
    )
  }

  const push = useCallback((...newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim()
    if (!trimmed) return

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const inputLine: TerminalLine = { type: "input", text: `$ osotua-cli > ${trimmed}` }
    push(inputLine)

    const tokens = trimmed.split(/\s+/)
    const cmd = tokens[0].toLowerCase()
    const sub = tokens[1]?.toLowerCase()

    try {
      switch (cmd) {
        case "help": {
          push({
            type: "output",
            text: (
              <div className="space-y-1 font-mono text-xs text-[#F5EFE4]/80">
                <div className="text-[#C4882A] font-bold mb-2">READ COMMANDS</div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">list <entity></span> - List breeds|stocks|menus|catches|imports|sales</div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">stats</span> - Aggregate DB counts (live)</div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">help</span> - This help</div>
                <div className="text-[#C4882A] font-bold mt-3 mb-2">MUTATION COMMANDS (admin session)</div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">add-breed <name>|<speciesName>|<price></span></div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">add-catch <name>|<qty>|<price></span></div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">add-stock <name>|<unit>|<qty></span></div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">add-menu <name>|<slug>|<price></span></div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">add-import <ref>|<supplier>|<qty>|<total></span></div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">add-sale <ref>|<customer>|<qty>|<total></span></div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">del <entity> <id></span> - Delete by id</div>
                <div className="text-[#C4882A] font-bold mt-3 mb-2">SESSION / MISC</div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">whoami</span> - Session identity (from /api/auth)</div>
                <div><span className="text-[#C4882A] inline-block w-44 font-bold">clear</span> - Clear output</div>
                <div className="text-white/40 text-[10px] mt-2">Pipe args with single space; use | as field separator.</div>
              </div>
            ),
          })
          break
        }

        case "clear": {
          setLines([])
          return
        }

        case "whoami": {
          const me = await api<{ user?: { name?: string; email?: string; role?: string } } | null>("/api/auth/session")
          if (!me?.user) {
            push({ type: "error", text: "Not signed in. Use /login to authenticate as admin." })
          } else {
            push({
              type: "success",
              text: (
                <div className="font-mono text-xs">
                  <div>USER: <span className="text-[#C4882A] font-bold">{me.user.name ?? "—"}</span></div>
                  <div>EMAIL: <span className="text-white">{me.user.email ?? "—"}</span></div>
                  <div>ROLE: <span className="text-emerald-400 font-bold">{me.user.role ?? "—"}</span></div>
                </div>
              ),
            })
          }
          break
        }

        case "stats": {
          const [breeds, products, orders, visits, partners, jobs, stocks, menus, catches, imports, sales] = await Promise.all([
            api<{ length: number }[]>(`/api/breeds`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/products`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/orders`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/visits`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/partners`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/jobs`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/stocks`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/menus`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/catches`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/imports`).then((r) => r ?? []),
            api<{ length: number }[]>(`/api/sales`).then((r) => r ?? []),
          ])
          push({
            type: "output",
            text: (
              <div className="font-mono text-xs grid grid-cols-3 gap-2 text-[#F5EFE4]/90">
                {[
                  ["Breeds", breeds.length], ["Products", products.length], ["Orders", orders.length],
                  ["Stocks", stocks.length], ["Menus", menus.length], ["Catches", catches.length],
                  ["Imports", imports.length], ["Sales", sales.length], ["Visits", visits.length],
                  ["Partners", partners.length], ["Jobs", jobs.length],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <span className="text-white/40">{label}: </span>
                    <span className="text-[#C4882A] font-bold">{String(value)}</span>
                  </div>
                ))}
              </div>
            ),
          })
          break
        }

        case "list":
        case "ls": {
          const entity = sub
          const endpoints: Record<string, { path: string; cols: string[] }> = {
            breeds: { path: "/api/breeds", cols: ["name", "purpose", "pricePerHead", "inStock"] },
            products: { path: "/api/products", cols: ["name", "price", "unit", "stockQty"] },
            stocks: { path: "/api/stocks", cols: ["name", "unit", "quantity", "reorderAt"] },
            menus: { path: "/api/menus", cols: ["name", "price", "servings", "available"] },
            catches: { path: "/api/catches", cols: ["name", "quantity", "unit", "price", "status"] },
            imports: { path: "/api/imports", cols: ["reference", "supplierName", "quantity", "totalValue", "status"] },
            sales: { path: "/api/sales", cols: ["reference", "customerName", "quantity", "totalAmount", "channel", "status"] },
            orders: { path: "/api/orders", cols: ["customerName", "totalAmount", "status", "createdAt"] },
            visits: { path: "/api/visits", cols: ["fullName", "visitDate", "groupSize", "status"] },
            partners: { path: "/api/partners", cols: ["fullName", "location", "supplyType", "status"] },
          }
          const cfg = endpoints[entity]
          if (!cfg) {
            push({ type: "error", text: `Unknown entity '${entity}'. Try: ${Object.keys(endpoints).join(", ")}` })
            break
          }
          const rows = (await api<ResultRow[]>(cfg.path)) ?? []
          push({
            type: "output",
            text: (
              <div>
                <div className="text-[#C4882A] font-bold mb-2 font-mono text-xs">{entity.toUpperCase()} ({rows.length} records)</div>
                {fmtTable(rows, cfg.cols)}
              </div>
            ),
          })
          break
        }

        case "add-breed":
        case "add-catch":
        case "add-stock":
        case "add-menu":
        case "add-import":
        case "add-sale": {
          const argStr = tokens.slice(1).join(" ")
          const parts = argStr.split("|").map((s) => s.trim())
          let path = ""
          let body: Record<string, unknown> = {}
          if (cmd === "add-breed") {
            if (parts.length < 3) { push({ type: "error", text: "Usage: add-breed <name>|<speciesName>|<price>" }); break }
            const [name, speciesName, priceStr] = parts
            const speciesList = (await api<{ id: string; name: string }[]>("/api/species")) ?? []
            const sp = speciesList.find((s) => s.name.toLowerCase() === speciesName.toLowerCase())
            if (!sp) { push({ type: "error", text: `Species '${speciesName}' not found. Try: ${speciesList.map((s) => s.name).join(", ")}` }); break }
            path = "/api/breeds"; body = { name, speciesId: sp.id, purpose: "Meat", description: `Created from cli on ${new Date().toISOString()}`, origin: "Kenya", pricePerHead: Number(priceStr), inStock: 0 }
          } else if (cmd === "add-catch") {
            if (parts.length < 3) { push({ type: "error", text: "Usage: add-catch <name>|<qty>|<price>" }); break }
            const [name, qty, price] = parts
            path = "/api/catches"; body = { name, quantity: Number(qty), unit: "kg", price: Number(price), status: "FRESH", caughtAt: new Date().toISOString() }
          } else if (cmd === "add-stock") {
            if (parts.length < 3) { push({ type: "error", text: "Usage: add-stock <name>|<unit>|<qty>" }); break }
            const [name, unit, qty] = parts
            path = "/api/stocks"; body = { name, unit, quantity: Number(qty), reorderAt: 0 }
          } else if (cmd === "add-menu") {
            if (parts.length < 3) { push({ type: "error", text: "Usage: add-menu <name>|<slug>|<price>" }); break }
            const [name, slug, price] = parts
            path = "/api/menus"; body = { name, slug, description: `Menu created via cli on ${new Date().toISOString()}`, price: Number(price), servings: 1, available: true, items: [] }
          } else if (cmd === "add-import") {
            if (parts.length < 4) { push({ type: "error", text: "Usage: add-import <ref>|<supplier>|<qty>|<total>" }); break }
            const [reference, supplierName, qty, total] = parts
            path = "/api/imports"; body = { reference, supplierName, quantity: Number(qty), unitPrice: Number(total) / Math.max(1, Number(qty)), totalValue: Number(total), status: "PENDING" }
          } else if (cmd === "add-sale") {
            if (parts.length < 4) { push({ type: "error", text: "Usage: add-sale <ref>|<customer>|<qty>|<total>" }); break }
            const [reference, customerName, qty, total] = parts
            path = "/api/sales"; body = { reference, customerName, quantity: Number(qty), unitPrice: Number(total) / Math.max(1, Number(qty)), totalAmount: Number(total), channel: "DIRECT", status: "COMPLETED", paidAt: new Date().toISOString() }
          }
          const created = await api<{ id?: string; name?: string; reference?: string }>(path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
          push({ type: "success", text: `✓ Created ${cmd.replace("add-", "")} '${created?.name ?? created?.reference ?? created?.id ?? "?"}'` })
          break
        }

        case "del":
        case "rm": {
          if (!sub || !tokens[2]) { push({ type: "error", text: "Usage: del <entity> <id>" }); break }
          const entityMap: Record<string, string> = {
            breeds: "breeds", stocks: "stocks", menus: "menus", catches: "catches", imports: "imports", sales: "sales",
            products: "products", livestock: "livestock", blog: "blog",
          }
          const path = entityMap[sub]
          if (!path) { push({ type: "error", text: `Cannot delete '${sub}'. Try: ${Object.keys(entityMap).join(", ")}` }); break }
          const id = tokens[2]
          await api(`/api/${path}/${id}`, { method: "DELETE" })
          push({ type: "success", text: `✓ Deleted ${sub} '${id}'` })
          break
        }

        default:
          push({ type: "error", text: `Command '${cmd}' not recognized. Type 'help' for the command list.` })
      }
    } catch (err) {
      push({ type: "error", text: `✗ ${(err as Error).message}` })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = input
      setInput("")
      void handleCommand(v)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const nextIdx = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(nextIdx)
        setInput(history[history.length - 1 - nextIdx] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInput(history[history.length - 1 - nextIdx] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="eyebrow text-[#C4882A] mb-1">System CLI Console</div>
          <h1 className="font-serif text-3xl font-light text-[#1C1208] flex items-center gap-3">
            <i className="bi bi-terminal text-[#C4882A]" />
            Admin Command Terminal
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {["stats", "list sales", "list catches", "help"].map((c) => (
            <button
              key={c}
              onClick={() => void handleCommand(c)}
              disabled={loading}
              className="btn-outline-dark text-xs py-1.5 px-3 flex items-center gap-1.5 disabled:opacity-40"
            >
              <i className="bi bi-chevron-right text-[#C4882A]" />
              {c}
            </button>
          ))}
          <Link href="/admin" className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5">
            <i className="bi bi-arrow-left" /> Dashboard
          </Link>
        </div>
      </div>

      <div
        className="rounded-lg bg-[#0E0A04] border border-[#C4882A]/30 shadow-2xl overflow-hidden font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="bg-black/60 border-b border-white/10 px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-white/40 ml-2 font-mono">root@osotua-ranch-core:~</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/50 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className={`w-2 h-2 rounded-full bg-emerald-400 ${loading ? "animate-pulse" : ""}`} />
              {loading ? "WORKING" : "READY"}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3 min-h-[420px] max-h-[560px] overflow-y-auto">
          {lines.map((line, idx) => {
            if (line.type === "input") return <div key={idx} className="text-white/90 font-bold">{line.text}</div>
            if (line.type === "system") return <div key={idx} className="text-white/50 text-xs italic">{line.text}</div>
            if (line.type === "error") return <div key={idx} className="text-red-400 text-xs">{line.text}</div>
            if (line.type === "success") return <div key={idx} className="text-emerald-400 text-xs">{line.text}</div>
            return <div key={idx}>{line.text}</div>
          })}
          {loading && <div className="text-[#C4882A] text-xs italic">⏳ Executing…</div>}
          <div ref={bottomRef} />
        </div>

        <div className="bg-black/40 px-5 py-3 border-t border-white/10 flex items-center gap-2">
          <span className="text-[#C4882A] font-bold select-none">$ osotua-cli ></span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Type a command (e.g. 'help', 'list sales', 'add-catch Dorper|3|24000')..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-sm placeholder:text-white/30 disabled:opacity-50"
            autoFocus
          />
          <button
            onClick={() => { const v = input; setInput(""); void handleCommand(v) }}
            disabled={loading}
            className="btn-primary text-xs py-1 px-3 uppercase tracking-wider disabled:opacity-50"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  )
}

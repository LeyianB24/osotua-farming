"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface TerminalLine {
  type: "input" | "output" | "error" | "system" | "success"
  text: string | React.ReactNode
}

export default function AdminTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [theme, setTheme] = useState<"gold" | "matrix" | "amber">("gold")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "system",
      text: "OSOTUA FARMING ADMIN TERMINAL v2.4.0 [build 2026.08.10]",
    },
    {
      type: "system",
      text: "Connected to Kajiado Rangeland Telemetry & Smart Agriculture Core API.",
    },
    {
      type: "system",
      text: "Type 'help' to view the list of available management commands.",
    },
  ])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim()
    if (!trimmed) return

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const inputLine: TerminalLine = {
      type: "input",
      text: `$ osotua-cli > ${trimmed}`,
    }

    const cmd = trimmed.toLowerCase().split(" ")[0]
    const args = trimmed.toLowerCase().split(" ").slice(1)

    let outputLines: TerminalLine[] = []

    switch (cmd) {
      case "help":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="space-y-1 font-mono text-xs text-[#F5EFE4]/80">
                <div className="text-[#C4882A] font-bold mb-2">Available OSOTUA CLI Commands:</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">status</span> - System health, DB connection &amp; telemetry status</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">livestock</span> - Query headcount of Boran, Sahiwal, Boer, Dorper</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">inventory</span> - Inspect Barn Store stock levels (beef, dairy, produce)</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">orders</span> - View recent transaction log &amp; fulfillment statuses</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">logs</span> - Stream live ranch telemetry &amp; API audit logs</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">weather</span> - Kajiado rangeland environmental sensor reading</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">theme</span> - Change terminal color theme (gold / matrix / amber)</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">whoami</span> - Inspect active admin credentials &amp; session privileges</div>
                <div><span className="text-[#C4882A] w-28 inline-block font-bold">clear</span> - Clear command terminal output</div>
              </div>
            ),
          },
        ]
        break

      case "status":
      case "health":
        outputLines = [
          {
            type: "success",
            text: (
              <div className="space-y-1 font-mono text-xs text-emerald-400">
                <div>[OK] PostgreSQL / Prisma DB Connection: ACTIVE (4ms)</div>
                <div>[OK] M-Pesa Express Payment Gateway: ONLINE</div>
                <div>[OK] QR Code Traceability Service: OPERATIONAL</div>
                <div>[OK] Kajiado Solar Power Grid: 98.4% Efficiency</div>
                <div>[OK] Water Trough Automated Level Sensors: 100% Operational</div>
              </div>
            ),
          },
        ]
        break

      case "livestock":
      case "breeds":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="font-mono text-xs text-[#F5EFE4]/90 space-y-1">
                <div className="text-[#C4882A] font-bold">LIVE HERD INVENTORY:</div>
                <div className="grid grid-cols-4 gap-2 border-b border-white/10 pb-1 text-white/50 text-[10px]">
                  <span>SPECIES</span>
                  <span>BREED</span>
                  <span>HEAD COUNT</span>
                  <span>STATUS</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>Cattle</span>
                  <span className="text-[#C4882A]">Boran Purebred</span>
                  <span>152 head</span>
                  <span className="text-emerald-400">Optimal</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>Cattle</span>
                  <span className="text-[#C4882A]">Sahiwal Dairy</span>
                  <span>42 head</span>
                  <span className="text-emerald-400">Milking</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>Goats</span>
                  <span className="text-[#C4882A]">Boer Stud</span>
                  <span>64 head</span>
                  <span className="text-emerald-400">Available</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>Sheep</span>
                  <span className="text-[#C4882A]">Dorper Commercial</span>
                  <span>88 head</span>
                  <span className="text-emerald-400">High Yield</span>
                </div>
              </div>
            ),
          },
        ]
        break

      case "inventory":
      case "barn":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="font-mono text-xs text-[#F5EFE4]/90 space-y-1">
                <div className="text-[#C4882A] font-bold">BARN RETAIL INVENTORY:</div>
                <div>- Aged Prime Beef Ribeye: <span className="text-emerald-400 font-bold">48 kg in stock</span></div>
                <div>- Organic Whole Milk (Pasteurized): <span className="text-emerald-400 font-bold">120 L in stock</span></div>
                <div>- Whole Boer Goat Portion: <span className="text-amber-400 font-bold">12 carcass units</span></div>
                <div>- Rangeland Fresh Eggs (Carton): <span className="text-emerald-400 font-bold">85 cartons</span></div>
                <div>- Kajiado Organic Honey Jar: <span className="text-emerald-400 font-bold">60 jars</span></div>
              </div>
            ),
          },
        ]
        break

      case "orders":
      case "sales":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="font-mono text-xs text-[#F5EFE4]/90 space-y-1">
                <div className="text-[#C4882A] font-bold">RECENT TRANSACTION LOG (Last 5 Orders):</div>
                <div className="grid grid-cols-4 gap-2 border-b border-white/10 pb-1 text-white/50 text-[10px]">
                  <span>ORDER REF</span>
                  <span>CUSTOMER</span>
                  <span>AMOUNT</span>
                  <span>STATUS</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="text-[#C4882A]">#ORD-9021</span>
                  <span>Samuel Njoroge</span>
                  <span>KES 185,000</span>
                  <span className="text-emerald-400">DELIVERED</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="text-[#C4882A]">#ORD-9022</span>
                  <span>Kajiado Safari Lodge</span>
                  <span>KES 42,500</span>
                  <span className="text-emerald-400">PROCESSING</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="text-[#C4882A]">#ORD-9023</span>
                  <span>Grace Mutua</span>
                  <span>KES 8,400</span>
                  <span className="text-emerald-400">DISPATCHED</span>
                </div>
              </div>
            ),
          },
        ]
        break

      case "logs":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="font-mono text-xs text-white/70 space-y-1">
                <div>[18:12:04] INFO  :: Sensor #B-04 Water Flow: 14.2 L/min</div>
                <div>[18:13:19] INFO  :: QR Batch #OS-2026-B8 scanned from Nairobi</div>
                <div>[18:14:02] EVENT :: Vet Inspection completed for Boran Bull #BR-104</div>
                <div>[18:15:44] MPESA :: Callback success for KES 12,500 [Ref: QKH48912]</div>
              </div>
            ),
          },
        ]
        break

      case "weather":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="font-mono text-xs text-[#C4882A] space-y-1">
                <div>KAJIADO RANGELAND ENVIRONMENTAL TELEMETRY:</div>
                <div>- Temperature: <span className="text-white">28.4°C</span></div>
                <div>- Relative Humidity: <span className="text-white">48.2%</span></div>
                <div>- Barometric Pressure: <span className="text-white">1014.2 hPa</span></div>
                <div>- Wind Speed: <span className="text-white">14 km/h SW</span></div>
                <div>- Solar Irradiance: <span className="text-white">920 W/m² (Peak Generation)</span></div>
              </div>
            ),
          },
        ]
        break

      case "theme":
        if (args[0] === "matrix") {
          setTheme("matrix")
          outputLines = [{ type: "system", text: "Theme switched to Matrix Green." }]
        } else if (args[0] === "amber") {
          setTheme("amber")
          outputLines = [{ type: "system", text: "Theme switched to Amber Glow." }]
        } else {
          setTheme("gold")
          outputLines = [{ type: "system", text: "Theme switched to Osotua Savanna Gold." }]
        }
        break

      case "whoami":
        outputLines = [
          {
            type: "output",
            text: (
              <div className="font-mono text-xs text-white/80">
                <div>USER: <span className="text-[#C4882A] font-bold">Admin Specialist</span></div>
                <div>ROLE: <span className="text-emerald-400 font-bold">SUPER_ADMIN</span></div>
                <div>SESSION ID: <span className="text-white/50">sess_osotua_99481a</span></div>
                <div>PERMISSIONS: READ, WRITE, DISPATCH, BREED_SELECTION</div>
              </div>
            ),
          },
        ]
        break

      case "clear":
        setLines([])
        return

      default:
        outputLines = [
          {
            type: "error",
            text: `Command '${trimmed}' not recognized. Type 'help' to see valid commands.`,
          },
        ]
    }

    setLines((prev) => [...prev, inputLine, ...outputLines])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const nextIdx = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(nextIdx)
        setInput(history[history.length - 1 - nextIdx] || "")
      }
    } else if (e.key === "ArrowDown") {
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

  const themeColors = {
    gold: { text: "text-[#C4882A]", border: "border-[#C4882A]/30", bg: "bg-[#0E0A04]" },
    matrix: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-[#040D06]" },
    amber: { text: "text-amber-500", border: "border-amber-500/30", bg: "bg-[#0F0A02]" },
  }[theme]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="eyebrow text-[#C4882A] mb-1">
            System CLI Console
          </div>
          <h1 className="font-serif text-3xl font-light text-[#1C1208] flex items-center gap-3">
            <i className="bi bi-terminal text-[#C4882A]" />
            Admin Command Terminal
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCommand("status")}
            className="btn-outline-dark text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <i className="bi bi-activity text-[#C4882A]" />
            Health Check
          </button>
          <button
            onClick={() => handleCommand("livestock")}
            className="btn-outline-dark text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <i className="bi bi-bullseye text-[#C4882A]" />
            Herd Query
          </button>
          <Link
            href="/admin"
            className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5"
          >
            <i className="bi bi-arrow-left" />
            Dashboard
          </Link>
        </div>
      </div>

      {/* Terminal window container */}
      <div
        className={`rounded-lg ${themeColors.bg} border ${themeColors.border} shadow-2xl overflow-hidden font-mono text-sm`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal top status bar */}
        <div className="bg-black/60 border-b border-white/10 px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-white/40 ml-2 font-mono">root@osotua-ranch-core:~</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-white/50 font-mono">
            <span className="hidden sm:inline">TTY: /dev/pts/0</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        {/* Quick action command chips */}
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex flex-wrap gap-2 text-xs">
          <span className="text-white/40 font-mono self-center mr-1 text-[11px]">Quick Exec:</span>
          {["status", "livestock", "inventory", "orders", "weather", "help", "clear"].map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation()
                handleCommand(c)
              }}
              className="px-2.5 py-1 rounded bg-white/10 text-white/80 hover:bg-[#C4882A] hover:text-[#1C1208] transition-colors text-[11px] font-mono"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Output Log Area */}
        <div className="p-5 space-y-3 min-h-[420px] max-h-[560px] overflow-y-auto">
          {lines.map((line, idx) => {
            if (line.type === "input") {
              return (
                <div key={idx} className="text-white/90 font-bold">
                  {line.text}
                </div>
              )
            }
            if (line.type === "system") {
              return (
                <div key={idx} className="text-white/50 text-xs italic">
                  {line.text}
                </div>
              )
            }
            if (line.type === "error") {
              return (
                <div key={idx} className="text-red-400 text-xs">
                  {line.text}
                </div>
              )
            }
            return <div key={idx}>{line.text}</div>
          })}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Line */}
        <div className="bg-black/40 px-5 py-3 border-t border-white/10 flex items-center gap-2">
          <span className={`${themeColors.text} font-bold select-none`}>$ osotua-cli &gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. 'help', 'status', 'livestock')..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-sm placeholder:text-white/30"
            autoFocus
          />
          <button
            onClick={() => {
              handleCommand(input)
              setInput("")
            }}
            className="btn-primary text-xs py-1 px-3 uppercase tracking-wider"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  )
}

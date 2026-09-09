import React from "react"

export interface Column {
  key: string
  label: string
  width?: string
}

export interface DataTableProps {
  columns: Column[]
  rows: Record<string, React.ReactNode>[]
  empty?: string
}

export default function DataTable({ columns, rows, empty = "No records yet." }: DataTableProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid rgba(196,136,42,0.1)",
        background: "rgba(245,239,228,0.02)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(196,136,42,0.1)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-5 py-3"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,228,0.4)",
                    width: col.width,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center"
                  style={{ color: "rgba(245,239,228,0.25)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
                >{empty}</td>
              </tr>
            ) : rows.map((row, i) => (
              <tr
                key={i}
                className="transition-colors duration-150 hover:bg-white/[0.03]"
                style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(245,239,228,0.04)" : "none" }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 align-middle">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

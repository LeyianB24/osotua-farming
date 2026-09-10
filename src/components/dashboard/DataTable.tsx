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
    <div className="bg-white border border-[#E5DDD0] rounded-[2px] shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#EFE9DF] bg-[#FAF7F2]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-3.5 px-4 font-mono text-[10px] uppercase text-[#7A6C5B] font-bold tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE9DF]">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-4 text-center text-[#7A6C5B] italic font-serif"
                >
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#FAF7F2] transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="py-3.5 px-4 align-middle text-[#1A1208]">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

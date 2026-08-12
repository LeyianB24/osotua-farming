import AdminTerminal from "@/components/admin/AdminTerminal"

export const metadata = { title: "Admin Terminal Console — Osotua Farming" }

export default function AdminTerminalPage() {
  return (
    <div className="bg-mesh-earth noise min-h-screen" style={{ padding: "2.5rem 2rem 5rem" }}>
      <AdminTerminal />
    </div>
  )
}

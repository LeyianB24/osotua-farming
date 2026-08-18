import AdminTerminal from "@/components/admin/AdminTerminal"

export const metadata = { title: "Admin Terminal Console — Osotua Farming" }

export default function AdminTerminalPage() {
  return (
    <div style={{ background: "#FBF7F0", padding: "2.5rem 2rem 5rem", minHeight: "100vh" }}>
      <AdminTerminal />
    </div>
  )
}

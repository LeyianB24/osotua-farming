import DashboardSidebar from "@/components/shared/DashboardSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#1C1208] text-[#F5EFE4]">
      {/* Dynamic sidebar */}
      <DashboardSidebar />

      {/* Main content viewport */}
      <main className="ml-64 flex-1 min-h-screen relative overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

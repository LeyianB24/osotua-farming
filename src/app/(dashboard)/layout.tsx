"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import DashboardSidebar from "@/components/shared/DashboardSidebar"
import Logo from "@/components/shared/Logo"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdminRoute = pathname?.startsWith("/admin")
  const userIsAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN"

  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setIsMobileOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-[#FBF7F0] text-[#1C1208] relative selection:bg-[#C4882A]/20">
      {/* Mobile Header Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#FBF7F0]/95 backdrop-blur-xl border-b border-[#C4882A]/20 z-40 px-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-10 h-10 rounded-xl bg-[#1C1208]/5 border border-[#1C1208]/10 flex items-center justify-center text-[#8E5E16] hover:bg-[#C4882A]/20 transition-all cursor-pointer"
            aria-label="Toggle Sidebar Menu"
          >
            <i className={`bi ${isMobileOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
          </button>
          <Logo size="sm" textColor="dark" />
        </div>

        <div className="flex items-center gap-2">
          {userIsAdmin && (
            <Link
              href={isAdminRoute ? "/dashboard" : "/admin"}
              className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border transition-all ${
                isAdminRoute
                  ? "bg-[#1C1208] text-[#FAF7F2] border-[#1C1208]"
                  : "bg-[#C4882A]/15 border-[#C4882A]/40 text-[#8E5E16]"
              }`}
            >
              {isAdminRoute ? "Member View" : "Admin HQ"}
            </Link>
          )}
        </div>
      </header>

      {/* Sidebar Component */}
      <DashboardSidebar
        collapsed={isCollapsed}
        mobileOpen={isMobileOpen}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Mobile Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Desktop Topbar */}
        <header className="hidden lg:flex sticky top-0 z-20 h-16 bg-[#FBF7F0]/90 backdrop-blur-md border-b border-[#C4882A]/15 px-8 items-center justify-between shadow-[0_1px_10px_rgba(28,18,8,0.02)]">
          <div className="flex items-center gap-3">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isAdminRoute ? "bg-[#C2410C]" : "bg-[#2E7D32]"
              }`}
            />
            <div className="flex items-center gap-2 font-mono text-xs text-[#786550]">
              <span className="uppercase tracking-widest font-bold text-[#1C1208]">
                {isAdminRoute ? "Executive Ranch Operations" : "Member Portal"}
              </span>
              <span>/</span>
              <span className="text-[#8E5E16]">
                {isAdminRoute ? "Kajiado HQ Suite" : "Patron Suite"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin Role Quick Switcher (Desktop) */}
            {userIsAdmin && (
              <Link
                href={isAdminRoute ? "/dashboard" : "/admin"}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xs ${
                  isAdminRoute
                    ? "bg-white text-[#1C1208] border border-[#C4882A]/30 hover:border-[#C4882A] hover:bg-[#FAF5EB]"
                    : "bg-[#1C1208] text-[#FBF7F0] hover:bg-[#2E1C08] border border-[#1C1208]"
                }`}
              >
                <i className={`bi ${isAdminRoute ? "bi-person-circle" : "bi-shield-lock-fill"} text-sm ${isAdminRoute ? "text-[#C4882A]" : "text-[#D99A30]"}`} />
                <span>{isAdminRoute ? "Switch to Member View" : "Enter Admin Command"}</span>
              </Link>
            )}

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-mono text-[#786550] hover:text-[#C4882A] px-3 py-1.5 rounded-lg hover:bg-white/60 transition-colors"
              title="Open Public Ranch Store in new tab"
            >
              <i className="bi bi-box-arrow-up-right text-xs" />
              <span>Public Site</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 relative overflow-x-hidden pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}

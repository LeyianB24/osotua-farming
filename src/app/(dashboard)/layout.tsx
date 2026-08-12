"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import DashboardSidebar from "@/components/shared/DashboardSidebar"
import Logo from "@/components/shared/Logo"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const sessionRes = useSession?.()
  const session = sessionRes?.data
  const isAdmin = session?.user?.role === "ADMIN"

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-[#1C1208] text-[#F5EFE4] relative">
      {/* Mobile Top Navigation Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1C1208]/90 backdrop-blur-xl border-b border-[#C4882A]/20 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C4882A] hover:bg-[#C4882A]/20 transition-all"
            aria-label="Toggle Sidebar Menu"
          >
            <i className={`bi ${isMobileOpen ? "bi-x-lg" : "bi-list"} text-xl`} />
          </button>
          <Logo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              href={pathname.startsWith("/admin") ? "/dashboard" : "/admin"}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#C4882A]/15 border border-[#C4882A]/40 text-[#C4882A]"
            >
              {pathname.startsWith("/admin") ? "Member View" : "Admin HQ"}
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
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main content viewport with dynamic margin */}
      <main
        className={`flex-1 min-h-screen relative overflow-x-hidden pt-16 lg:pt-0 transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  )
}

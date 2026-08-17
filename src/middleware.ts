import { auth } from "@/lib/auth.edge"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith("/admin")
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const isApiAdminMutation =
    (pathname.startsWith("/api/v1/breeds") ||
      pathname.startsWith("/api/breeds") ||
      pathname.startsWith("/api/v1/products") ||
      pathname.startsWith("/api/products") ||
      pathname.startsWith("/api/v1/livestock") ||
      pathname.startsWith("/api/livestock") ||
      pathname.startsWith("/api/v1/blog") ||
      pathname.startsWith("/api/blog") ||
      pathname.startsWith("/api/v1/jobs") ||
      pathname.startsWith("/api/jobs") ||
      pathname.startsWith("/api/v1/stocks") ||
      pathname.startsWith("/api/stocks") ||
      pathname.startsWith("/api/v1/menus") ||
      pathname.startsWith("/api/menus") ||
      pathname.startsWith("/api/v1/catches") ||
      pathname.startsWith("/api/catches") ||
      pathname.startsWith("/api/v1/imports") ||
      pathname.startsWith("/api/imports") ||
      pathname.startsWith("/api/v1/sales") ||
      pathname.startsWith("/api/sales") ||
      pathname.startsWith("/api/v1/upload") ||
      pathname.startsWith("/api/upload")) &&
    (req.method === "POST" || req.method === "PATCH" || req.method === "DELETE")

  const response = NextResponse.next()

  if (isDashboardRoute) {
    if (!req.auth?.user) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (!isAdminRoute && !isApiAdminMutation) return response

  const role = (req.auth?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Admin access required", trace_id: crypto.randomUUID().slice(0, 8) },
        { status: 403 }
      )
    }
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
})

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/api/breeds/:path*",
    "/api/products/:path*",
    "/api/livestock/:path*",
    "/api/blog/:path*",
    "/api/jobs/:path*",
    "/api/stocks/:path*",
    "/api/menus/:path*",
    "/api/catches/:path*",
    "/api/imports/:path*",
    "/api/sales/:path*",
    "/api/upload/:path*",
    "/api/v1/:path*",
  ],
}

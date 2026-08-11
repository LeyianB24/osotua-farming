import { auth } from "@/lib/auth.edge"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith("/admin")
  const isApiAdminMutation =
    (pathname.startsWith("/api/breeds") ||
      pathname.startsWith("/api/products") ||
      pathname.startsWith("/api/livestock") ||
      pathname.startsWith("/api/blog") ||
      pathname.startsWith("/api/jobs") ||
      pathname.startsWith("/api/stocks") ||
      pathname.startsWith("/api/menus") ||
      pathname.startsWith("/api/catches") ||
      pathname.startsWith("/api/imports") ||
      pathname.startsWith("/api/sales") ||
      pathname.startsWith("/api/upload")) &&
    (req.method === "POST" || req.method === "PATCH" || req.method === "DELETE")

  if (!isAdminRoute && !isApiAdminMutation) return NextResponse.next()

  const role = (req.auth?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/admin/:path*",
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
  ],
}

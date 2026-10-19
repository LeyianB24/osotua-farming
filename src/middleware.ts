import { auth } from "@/lib/auth.edge"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAdmin = pathname.startsWith("/admin")
  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard && !req.auth?.user) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdmin) {
    if (!req.auth?.user) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    const role = (req.auth?.user as { role?: string } | undefined)?.role
    if (role !== "ADMIN") {
      // Non-admin members attempting to access /admin are silently directed to their member portal
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export type SessionUser = {
  id: string
  role: string
  email?: string | null
  name?: string | null
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth()
  if (!session?.user) return null
  const u = session.user as { id?: string; role?: string; email?: string | null; name?: string | null }
  if (!u.id || !u.role) return null
  return { id: u.id, role: u.role, email: u.email, name: u.name }
}

export function isAdmin(user: SessionUser | null): boolean {
  return !!user && user.role === "ADMIN"
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 })
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 })
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 })
}

export function serverError(message = "Server error") {
  return NextResponse.json({ error: message }, { status: 500 })
}

export function parseError(err: unknown): string {
  if (err && typeof err === "object" && "errors" in err) {
    const errors = (err as { errors?: Record<string, { _errors?: string[] }> }).errors
    if (errors) {
      const first = Object.values(errors)[0]
      if (first?._errors?.[0]) return first._errors[0]
    }
  }
  return "Invalid request data"
}

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

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

// ── Rule #15: ISO 8601 UTC Timestamp Serialization ─────────
function serializeUTC(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj
  if (obj instanceof Date) return obj.toISOString()
  if (Array.isArray(obj)) return obj.map(serializeUTC)
  if (typeof obj === "object") {
    const res: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      res[key] = serializeUTC(val)
    }
    return res
  }
  return obj
}

// ── Rule #11: Sparse Fieldsets (?fields=id,name) ────────────
export function applySparseFields<T>(data: T, fieldsParam: string | null): unknown {
  if (!fieldsParam || !data) return data
  const fields = fieldsParam.split(",").map((f) => f.trim()).filter(Boolean)
  if (fields.length === 0) return data

  const filterObject = (item: Record<string, unknown>) => {
    const picked: Record<string, unknown> = {}
    for (const field of fields) {
      if (field in item) {
        picked[field] = item[field]
      }
    }
    return picked
  }

  if (Array.isArray(data)) {
    return data.map((item) => (typeof item === "object" && item !== null ? filterObject(item as Record<string, unknown>) : item))
  }
  if (typeof data === "object" && data !== null) {
    return filterObject(data as Record<string, unknown>)
  }
  return data
}

// ── Rule #6: ETag Generation ─────────────────────────────────
export function generateETag(data: unknown): string {
  const str = JSON.stringify(data)
  return `"${crypto.createHash("md5").update(str).digest("hex")}"`
}

// ── Rule #14: Idempotency Key Cache ──────────────────────────
const idempotencyCache = new Map<string, { status: number; body: unknown; etag?: string }>()

export function checkIdempotency(req: Request): { key: string | null; cachedResponse: NextResponse | null } {
  const key = req.headers.get("Idempotency-Key") || req.headers.get("idempotency-key")
  if (!key) return { key: null, cachedResponse: null }

  const cached = idempotencyCache.get(key)
  if (cached) {
    const headers: Record<string, string> = { "Idempotency-Replay": "true" }
    if (cached.etag) headers["ETag"] = cached.etag
    return {
      key,
      cachedResponse: NextResponse.json(cached.body, { status: cached.status, headers }),
    }
  }
  return { key, cachedResponse: null }
}

export function saveIdempotencyResponse(key: string | null, status: number, body: unknown, etag?: string) {
  if (!key) return
  idempotencyCache.set(key, { status, body, etag })
  // Keep cache bounded
  if (idempotencyCache.size > 1000) {
    const firstKey = idempotencyCache.keys().next().value
    if (firstKey) idempotencyCache.delete(firstKey)
  }
}

// ── Rule #9: Enforce Request Size Limits (413 Payload Too Large) ──
export function checkPayloadSize(req: Request, maxBytes: number = 10 * 1024 * 1024): NextResponse | null {
  const contentLength = req.headers.get("content-length")
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    return payloadTooLarge(`Payload size exceeds maximum limit of ${(maxBytes / (1024 * 1024)).toFixed(0)}MB`)
  }
  return null
}

// ── Rule #6: ETag & Conditional Concurrency (If-Match) ──────
export function checkETagMatch(req: Request, currentETag: string): NextResponse | null {
  const ifMatch = req.headers.get("If-Match") || req.headers.get("if-match")
  if (ifMatch && ifMatch !== "*" && ifMatch !== currentETag) {
    return preconditionFailed("Resource has been modified by another request. ETag mismatch.")
  }
  return null
}

// ── Response Formatter (Rules 5, 8, 10, 11, 13, 15) ─────────
export function apiSuccess<T>(data: T, req?: Request, options?: { status?: number; etag?: string }): NextResponse {
  const status = options?.status ?? 200
  let payload = serializeUTC(data)

  if (req) {
    const url = new URL(req.url)
    const fields = url.searchParams.get("fields")
    if (fields) {
      payload = applySparseFields(payload, fields)
    }
  }

  const etag = options?.etag ?? generateETag(payload)

  // Rule #6: Check If-None-Match for 304 Not Modified
  if (req) {
    const ifNoneMatch = req.headers.get("If-None-Match") || req.headers.get("if-none-match")
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304, headers: { ETag: etag } })
    }
  }

  return NextResponse.json(payload, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ETag: etag,
    },
  })
}

// ── Rule #5: 201 Created + Location Header ───────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiCreated<T>(data: T, location: string, req?: Request): NextResponse {
  const payload = serializeUTC(data)
  const etag = generateETag(payload)
  return NextResponse.json(payload, {
    status: 201,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Location: location,
      ETag: etag,
    },
  })
}

// ── Rule #8 & #10: Actionable Errors & Correlation Trace ID ─
export function apiError(message: string, status: number, details?: unknown): NextResponse {
  const traceId = crypto.randomUUID().slice(0, 8)
  const body: Record<string, unknown> = {
    error: message,
    trace_id: traceId,
  }
  if (details !== undefined) {
    body.details = details
  }

  return NextResponse.json(body, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}

export function badRequest(message = "Invalid request payload", details?: unknown) {
  return apiError(message, 400, details)
}

export function unauthorized(message = "Authentication required") {
  return apiError(message, 401)
}

export function forbidden(message = "Access denied") {
  return apiError(message, 403)
}

export function notFound(message = "Resource not found") {
  return apiError(message, 404)
}

export function preconditionFailed(message = "Precondition failed") {
  return apiError(message, 412)
}

export function payloadTooLarge(message = "Payload size exceeds maximum allowed limit of 10MB") {
  return apiError(message, 413)
}

export function serverError(message = "An unexpected internal server error occurred") {
  // Never leak internal exception details to client (Rule #8)
  return apiError(message, 500)
}

// ── Rule #10: Actionable Zod Validation Parsing ─────────────
export function parseError(err: unknown): string {
  if (err && typeof err === "object") {
    if ("issues" in err && Array.isArray((err as { issues: { path: (string | number)[]; message: string }[] }).issues)) {
      const issues = (err as { issues: { path: (string | number)[]; message: string }[] }).issues
      if (issues.length > 0) {
        const first = issues[0]
        const fieldName = first.path.join(".")
        return fieldName ? `${fieldName}: ${first.message}` : first.message
      }
    }
    if ("errors" in err) {
      const errors = (err as { errors?: Record<string, { _errors?: string[] }> }).errors
      if (errors) {
        for (const [key, val] of Object.entries(errors)) {
          if (val?._errors?.[0]) {
            return `${key}: ${val._errors[0]}`
          }
        }
      }
    }
  }
  return "Invalid request data. Please check your submission fields."
}

// ── Audit Logging Helper (Section 1.7) ──────────────────────
export async function createAuditLog(params: {
  userId?: string | null
  userEmail?: string | null
  action: string
  entity: string
  entityId?: string | null
  details?: string | null
  ipAddress?: string | null
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        userEmail: params.userEmail ?? null,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId ?? null,
        details: params.details ?? null,
        ipAddress: params.ipAddress ?? null,
      },
    })
  } catch (err) {
    console.error("Failed to persist audit log entry:", err)
  }
}



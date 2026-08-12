import { prisma } from "@/lib/prisma"
import { subscriptionPatchSchema } from "@/lib/schemas"
import {
  getSessionUser,
  unauthorized,
  forbidden,
  badRequest,
  notFound,
  serverError,
  parseError,
  apiSuccess,
  checkPayloadSize,
  checkETagMatch,
  generateETag,
} from "@/lib/api-utils"
import { ZodError } from "zod"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required")

    const { id } = await params
    const sub = await prisma.subscription.findUnique({
      where: { id },
      include: { product: true, user: { select: { id: true, name: true, email: true } } },
    })

    if (!sub) return notFound(`Subscription with ID '${id}' not found`)
    if (user.role !== "ADMIN" && sub.userId !== user.id) return forbidden("Not authorized to view this subscription")

    return apiSuccess(sub, req)
  } catch (err) {
    console.error("GET /api/v1/subscriptions/[id] error:", err)
    return serverError("Failed to fetch subscription details")
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required")

    const { id } = await params
    const existing = await prisma.subscription.findUnique({ where: { id } })
    if (!existing) return notFound(`Subscription with ID '${id}' not found`)
    if (user.role !== "ADMIN" && existing.userId !== user.id) return forbidden("Not authorized to update this subscription")

    // Rule #6: ETags & concurrency
    const currentETag = generateETag(existing)
    const etagError = checkETagMatch(req, currentETag)
    if (etagError) return etagError

    const body = await req.json()
    const data = subscriptionPatchSchema.parse(body)
    const sub = await prisma.subscription.update({ where: { id }, data })
    return apiSuccess(sub, req)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Subscription not found")
    }
    console.error("PATCH /api/v1/subscriptions/[id] error:", err)
    return serverError("Failed to update subscription")
  }
}

export async function DELETE(_: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required")

    const { id } = await params
    const existing = await prisma.subscription.findUnique({ where: { id } })
    if (!existing) return notFound(`Subscription with ID '${id}' not found`)
    if (user.role !== "ADMIN" && existing.userId !== user.id) return forbidden("Not authorized to cancel this subscription")

    await prisma.subscription.delete({ where: { id } })
    return apiSuccess({ success: true, message: `Subscription '${id}' cancelled successfully` })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Subscription not found")
    }
    console.error("DELETE /api/v1/subscriptions/[id] error:", err)
    return serverError("Failed to cancel subscription")
  }
}

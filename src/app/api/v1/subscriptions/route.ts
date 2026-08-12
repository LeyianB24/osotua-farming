import { prisma } from "@/lib/prisma"
import { subscriptionSchema } from "@/lib/schemas"
import {
  getSessionUser,
  unauthorized,
  badRequest,
  serverError,
  parseError,
  apiSuccess,
  apiCreated,
  checkPayloadSize,
  checkIdempotency,
  saveIdempotencyResponse,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to view subscriptions")

    const subs = await prisma.subscription.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      include: { product: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })

    return apiSuccess(subs, req)
  } catch (err) {
    console.error("GET /api/v1/subscriptions error:", err)
    return serverError("Failed to fetch subscriptions")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to subscribe")

    const body = await req.json()
    const data = subscriptionSchema.parse({ ...body, userId: user.id })

    const sub = await prisma.subscription.create({ data })
    const location = `/api/v1/subscriptions/${sub.id}`
    const response = apiCreated(sub, location, req)
    saveIdempotencyResponse(key, 201, sub)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/subscriptions error:", err)
    return serverError("Failed to create subscription")
  }
}

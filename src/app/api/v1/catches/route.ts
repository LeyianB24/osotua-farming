import { prisma } from "@/lib/prisma"
import { newCatchSchema } from "@/lib/schemas"
import {
  getSessionUser,
  isAdmin,
  unauthorized,
  forbidden,
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
    const catches = await prisma.newCatch.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { caughtAt: "desc" },
    })
    return apiSuccess(catches, req)
  } catch (err) {
    console.error("GET /api/v1/catches error:", err)
    return serverError("Failed to fetch fresh catches")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create catch record")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = newCatchSchema.parse(body)
    const item = await prisma.newCatch.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        unit: data.unit,
        price: data.price,
        status: data.status,
        caughtAt: data.caughtAt,
        note: data.note ?? null,
        breedId: data.breedId ?? null,
      },
      include: { breed: { include: { species: true } } },
    })

    const location = `/api/v1/catches/${item.id}`
    const response = apiCreated(item, location, req)
    saveIdempotencyResponse(key, 201, item)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/catches error:", err)
    return serverError("Failed to create catch record")
  }
}

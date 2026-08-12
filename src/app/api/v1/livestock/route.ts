import { prisma } from "@/lib/prisma"
import { livestockSchema } from "@/lib/schemas"
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
    const livestock = await prisma.livestock.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { createdAt: "desc" },
    })
    return apiSuccess(livestock, req)
  } catch (err) {
    console.error("GET /api/v1/livestock error:", err)
    return serverError("Failed to fetch livestock records")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to add livestock")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = livestockSchema.parse(body)
    const animal = await prisma.livestock.create({ data })

    const location = `/api/v1/livestock/${animal.id}`
    const response = apiCreated(animal, location, req)
    saveIdempotencyResponse(key, 201, animal)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/livestock error:", err)
    return serverError("Failed to add livestock")
  }
}

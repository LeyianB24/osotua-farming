import { prisma } from "@/lib/prisma"
import { breedSchema } from "@/lib/schemas"
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
    const breeds = await prisma.breed.findMany({
      include: { species: true },
      orderBy: { name: "asc" },
    })
    return apiSuccess(breeds, req)
  } catch (err) {
    console.error("GET /api/v1/breeds error:", err)
    return serverError("Failed to fetch breeds")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create breed")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = breedSchema.parse(body)
    const breed = await prisma.breed.create({ data })

    const location = `/api/v1/breeds/${breed.id}`
    const response = apiCreated(breed, location, req)
    saveIdempotencyResponse(key, 201, breed)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/breeds error:", err)
    return serverError("Failed to create breed")
  }
}

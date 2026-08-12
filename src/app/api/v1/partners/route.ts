import { prisma } from "@/lib/prisma"
import { partnerSchema } from "@/lib/schemas"
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
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const partners = await prisma.partnerFarmer.findMany({ orderBy: { createdAt: "desc" } })
    return apiSuccess(partners, req)
  } catch (err) {
    console.error("GET /api/v1/partners error:", err)
    return serverError("Failed to fetch partner farmers")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const body = await req.json()
    const data = partnerSchema.parse(body)
    const partner = await prisma.partnerFarmer.create({ data })

    const location = `/api/v1/partners/${partner.id}`
    const response = apiCreated(partner, location, req)
    saveIdempotencyResponse(key, 201, partner)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/partners error:", err)
    return serverError("Failed to register partner farmer")
  }
}

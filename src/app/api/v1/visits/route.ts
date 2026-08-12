import { prisma } from "@/lib/prisma"
import { visitSchema } from "@/lib/schemas"
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
import { sendVisitConfirmation } from "@/lib/email"
import { ZodError } from "zod"

export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const visits = await prisma.farmVisit.findMany({ orderBy: { visitDate: "asc" } })
    return apiSuccess(visits, req)
  } catch (err) {
    console.error("GET /api/v1/visits error:", err)
    return serverError("Failed to fetch farm visits")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const body = await req.json()
    const data = visitSchema.parse(body)
    const visit = await prisma.farmVisit.create({ data })

    try {
      await sendVisitConfirmation({
        to: visit.email,
        fullName: visit.fullName,
        visitDate: visit.visitDate,
      })
    } catch (emailErr) {
      console.error("Email send failed:", emailErr)
    }

    const location = `/api/v1/visits/${visit.id}`
    const response = apiCreated(visit, location, req)
    saveIdempotencyResponse(key, 201, visit)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/visits error:", err)
    return serverError("Failed to book farm visit")
  }
}

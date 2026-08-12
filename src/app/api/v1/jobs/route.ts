import { prisma } from "@/lib/prisma"
import { jobSchema } from "@/lib/schemas"
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
    const jobs = await prisma.job.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    })
    return apiSuccess(jobs, req)
  } catch (err) {
    console.error("GET /api/v1/jobs error:", err)
    return serverError("Failed to fetch open job listings")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to post job listing")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = jobSchema.parse(body)
    const job = await prisma.job.create({ data })

    const location = `/api/v1/jobs/${job.id}`
    const response = apiCreated(job, location, req)
    saveIdempotencyResponse(key, 201, job)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/jobs error:", err)
    return serverError("Failed to create job listing")
  }
}

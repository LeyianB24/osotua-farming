import { contactSchema } from "@/lib/schemas"
import {
  badRequest,
  serverError,
  parseError,
  apiCreated,
  checkPayloadSize,
  checkIdempotency,
  saveIdempotencyResponse,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 1 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const body = await req.json()
    const data = contactSchema.parse(body)

    console.log("Contact message received:", data)

    const payload = { success: true, message: "Contact message received successfully" }
    const location = "/api/v1/contact"
    const response = apiCreated(payload, location, req)
    saveIdempotencyResponse(key, 201, payload)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/contact error:", err)
    return serverError("Failed to submit contact enquiry")
  }
}

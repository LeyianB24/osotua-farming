import { uploadImage } from "@/lib/cloudinary"
import { uploadSchema } from "@/lib/schemas"
import {
  getSessionUser,
  isAdmin,
  unauthorized,
  forbidden,
  badRequest,
  serverError,
  parseError,
  apiCreated,
  checkPayloadSize,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    // Rule #9: Enforce request size limits (10MB max for file uploads -> 413 Payload Too Large)
    const payloadLimitError = checkPayloadSize(req, 10 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to upload media")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const { image, folder } = uploadSchema.parse(body)
    const url = await uploadImage(image, folder)

    // Rule #5: 201 Created + Location header
    return apiCreated({ url }, url, req)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/upload error:", err)
    return serverError("Image upload failed")
  }
}

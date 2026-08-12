import { prisma } from "@/lib/prisma"
import { breedPatchSchema } from "@/lib/schemas"
import {
  getSessionUser,
  isAdmin,
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
    const { id } = await params
    const breed = await prisma.breed.findUnique({
      where: { id },
      include: { species: true },
    })
    if (!breed) return notFound(`Breed with ID '${id}' not found`)
    return apiSuccess(breed, req)
  } catch (err) {
    console.error("GET /api/v1/breeds/[id] error:", err)
    return serverError("Failed to fetch breed details")
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to update breed")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const existing = await prisma.breed.findUnique({ where: { id } })
    if (!existing) return notFound(`Breed with ID '${id}' not found`)

    // Rule #6: Support conditional requests with ETags
    const currentETag = generateETag(existing)
    const etagError = checkETagMatch(req, currentETag)
    if (etagError) return etagError

    const body = await req.json()
    const data = breedPatchSchema.parse(body)
    const updated = await prisma.breed.update({ where: { id }, data })
    return apiSuccess(updated, req)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound(`Breed not found`)
    }
    console.error("PATCH /api/v1/breeds/[id] error:", err)
    return serverError("Failed to update breed")
  }
}

export async function DELETE(_: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to delete breed")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.breed.delete({ where: { id } })
    return apiSuccess({ success: true, message: `Breed '${id}' deleted successfully` })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound(`Breed with ID not found`)
    }
    console.error("DELETE /api/v1/breeds/[id] error:", err)
    return serverError("Failed to delete breed")
  }
}

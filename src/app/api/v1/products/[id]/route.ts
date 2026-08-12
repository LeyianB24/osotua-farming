import { prisma } from "@/lib/prisma"
import { productPatchSchema } from "@/lib/schemas"
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
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })
    if (!product) return notFound(`Product with ID '${id}' not found`)
    return apiSuccess(product, req)
  } catch (err) {
    console.error("GET /api/v1/products/[id] error:", err)
    return serverError("Failed to fetch product details")
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to update product")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) return notFound(`Product with ID '${id}' not found`)

    // Rule #6: ETags & concurrency
    const currentETag = generateETag(existing)
    const etagError = checkETagMatch(req, currentETag)
    if (etagError) return etagError

    const body = await req.json()
    const data = productPatchSchema.parse(body)
    const updated = await prisma.product.update({ where: { id }, data })
    return apiSuccess(updated, req)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Product not found")
    }
    console.error("PATCH /api/v1/products/[id] error:", err)
    return serverError("Failed to update product")
  }
}

export async function DELETE(_: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to delete product")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return apiSuccess({ success: true, message: `Product '${id}' deleted successfully` })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Product with ID not found")
    }
    console.error("DELETE /api/v1/products/[id] error:", err)
    return serverError("Failed to delete product")
  }
}

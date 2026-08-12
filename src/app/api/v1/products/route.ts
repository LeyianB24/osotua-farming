import { prisma } from "@/lib/prisma"
import { productSchema } from "@/lib/schemas"
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
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    })
    return apiSuccess(products, req)
  } catch (err) {
    console.error("GET /api/v1/products error:", err)
    return serverError("Failed to fetch products")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create product")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = productSchema.parse(body)
    const product = await prisma.product.create({ data })

    const location = `/api/v1/products/${product.id}`
    const response = apiCreated(product, location, req)
    saveIdempotencyResponse(key, 201, product)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/products error:", err)
    return serverError("Failed to create product")
  }
}

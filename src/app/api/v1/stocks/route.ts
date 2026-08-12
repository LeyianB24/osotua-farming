import { prisma } from "@/lib/prisma"
import { stockSchema } from "@/lib/schemas"
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
    const stocks = await prisma.stock.findMany({
      include: { product: true, breed: { include: { species: true } } },
      orderBy: { name: "asc" },
    })
    return apiSuccess(stocks, req)
  } catch (err) {
    console.error("GET /api/v1/stocks error:", err)
    return serverError("Failed to fetch stock records")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create stock record")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = stockSchema.parse(body)
    const stock = await prisma.stock.create({
      data: {
        name: data.name,
        unit: data.unit,
        quantity: data.quantity,
        reorderAt: data.reorderAt,
        note: data.note ?? null,
        productId: data.productId ?? null,
        breedId: data.breedId ?? null,
      },
      include: { product: true, breed: { include: { species: true } } },
    })

    const location = `/api/v1/stocks/${stock.id}`
    const response = apiCreated(stock, location, req)
    saveIdempotencyResponse(key, 201, stock)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/stocks error:", err)
    return serverError("Failed to create stock record")
  }
}

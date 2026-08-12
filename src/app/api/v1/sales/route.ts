import { prisma } from "@/lib/prisma"
import { saleSchema } from "@/lib/schemas"
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
    const sales = await prisma.sale.findMany({
      include: { breed: true, product: true },
      orderBy: { paidAt: "desc" },
    })
    return apiSuccess(sales, req)
  } catch (err) {
    console.error("GET /api/v1/sales error:", err)
    return serverError("Failed to fetch sale records")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create sale record")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = saleSchema.parse(body)
    const sale = await prisma.sale.create({
      data: {
        reference: data.reference,
        breedId: data.breedId ?? null,
        productId: data.productId ?? null,
        customerName: data.customerName,
        customerPhone: data.customerPhone ?? null,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        totalAmount: data.totalAmount,
        channel: data.channel,
        status: data.status,
        paidAt: data.paidAt,
        note: data.note ?? null,
      },
      include: { breed: true, product: true },
    })

    const location = `/api/v1/sales/${sale.id}`
    const response = apiCreated(sale, location, req)
    saveIdempotencyResponse(key, 201, sale)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/sales error:", err)
    return serverError("Failed to create sale record")
  }
}

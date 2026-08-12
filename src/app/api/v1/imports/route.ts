import { prisma } from "@/lib/prisma"
import { importSchema } from "@/lib/schemas"
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
    const items = await prisma.import.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { createdAt: "desc" },
    })
    return apiSuccess(items, req)
  } catch (err) {
    console.error("GET /api/v1/imports error:", err)
    return serverError("Failed to fetch import records")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create import record")
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = importSchema.parse(body)
    const item = await prisma.import.create({
      data: {
        reference: data.reference,
        supplierName: data.supplierName,
        breedId: data.breedId ?? null,
        productName: data.productName ?? null,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        totalValue: data.totalValue,
        status: data.status,
        arrivedAt: data.arrivedAt ?? null,
        notes: data.notes ?? null,
      },
      include: { breed: { include: { species: true } } },
    })

    const location = `/api/v1/imports/${item.id}`
    const response = apiCreated(item, location, req)
    saveIdempotencyResponse(key, 201, item)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/imports error:", err)
    return serverError("Failed to create import record")
  }
}

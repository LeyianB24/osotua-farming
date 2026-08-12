import { prisma } from "@/lib/prisma"
import { orderSchema } from "@/lib/schemas"
import {
  getSessionUser,
  badRequest,
  unauthorized,
  serverError,
  parseError,
  apiSuccess,
  apiCreated,
  checkPayloadSize,
  checkIdempotency,
  saveIdempotencyResponse,
  createAuditLog,
} from "@/lib/api-utils"
import { sendOrderConfirmation } from "@/lib/email"
import { ZodError } from "zod"

export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to view orders")

    const orders = await prisma.order.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      include: { items: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })

    return apiSuccess(orders, req)
  } catch (err) {
    console.error("GET /api/v1/orders error:", err)
    return serverError("Failed to fetch orders")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    const body = await req.json()
    const data = orderSchema.parse(body)

    // Security Hardening Rule §1.3: Server-side recalculation of order total & item prices
    const validatedItems: {
      breedId?: string | null
      productId?: string | null
      quantity: number
      unitPrice: number
      totalPrice: number
    }[] = []

    let computedGrandTotal = 0

    for (const item of data.items) {
      let actualUnitPrice = 0

      if (item.breedId) {
        const breed = await prisma.breed.findUnique({ where: { id: item.breedId } })
        if (!breed) return badRequest(`Breed resource with ID ${item.breedId} not found`)
        actualUnitPrice = breed.pricePerHead
      } else if (item.productId) {
        const product = await prisma.product.findUnique({ where: { id: item.productId } })
        if (!product) return badRequest(`Product resource with ID ${item.productId} not found`)
        actualUnitPrice = product.price
      } else {
        return badRequest("Order item must reference a valid breedId or productId")
      }

      const itemTotal = actualUnitPrice * item.quantity
      computedGrandTotal += itemTotal

      validatedItems.push({
        breedId: item.breedId ?? null,
        productId: item.productId ?? null,
        quantity: item.quantity,
        unitPrice: actualUnitPrice,
        totalPrice: itemTotal,
      })
    }

    const order = await prisma.order.create({
      data: {
        userId: user?.id ?? data.userId ?? null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        type: data.type,
        status: "PENDING",
        totalAmount: computedGrandTotal,
        depositAmount: data.depositAmount ?? null,
        paymentMethod: data.paymentMethod ?? null,
        paymentRef: data.paymentRef ?? null,
        deliveryAddress: data.deliveryAddress ?? null,
        deliveryDate: data.deliveryDate ?? null,
        notes: data.notes ?? null,
        items: { create: validatedItems },
      },
      include: { items: true },
    })

    // Audit log entry
    await createAuditLog({
      userId: user?.id ?? null,
      userEmail: data.customerEmail,
      action: "CREATE_ORDER",
      entity: "Order",
      entityId: order.id,
      details: `Created order #${order.id} with total KES ${computedGrandTotal}`,
    })

    try {
      await sendOrderConfirmation({
        to: order.customerEmail,
        customerName: order.customerName,
        orderId: order.id,
        totalAmount: order.totalAmount,
      })
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr)
    }

    const location = `/api/v1/orders/${order.id}`
    const response = apiCreated(order, location, req)
    saveIdempotencyResponse(key, 201, order)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/orders error:", err)
    return serverError("Failed to create order")
  }
}

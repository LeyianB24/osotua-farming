import { prisma } from "@/lib/prisma"
import { orderStatusSchema } from "@/lib/schemas"
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
  createAuditLog,
} from "@/lib/api-utils"
import { ZodError } from "zod"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()

    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { breed: true, product: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    })

    if (!order) return notFound("Order not found")

    // Object-level authorization check (§1.2): Customer can only view their own order
    if (user.role !== "ADMIN" && order.userId !== user.id) {
      return forbidden("Access denied: You do not own this order resource")
    }

    return apiSuccess(order, req)
  } catch (err) {
    console.error("GET /api/v1/orders/[id] error:", err)
    return serverError()
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  const payloadErr = checkPayloadSize(req)
  if (payloadErr) return payloadErr

  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin privileges required to modify order status")

    const { id } = await params
    const body = await req.json()
    const data = orderStatusSchema.parse(body)

    const existingOrder = await prisma.order.findUnique({ where: { id } })
    if (!existingOrder) return notFound("Order not found")

    const updatedOrder = await prisma.order.update({
      where: { id },
      data,
      include: { items: true },
    })

    // Persist Audit Log Entry (§1.7)
    await createAuditLog({
      userId: user.id,
      userEmail: user.email,
      action: "UPDATE_ORDER_STATUS",
      entity: "Order",
      entityId: id,
      details: `Status updated from ${existingOrder.status} to ${data.status}`,
    })

    return apiSuccess(updatedOrder, req)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Order not found")
    }
    console.error("PATCH /api/v1/orders/[id] error:", err)
    return serverError()
  }
}

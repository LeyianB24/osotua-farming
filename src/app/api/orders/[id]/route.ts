import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { orderStatusSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, notFound, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, image: true, unit: true, price: true } },
            breed: { select: { id: true, name: true, image: true, pricePerHead: true } },
          },
        },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    })

    if (!order) return notFound("Order not found")

    // If request has auth session, verify ownership or admin role
    const user = await getSessionUser()
    if (order.userId && user && order.userId !== user.id && !isAdmin(user)) {
      return forbidden("You do not have permission to view this order")
    }

    return NextResponse.json(order)
  } catch (err) {
    console.error("Fetch order error:", err)
    return serverError("Failed to fetch order")
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const body = await req.json()
    const data = orderStatusSchema.parse(body)

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status: data.status,
        ...(data.paymentMethod ? { paymentMethod: data.paymentMethod } : {}),
        ...(data.paymentRef ? { paymentRef: data.paymentRef } : {}),
      },
      include: { items: true },
    })

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("Update order status error:", err)
    return serverError("Failed to update order status")
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.order.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete order error:", err)
    return serverError("Failed to delete order")
  }
}

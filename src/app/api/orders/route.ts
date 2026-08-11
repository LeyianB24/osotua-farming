import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { orderSchema } from "@/lib/schemas"
import { getSessionUser, badRequest, unauthorized, serverError, parseError } from "@/lib/api-utils"
import { sendOrderConfirmation } from "@/lib/email"
import { ZodError } from "zod"

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const orders = await prisma.order.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      include: { items: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(orders)
  } catch {
    return serverError("Failed to fetch orders")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    const body = await req.json()
    const data = orderSchema.parse(body)

    const order = await prisma.order.create({
      data: {
        userId: user?.id ?? data.userId ?? null,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        type: data.type,
        status: "PENDING",
        totalAmount: data.totalAmount,
        depositAmount: data.depositAmount ?? null,
        paymentMethod: data.paymentMethod ?? null,
        paymentRef: data.paymentRef ?? null,
        deliveryAddress: data.deliveryAddress ?? null,
        deliveryDate: data.deliveryDate ?? null,
        notes: data.notes ?? null,
        items: { create: data.items },
      },
      include: { items: true },
    })

    try {
      await sendOrderConfirmation({
        to: order.customerEmail,
        customerName: order.customerName,
        orderId: order.id,
        totalAmount: order.totalAmount,
      })
    } catch (emailErr) {
      console.error("Email send failed:", emailErr)
    }

    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error(err)
    return serverError("Failed to create order")
  }
}

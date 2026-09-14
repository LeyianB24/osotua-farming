import { NextResponse } from "next/server"
import { stkPush } from "@/lib/mpesa"
import { prisma } from "@/lib/prisma"
import { getSessionUser, isAdmin } from "@/lib/api-utils"

export async function POST(req: Request) {
  try {
    const { phone, orderId } = await req.json()

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
    if (order.status === "PAID") {
      return NextResponse.json({ error: "Order is already paid" }, { status: 400 })
    }

    const user = await getSessionUser()
    if (order.userId && (!user || (order.userId !== user.id && !isAdmin(user)))) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 })
    }

    const result = await stkPush({
      phone,
      amount: order.totalAmount,
      orderId,
    })

    if (result?.CheckoutRequestID) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentMethod: "mpesa",
          paymentRef: result.CheckoutRequestID,
        },
      })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "M-Pesa request failed" }, { status: 500 })
  }
}

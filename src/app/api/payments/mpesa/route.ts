import { NextResponse } from "next/server"
import { stkPush } from "@/lib/mpesa"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { phone, orderId } = await req.json()

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })

    const result = await stkPush({
      phone,
      amount: order.totalAmount,
      orderId,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "M-Pesa request failed" }, { status: 500 })
  }
}

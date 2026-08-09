import { NextResponse } from "next/server"
import { createPaymentIntent } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()
    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })

    const intent = await createPaymentIntent(order.totalAmount, orderId)
    return NextResponse.json({ clientSecret: intent.client_secret })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Stripe request failed" }, { status: 500 })
  }
}

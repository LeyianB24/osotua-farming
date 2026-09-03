import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        paymentMethod: true,
        paymentRef: true,
        totalAmount: true,
        customerName: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const isPaid = order.status === "PAID" || order.status === "CONFIRMED" || order.status === "PROCESSING" || order.status === "READY" || order.status === "DELIVERED"

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      isPaid,
      paymentMethod: order.paymentMethod,
      paymentRef: order.paymentRef,
    })
  } catch (err) {
    console.error("M-Pesa status query error:", err)
    return NextResponse.json({ error: "Failed to check status" }, { status: 500 })
  }
}

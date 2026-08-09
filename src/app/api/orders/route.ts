import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendOrderConfirmation } from "@/lib/email"

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(orders)
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, ...orderData } = body

    const order = await prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items,
        },
      },
      include: { items: true },
    })

    await sendOrderConfirmation({
      to: order.customerEmail,
      customerName: order.customerName,
      orderId: order.id,
      totalAmount: order.totalAmount,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

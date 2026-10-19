import { NextResponse } from "next/server"
import { stkPush, formatMpesaPhone } from "@/lib/mpesa"
import { prisma } from "@/lib/prisma"
import { getSessionUser, isAdmin } from "@/lib/api-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phone, orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 })
    }

    if (!phone) {
      return NextResponse.json({ error: "phone is required" }, { status: 400 })
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) {
      return NextResponse.json({ error: `Order not found with id: ${orderId}` }, { status: 404 })
    }

    if (order.status === "PAID") {
      return NextResponse.json({ error: "Order is already paid" }, { status: 400 })
    }

    // Only forbid if order belongs to a different logged-in user
    const user = await getSessionUser()
    if (order.userId && user && order.userId !== user.id && !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 })
    }

    const formattedPhone = formatMpesaPhone(phone)
    if (formattedPhone.length < 12) {
      return NextResponse.json({ error: "Invalid Kenyan phone number format" }, { status: 400 })
    }

    const sanitizedAccountRef = order.paymentRef
      ? order.paymentRef.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)
      : undefined

    const result = await stkPush({
      phone: formattedPhone,
      amount: order.totalAmount,
      orderId: order.id,
      accountRef: sanitizedAccountRef,
    })

    if (result?.errorCode || (result?.ResponseCode && result.ResponseCode !== "0")) {
      const errorMessage =
        result?.errorMessage ||
        result?.ResponseDescription ||
        "M-Pesa request was rejected by Safaricom"
      return NextResponse.json(
        { error: errorMessage, ...result },
        { status: 400 }
      )
    }

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
  } catch (err: unknown) {
    console.error("M-Pesa payment route error:", err)
    const errorMsg = err instanceof Error ? err.message : "M-Pesa request failed"
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    )
  }
}

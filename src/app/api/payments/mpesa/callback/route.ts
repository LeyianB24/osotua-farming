import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type MpesaMetadataItem = {
  Name: string
  Value?: string | number
}

type MpesaCallbackPayload = {
  Body?: {
    stkCallback?: {
      ResultCode?: number
      CheckoutRequestID?: string
      CallbackMetadata?: {
        Item?: MpesaMetadataItem[]
      }
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MpesaCallbackPayload
    const callback = body.Body?.stkCallback

    if (callback?.ResultCode === 0) {
      const metadata = callback.CallbackMetadata?.Item ?? []
      const mpesaRef = metadata.find((item) => item.Name === "MpesaReceiptNumber")?.Value
      const accountRef = metadata.find((item) => item.Name === "AccountReference")?.Value
      const checkoutRequestId = callback.CheckoutRequestID

      const orderId =
        typeof accountRef === "string" ? accountRef.replace("OSOTUA-", "") : undefined

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            paymentRef: String(mpesaRef ?? ""),
            paymentMethod: "mpesa",
          },
        })
      } else if (checkoutRequestId) {
        await prisma.order.updateMany({
          where: { paymentRef: checkoutRequestId },
          data: {
            status: "PAID",
            paymentRef: String(mpesaRef ?? checkoutRequestId),
            paymentMethod: "mpesa",
          },
        })
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" })
  }
}

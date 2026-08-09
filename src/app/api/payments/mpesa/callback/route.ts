import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { Body } = body

    if (Body.stkCallback.ResultCode === 0) {
      const metadata = Body.stkCallback.CallbackMetadata.Item
      const mpesaRef = metadata.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value
      const accountRef = Body.stkCallback.CallbackMetadata?.Item?.find(
        (i: any) => i.Name === "AccountReference"
      )?.Value

      const orderId = accountRef?.replace("OSOTUA-", "")

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            paymentRef: mpesaRef,
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

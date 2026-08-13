import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { investSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { sendInvestorProspectus } from "@/lib/email"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = investSchema.parse(body)

    const roiRate = data.investmentType === "breeding" ? 0.16 : 0.14
    const estimatedReturn = data.amount * Math.pow(1 + roiRate, data.durationYears)

    const inquiry = await prisma.investInquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
        amount: data.amount,
        durationYears: data.durationYears,
        investmentType: data.investmentType,
        note: data.note ?? null,
        prospectusSent: false,
      },
    })

    try {
      await sendInvestorProspectus({
        to: data.email,
        fullName: data.fullName,
        amount: data.amount,
        durationYears: data.durationYears,
        investmentType: data.investmentType,
        estimatedReturn,
      })

      await prisma.investInquiry.update({
        where: { id: inquiry.id },
        data: { prospectusSent: true },
      })
    } catch (emailErr) {
      console.error("Investor prospectus email failed:", emailErr)
    }

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error(err)
    return serverError("Failed to submit investment enquiry")
  }
}

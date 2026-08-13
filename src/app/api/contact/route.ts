import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { sendContactNotification } from "@/lib/email"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject,
        message: data.message,
      },
    })

    try {
      await sendContactNotification({
        fromName: data.name,
        fromEmail: data.email,
        subject: data.subject,
        message: data.message,
        phone: data.phone ?? undefined,
      })
    } catch (emailErr) {
      console.error("Contact notification email failed:", emailErr)
    }

    return NextResponse.json({ success: true, id: message.id }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error(err)
    return serverError("Failed to submit contact enquiry")
  }
}

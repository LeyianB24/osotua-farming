import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)
    
    // Process contact submission (e.g. logging/sending email)
    console.log("Contact form submission:", data)

    return NextResponse.json({ success: true, message: "Contact enquiry received" }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to submit contact enquiry")
  }
}

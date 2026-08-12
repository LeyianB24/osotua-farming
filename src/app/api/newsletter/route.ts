import { NextResponse } from "next/server"
import { newsletterSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = newsletterSchema.parse(body)

    console.log("Newsletter subscription:", data.email)

    return NextResponse.json({ success: true, message: "Subscribed to newsletter" }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to subscribe to newsletter")
  }
}

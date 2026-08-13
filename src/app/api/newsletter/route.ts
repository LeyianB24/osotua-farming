import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { newsletterSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = newsletterSchema.parse(body)

    await prisma.newsletterSub.upsert({
      where: { email },
      update: { active: true },
      create: { email, active: true },
    })

    return NextResponse.json({ success: true, message: "Subscribed to newsletter" }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error(err)
    return serverError("Failed to subscribe to newsletter")
  }
}

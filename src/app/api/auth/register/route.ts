import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/schemas"
import { hashPassword } from "@/lib/password"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)
    const normalizedEmail = data.email.trim().toLowerCase()

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existing) return badRequest("Email already registered.")

    const hashed = await hashPassword(data.password)
    const user = await prisma.user.create({
      data: {
        name: data.name.trim(),
        email: normalizedEmail,
        phone: data.phone?.trim() ?? null,
        password: hashed,
        role: "CUSTOMER",
      },
    })

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error(err)
    return serverError("Registration failed")
  }
}

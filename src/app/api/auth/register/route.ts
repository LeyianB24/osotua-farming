import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/password"

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json()
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""

    if (!normalizedEmail || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Use a valid email and a password with at least 8 characters." },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      return NextResponse.json({ error: "Email already registered." }, { status: 400 })
    }

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name: typeof name === "string" ? name.trim() : null,
        email: normalizedEmail,
        phone: typeof phone === "string" ? phone.trim() : null,
        password: hashed,
      },
    })

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Registration failed." }, { status: 500 })
  }
}

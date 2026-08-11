import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { subscriptionSchema } from "@/lib/schemas"
import { getSessionUser, unauthorized, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const subs = await prisma.subscription.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      include: { product: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(subs)
  } catch {
    return serverError("Failed to fetch subscriptions")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const body = await req.json()
    const data = subscriptionSchema.parse({ ...body, userId: user.id })

    const sub = await prisma.subscription.create({ data })
    return NextResponse.json(sub, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create subscription")
  }
}



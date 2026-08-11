import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { livestockSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const livestock = await prisma.livestock.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(livestock)
  } catch {
    return serverError("Failed to fetch livestock")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = livestockSchema.parse(body)
    const animal = await prisma.livestock.create({ data })
    return NextResponse.json(animal, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to add livestock")
  }
}

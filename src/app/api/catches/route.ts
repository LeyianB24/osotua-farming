import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { newCatchSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const catches = await prisma.newCatch.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { caughtAt: "desc" },
    })
    return NextResponse.json(catches)
  } catch {
    return serverError("Failed to fetch catches")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = newCatchSchema.parse(body)
    const item = await prisma.newCatch.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        unit: data.unit,
        price: data.price,
        status: data.status,
        caughtAt: data.caughtAt,
        note: data.note ?? null,
        breedId: data.breedId ?? null,
      },
      include: { breed: { include: { species: true } } },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create catch")
  }
}

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stockSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const stocks = await prisma.stock.findMany({
      include: { product: true, breed: { include: { species: true } } },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(stocks)
  } catch {
    return serverError("Failed to fetch stocks")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = stockSchema.parse(body)
    const stock = await prisma.stock.create({
      data: {
        name: data.name,
        unit: data.unit,
        quantity: data.quantity,
        reorderAt: data.reorderAt,
        note: data.note ?? null,
        productId: data.productId ?? null,
        breedId: data.breedId ?? null,
      },
      include: { product: true, breed: { include: { species: true } } },
    })
    return NextResponse.json(stock, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create stock")
  }
}

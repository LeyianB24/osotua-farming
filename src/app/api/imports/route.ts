import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { importSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const items = await prisma.import.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(items)
  } catch {
    return serverError("Failed to fetch imports")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = importSchema.parse(body)
    const item = await prisma.import.create({
      data: {
        reference: data.reference,
        supplierName: data.supplierName,
        breedId: data.breedId ?? null,
        productName: data.productName ?? null,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        totalValue: data.totalValue,
        status: data.status,
        arrivedAt: data.arrivedAt ?? null,
        notes: data.notes ?? null,
      },
      include: { breed: { include: { species: true } } },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create import")
  }
}

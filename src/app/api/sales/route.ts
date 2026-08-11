import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { saleSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: { breed: true, product: true },
      orderBy: { paidAt: "desc" },
    })
    return NextResponse.json(sales)
  } catch {
    return serverError("Failed to fetch sales")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = saleSchema.parse(body)
    const sale = await prisma.sale.create({
      data: {
        reference: data.reference,
        breedId: data.breedId ?? null,
        productId: data.productId ?? null,
        customerName: data.customerName,
        customerPhone: data.customerPhone ?? null,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        totalAmount: data.totalAmount,
        channel: data.channel,
        status: data.status,
        paidAt: data.paidAt,
        note: data.note ?? null,
      },
      include: { breed: true, product: true },
    })
    return NextResponse.json(sale, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create sale")
  }
}

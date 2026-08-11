import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(products)
  } catch {
    return serverError("Failed to fetch products")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = productSchema.parse(body)
    const product = await prisma.product.create({ data })
    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create product")
  }
}

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productPatchSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, notFound, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })
    if (!product) return notFound("Product not found")
    return NextResponse.json(product)
  } catch (err) {
    console.error("Fetch product error:", err)
    return serverError("Failed to fetch product")
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const body = await req.json()
    const data = productPatchSchema.parse(body)

    const updated = await prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    })

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("Update product error:", err)
    return serverError("Failed to update product")
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete product error:", err)
    return serverError("Failed to delete product")
  }
}

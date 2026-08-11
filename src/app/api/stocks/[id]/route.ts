import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stockPatchSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, notFound, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params
    const stock = await prisma.stock.findUnique({
      where: { id },
      include: { product: true, breed: { include: { species: true } } },
    })
    if (!stock) return notFound()
    return NextResponse.json(stock)
  } catch {
    return serverError()
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const body = await req.json()
    const data = stockPatchSchema.parse(body)
    const stock = await prisma.stock.update({
      where: { id },
      data,
      include: { product: true, breed: { include: { species: true } } },
    })
    return NextResponse.json(stock)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.stock.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

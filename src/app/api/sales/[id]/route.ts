import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { salePatchSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, notFound, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: { breed: true, product: true },
    })
    if (!sale) return notFound()
    return NextResponse.json(sale)
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
    const data = salePatchSchema.parse(body)
    const sale = await prisma.sale.update({
      where: { id },
      data,
      include: { breed: true, product: true },
    })
    return NextResponse.json(sale)
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
    await prisma.sale.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

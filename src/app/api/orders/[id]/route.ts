import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { orderStatusSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, notFound, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { breed: true, product: true } }, user: { select: { id: true, name: true, email: true } } },
    })
    if (!order) return notFound()
    if (user.role !== "ADMIN" && order.userId !== user.id) return forbidden("Not your order")
    return NextResponse.json(order)
  } catch {
    return serverError()
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const body = await req.json()
    const data = orderStatusSchema.parse(body)
    const order = await prisma.order.update({ where: { id }, data })
    return NextResponse.json(order)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

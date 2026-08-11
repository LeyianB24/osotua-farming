import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { subscriptionPatchSchema } from "@/lib/schemas"
import { getSessionUser, unauthorized, forbidden, badRequest, notFound, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const { id } = await params
    const sub = await prisma.subscription.findUnique({
      where: { id },
      include: { product: true, user: { select: { id: true, name: true, email: true } } },
    })
    if (!sub) return notFound()
    if (user.role !== "ADMIN" && sub.userId !== user.id) return forbidden("Not your subscription")
    return NextResponse.json(sub)
  } catch {
    return serverError()
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const { id } = await params
    const existing = await prisma.subscription.findUnique({ where: { id } })
    if (!existing) return notFound()
    if (user.role !== "ADMIN" && existing.userId !== user.id) return forbidden("Not your subscription")

    const body = await req.json()
    const data = subscriptionPatchSchema.parse(body)
    const sub = await prisma.subscription.update({ where: { id }, data })
    return NextResponse.json(sub)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

export async function DELETE(_: Request, { params }: IdRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const { id } = await params
    const existing = await prisma.subscription.findUnique({ where: { id } })
    if (!existing) return notFound()
    if (user.role !== "ADMIN" && existing.userId !== user.id) return forbidden("Not your subscription")

    await prisma.subscription.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

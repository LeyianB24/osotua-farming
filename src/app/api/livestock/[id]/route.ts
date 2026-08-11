import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { livestockPatchSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, notFound, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const animal = await prisma.livestock.findUnique({
      where: { id },
      include: { breed: true },
    })
    if (!animal) return notFound()
    return NextResponse.json(animal)
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
    const data = livestockPatchSchema.parse(body)
    const animal = await prisma.livestock.update({ where: { id }, data })
    return NextResponse.json(animal)
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
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.livestock.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

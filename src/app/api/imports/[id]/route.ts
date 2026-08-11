import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { importPatchSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, notFound, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params
    const item = await prisma.import.findUnique({
      where: { id },
      include: { breed: { include: { species: true } } },
    })
    if (!item) return notFound()
    return NextResponse.json(item)
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
    const data = importPatchSchema.parse(body)
    const item = await prisma.import.update({
      where: { id },
      data,
      include: { breed: { include: { species: true } } },
    })
    return NextResponse.json(item)
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
    await prisma.import.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

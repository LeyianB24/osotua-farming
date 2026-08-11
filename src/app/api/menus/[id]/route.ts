import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { menuPatchSchema, menuItemSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, notFound, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { items: true },
    })
    if (!menu) return notFound()
    return NextResponse.json(menu)
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
    const data = menuPatchSchema.parse(body)

    const { items, ...rest } = data
    const updateData: Record<string, unknown> = { ...rest }
    if (rest.image === "") updateData.image = null

    if (Array.isArray(items)) {
      const validated = items.map((it) => menuItemSchema.parse(it))
      await prisma.menuItem.deleteMany({ where: { menuId: id } })
      updateData.items = {
        create: validated.map((it: { name: string; quantity: string; note?: string | null }) => ({
          name: it.name,
          quantity: it.quantity,
          note: it.note ?? null,
        })),
      }
    }

    const menu = await prisma.menu.update({
      where: { id },
      data: updateData,
      include: { items: true },
    })
    return NextResponse.json(menu)
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
    await prisma.menu.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

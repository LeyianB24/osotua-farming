import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { menuSchema } from "@/lib/schemas"
import {
  getSessionUser, isAdmin, unauthorized, forbidden,
  badRequest, serverError, parseError,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(menus)
  } catch {
    return serverError("Failed to fetch menus")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = menuSchema.parse(body)

    const menu = await prisma.menu.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        servings: data.servings,
        image: data.image ?? null,
        available: data.available,
        weekOf: data.weekOf ?? null,
        items: {
          create: data.items.map((it) => ({
            name: it.name,
            quantity: it.quantity,
            note: it.note ?? null,
          })),
        },
      },
      include: { items: true },
    })
    return NextResponse.json(menu, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create menu")
  }
}

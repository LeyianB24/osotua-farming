import { prisma } from "@/lib/prisma"
import { menuSchema } from "@/lib/schemas"
import {
  getSessionUser,
  isAdmin,
  unauthorized,
  forbidden,
  badRequest,
  serverError,
  parseError,
  apiSuccess,
  apiCreated,
  checkPayloadSize,
  checkIdempotency,
  saveIdempotencyResponse,
} from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(req: Request) {
  try {
    const menus = await prisma.menu.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    })
    return apiSuccess(menus, req)
  } catch (err) {
    console.error("GET /api/v1/menus error:", err)
    return serverError("Failed to fetch menus")
  }
}

export async function POST(req: Request) {
  try {
    const payloadLimitError = checkPayloadSize(req, 2 * 1024 * 1024)
    if (payloadLimitError) return payloadLimitError

    const { key, cachedResponse } = checkIdempotency(req)
    if (cachedResponse) return cachedResponse

    const user = await getSessionUser()
    if (!user) return unauthorized("Authentication required to create menu")
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

    const location = `/api/v1/menus/${menu.id}`
    const response = apiCreated(menu, location, req)
    saveIdempotencyResponse(key, 201, menu)
    return response
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("POST /api/v1/menus error:", err)
    return serverError("Failed to create menu")
  }
}

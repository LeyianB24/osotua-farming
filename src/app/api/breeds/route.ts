import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { breedSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const breeds = await prisma.breed.findMany({
      include: { species: true },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(breeds)
  } catch {
    return serverError("Failed to fetch breeds")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = breedSchema.parse(body)
    const breed = await prisma.breed.create({ data })
    return NextResponse.json(breed, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create breed")
  }
}

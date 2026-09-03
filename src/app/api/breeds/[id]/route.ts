import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { breedPatchSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, notFound, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const breed = await prisma.breed.findUnique({
      where: { id },
      include: { species: true },
    })
    if (!breed) return notFound("Breed not found")
    return NextResponse.json(breed)
  } catch (err) {
    console.error("Fetch breed error:", err)
    return serverError("Failed to fetch breed")
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    const body = await req.json()
    const data = breedPatchSchema.parse(body)

    const updated = await prisma.breed.update({
      where: { id },
      data,
      include: { species: true },
    })

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("Update breed error:", err)
    return serverError("Failed to update breed")
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { id } = await params
    await prisma.breed.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete breed error:", err)
    return serverError("Failed to delete breed")
  }
}

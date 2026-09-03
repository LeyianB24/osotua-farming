import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { visitStatusSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, notFound, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const visit = await prisma.farmVisit.findUnique({ where: { id } })
    if (!visit) return notFound("Farm visit not found")
    return NextResponse.json(visit)
  } catch (err) {
    console.error("Fetch visit error:", err)
    return serverError("Failed to fetch farm visit")
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
    const data = visitStatusSchema.parse(body)

    const updated = await prisma.farmVisit.update({
      where: { id },
      data: { status: data.status },
    })

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("Update visit error:", err)
    return serverError("Failed to update farm visit status")
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
    await prisma.farmVisit.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete visit error:", err)
    return serverError("Failed to delete farm visit")
  }
}

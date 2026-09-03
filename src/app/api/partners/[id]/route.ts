import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { partnerStatusSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, notFound, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const partner = await prisma.partnerFarmer.findUnique({ where: { id } })
    if (!partner) return notFound("Partner farmer record not found")
    return NextResponse.json(partner)
  } catch (err) {
    console.error("Fetch partner error:", err)
    return serverError("Failed to fetch partner farmer")
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
    const data = partnerStatusSchema.parse(body)

    const updated = await prisma.partnerFarmer.update({
      where: { id },
      data: { status: data.status },
    })

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("Update partner status error:", err)
    return serverError("Failed to update partner farmer status")
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
    await prisma.partnerFarmer.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete partner error:", err)
    return serverError("Failed to delete partner farmer")
  }
}

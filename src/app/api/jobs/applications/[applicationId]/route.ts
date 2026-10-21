import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, notFound, serverError } from "@/lib/api-utils"
import { z } from "zod"

const updateAppStatusSchema = z.object({
  status: z.enum(["RECEIVED", "REVIEWING", "SHORTLISTED", "INTERVIEWED", "OFFERED", "REJECTED"]),
})

type Ctx = { params: Promise<{ applicationId: string }> }

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { applicationId } = await params
    const body = await req.json()
    const parsed = updateAppStatusSchema.safeParse(body)
    if (!parsed.success) {
      return badRequest("Invalid application status")
    }

    const updated = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status: parsed.data.status },
    })

    return NextResponse.json(updated)
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Application not found")
    }
    console.error("Update application error:", err)
    return serverError("Failed to update application")
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { applicationId } = await params
    await prisma.jobApplication.delete({ where: { id: applicationId } })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") {
      return notFound("Application not found")
    }
    console.error("Delete application error:", err)
    return serverError("Failed to delete application")
  }
}

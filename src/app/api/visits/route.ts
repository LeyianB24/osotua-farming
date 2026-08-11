import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { visitSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { sendVisitConfirmation } from "@/lib/email"
import { ZodError } from "zod"

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    const visits = await prisma.farmVisit.findMany({ orderBy: { visitDate: "asc" } })
    return NextResponse.json(visits)
  } catch {
    return serverError("Failed to fetch visits")
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = visitSchema.parse(body)
    const visit = await prisma.farmVisit.create({ data })

    try {
      await sendVisitConfirmation({
        to: visit.email,
        fullName: visit.fullName,
        visitDate: visit.visitDate,
      })
    } catch (emailErr) {
      console.error("Email send failed:", emailErr)
    }

    return NextResponse.json(visit, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error(err)
    return serverError("Failed to book visit")
  }
}



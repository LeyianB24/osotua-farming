import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendVisitConfirmation } from "@/lib/email"

export async function GET() {
  try {
    const visits = await prisma.farmVisit.findMany({ orderBy: { visitDate: "asc" } })
    return NextResponse.json(visits)
  } catch {
    return NextResponse.json({ error: "Failed to fetch visits" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const visit = await prisma.farmVisit.create({
      data: {
        ...body,
        visitDate: new Date(body.visitDate),
        groupSize: parseInt(body.groupSize) || 1,
      },
    })

    await sendVisitConfirmation({
      to: visit.email,
      fullName: visit.fullName,
      visitDate: visit.visitDate,
    })

    return NextResponse.json(visit, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to book visit" }, { status: 500 })
  }
}

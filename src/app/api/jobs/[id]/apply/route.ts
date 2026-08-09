import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendApplicationReceived } from "@/lib/email"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const body = await req.json()

    const job = await prisma.job.findUnique({ where: { id } })
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })

    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        coverLetter: body.coverLetter || null,
        cvUrl: body.cvUrl || null,
      },
    })

    await sendApplicationReceived({
      to: application.email,
      fullName: application.fullName,
      jobTitle: job.title,
    })

    return NextResponse.json(application, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const applications = await prisma.jobApplication.findMany({
      where: { jobId: id },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(applications)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

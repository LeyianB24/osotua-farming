import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { jobApplicationSchema } from "@/lib/schemas"
import { badRequest, notFound, serverError, parseError } from "@/lib/api-utils"
import { sendApplicationReceived } from "@/lib/email"
import { ZodError } from "zod"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = jobApplicationSchema.parse(body)

    const job = await prisma.job.findUnique({ where: { id } })
    if (!job) return notFound("Job not found")

    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter ?? null,
        cvUrl: data.cvUrl ?? null,
      },
    })

    try {
      await sendApplicationReceived({
        to: application.email,
        fullName: application.fullName,
        jobTitle: job.title,
      })
    } catch (emailErr) {
      console.error("Email send failed:", emailErr)
    }

    return NextResponse.json(application, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to submit application")
  }
}

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    const { id } = await params
    const applications = await prisma.jobApplication.findMany({
      where: { jobId: id },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(applications)
  } catch {
    return serverError()
  }
}

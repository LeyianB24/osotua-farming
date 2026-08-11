import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { jobSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(jobs)
  } catch {
    return serverError("Failed to fetch jobs")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = jobSchema.parse(body)
    const job = await prisma.job.create({ data })
    return NextResponse.json(job, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create job")
  }
}

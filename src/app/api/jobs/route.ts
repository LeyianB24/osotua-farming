import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(jobs)
  } catch {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const job = await prisma.job.create({ data: body })
    return NextResponse.json(job, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { partnerSchema } from "@/lib/schemas"
import { badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }
    const partners = await prisma.partnerFarmer.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(partners)
  } catch {
    return serverError("Failed to fetch partners")
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = partnerSchema.parse(body)
    const partner = await prisma.partnerFarmer.create({ data })
    return NextResponse.json(partner, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to register partner")
  }
}

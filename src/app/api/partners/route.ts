import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const partners = await prisma.partnerFarmer.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json(partners)
  } catch {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const partner = await prisma.partnerFarmer.create({ data: body })
    return NextResponse.json(partner, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to register partner" }, { status: 500 })
  }
}

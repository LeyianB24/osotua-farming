import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const subs = await prisma.subscription.findMany({
      include: { product: true, user: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(subs)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const sub = await prisma.subscription.create({ data: body })
    return NextResponse.json(sub, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}

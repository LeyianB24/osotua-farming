import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const livestock = await prisma.livestock.findMany({
      include: { breed: { include: { species: true } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(livestock)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const animal = await prisma.livestock.create({ data: body })
    return NextResponse.json(animal, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to add livestock" }, { status: 500 })
  }
}

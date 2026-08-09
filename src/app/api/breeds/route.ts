import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const breeds = await prisma.breed.findMany({
      include: { species: true },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(breeds)
  } catch {
    return NextResponse.json({ error: "Failed to fetch breeds" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const breed = await prisma.breed.create({ data: body })
    return NextResponse.json(breed, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create breed" }, { status: 500 })
  }
}

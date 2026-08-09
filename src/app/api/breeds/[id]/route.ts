import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const breed = await prisma.breed.findUnique({
      where: { id },
      include: { species: true },
    })
    if (!breed) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(breed)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const breed = await prisma.breed.update({ where: { id }, data: body })
    return NextResponse.json(breed)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    await prisma.breed.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

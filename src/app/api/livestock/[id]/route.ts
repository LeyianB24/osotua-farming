import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const animal = await prisma.livestock.findUnique({
      where: { id: params.id },
      include: { breed: true },
    })
    if (!animal) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(animal)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const animal = await prisma.livestock.update({ where: { id: params.id }, data: body })
    return NextResponse.json(animal)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.livestock.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

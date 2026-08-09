import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { breed: true, product: true } }, user: true },
    })
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const order = await prisma.order.update({ where: { id }, data: body })
    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

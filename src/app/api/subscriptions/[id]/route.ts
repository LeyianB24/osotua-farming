import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type IdRouteContext = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    const body = await req.json()
    const sub = await prisma.subscription.update({ where: { id }, data: body })
    return NextResponse.json(sub)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: IdRouteContext) {
  try {
    const { id } = await params
    await prisma.subscription.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type SlugRouteContext = { params: Promise<{ slug: string }> }

export async function GET(_: Request, { params }: SlugRouteContext) {
  try {
    const { slug } = await params
    const post = await prisma.post.findUnique({ where: { slug } })
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: SlugRouteContext) {
  try {
    const { slug } = await params
    const body = await req.json()
    const post = await prisma.post.update({ where: { slug }, data: body })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

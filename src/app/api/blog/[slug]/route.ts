import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.post.findUnique({ where: { slug: params.slug } })
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    const post = await prisma.post.update({ where: { slug: params.slug }, data: body })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

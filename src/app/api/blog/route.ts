import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { postSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    })
    return NextResponse.json(posts)
  } catch {
    return serverError("Failed to fetch posts")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const data = postSchema.parse(body)
    const post = await prisma.post.create({ data })
    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Failed to create post")
  }
}

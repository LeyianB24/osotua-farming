import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { postPatchSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, notFound, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

type SlugRouteContext = { params: Promise<{ slug: string }> }

export async function GET(_: Request, { params }: SlugRouteContext) {
  try {
    const { slug } = await params
    const post = await prisma.post.findUnique({ where: { slug } })
    if (!post) return notFound()
    return NextResponse.json(post)
  } catch {
    return serverError()
  }
}

export async function PATCH(req: Request, { params }: SlugRouteContext) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const { slug } = await params
    const body = await req.json()
    const data = postPatchSchema.parse(body)
    const post = await prisma.post.update({ where: { slug }, data })
    return NextResponse.json(post)
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2025") return notFound()
    return serverError()
  }
}

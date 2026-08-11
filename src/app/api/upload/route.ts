import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"
import { uploadSchema } from "@/lib/schemas"
import { getSessionUser, isAdmin, unauthorized, forbidden, badRequest, serverError, parseError } from "@/lib/api-utils"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const body = await req.json()
    const { image, folder } = uploadSchema.parse(body)
    const url = await uploadImage(image, folder)
    return NextResponse.json({ url })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    return serverError("Upload failed")
  }
}

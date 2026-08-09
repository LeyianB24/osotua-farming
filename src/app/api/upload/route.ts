import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(req: Request) {
  try {
    const { image, folder } = await req.json()
    const url = await uploadImage(image, folder)
    return NextResponse.json({ url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

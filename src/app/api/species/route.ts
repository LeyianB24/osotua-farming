import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serverError } from "@/lib/api-utils"

export async function GET() {
  try {
    const species = await prisma.species.findMany({ orderBy: { name: "asc" } })
    return NextResponse.json(species)
  } catch {
    return serverError("Failed to fetch species")
  }
}

import { prisma } from "@/lib/prisma"
import { apiSuccess, serverError } from "@/lib/api-utils"

export async function GET(req: Request) {
  try {
    const species = await prisma.species.findMany({ orderBy: { name: "asc" } })
    return apiSuccess(species, req)
  } catch (err) {
    console.error("GET /api/v1/species error:", err)
    return serverError("Failed to fetch species list")
  }
}

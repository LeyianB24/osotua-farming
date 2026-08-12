import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser, isAdmin, unauthorized, forbidden, serverError, apiSuccess } from "@/lib/api-utils"

export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    if (!isAdmin(user)) return forbidden("Admin access required")

    const [
      breedsCount,
      productsCount,
      ordersCount,
      visitsCount,
      partnersCount,
      jobsCount,
      stocksCount,
      menusCount,
      catchesCount,
      importsCount,
      salesCount,
    ] = await Promise.all([
      prisma.breed.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.farmVisit.count(),
      prisma.partnerFarmer.count(),
      prisma.job.count(),
      prisma.stock.count(),
      prisma.menu.count(),
      prisma.newCatch.count(),
      prisma.import.count(),
      prisma.sale.count(),
    ])

    const stats = {
      breeds: breedsCount,
      products: productsCount,
      orders: ordersCount,
      visits: visitsCount,
      partners: partnersCount,
      jobs: jobsCount,
      stocks: stocksCount,
      menus: menusCount,
      catches: catchesCount,
      imports: importsCount,
      sales: salesCount,
      timestamp: new Date().toISOString(),
    }

    return apiSuccess(stats, req)
  } catch (err) {
    console.error("Dashboard stats error:", err)
    return serverError("Failed to load dashboard stats")
  }
}

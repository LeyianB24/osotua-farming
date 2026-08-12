import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const startTime = Date.now()
  try {
    // Ping database
    await prisma.$queryRaw`SELECT 1`
    const latency = Date.now() - startTime

    return NextResponse.json(
      {
        status: "healthy",
        database: "connected",
        latency: `${latency}ms`,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        version: "v1.0.0",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    )
  } catch (err) {
    console.error("Health check failure:", err)
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        timestamp: new Date().toISOString(),
        error: "Database ping failed",
      },
      { status: 503 }
    )
  }
}

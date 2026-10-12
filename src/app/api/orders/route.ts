import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { orderSchema } from "@/lib/schemas"
import { getSessionUser, badRequest, unauthorized, serverError, parseError } from "@/lib/api-utils"
import { sendOrderConfirmation } from "@/lib/email"
import { ZodError } from "zod"

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) return unauthorized()
    const orders = await prisma.order.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, image: true, unit: true } },
            breed: { select: { id: true, name: true, image: true } },
          },
        },
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(orders)
  } catch {
    return serverError("Failed to fetch orders")
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    const body = await req.json()
    const data = orderSchema.parse(body)

    // --- Phase 1: Verify prices OUTSIDE the transaction to keep it short ---
    let serverCalculatedTotal = 0
    const verifiedItems: Array<{
      productId?: string
      breedId?: string
      quantity: number
      unitPrice: number
      totalPrice: number
    }> = []

    for (const item of data.items) {
      let unitPrice = item.unitPrice
      if (item.productId) {
        const product = await prisma.product.findUnique({ where: { id: item.productId } })
        if (!product) throw new Error(`Product not found: ${item.productId}`)
        unitPrice = product.price
      } else if (item.breedId) {
        const breed = await prisma.breed.findUnique({ where: { id: item.breedId } })
        if (!breed) throw new Error(`Breed not found: ${item.breedId}`)
        unitPrice = breed.pricePerHead
      }
      serverCalculatedTotal += unitPrice * item.quantity
      verifiedItems.push({
        productId: item.productId ?? undefined,
        breedId: item.breedId ?? undefined,
        quantity: item.quantity,
        unitPrice,
        totalPrice: unitPrice * item.quantity,
      })
    }

    // --- Phase 2: Short transaction — create order + parallel stock updates ---
    const order = await prisma.$transaction(
      async (tx) => {
        // Create the order with already-verified items and amounts
        const createdOrder = await tx.order.create({
          data: {
            userId: user?.id ?? data.userId ?? null,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            type: data.type,
            status: "PENDING",
            totalAmount: serverCalculatedTotal,
            depositAmount: data.depositAmount ?? null,
            paymentMethod: data.paymentMethod ?? null,
            paymentRef: data.paymentRef ?? null,
            deliveryAddress: data.deliveryAddress ?? null,
            deliveryDate: data.deliveryDate ?? null,
            notes: data.notes ?? null,
            items: { create: verifiedItems },
          },
          include: {
            items: {
              include: {
                product: true,
                breed: true,
              },
            },
          },
        })

        // Decrement product stock and breed counts in parallel
        await Promise.all(
          verifiedItems.map(async (item) => {
            if (item.productId) {
              // Use updateMany with arithmetic to avoid a read-then-write race
              await tx.$executeRaw`
                UPDATE "Product"
                SET "stockQty" = GREATEST(0, "stockQty" - ${item.quantity}::int),
                    "inStock"  = GREATEST(0, "stockQty" - ${item.quantity}::int) > 0
                WHERE "id" = ${item.productId}
              `
            }
            if (item.breedId) {
              await tx.$executeRaw`
                UPDATE "Breed"
                SET "inStock" = GREATEST(0, "inStock" - ${item.quantity}::int)
                WHERE "id" = ${item.breedId}
              `
            }
          })
        )

        return createdOrder
      },
      {
        maxWait: 10_000, // wait up to 10 s for a connection slot
        timeout:  30_000, // allow the transaction itself up to 30 s
      }
    )

    // 4. Send Confirmation Email
    try {
      await sendOrderConfirmation({
        to: order.customerEmail,
        customerName: order.customerName,
        orderId: order.id,
        totalAmount: order.totalAmount,
      })
    } catch (emailErr) {
      console.error("Order confirmation email failed:", emailErr)
    }

    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) return badRequest(parseError(err))
    console.error("Order creation failed:", err)
    return serverError("Failed to create order")
  }
}

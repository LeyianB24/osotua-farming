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

    // Execute within Prisma interactive transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the Order and Items
      const createdOrder = await tx.order.create({
        data: {
          userId: user?.id ?? data.userId ?? null,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          type: data.type,
          status: "PENDING",
          totalAmount: data.totalAmount,
          depositAmount: data.depositAmount ?? null,
          paymentMethod: data.paymentMethod ?? null,
          paymentRef: data.paymentRef ?? null,
          deliveryAddress: data.deliveryAddress ?? null,
          deliveryDate: data.deliveryDate ?? null,
          notes: data.notes ?? null,
          items: { create: data.items },
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

      // 2. Decrement Product Stock and update status
      for (const item of data.items) {
        if (item.productId) {
          const product = await tx.product.findUnique({ where: { id: item.productId } })
          if (product) {
            const newQty = Math.max(0, product.stockQty - item.quantity)
            await tx.product.update({
              where: { id: item.productId },
              data: {
                stockQty: newQty,
                inStock: newQty > 0,
              },
            })
          }
        }

        // 3. Decrement Breed inStock count if a breed was purchased
        if (item.breedId) {
          const breed = await tx.breed.findUnique({ where: { id: item.breedId } })
          if (breed && breed.inStock > 0) {
            await tx.breed.update({
              where: { id: item.breedId },
              data: {
                inStock: Math.max(0, breed.inStock - item.quantity),
              },
            })
          }
        }
      }

      return createdOrder
    })

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

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import OrderDetailClient from "@/components/farm/OrderDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order Tracking #${id.slice(-6).toUpperCase()} — Osotua Farming`,
    description: `Track your live dispatch status and view itemized invoice for Osotua Farming order #${id.slice(-6).toUpperCase()}.`,
  };
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              image: true,
              unit: true,
            },
          },
          breed: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!order) notFound();

  // Format order data for client
  const formattedOrder = {
    ...order,
    createdAt: order.createdAt.toISOString(),
    deliveryDate: order.deliveryDate ? order.deliveryDate.toISOString() : null,
  };

  return <OrderDetailClient order={formattedOrder} />;
}

import prisma from "@/lib/prisma";

export async function getAllOrders() {
  return await prisma.order.findMany({
    include: {
      user: true,
      restaurant: true,
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
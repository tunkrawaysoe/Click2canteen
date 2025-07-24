"use server";
import { delKey } from "@/lib/utils/cached";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { pusherServer } from "@/lib/pusher";

export async function updateOrderStatus(formData) {
  const orderId = formData.get("orderId");
  const status = formData.get("status");

  console.log("Received update request:", { orderId, status });
  if (!orderId || !status) {
    throw new Error("Missing orderId or status");
  }

  // Update order status in DB
  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  console.log("updated",updated)

  // Clear Redis cache keys
  await delKey(`order:${orderId}`);
  await delKey(`orders:restaurant:${updated.restaurantId}`);
  await delKey(`orders:restaurant:${updated.restaurantId}:today`);

  // Trigger Pusher event to notify clients
  await pusherServer.trigger(
    `restaurant-${updated.restaurantId}`, // for admin dashboard
    "order:updated",
    { id: updated.id, status: updated.status }
  );

  await pusherServer.trigger(
    `order-${updated.id}`, // for individual order page (customer)
    "order:updated",
    { id: updated.id, status: updated.status }
  );

  // Trigger update for the user’s order history list
  await pusherServer.trigger(`user-${updated.userId}`, "order:updated", {
    id: updated.id,
    status: updated.status,
  });

  return updated;
}

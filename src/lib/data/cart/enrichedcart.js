import prisma from "@/lib/prisma";

export async function enrichCart(cart) {
  const enriched = await Promise.all(
    cart.map(async (item) => {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menuId },
        include: {
          addOns: true,
          restaurant: {
            select: {
              id: true,
              qrCodeUrl: true,
              kpayPhones: true,
            },
          },
        },
      });

      if (!menu) return null;

      return { ...item, menu };
    })
  );

  return enriched.filter(Boolean);
}

export function calculateTotal(enrichedCart) {
  let total = 0;
  for (const item of enrichedCart) {
    const selectedAddOns = item.addOns.map((id) =>
      item.menu.addOns.find((a) => a.id === id)
    );
    const addonTotal = selectedAddOns.reduce(
      (sum, addon) => sum + (addon?.price || 0),
      0
    );
    total += (item.menu.price + addonTotal) * item.quantity;
  }
  return total;
}

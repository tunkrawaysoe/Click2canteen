'use server';

import { PrismaClient } from '@/generated/prisma';

let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export async function addRestaurant(formData) {
  try {
    const name = formData.get('name');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const imageUrl = formData.get('imageUrl') || null;
    const isOpen = formData.get('isOpen') === 'on';
    const isActive = formData.get('isActive') === 'on';

    if (!name || !phone || !address) {
      return { error: 'Missing required fields' };
    }

    await prisma.restaurant.create({
      data: {
        name,
        phone,
        address,
        imageUrl,
        isOpen,
        isActive,
      },
    });

    return { success: true };
  } catch (err) {
    console.error('Create failed:', err);
    return { error: 'Something went wrong' };
  }
}

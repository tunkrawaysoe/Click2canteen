import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Restaurant } from "@mui/icons-material";

export async function getUserProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}

export async function getUser(restName = false) {
  const kindeUser = await getUserProfile();

  if (!kindeUser) {
    // Return a guest user object when not authenticated
    return {
      id: null,
      name: "Guest",
      role: "GUEST",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: kindeUser.id },
    include: restName ? { restaurant: { select: { name: true } } } : undefined,
  });

  // If user not found in DB, fallback to guest
  if (!user) {
    return {
      id: null,
      name: "Guest",
      role: "GUEST",
    };
  }

  // If restName requested, attach restaurant name
  if (restName && user.restaurant) {
    return {
      ...user,
      restaurantName: user.restaurant.name,
    };
  }

  return user;
}

export async function getUserWithOrders() {
  const kindeUser = await getUserProfile();

  if (!kindeUser) {
    return {
      id: null,
      name: "Guest",
      role: "GUEST",
      orders: [],
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: kindeUser.id },
    include: {
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          orderItems: {
            include: {
              menu: true,
              orderItemAddOns: {
                include: {
                  addOn: true,
                },
              },
            },
          },
          restaurant: true,
        },
      },
    },
  });

  if (!user) {
    return {
      id: null,
      name: "Guest",
      role: "GUEST",
      orders: [],
    };
  }

  return user;
}

export async function getAdminUsers() {
  return prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, name: true },
  });
}

export async function getAllUsers(params) {
  return prisma.user.findMany({
    include: {
      restaurant: true,
    },
  });
}

import { PrismaClient } from "@/generated/prisma";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const CACHE_KEY = "restaurants:all";
const CACHE_TTL = 60 * 5; // 5 minutes

export async function GET() {
  const cached = await redis.get(CACHE_KEY)
  if(cached){
    return NextResponse.json({
      message : "Cached Data",
      restaurants : cached
    })
  }
  const restaurants = await prisma.restaurant.findMany();
  await redis.set(CACHE_KEY,restaurants,{ex : CACHE_TTL})
  return NextResponse.json({
    message: "Getting All The Restaurant",
    restaurants,
  });
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, address, imageUrl, isOpen, isActive } = body;

    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, address" },
        { status: 400 }
      );
    }

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        phone,
        address,
        imageUrl: imageUrl || null,
        isOpen: isOpen !== undefined ? isOpen : true,
        isActive: isActive !== undefined ? isActive : true,
      },
    });
     await redis.del(CACHE_KEY);

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json္(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}

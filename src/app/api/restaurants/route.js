import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();
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

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserProfile } from "@/lib/data/user/user";
export async function GET({ params }) {
  const { userId } = await params;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

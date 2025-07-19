// app/api/cart/route.ts (Next.js 13+)

import { NextResponse } from "next/server";
import { getCartAction } from "@/actions/cart";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "guest";

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const cart = await getCartAction(userId);

  return NextResponse.json(cart);
}

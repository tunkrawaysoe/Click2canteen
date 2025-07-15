import { getCartAction } from "@/actions/cart";
import { NextResponse } from "next/server";

export  async function GET(req) {
    const userId = "guest";
    const cart = await getCartAction(userId)

    return NextResponse.json(cart)
}
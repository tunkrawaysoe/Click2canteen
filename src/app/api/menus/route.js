import { NextResponse } from "next/server";
import { getAllMenus } from "@/lib/data/menu/menu";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const canteenId = searchParams.get("canteenId");
    const category = searchParams.get("category") || null;
    console.log("cafdfdfd", category);

    const forceRefresh = searchParams.get("forceRefresh") === "true";

    if (!canteenId) {
      return NextResponse.json(
        { error: "canteenId is required" },
        { status: 400 }
      );
    }

    const menus = await getAllMenus(canteenId, category, forceRefresh);
    return NextResponse.json(menus);
  } catch (error) {
    console.error("❌ Error in GET /api/menus:", error);
    return NextResponse.json(
      { error: "Failed to fetch menus" },
      { status: 500 }
    );
  }
}

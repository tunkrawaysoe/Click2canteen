import { NextResponse } from "next/server";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function middleware(req) {
  const role =
    req.cookies.get("role")?.value || req.nextUrl.searchParams.get("role");
  const path = req.nextUrl.pathname;
  const baseUrl = req.nextUrl.origin;

 

  // Protect /place-order
  if (path === "/place-order") {
    if (!role) {
      // Not logged in → go to login with fromPlaceOrder param
      return NextResponse.redirect(
        new URL(`/login?fromPlaceOrder=true`, baseUrl)
      );
    }
    if (role === "CUSTOMER") {
      return NextResponse.next();
    }
    if (role === "ADMIN" || role === "SYSTEM_ADMIN") {
      return NextResponse.redirect(new URL("/admin", baseUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/place-order"],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value; // Check if session token exists

  if (!token) {
    const url = new URL("/signup", req.nextUrl.origin);
    url.searchParams.set("redirected", "true"); // Add query param for toasts
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/builder"], // Apply to protected routes
};

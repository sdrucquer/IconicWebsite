import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect everything under /admin
  if (pathname.startsWith("/admin")) {
    const cookie = request.cookies.get("iconic_admin");
    const secret = process.env.ADMIN_COOKIE_SECRET ?? "";

    if (!secret || cookie?.value !== secret) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

import type { Session } from "better-auth/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: "http://localhost:4000",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/dashboard",
  ],
};

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSessionForMiddleware } from "./lib/auth/utils";

const AuthRoutes = "/auth";
const ProtectedRoutes = ["/user"];

/* 
  With mySql need to remove the auth logic from the middleware
  instead use the validateRequest function in the layout or in pages.
  This is because we need to call the database to validate the session
  and we can't call it with mysql2 because of edge incompatibility.
*/

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const sessionId = cookies().get("auth_session")?.value ?? null;
  const { user } = await getSessionForMiddleware(sessionId);

  const isAuthRoute = nextUrl.pathname.startsWith(AuthRoutes);
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect to /protected if user is logged in and tries to access auth routes
  if (user && isAuthRoute) {
    const url = new URL("/user", nextUrl.origin);
    return NextResponse.redirect(url);
  }

  // Redirect to /auth/login if user is not logged in and tries to access protected routes
  if (!user && isProtectedRoute) {
    const url = new URL("/login", nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

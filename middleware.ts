import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow access to admin-login page
  if (request.nextUrl.pathname === "/admin-login") {
    return NextResponse.next()
  }

  // Check if user is authenticated for dashboard
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true"
  const adminAuth = request.headers.get("x-admin-auth") // We'll handle this client-side

  // Define protected routes
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) => 
    request.nextUrl.pathname.startsWith(route)
  )

  // If trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin-login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-login"],
}

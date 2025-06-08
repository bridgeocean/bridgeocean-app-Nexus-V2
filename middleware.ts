import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the path starts with /dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Get the authentication token from cookies
    const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true"

    // If not authenticated, redirect to sign-in page
    if (!isAuthenticated) {
      const signInUrl = new URL("/signin", request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

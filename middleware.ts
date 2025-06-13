import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Get the auth cookie/token
    const authToken = request.cookies.get('bridgeoceanAdminAuth')?.value
    
    // If no auth token, redirect to admin login
    if (!authToken) {
      const url = new URL('/admin-login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

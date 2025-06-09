import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Simple middleware - just let everything through for now
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

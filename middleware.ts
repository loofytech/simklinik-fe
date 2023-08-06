import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const ckU = request.cookies.has('_LkS_aA23');
  // if (!ckU) {
  //   return NextResponse.redirect(new URL("/auth/signin", request.url));
  // }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*"
}
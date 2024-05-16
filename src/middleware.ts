import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  // TODO: 로그인 여부 조건 필요

  const isLogin = request.cookies.get('DS_AUT')?.value
  if (!isLogin) {
    const redirectResponse = NextResponse.redirect(
      new URL('/auth/login', request.url),
    )
    redirectResponse.headers.set('x-middleware-cache', 'no-cache')
    return redirectResponse
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/my/library/:path*', '/my/subscribtion'],
}

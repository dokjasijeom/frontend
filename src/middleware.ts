import { isEmpty } from 'lodash'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  // TODO: 로그인 여부 조건 필요

  const isLogin = request.cookies.get('DS_AUT')?.value
  if (isEmpty(isLogin)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/my/library',
}

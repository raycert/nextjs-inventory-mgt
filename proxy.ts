import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const PUBLIC_PATHS = new Set(['/']);

export default auth((req) => {
  const isPublicPath = PUBLIC_PATHS.has(req.nextUrl.pathname);

  if (!req.auth && !isPublicPath) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};

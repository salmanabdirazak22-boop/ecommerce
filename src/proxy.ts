import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: any) {
  const session = await auth();
  const { pathname } = new URL(request.url);

  // Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect Influencer Routes
  if (pathname.startsWith('/influencer')) {
    if (!session || (session.user as any)?.role !== 'INFLUENCER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/influencer/:path*'],
};

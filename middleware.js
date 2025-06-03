// app/middleware.js (remove 'use client')
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function  middleware(request) {
  const token =await cookies().get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ['/dashboard'];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Optionally specify which paths middleware should run on
export const config = {
  matcher: ['/dashboard/:path*'],
};
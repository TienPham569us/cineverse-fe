import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Request:', {
    method: request.method,
    url: request.url,
    headers: request.headers,
  });

  const response = NextResponse.next();
  console.log('Response:', {
    status: response.status,
    headers: response.headers,
  });
  return response;
}

export const config = {
  matcher: '/:path*', // Apply middleware to API routes
};
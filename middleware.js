import { NextResponse } from 'next/server';

export function middleware(req) {
  // force lower-case match and try redirect if needed
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(new URL(req.nextUrl.pathname.toLowerCase(), req.nextUrl.origin));
}

import { NextResponse } from 'next/server';

const Middleware = (req) => {
  // force lower-case match and try redirect if needed
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(new URL(req.nextUrl.origin + req.nextUrl.pathname.toLowerCase()));
};

export default Middleware;

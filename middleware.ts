import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // const jwt = request.cookies.get("myTokenName");
    // if (!jwt) return NextResponse.redirect(new URL("/", request.url));
    // try {
    //   return NextResponse.next();
    // } catch (error) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }
}

export const config = {
    // matcher: ['/home_page/:path*', '/api/((?!users/\\[id\\]).*)'],
}
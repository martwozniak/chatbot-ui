import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export function middleware(request: NextRequest) {

    if(request.nextUrl.searchParams.get('workspace') || request.cookies.has('workspace')){
        const response = NextResponse.next();
        return response
    } else {
        return NextResponse.json({error: 404},  {
            status: 404,
        });
    }
  }
  
export const config = { matcher: ["/api/private/:path*"] }
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("Middleware invoked");
    console.log("Request URL:", request.nextUrl.pathname);
    
    if (/^\/chat($|\/)/.test(request.nextUrl.pathname)) {
        console.log("Redirecting to /authentication/login");
        return NextResponse.redirect(new URL("/authentication/login", request.url));
    }
    
    return NextResponse.next();
}

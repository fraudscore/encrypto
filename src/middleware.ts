import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    
    
    if (/^\/chat($|\/)/.test(request.nextUrl.pathname)) {
        let cookie = request.cookies.get('sessiontoken')
        if(!cookie){
            return NextResponse.redirect(new URL("/authentication/login", request.url));
        }else{
            NextResponse.next()
        }
    }
    
    return NextResponse.next();
}

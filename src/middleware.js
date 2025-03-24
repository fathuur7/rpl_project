import { NextResponse } from "next/server";

export function middleware(req) {
    // const token = req.cookies.get("token");
    // const path = req.nextUrl.pathname;
    // const publicPaths = ["/login", "/register", "/forgot-password"];
    // const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
    
    // if (token && isPublicPath) {
    //     return NextResponse.redirect(new URL("/home", req.url));
    // }

    // if (!token && !isPublicPath) {
    //     return NextResponse.redirect(new URL("/auth/login", req.url));
    // }
    
    // return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)"
    ],
};

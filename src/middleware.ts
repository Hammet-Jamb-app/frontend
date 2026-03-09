import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    user_id: string
    role: "admin" | "tutor" | "student"
    exp: Number
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("jamb_ai_token")?.value
    const { pathname } = request.nextUrl

    // Allow public route
    if (pathname.startsWith("/login")) {
        return NextResponse.next()
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token)
        const role = decoded.role

        // Role-based route protection
        if (pathname.startsWith("/student") && role !== "student") {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        if (pathname.startsWith("/tutor") && role !== "tutor") {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        if (pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        return NextResponse.next()
    } catch {
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: ["/student/:path*", "/tutor/:path*", "/admin/:path*"],
}
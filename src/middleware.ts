import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude /admin/login from protection to avoid loops
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Check for admin-auth cookie
        const adminAuth = request.cookies.get('admin-auth')

        if (!adminAuth || adminAuth.value !== 'true') {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}

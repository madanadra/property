import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('ind-property-token')

    if (token) {
        const check = await fetch(process.env.NEXT_PUBLIC_BASE_API+'/check', {
            headers: {
                'Authorization': 'Bearer '+token.value,
                'Accept' : 'application/json'
            },
            cache: 'no-cache'
        })

        if (check.ok && req.url.includes('/login')) {
            return NextResponse.redirect(new URL('/', req.url))
        } else if (!check.ok && !req.url.includes('/login')) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    } else if (!req.url.includes('/login')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/login', '/', '/tables/:path*', '/documents/:path*', '/history/:path*', '/profile/:path*'],
}
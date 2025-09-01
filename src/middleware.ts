import { type NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
    exp: number
}


export function middleware(request: NextRequest) {
    const refresh = request.cookies.get("refresh_token")?.value

    if(refresh) {
        try {
            const decoded = jwtDecode<JwtPayload>(refresh)
            const now = Math.floor(Date.now()/1000)

            if(decoded.exp < now) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
        } catch(err) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/home',]
}
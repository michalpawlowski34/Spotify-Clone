import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleWare(req) {
    // token will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl

        // prevent going to login page if token exists
        if(token && pathname == '/login'){
            return NextResponse.redirect('/')
        }

    // allow the request  if
        // -its a request for next-auth session & provider (spotify) fetching OR token exists
        if(pathname.includes('/api/auth') || token ){
            return NextResponse.next();
        }

        // else redirect to login screen
        if(!token && pathname !== '/login'){
            return NextResponse.redirect('/login')
        }

        
        
}
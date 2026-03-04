import {auth} from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";


export default async function middleware(req:NextRequest){
    const session = await auth()

    const { pathname } = req.nextUrl


    if(pathname.startsWith("/dashboard")){
        if(!session){
            return NextResponse.redirect(new URL("/login",req.url))
        }
    }

    if(pathname.startsWith("/admin")){
        if(!session || session.user.role!=="ADMIN"){
            return NextResponse.redirect(new URL("/dashboard",req.url))
        }
    }
    return NextResponse.next()
}

export const config={
    matcher:["/dashboard/:path*","/admin/:path"]
}
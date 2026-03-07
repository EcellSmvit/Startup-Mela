"use client"
import {  signOut, useSession } from "next-auth/react";

export default function Dashboard(){
     const session = useSession();
    return(
        <div className="bg-[#171716] w-screen h-screen">
            {session.status === "authenticated" && <button onClick={() => signOut()}>Logout</button>}
            <h1>Hii Welcome</h1>
        </div>
    )
}
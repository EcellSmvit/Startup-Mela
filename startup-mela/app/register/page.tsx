"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Register(){
    const session = useSession();
    return(
        <div>
            {session.status === "authenticated" && <button onClick={() => signOut}> Logout</button>}
            {session.status === "unauthenticated" && <button onClick={() => signIn}> signIn </button>}
        </div>
    )
}
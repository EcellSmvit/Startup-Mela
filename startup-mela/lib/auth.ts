import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcrypt"

declare module "next-auth" {
    interface User {
        role?: string;
    }

    interface Session {
        user: {
            id?: string;
            role?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const{handlers,auth} = NextAuth({
    providers:[
        Credentials({
            async authorize(credentials){
                const user = await prisma?.user.findUnique({
                    where:{email:credentials.email as string}
                })
                if(!user) return null

                const valid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if(!valid) return null

                return{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({session,token}){
            session.user.id = token.id as string
            session.user.role = token.role as string
            return session
        }
    }
})
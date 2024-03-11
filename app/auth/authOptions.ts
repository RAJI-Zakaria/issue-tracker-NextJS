import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth";
import { log } from "console";

const prisma = new PrismaClient()

const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    session:{
        strategy:'jwt'
    }
}


export default authOptions

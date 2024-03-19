import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client"
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";



const authOptions:NextAuthOptions = {
    secret: `${process.env.NEXTAUTH_SECRET}`,
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          }),


          CredentialsProvider({
            name: "Credentials",
            type: "credentials",
      
            credentials: {
              email: {
                label: "Email",
                type: "text",
                placeholder: "my@gmail.com",
                value: 'zakaria@is.cool'
              },
              password: { label: "Password", type: "password", value: 'dummy_Password'},
            },
      
            async authorize(credentials, req)  {
              if (!credentials?.email || !credentials?.password) return null;
              try {
                 
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                    throw new Error("User not found");
                }
                //TODO : the password must be hashed
                if (user.password !== credentials.password) {
                    throw new Error("Invalid password");
                } 
                return user
              } catch (e) {
                console.error("Error occurred during sign-in:", e);
                throw new Error("invalid credentials");
              }
            },
          })
    ],
    session:{
        strategy:'jwt'
    },

    callbacks: {
        jwt(params) { 
        if (params) {
            params.token = {...params.token, ...params.user};
        }
        // return final_token
            return params.token;
        },
        async session({ session, token }:any){
            if(!token.email)
                return false;
            session = {...session, ...token.user} 
            return session
        },
    },

}


export default authOptions

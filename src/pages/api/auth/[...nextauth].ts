import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider  from "next-auth/providers/credentials"

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: "email", type: "text"},
        password: {label: "password",type: "text"}
      },
      authorize: async (credentials, req) => {
        const user = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: Object.entries(credentials!)
              .map((e) => e.join("="))
              .join("&"),
          },
        )
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      }, 
    })
  ] ,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt"
  }
})
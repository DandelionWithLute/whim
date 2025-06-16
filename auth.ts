import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./util/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        // 1. default validation check
        if (!credentials.email || !credentials.password) return null;

        user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const isPswCorrect = bcrypt.compareSync(String(credentials.password), user.hashedPassword);
        console.log("isPswCorrect", isPswCorrect, credentials.password, user.hashedPassword);

        if (!isPswCorrect) return null;
        else return { email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages:{
    signIn:"/login",
  }
});

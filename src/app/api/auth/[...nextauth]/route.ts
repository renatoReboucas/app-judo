import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        return {
          id: 1,
          email: credentials.email,
          password: credentials.password,
          name: "Teste",
        };
        // const user = await prisma.user.findFirst({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // if (user && user.password === credentials.password) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

// export default NextAuth(nextAuthOptions);
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };

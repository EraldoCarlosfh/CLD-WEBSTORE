import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };

// import NextAuth, { AuthOptions, } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prismaClient } from "@/lib/prisma";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prismaClient),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// });
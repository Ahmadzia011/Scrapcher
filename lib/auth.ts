import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import SupaBase from "./supaBase";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const supabase = SupaBase();

        if (!credentials?.email || !credentials?.password) return null;

        // 1. Find user in Database
        const { data: userData } = await supabase.from("users").select('*').eq('email', credentials?.email).limit(1)
        const user = userData?.[0]
        // 2. Check if user exists and password matches
        // Security Note: Use bcrypt.compare(credentials.password, user.password) here later
        if (user && user?.password === credentials.password) {
          return {
            id: user?.id,
            email: user?.email,
            name: user?.name,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.sub = String(user.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id || token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
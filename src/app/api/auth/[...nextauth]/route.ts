import NextAuth from "next-auth";
import { AuthOptions } from "@/src/lib/auth";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };

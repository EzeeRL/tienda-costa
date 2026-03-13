import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
    callbacks: {
    async signIn({ user, account, profile }) {
      console.log("=== SIGN IN ===");
      console.log("user:", user);
      console.log("account:", account);
      console.log("profile:", profile);
      return true;
    },
    async session({ session, token }) {
      console.log("=== SESSION ===");
      console.log("session:", session);
      console.log("token:", token);
      return session;
    },}
});

export { handler as GET, handler as POST };
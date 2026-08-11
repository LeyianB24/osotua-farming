import NextAuth from "next-auth"

export const { auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { role?: string; id?: string }
        token.role = u.role
        token.id = u.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        const su = session.user as { role?: string; id?: string }
        su.id = token.id as string
        su.role = token.role as string
      }
      return session
    },
  },
})

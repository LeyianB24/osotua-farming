import { DefaultSession, DefaultUser } from "next-auth"
import { UserRole } from "@/types"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: UserRole | string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id?: string
    role?: UserRole | string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: UserRole | string
  }
}

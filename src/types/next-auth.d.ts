import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      email: string
      created_at: string
    }
  }
}

declare module "next-auth/user" {
  interface User {
      id: string
      email: string
      name?: string
      created_at: string
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     user: {
//       id: string;
//       email: string;
//       name?: string;
//       created_at: string;
//     };
//   }
// }
import NavBar from "@/components/NavBar"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/config/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile",
  description: "Account Settings",
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.id) {
    return redirect("/login")
  }
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

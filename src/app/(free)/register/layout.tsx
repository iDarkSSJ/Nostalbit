import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup page",
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="flex grow">{children}</div>
}

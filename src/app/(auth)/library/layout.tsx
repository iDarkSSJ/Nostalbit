import SideBar from "@/components/SideBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Library",
  description: "Library page",
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex grow">
      <SideBar />
      {children}
    </div>
  )
}

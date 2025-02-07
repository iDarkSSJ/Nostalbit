import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Keybinds",
  description: "Keybinds page",
}

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

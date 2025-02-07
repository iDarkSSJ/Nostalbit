import { authOptions } from "@/config/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function NavBar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="bg-[#252525] text-gray-200 p-4 border-b-4 shadow-[inset_0px_-20px_0px_-15px_#555555] top-0 sticky w-full z-40">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-bold pixel-art text-[#00b800] text-shadow-none">
            Nostalbit
          </Link>
          <div className="flex">
            {session && (
              <Link
                href="/library"
                className="p-3 text-xs text-gray-300 hover:text-zinc-400 transition-colors">
                Library
              </Link>
            )}
            <Link
              href="/keybinds"
              className="p-3 text-xs text-gray-300 hover:text-zinc-400 transition-colors">
              Keybinds
            </Link>
          </div>
        </div>
        <div className="space-x-4 flex items-center">
          <Link
            href={session ? "/add" : "/register"}
            className="p-3 text-xs text-gray-300 hover:text-zinc-400 transition-colors">
            {session ? "Add" : "Register"}
          </Link>
          <Link
            href={session ? "/profile" : "/login"}
            className="p-3 text-base text-gray-300 bg-zinc-600 rounded-none hover:bg-zinc-400 hover:text-zinc-800 border-4 transition-colors">
            {session ? "Profile" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  )
}

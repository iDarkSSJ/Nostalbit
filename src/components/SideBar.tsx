"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import { CONSOLES } from "@/types/types"

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false)

  const consoleList = CONSOLES.map((con, i) => (
    <li key={i}>
      <Link
        href={`/library/${con.path}`}
        className={`block w-full text-left text-xs text-gray-300 hover:text-green-500 hover:bg-gray-700 p-3 transition-colors ${
          collapsed ? "hidden" : ""
        }`}>
        {con.label}
      </Link>
    </li>
  ))

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } bg-gradient-to-l from-[#232323] to-[#343434] border-r-4 flex flex-col transition-all duration-150`}>
      <div className="flex items-center justify-between p-4 border-b-4 bg-[#535353]">
        {!collapsed && <h2 className="text-xl text-gray-200">Consoles</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white hover:bg-transparent focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? "→" : "←"}
        </Button>
      </div>
      <div
        className={`p-4 grow shadow-[inset_-20px_20px_0px_-15px_#535353] ${
          collapsed ? "overflow-hidden" : ""
        }`}>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/library"
                className={`block w-full text-left text-xs text-gray-300 hover:text-green-500 hover:bg-gray-700 p-3 rounded transition-colors ${
                  collapsed ? "hidden" : ""
                }`}>
                All
              </Link>
            </li>
            {consoleList}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

"use client"

import { useAutoSave } from "@/hooks/useAutoSave"
import { Cloud, Writing } from "../Icons"
import type { Game } from "@/types/types"
import { DeleteGameDialog } from "./DeleteGameDialog"
import { useGameStore } from "@/stores/gameStore"
import Link from "next/link"

type Props = {
  title: string
  game: Game
}

export default function GameHeader({ title, game }: Props) {
  const { isPlaying } = useGameStore()
  const { nextSaveTime, isSaving } = useAutoSave(game)

  function formatCountdown(seconds: number) {
    if (seconds < 60) return `Autosave: ${seconds}s`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `Autosave: ${minutes}m ${seconds % 60}s`
  }

  return (
    <div className="p-4 flex items-center justify-between border-b-4 bg-[#535353] gap-12">
      <div className="flex items-center gap-4 overflow-hidden">
        <h1 className="truncate max-w-[200px] md:max-w-[300px] 2xl:md:max-w-[500px] text-xl text-white">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-white">
          {formatCountdown(nextSaveTime)}
        </span>
        <span>{isSaving.current ? <Writing /> : <Cloud />}</span>
        {!isPlaying && (
          <>
            <span>
              <DeleteGameDialog game_id={game.game_id} />
            </span>
            <Link href={`/edit/${game.game_id}`} className="bg-red-500 text-white hover:bg-red-400 p-1 px-2 rounded-md">
              <Writing />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

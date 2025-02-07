"use client"
import { Nostalgist } from "nostalgist"
import { useGameStore } from "@/stores/gameStore"
import { Button } from "../ui/button"
import { useEffect, useRef } from "react"
import { Game, StateType } from "@/types/types"
import { unZipFile } from "@/lib/utils"
import { getAutoSave } from "@/actions/AutoSaveActions"

type Props = {
  game: Game
}

export default function GameInstance({ game }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { isPaused, isPlaying, setIsPlaying, setGameInstance } = useGameStore()

  useEffect(() => {
    const loadGame = async () => {
      const canvas = canvasRef.current
      try {
        let blob
        const autoState: StateType = await getAutoSave({
          game_id: game.game_id,
          user_id: game.user_id,
        })
        if (autoState) {
          const response = await fetch(autoState.state_url as string)
          blob = await response.blob()
        }
        const romData = await unZipFile(game.game_rom_url)
        const gameProvider = await Nostalgist.launch({
          element: canvas as HTMLCanvasElement,
          rom: romData,
          core: game.game_core,
          state: blob ? blob : undefined,
        })
        setGameInstance(gameProvider)
      } catch (err) {
        console.error("Error during game loading: ", err)
        setIsPlaying(false)
      }
    }

    if (isPlaying) {
      loadGame()
    }
  }, [
    isPlaying,
    game.game_core,
    game.game_rom_url,
    game.game_id,
    setGameInstance,
    setIsPlaying,
    game.user_id,
  ])

  return (
    <div className="relative aspect-video bg-black ">
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="text-2xl font-bold text-white">GAME PAUSED</div>
        </div>
      )}
      {!isPlaying && (
        <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10">
          <Button
            onClick={() => setIsPlaying(true)}
            variant="ghost"
            className="rounded-none bg-sky-600 border-sky-200 border-4 p-6 text-lg hover:bg-sky-800 hover:text-zinc-300">
            Play
          </Button>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {isPlaying && <canvas ref={canvasRef} className="h-full z-30" />}
      </div>
    </div>
  )
}

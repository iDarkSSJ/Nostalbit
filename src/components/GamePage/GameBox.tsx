"use client"
import GameHeader from "./GameHeader"
import GameFooter from "./GameFooter"
import { Game } from "@/types/types"
import GameInstance from "./GameInstance"
import { useEffect } from "react"
import { useGameStore } from "@/stores/gameStore"

type Props = {
  game: Game
}

export default function GameBox({ game }: Props) {
  const { isPaused, setIsPaused, gameInstance } = useGameStore()

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (gameInstance && !isPaused) {
        gameInstance.pause()
        setIsPaused(true)
        event.preventDefault()
      }
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => {
      window.removeEventListener("beforeunload", handleUnload)
      if (gameInstance) {
        window.location.reload()
      }
    }
  }, [gameInstance])

  return (
    <div className="bg-gradient-to-l from-[#232323] to-[#343434] border-4 flex flex-col xl:max-w-[800px] 2xl:min-w-[1100px]">
      <GameHeader title={game.game_name} game={game} />

      <GameInstance game={game} />

      <GameFooter />
    </div>
  )
}

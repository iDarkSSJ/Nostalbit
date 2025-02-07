"use client"
import { Button } from "../ui/button"
import { useGameStore } from "@/stores/gameStore"
import SaveButton from "./gameButtons/SaveButton"
import LoadButton from "./gameButtons/LoadButton"
import ResetButton from "./gameButtons/ResetButton"
import PhotoButton from "./gameButtons/PhotoButton"

export default function GameFooter() {
  const { isPaused, isPlaying, setIsPaused, gameInstance } = useGameStore()

  const handlePauseResume = () => {
    if (isPaused) {
      gameInstance?.resume()
    } else {
      gameInstance?.pause()
    }
    setIsPaused(!isPaused)
  }

  return (
    isPlaying && (
      <div className="grid md:grid-cols-2 gap-4 p-2 items-center border-t-4">
        <div className="flex justify-center md:justify-start">
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePauseResume}
            className="rounded-none bg-sky-600 border-sky-200 border-4 m-0 p-6 text-lg hover:bg-sky-800 w-auto hover:text-zinc-300">
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <SaveButton />
          <LoadButton />
          <ResetButton />
          <PhotoButton />
        </div>
      </div>
    )
  )
}

import { Load } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/stores/gameStore"
import React from "react"

export default function LoadButton() {
  const { isPaused, gameInstance, setIsPaused, setStateModal } = useGameStore()

  const handleLoad = () => {
    if (gameInstance) {
      if (!isPaused) {
        gameInstance.pause()
        setIsPaused(true)
      }
      setStateModal({ isOpen: true, action: "LOAD" })
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLoad}
      className="rounded-none text-white-300 bg-sky-600 border-sky-200 border-4 hover:bg-gray-700 hover:text-green-500">
      <Load />
      Load
    </Button>
  )
}

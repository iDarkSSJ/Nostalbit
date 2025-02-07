import { Save } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/stores/gameStore"
import React from "react"

export default function SaveButton() {
  const { isPaused, gameInstance, setIsPaused, setStateModal } = useGameStore()

  const handleSave = () => {
    if (gameInstance) {
      if (!isPaused) {
        gameInstance.pause()
        setIsPaused(true)
      }
      setStateModal({ isOpen: true, action: "SAVE" })
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSave}
      className="rounded-none text-white-300 bg-sky-600 border-sky-200 border-4 hover:bg-gray-700 hover:text-green-500">
      <Save />
      Save
    </Button>
  )
}

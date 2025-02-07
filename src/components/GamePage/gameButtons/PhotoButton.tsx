import { Camera } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/stores/gameStore"
import React from "react"

export default function PhotoButton() {
  const { isPaused, gameInstance, setIsPaused } = useGameStore()

  const handlePhoto = async () => {
    if (gameInstance) {
      if (!isPaused) {
        gameInstance.pause()
        setIsPaused(true)
      }
      const blob = await gameInstance.screenshot()

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${crypto.randomUUID()}.jpg`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handlePhoto}
      className="rounded-none text-white-300 bg-sky-600 border-sky-200 border-4 hover:bg-gray-700 hover:text-green-500">
      <Camera />
      Photo
    </Button>
  )
}

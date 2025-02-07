import { Stop } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/stores/gameStore"

export default function ResetButton() {
  const { gameInstance } = useGameStore()

  const handleReset = () => {
    if (gameInstance) {
      gameInstance.restart()
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleReset}
      className="rounded-none text-white-300 bg-sky-600 border-sky-200 border-4 hover:bg-gray-700 hover:text-green-500">
      <Stop /> Reset
    </Button>
  )
}

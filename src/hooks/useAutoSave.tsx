"use client"
import { postState } from "@/actions/postState"
import { useGameStore } from "@/stores/gameStore"
import { Game } from "@/types/types"
import { useCallback, useEffect, useRef, useState } from "react"

export const useAutoSave = (game: Game) => {
  const { gameInstance, isPlaying, isPaused } = useGameStore()
  const [nextSaveTime, setNextSaveTime] = useState(180)
  const isSaving = useRef(false)

  const autosave = useCallback(async () => {
    if (isSaving.current) return
    isSaving.current = true
    if (gameInstance) {
      try {
        if (game.game_id) {
          const { state } = await gameInstance.saveState()
          postState({
            game_id: game.game_id,
            slot_number: 0,
            state,
            user_id: game.user_id,
          })
        }
      } catch (error) {
        console.error("Error autosaving state: ", error)
      } finally {
        isSaving.current = false
      }
    }
  }, [game.game_id, game.user_id, gameInstance])

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | undefined
    if (gameInstance && isPlaying && !isPaused) {
      timerId = setInterval(() => {
        setNextSaveTime((prevTime) => {
          if (prevTime <= 0) {
            autosave()
            return 180
          }
          return prevTime - 1
        })
      }, 1000)
    } else {
      if (timerId) {
        clearInterval(timerId)
      }
    }
    return () => {
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [isPlaying, isPaused, gameInstance, autosave])

  return {
    nextSaveTime,
    isSaving
  }
}

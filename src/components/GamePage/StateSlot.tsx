"use client"
import { postState } from "@/actions/postState"
import { formatDate } from "@/lib/FormatDate"
import { getThumbFromCache, saveThumbToCache } from "@/lib/utils"
import { useGameStore } from "@/stores/gameStore"
import { StateActionType, StateType } from "@/types/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type StateSlotProps = {
  slot_number: number
  state: StateType | undefined
  user_id: string
  game_id: string
}

export function StateSlot({
  slot_number,
  user_id,
  state,
  game_id,
}: StateSlotProps) {
  const [stateImage, setStateImage] = useState<string>("")
  const { gameInstance, stateModal, setStateModal } = useGameStore()

  useEffect(() => {
    const getThumb = async () => {
      const blob = await getThumbFromCache(
        state?.game_id as string,
        slot_number
      )
      if (blob) {
        const url = URL.createObjectURL(blob)
        setStateImage(url)
        return
      }
    }
    getThumb()
  }, [state?.game_id, slot_number])

  const handleOnClick = async () => {
    if (gameInstance) {
      if (stateModal.action === StateActionType.LOAD && state) {
        const response = await fetch(state.state_url)
        const blob = await response.blob()
        await gameInstance.loadState(blob)
        setStateModal({ isOpen: false })
      } else if (stateModal.action === StateActionType.SAVE) {
        const { state: stateBlob, thumbnail } = await gameInstance.saveState()
        const newState = await postState({
          game_id: game_id,
          user_id,
          slot_number,
          state: stateBlob,
        })
        await saveThumbToCache(game_id, slot_number, thumbnail)

        if (newState) setStateModal({ isOpen: false })
      }
    }
  }

  return (
    <button
      onClick={handleOnClick}
      className="group flex flex-col bg-zinc-500 hover:bg-zinc-400 transition-colors overflow-hidden">
      <div
        className={`relative w-full h-0 pb-[56.25%] overflow-hidden ${
          !stateImage && "grayscale"
        }`}>
        <Image
          src={
            stateImage
              ? stateImage
              : "https://res.cloudinary.com/drlxsagkx/image/upload/v1724365507/ecypqoosds6ojy1oymol.png"
          }
          alt={`Slot ${slot_number}`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="p-2 text-start">
        <span className="block font-bold text-white">{slot_number}</span>
        <span className="block text-xs text-zinc-300">
          {state ? formatDate(state?.saved_at) : "Empty"}
        </span>
      </div>
    </button>
  )
}

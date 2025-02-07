import { StateActionType, StateType } from "@/types/types"
import { Nostalgist } from "nostalgist"
import { create } from "zustand"

interface GameStore {
  gameInstance: Nostalgist | undefined
  isPlaying: boolean
  isPaused: boolean
  states: StateType[]
  stateModal: { isOpen: boolean, action: "SAVE" | "LOAD" },
  setGameInstance: (gameInstance: Nostalgist) => void
  setIsPlaying: (isPlaying: boolean) => void
  setIsPaused: (isPaused: boolean) => void
  setStateModal: (partialState: { isOpen?: boolean, action?: "SAVE" | "LOAD" }) => void
  setStates: (states: StateType[]) => void
}

export const useGameStore = create<GameStore>((set) => ({
  gameInstance: undefined,
  isPlaying: false,
  isPaused: false,
  states: [],
  stateModal: { isOpen: false, action: StateActionType.SAVE },
  setGameInstance: (gameInstance) => set({gameInstance}),
  setIsPlaying: (isPlaying) => set({isPlaying}),
  setIsPaused: (isPaused) => set({isPaused}),
  setStateModal: (partialState) =>
  set((state) => ({
      stateModal: { ...state.stateModal, ...partialState },
    })),
  setStates: (states) => set({states}),
}))
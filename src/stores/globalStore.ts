import { create } from "zustand"

interface GlobalState {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void
}

export const useGlobalStore = create<GlobalState>(set => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({isLoading}) 
}))

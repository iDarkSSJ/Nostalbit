import { create } from "zustand"

export interface GameState {
  title: string
  cover: File | undefined
  setTitle: (title: string) => void
  setCover: (cover: File | undefined) => void
}

export const useNewRomStore = create<GameState>((set) => ({
  title: "Title",
  cover: undefined,
  setTitle: (title) => set({title}),
  setCover: (cover) => set({cover}),
}))
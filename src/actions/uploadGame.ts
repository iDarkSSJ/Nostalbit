"use server"

import { getAdminSupabase } from "@/lib/supabase"
import { ConsoleType } from "@/types/types"

export const submitGameDb = async (GameValues: {
  game_name: string
    game_core: "fceumm" | "snes9x" | "mgba" | "genesis_plus_gx"
    game_console: ConsoleType
    game_rom_url: string
    game_rom_public_id: string
    game_cover_url: string
    game_cover_public_id: string
}) => {

  const adminSupabase = getAdminSupabase()
  const { data } = await adminSupabase.from("games").insert(GameValues).select()

  if (!data) {
    return { success: false }
  }

  return { success: true }

} 

export const submitEditGameDb = async (GameValues: {
  game_name: string
  game_id: string
    game_cover_url?: string
    game_cover_public_id?: string
}) => {
  const { game_id , game_name , game_cover_public_id , game_cover_url } = GameValues
  const adminSupabase = getAdminSupabase()

  const { data } = await adminSupabase.from("games").update({
    game_name,
    game_cover_public_id,
    game_cover_url
  }).eq("game_id", game_id).select().single()

  if (!data) {
    return { success: false }
  }

  return { success: true }

} 
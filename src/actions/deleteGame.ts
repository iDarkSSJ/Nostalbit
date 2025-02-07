"use server"

import { getAdminSupabase } from "@/lib/supabase"
import type { Game, StateType } from "@/types/types"
import { deleteImageFromCloud, deleteRawFromCloud } from "./cloudinaryUtils"

export async function deleteGameDb(game_id: string) {
  try {
    const adminSupabase = getAdminSupabase()
    const { data: game } = (await adminSupabase.from("games").select().eq("game_id", game_id).single()) as { data: Game }
    const { data: states } = (await adminSupabase.from("states").select().eq("game_id", game_id)) as { data: StateType[] }

    await Promise.all(states.map((s) => deleteRawFromCloud(s.state_public_id)))
    const { count: deletedStatesCount } = await adminSupabase.from("states").delete().eq("game_id", game_id)
    if (deletedStatesCount === 0) return { success: false }

    await deleteImageFromCloud(game.game_cover_public_id)
    await deleteRawFromCloud(game.game_rom_public_id)

    const { count } = await adminSupabase.from("games").delete().eq("game_id", game_id)

    if (count === 0) return { success: false }
    return { success: true }
  } catch (error) {
    console.error("Error in deleteGameDb:", error)
    return { success: false, error: "Error deleting game." }
  }
}


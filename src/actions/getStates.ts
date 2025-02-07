"use server"
import { getAdminSupabase } from "@/lib/supabase"
import { StateType } from "@/types/types"

interface Props {
  game_id: string
  user_id: string
}

export const getStates = async ({game_id, user_id}: Props): Promise<StateType[]> => {
  const adminSupabase = getAdminSupabase()
  const { data, error } = await adminSupabase.from('states')
  .select('*, games(user_id)')
  .eq('game_id', game_id)
  .eq('games.user_id', user_id)
  .order('slot_number', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}
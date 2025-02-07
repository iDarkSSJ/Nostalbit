"use server"
import { getAdminSupabase } from "@/lib/supabase"
import { StateType } from "@/types/types"
import { PostgrestError } from "@supabase/supabase-js"

interface Props { game_id: string, user_id: string }
const supabase = getAdminSupabase()

export async function getAutoSave({ game_id, user_id }:Props) {
  const { data: state } = await supabase
    .from('states')
    .select('*, games(user_id)')
    .eq('game_id', game_id)
    .eq('slot_number', 0)
    .eq('games.user_id', user_id)
    .single() as { data: StateType, error: PostgrestError | null }


  return state
}
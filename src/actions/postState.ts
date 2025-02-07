"use server"
import { getAdminSupabase } from "@/lib/supabase"
import { StateType } from "@/types/types"
import { deleteRawFromCloud, uploadStateToCloud } from "./cloudinaryUtils"

type Props = {
  game_id: string
  user_id: string
  slot_number: number
  state: Blob
}

export const postState = async ({ game_id, slot_number, state }: Props): Promise<StateType[]> => {
  const adminSupabase = getAdminSupabase()
  const stateRaw = new File([state], "state.bin")

  const { data: stateExists } = await adminSupabase
    .from("states")
    .select("*")
    .eq("game_id", game_id)
    .eq("slot_number", slot_number)
    .single()

  const newStateRes = await uploadStateToCloud(stateRaw)

  const partialNewState: Omit<StateType, "saved_at" | "state_id"> = {
    slot_number,
    game_id,
    state_public_id: newStateRes.public_id,
    state_url: newStateRes.secure_url,
  }

  if (stateExists) {
    await deleteRawFromCloud(stateExists.state_public_id)
    const { data: updatedState, error: updateError } = await adminSupabase
      .from("states")
      .update({
        saved_at: new Date().toISOString(),
        ...partialNewState,
      })
      .eq("game_id", game_id)
      .eq("state_id", stateExists.state_id)
      .select()
      .single()

    if (updateError) {
      throw new Error(`Error updating state: ${updateError.message}`)
    }

    return [updatedState] as StateType[]
  } else {
    const { data: insertedState, error: insertError } = await adminSupabase
      .from("states")
      .insert({
        ...partialNewState,
      })
      .select()
      .single()

    if (insertError) {
      throw new Error(`Error inserting new state: ${insertError.message}`)
    }

    return insertedState as StateType[]
  }
}

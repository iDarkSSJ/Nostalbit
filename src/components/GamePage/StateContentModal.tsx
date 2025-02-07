import { getAdminSupabase } from "@/lib/supabase"
import { StateSlot } from "./StateSlot"
import { Game } from "@/types/types"
// import { getStates } from "@/actions/getStates"
// import { useEffect } from "react"
// import { useGameStore } from "@/stores/gameStore"

type Props = {
  game: Game
}

export default async function StateContentModal({ game }: Props) {
  const adminSupabase = getAdminSupabase()
  const { data } = await adminSupabase
    .from("states")
    .select("*, games(user_id)")
    .eq("game_id", game.game_id)
    .eq("games.user_id", game.user_id)
    .order("slot_number", { ascending: true })

  // useEffect(() => {
  //   const fetchStates = async () => {
  //     const states = await getStates({
  //       game_id: game.game_id,
  //       user_id: game.user_id,
  //     })
  //     setStates(states)
  //   }
  //   fetchStates()
  // }, [game.game_id, game.user_id, setStates])

  const totalSlots = Array.from({ length: 6 }, (_, index) => index + 1)

  const slots = totalSlots.map((slotN) => {
    const state = data?.find((s) => s.slot_number === slotN)
    return (
      <StateSlot
        key={state ? state?.state_id : `empty${slotN}`}
        slot_number={slotN}
        state={state}
        user_id={game.user_id}
        game_id={game.game_id}
      />
    )
  })

  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{slots}</div>
    </div>
  )
}

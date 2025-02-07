import GameBox from "@/components/GamePage/GameBox"
import StateContentModal from "@/components/GamePage/StateContentModal"
import StateModal from "@/components/GamePage/StateModal"
import { authOptions } from "@/config/auth"
import { getAdminSupabase } from "@/lib/supabase"
import { Game } from "@/types/types"
import { PostgrestError } from "@supabase/supabase-js"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function RomPage({ params }: Props) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const session = await getServerSession(authOptions)
  const supabaseAdmin = getAdminSupabase()

  const { data: game, error } = (await supabaseAdmin
    .from("games")
    .select()
    .eq("game_id", id)
    .eq("user_id", session?.user.id)
    .single()) as { data: Game; error: PostgrestError | null }
  if (error) return redirect("/library")

  return (
    <main className="relative flex justify-center bg-pixel-bg bg-fixed h-full w-full flex-grow">
      <section className="mt-8">
        <GameBox game={game} />
      </section>
      <StateModal>
        <StateContentModal game={game} />
      </StateModal>
    </main>
  )
}

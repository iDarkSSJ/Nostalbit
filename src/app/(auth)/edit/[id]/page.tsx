import DynamicCover from "@/components/add/DynamicCover"
import EditForm from "@/components/add/EditForm"
import { authOptions } from "@/config/auth"
import { getAdminSupabase } from "@/lib/supabase"
import { Game } from "@/types/types"
import { PostgrestError } from "@supabase/supabase-js"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPage({ params }: Props) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const session = await getServerSession(authOptions)
  const adminSupabase = getAdminSupabase()

  const { data: game, error } = (await adminSupabase
    .from("games")
    .select()
    .eq("game_id", id)
    .eq("user_id", session?.user.id)
    .single()) as { data: Game; error: PostgrestError | null }

  if (error) return redirect("/library")

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h4>EDITING GAME</h4>
      <div className="relative w-full grid grid-cols-2 p-6 md:p-12 items-center md:gap-12">
        <div className="w-full max-w-md p-8 space-y-4 bg-zinc-800 shadow-xl shadow-black border-4 m-auto">
          <EditForm game={game} />
        </div>

        <div className="transition-all delay-[350ms] duration-[400ms] w-full md:w-2/3 mx-auto">
          <DynamicCover title={game.game_name} cover={game.game_cover_url} />
        </div>
      </div>
    </main>
  )
}

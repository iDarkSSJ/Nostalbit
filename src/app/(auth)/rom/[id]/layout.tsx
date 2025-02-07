import { getAdminSupabase } from "@/lib/supabase"
import { Game } from "@/types/types"
import { PostgrestError } from "@supabase/supabase-js"
import { Metadata } from "next"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id
  const supabaseAdmin = getAdminSupabase()
  const { data: game, error } = (await supabaseAdmin
    .from("games")
    .select("game_name")
    .eq("game_id", id)
    .single()) as { data: Game; error: PostgrestError | null }

  if (error) return redirect("/library")

  return {
    title: `${game.game_name}`,
  }
}

export default async function RoomPageLayout({ children }: Props) {
  return <div className="flex flex-col flex-grow">{children}</div>
}

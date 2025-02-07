import Image from "next/image"
import { CarouselItem, CarouselOnSnap } from "./ui/carousel"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/config/auth"
import { redirect } from "next/navigation"
import { getAdminSupabase } from "@/lib/supabase"

export default async function GameList({
  filter = "all",
}: {
  filter?: string
}) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.id) {
    return redirect("/login")
  }

  const adminSupabase = getAdminSupabase()
  const { data: userGames, error } = await adminSupabase
    .from("games")
    .select()
    .eq("user_id", session.user.id)

  if (error) {
    console.error(error)
    return []
  }

  const filteredGames =
    filter === "all"
      ? userGames
      : userGames.filter((game) => game.game_console === filter)

  if (filteredGames.length === 0) return <p>Add a new Game</p>

  const gameListNode = filteredGames.map((game, index) => (
    <CarouselItem
      key={game.game_id}
      index={index}
      className={`transition-all delay-[350ms] duration-[400ms] aspect-square`}>
      <div className="relative bg-black aspect-square">
        <Image
          className="w-full h-full object-cover object-center"
          src={game.game_cover_url}
          alt="cover"
          width={800}
          height={800}
          loading="lazy"
        />
        <CarouselOnSnap index={index}>
          <div className="absolute xl:text-xl lg:text-sm bottom-0 left-0 text-start p-6 w-full bg-gradient-to-t from-black/65 to-transparent transition-opacity duration-500">
            <span className="text-pretty">{game.game_name}</span>
          </div>
        </CarouselOnSnap>
      </div>
      <CarouselOnSnap index={index}>
        <Link
          href={`/rom/${game.game_id}`}
          className="rounded-none bg-sky-600 border-sky-200 border-4 m-0 w-full p-0 text-lg hover:bg-sky-800 hover:text-white min-h-[3.5rem] flex items-center justify-center transition-colors">
          Start
        </Link>
      </CarouselOnSnap>
    </CarouselItem>
  ))

  return <>{gameListNode}</>
}

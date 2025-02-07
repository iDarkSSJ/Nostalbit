"use client"
import { useNewRomStore } from "@/stores/newRomStore"
import Image from "next/image"

export default function DynamicCover({
  title,
  cover,
}: {
  title?: string
  cover?: string
}) {
  const { title: game_name, cover: game_cover } = useNewRomStore()

  return (
    <div className="relative bg-black aspect-square">
      <Image
        className="w-full h-full object-cover object-center"
        src={
          game_cover
            ? URL.createObjectURL(game_cover)
            : cover ||
              "https://res.cloudinary.com/drlxsagkx/image/upload/v1724365507/ecypqoosds6ojy1oymol.png"
        }
        alt={game_name || "Placeholder Image"}
        width={400}
        height={400}
      />
      <div>
        <div className="absolute text-base sm:text-lg md:text-xl bottom-0 left-0 text-start p-4 md:p-6 w-full bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-500">
          <span className="text-pretty truncate block">
            {game_name ? game_name : title}
          </span>
        </div>
      </div>
    </div>
  )
}

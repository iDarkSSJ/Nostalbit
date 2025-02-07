"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { unZipFile } from "@/lib/utils"
import { Nostalgist } from "nostalgist"

const GAMES = {
  nes: {
    url: "https://res.cloudinary.com/drlxsagkx/raw/upload/v1738863067/main/avywgmywu1vjaevvdtmn",
    core: "fceumm",
  },
  gb: {
    url: "https://res.cloudinary.com/drlxsagkx/raw/upload/v1738866337/main/fv6h3l8ogcyjbnpwb6ns",
    core: "mgba",
  },
  gba: {
    url: "https://res.cloudinary.com/drlxsagkx/raw/upload/v1738867674/main/pwraacny6lddzxcridnc",
    core: "mgba",
  },
  gbc: {
    url: "https://res.cloudinary.com/drlxsagkx/raw/upload/v1738868990/main/xupxxzuppfijzamohb9h",
    core: "mgba",
  },
  snes: {
    url: "https://res.cloudinary.com/drlxsagkx/raw/upload/v1738869893/main/xhumdajgewjy3fv5lojx",
    core: "snes9x",
  },
  sega: {
    url: "https://res.cloudinary.com/drlxsagkx/raw/upload/v1738870299/main/yvzgialibbevpgrfykcv",
    core: "genesis_plus_gx",
  },
}

export default function StartGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [game, setGame] = useState<keyof typeof GAMES>("nes")
  const [gameProvider, setGameProvider] = useState<Nostalgist>()

  useEffect(() => {
    const loadGame = async () => {
      const canvas = canvasRef.current
      try {
        const romData = await unZipFile(GAMES[game].url)
        const gameProvider = await Nostalgist.launch({
          element: canvas as HTMLCanvasElement,
          rom: romData,
          core: GAMES[game].core,
        })
        setGameProvider(gameProvider)
      } catch (err) {
        console.error("Error during game loading: ", err)
        setIsPlaying(false)
      }
    }
    if (isPlaying) {
      loadGame()
    }
  }, [game, isPlaying])

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (gameProvider) {
        gameProvider.pause()
        event.preventDefault()
      }
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => {
      window.removeEventListener("beforeunload", handleUnload)
      if (gameProvider) {
        window.location.reload()
      }
    }
  }, [gameProvider])

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-6 w-full h-12 content-center text-center my-5 text-sm">
        <button
          disabled={isPlaying}
          onClick={() => setGame("nes")}
          className={`border-r-4 content-center grid bg-neutral-900 py-2 text-neutral-300 hover:text-sky-400 hover:bg-neutral-950/90 ${
            game === "nes" ? "bg-neutral-950/90" : "bg-neutral-900"
          }`}>
          Tetris NES
        </button>
        <button
          disabled={isPlaying}
          onClick={() => setGame("gb")}
          className={`border-r-4 content-center grid  py-2 text-neutral-300 hover:text-sky-400 hover:bg-neutral-950/90 ${
            game === "gb" ? "bg-neutral-950/90" : "bg-neutral-900"
          }`}>
          SUPER MARIO LAND GB
        </button>
        <button
          disabled={isPlaying}
          onClick={() => setGame("gbc")}
          className={`border-r-4 content-center grid bg-neutral-900 py-2 text-neutral-300 hover:text-sky-400 hover:bg-neutral-950/90 ${
            game === "gbc" ? "bg-neutral-950/90" : "bg-neutral-900"
          }`}>
          Shantae GBC
        </button>
        <button
          disabled={isPlaying}
          onClick={() => setGame("gba")}
          className={`border-r-4 content-center grid bg-neutral-900 py-2 text-neutral-300 hover:text-sky-400 hover:bg-neutral-950/90 ${
            game === "gba" ? "bg-neutral-950/90" : "bg-neutral-900"
          }`}>
          Zelda Minish Cap DEMO GBA
        </button>
        <button
          disabled={isPlaying}
          onClick={() => setGame("snes")}
          className={`border-r-4 content-center grid bg-neutral-900 py-2 text-neutral-300 hover:text-sky-400 hover:bg-neutral-950/90 ${
            game === "snes" ? "bg-neutral-950/90" : "bg-neutral-900"
          }`}>
          Street Fighter II SNES
        </button>

        <button
          disabled={isPlaying}
          onClick={() => setGame("sega")}
          className={`content-center grid bg-neutral-900 py-2 text-neutral-300 hover:text-sky-400 hover:bg-neutral-950/90 ${
            game === "sega" ? "bg-neutral-950/90" : "bg-neutral-900"
          }`}>
          Sonic SEGA GENESIS
        </button>
      </div>
      <div className="relative aspect-video flex items-center justify-center shadow-xl shadow-white/20 bg-zinc-900 w-full">
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Button
              onClick={() => setIsPlaying(true)}
              variant={"secondary"}
              className="rounded-none border-4 bg-blue-600 text-white p-6 hover:bg-blue-700">
              Play Yourself
            </Button>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {isPlaying && <canvas ref={canvasRef} className="h-full z-20" />}
        </div>
      </div>
    </div>
  )
}

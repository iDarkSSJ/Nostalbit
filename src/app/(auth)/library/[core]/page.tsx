import CarouselWrapper from "@/components/CarouselWrapper"
import GameList from "@/components/GameList"
import { CORES, EXTENSION_TO_CONSOLE, PATH_TO_CORE } from "@/types/types"
import { redirect } from "next/navigation"
import { Suspense } from "react"

type Props = {
  params: Promise<{ core: string }>
}

async function corePage({ params }: Props) {
  const resolvedParams = await params
  const { core } = resolvedParams
  const coreValue = PATH_TO_CORE[core as keyof typeof PATH_TO_CORE]
  const consoleValue =
    EXTENSION_TO_CONSOLE[core as keyof typeof EXTENSION_TO_CONSOLE]
  if (!CORES.includes(coreValue)) {
    redirect("/library")
  }

  return (
    <Suspense fallback={<p className="p-6 text-2xl text-center w-full">Loading...</p>}>
      <main className="p-6 w-full flex flex-col">
        <h1>Library</h1>
        <CarouselWrapper>
          <GameList filter={consoleValue} />
        </CarouselWrapper>
      </main>
    </Suspense>
  )
}

export default corePage

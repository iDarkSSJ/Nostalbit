import CarouselWrapper from "@/components/CarouselWrapper"
import GameList from "@/components/GameList"
import { Suspense } from "react"

export default function ShellsPage() {
  return (
    <main className="p-6 w-full flex flex-col">
      <Suspense fallback={<p className="text-2xl text-center">Loading...</p>}>
        <h1>Library</h1>
        <CarouselWrapper>
          <GameList />
        </CarouselWrapper>
      </Suspense>
    </main>
  )
}

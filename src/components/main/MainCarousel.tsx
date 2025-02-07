"use client"
import { useRef } from "react"
import { Carousel, CarouselContent } from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function MainCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        loop: true,
      }}
      className="max-w-full">
      <CarouselContent className="text-center flex gap-28 max-w-full text-cyan-500">
        <div className="border-4 w-44 h-44 items-center justify-center grid flex-shrink-0 ml-14">
          NES
        </div>
        <div className="border-4 w-44 h-44 items-center justify-center grid flex-shrink-0">
          GAMEBOY
        </div>
        <div className="border-4 w-44 h-44 items-center justify-center grid flex-shrink-0">
          GAMEBOY ADVANCE
        </div>
        <div className="border-4 w-44 h-44 items-center justify-center grid flex-shrink-0">
          GAMEBOY COLOR
        </div>
        <div className="border-4 w-44 h-44 items-center justify-center grid flex-shrink-0">
          SEGA GENESIS
        </div>
        <div className="border-4 w-44 h-44 items-center justify-center grid flex-shrink-0 mr-14">
          SNES
        </div>
      </CarouselContent>
    </Carousel>
  )
}

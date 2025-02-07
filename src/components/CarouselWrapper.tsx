"use client"
import { useEffect, useState } from "react"
import { Carousel, CarouselApi, CarouselContent } from "./ui/carousel"

export default function CarouselWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <div className="py-2 text-center text-sm">
        {current}/{count}
      </div>
      <section className="py-8 w-full">
        <Carousel opts={{ containScroll: false }} setApi={setApi}>
          <CarouselContent className="md:min-h-[500px]">
            {children}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}

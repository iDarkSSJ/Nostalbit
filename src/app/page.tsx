import StartGame from "@/components/landing/StartGame"
import MainCarousel from "@/components/main/MainCarousel"
import NavBar from "@/components/NavBar"
import Link from "next/link"

export default function MainPage() {
  return (
    <>
      <NavBar />
      <div className="flex grow">
        <main className="flex items-center justify-center bg-pixel-bg bg-cover bg-left-bottom bg-fixed w-full py-14">
          <div className="w-full max-w-7xl p-8 space-y-4 bg-zinc-800 shadow-xl shadow-black border-4 px-16 flex flex-col gap-24  pb-14">
            <section className="flex flex-col items-center gap-24">
              <h1 className="text-5xl text-center text-transparent bg-clip-text texto pt-12">
                Retro Web Emulator Nostalbit
              </h1>
              <h2 className="text-balance text-center max-w-xl">
                Experience the nostalgia of retro gaming directly in your
                browser.
              </h2>
              <h3 className="text-lg">Play iconic consoles like </h3>
              <MainCarousel />
            </section>
            <section className="flex flex-col items-center gap-24">
              <h4 className="block text-center m-auto text-4xl text-green-400">
                Try it Yourself
              </h4>
              <StartGame />
            </section>
            <section>
              <div className="flex flex-col items-center gap-24">
                <h5 className="text-center text-4xl text-violet-400">
                  Register or Log in
                </h5>
                <div className="flex gap-10">
                  <Link href="/login" className="bg-sky-500 p-3 px-7 border-4">
                    LOGIN
                  </Link>
                  <Link
                    href="/register"
                    className="bg-sky-500 p-3 px-7 border-4">
                    REGISTER
                  </Link>
                </div>
                <p className="text-balance text-center max-w-3xl text-xl">
                  Sign In to play your own Legal Roms, beside Save and load your
                  game states.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

import DynamicCover from "@/components/add/DynamicCover"
import RomForm from "@/components/add/RomForm"

export default function AddForm() {
  return (
    <main className="relative w-full grid md:grid-cols-2 grid-cols-1 p-6 md:p-12 items-center gap-6 md:gap-12">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-800 shadow-xl shadow-black border-4 m-a">
        <RomForm />
      </div>

      <div className="transition-all delay-[350ms] duration-[400ms] w-full md:w-2/3 mx-auto">
        <DynamicCover />
      </div>
    </main>
  )
}

import { Button } from "../ui/button"
import SingleSession from "./SingleSession"

export default function SessionList() {
  return (
    <article className="border-t-4 py-6 px-8 shadow-[inset_-20px_20px_0px_-15px_#535353] md:col-span-2">
      <h2 className="text-lg border-b-4 p-2">Sessions</h2>
      <div className="flex flex-col gap-4 p-6">
        <SingleSession />
        <SingleSession />

        <Button className="w-full bg-red-500 text-white hover:bg-red-600 tracking-tighter mt-4">
          Clear All Sessions
        </Button>
      </div>
    </article>
  )
}

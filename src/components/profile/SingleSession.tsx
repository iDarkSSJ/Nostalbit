import { Button } from "../ui/button"

export default function SingleSession() {
  return (
    <div className="flex w-full justify-between items-center border-b-2 pb-2">
      <div>
        <p className="font-medium">Current Device</p>
        <p className="text-xs">Last active: Just now</p>
      </div>
      <Button className="bg-white text-black hover:bg-gray-300 tracking-tighter">
        Revoke
      </Button>
    </div>
  )
}

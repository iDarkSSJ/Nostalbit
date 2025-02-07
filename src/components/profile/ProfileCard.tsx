import { getServerSession } from "next-auth"
import { authOptions } from "@/config/auth"
import { formatDate } from "@/lib/FormatDate"

export default async function ProfileCard() {
  const session = await getServerSession(authOptions)

  return (
    <article className="border-r-4 py-6 px-8 shadow-[inset_-20px_20px_0px_-15px_#535353]">
      <h2 className="text-lg border-b-4 p-2">Profile</h2>
      <div className="flex flex-col gap-4 p-6">
        <div className="grid gap-2">
          <p className="font-medium"> - Email</p>
          <p className="text-xs">{session?.user.email}</p>
        </div>
        <div className="grid gap-2">
          <p className="font-medium"> - Joined</p>
          <p className="text-xs">{formatDate(session?.user.created_at)}</p>
        </div>
      </div>
    </article>
  )
}

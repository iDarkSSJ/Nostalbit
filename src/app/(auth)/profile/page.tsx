import ChangePassForm from "@/components/profile/ChangePassForm"
import ProfileCard from "@/components/profile/ProfileCard"

export default function ProfilePage() {
  return (
    <main className="flex justify-center py-8 bg-pixel-bg h-full flex-grow bg-fixed">
      <div className="flex flex-col bg-[#343434] border-4 w-full max-w-4xl">
        <h1 className="bg-[#535353] p-4 pl-8 text-2xl border-b-4">Account</h1>
        <section className="grid md:grid-cols-2 h-full">
          <ProfileCard />
          <ChangePassForm />
        </section>
      </div>
    </main>
  )
}

"use client"
import InputControlled from "../InputControlled"
import { Button } from "../ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { uploadEditGame } from "@/lib/utils"
import { submitEditGameDb } from "@/actions/uploadGame"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Game } from "@/types/types"
import { useNewRomStore } from "@/stores/newRomStore"
import { useGlobalStore } from "@/stores/globalStore"

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be between 3 and 30 characters long",
    })
    .max(30, {
      message: "Title must be between 3 and 30 characters long",
    }),
  cover: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only .jpg, jpeg and .png formats are supported."
    )
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function EditForm({ game }: { game: Game }) {
  const { setIsLoading } = useGlobalStore()
  const { setCover, setTitle } = useNewRomStore()
  const { data: session } = useSession()
  const [error, setError] = useState("")
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: game.game_name,
      cover: undefined,
    },
  })

  useEffect(() => {
    setTitle("")
    setCover(undefined)
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      const { gameInfo } = await uploadEditGame({
        ...data,
        cover_public_id: game.game_cover_public_id,
        user_id: session?.user.id as string,
      })

      if (!gameInfo) {
        setIsLoading(false)
        return setError("Error editing Game Instance")
      }
      const { success } = await submitEditGameDb({
        ...gameInfo,
        game_id: game.game_id,
      })

      if (!success) {
        setIsLoading(false)
        return setError("Error editing Game Instance")
      }
      setIsLoading(false)
      return router.push("/library")
    } catch (error) {
      setIsLoading(false)
      console.error("Signup error:", error)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputControlled
          form={form}
          className="bg-transparent border-gray-400"
          name="title"
          placeholder="Enter text here">
          Title
        </InputControlled>

        <InputControlled
          form={form}
          type="file"
          id="cover"
          name="cover"
          accept="image/*"
          className="bg-zinc-900 file:text-white">
          Cover Image
        </InputControlled>
        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          className="rounded-none bg-sky-600 border-sky-200 border-4 m-0 w-full p-0 text-lg hover:bg-sky-800 hover:text-white min-h-[3.5rem] flex items-center justify-center transition-colors">
          Submit
        </Button>
      </form>
    </Form>
  )
}

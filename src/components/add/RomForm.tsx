"use client"
import InputControlled from "../InputControlled"
import { Button } from "../ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { uploadNewGame } from "@/lib/utils"
import { submitGameDb } from "@/actions/uploadGame"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ACCEPTED_ROM_EXTENSIONS } from "@/types/types"
import { useGlobalStore } from "@/stores/globalStore"
import { useNewRomStore } from "@/stores/newRomStore"

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
    ),
  rom: z
    .instanceof(File)
    .refine((file) => file.size <= 20000000, `FILE SIZE DOES NOT SUPPORTED.`)
    .refine((file) => {
      const extension = file.name
        .split(".")
        .pop() as (typeof ACCEPTED_ROM_EXTENSIONS)[number]
      return ACCEPTED_ROM_EXTENSIONS.includes(extension)
    }, "Invalid file extension."),
})

type FormValues = z.infer<typeof formSchema>

export default function RomForm() {
  const { setCover } = useNewRomStore()
  const { setIsLoading } = useGlobalStore()
  const { data: session } = useSession()
  const [error, setError] = useState("")
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      cover: undefined,
      rom: undefined,
    },
  })

  useEffect(() => {
    setCover(undefined)
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      const { gameInfo } = await uploadNewGame({
        ...data,
        user_id: session?.user.id as string,
      })

      if (!gameInfo) {
        setIsLoading(false)
        return setError("Error creating Game Instance")
      }
      const { success } = await submitGameDb(gameInfo)

      if (!success) {
        setIsLoading(false)
        return setError("Error creating Game Instance")
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

        <InputControlled
          form={form}
          type="file"
          id="rom"
          name="rom"
          accept=".nes,.snes,.gb,.gba,.gbc,.sfc,.smc,.bin,.md,.gen,smd"
          className="bg-zinc-900 file:text-white">
          Rom File
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

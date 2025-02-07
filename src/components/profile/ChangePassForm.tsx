"use client"
import InputControlled from "@/components/InputControlled"
import { Form, FormLabel } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { signOut, useSession } from "next-auth/react"
import { changePassword } from "@/actions/changePassword"
import { useState } from "react"

const loginSchema = z.object({
  current_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  new_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirm_password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function ChangePassForm() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const { data: session } = useSession()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    if (session) {
      setError("")
      setSuccess(false)
      const { error } = await changePassword({
        ...values,
        user_id: session.user.id,
      })

      if (error) return setError(error)

      setSuccess(true)
      form.reset()
    }
  }

  return (
    <article className="py-6 px-8 shadow-[inset_-20px_20px_0px_-15px_#535353]">
      <h2 className="text-lg border-b-4 p-2">Security</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <InputControlled
            form={form}
            className="bg-transparent border-gray-400"
            name="current_password">
            <FormLabel>Current Password</FormLabel>
          </InputControlled>
          <InputControlled
            className="bg-transparent border-gray-400"
            form={form}
            name="new_password"
            type="password">
            <FormLabel>New Password</FormLabel>
          </InputControlled>
          <InputControlled
            className="bg-transparent border-gray-400"
            form={form}
            name="confirm_password"
            type="password">
            <FormLabel>Confirm Password</FormLabel>
          </InputControlled>
          <span className="text-red-500">{error}</span>
          {success && (
            <span className="text-cyan-500">Password changed Successfully</span>
          )}
          <Button
            type="submit"
            className="w-full bg-neutral-500 text-white hover:bg-neutral-700 rounded-none border-4">
            Update Password
          </Button>
        </form>
      </Form>
      <Button
        onClick={() => signOut()}
        className="w-full bg-red-600 text-white hover:bg-red-800 border-4 rounded-none py-5">
        SIGN OUT
      </Button>
    </article>
  )
}

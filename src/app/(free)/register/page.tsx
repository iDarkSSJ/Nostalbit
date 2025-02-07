"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormLabel } from "@/components/ui/form"
import InputControlled from "@/components/InputControlled"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/actions/auth"
import { signIn, useSession } from "next-auth/react"
import { useGlobalStore } from "@/stores/globalStore"

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const { setIsLoading } = useGlobalStore()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) router.replace("/library")
  }, [router, session])

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function handleSubmit(values: SignupFormValues) {
    try {
      setError("")
      setIsLoading(true)
      const signupResponse = await register(values)
      if (signupResponse?.error) {
        setIsLoading(false)
        setError(signupResponse.error)
      } else {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        })
        if (result?.error) {
          setIsLoading(false)
          setError(result.error)
        } else {
          setIsLoading(false)
          router.push("/dashboard")
        }
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Signup error:", error)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <main className="flex items-center justify-center bg-pixel-bg bg-cover bg-left-bottom bg-fixed w-full">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-800 shadow-xl shadow-black border-4">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6">
            <InputControlled
              form={form}
              className="bg-transparent border-gray-400"
              name="email"
              placeholder="user@example.com">
              <FormLabel>Email</FormLabel>
            </InputControlled>
            <InputControlled
              className="bg-transparent border-gray-400"
              form={form}
              name="password"
              placeholder="password"
              type="password">
              <FormLabel>Password</FormLabel>
            </InputControlled>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-neutral-500 text-white hover:bg-neutral-700 rounded-none border-4">
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 crtTextShadowBlue" href={"/login"}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

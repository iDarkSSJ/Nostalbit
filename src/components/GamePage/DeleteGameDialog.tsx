"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "../Icons"
import { deleteGameDb } from "@/actions/deleteGame"
import { useRouter } from "next/navigation"
import { useGlobalStore } from "@/stores/globalStore"

export function DeleteGameDialog({ game_id }: { game_id: string }) {
  const { setIsLoading } = useGlobalStore()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    try {
      setIsLoading(true)
      const { success } = await deleteGameDb(game_id)
      if (success) {
        setIsLoading(false)
        router.replace("/library")
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Signup error:", error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="text-7xl bg-red-500 text-white hover:bg-red-400">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#252525] text-white border-4 rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are You absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-pretty">
            This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-700 text-white/90 hover:text-white hover:bg-gray-600 rounded-none border-4 py-5">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleContinue}
            className="bg-red-600 text-white hover:bg-red-500 rounded-none border-4 py-5">
            CONTINUE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

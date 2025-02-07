"use server"

import { getAdminSupabase } from "@/lib/supabase"
import { UserType } from "@/types/types"
import bcrypt from "bcryptjs"

interface Props { user_id: string, new_password: string, current_password: string, confirm_password: string }

const supabase = getAdminSupabase()


export async function changePassword({user_id, current_password, new_password, confirm_password}: Props) {

  try {
    if (new_password !== confirm_password) return { error: "The new password and confirm must be equals." }

  const { data } = await supabase.from("users").select().eq("id", user_id).single() as { data: UserType }


  const isEqual = await bcrypt.compare(current_password, data.password)

  if (!isEqual) return { error: "Invalid Password" }
  const hashedPassword = await bcrypt.hash(new_password, 10)

  const { error } = await supabase.from("users").update({
    password: hashedPassword
  }).eq("id", user_id).select()


  if (error) return { error: "Error updating password" }

  return { success: true }
  } catch (err) {
    console.error("Error changing a password: ", err)
    return { error: "Error updating password" }
  }
}
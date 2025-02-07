"use server"

import bcrypt from "bcryptjs"

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseServiceRole) {
  throw new Error("Missing Supabase configuration")
}

const supabase = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function register(FormValues: { email: string; password: string }) {
  const { email, password } = FormValues

  try {
    // Check if the user already exists
    const { data: existingUsers } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .limit(1)

    if (existingUsers && existingUsers.length > 0) {
      return { error: "Email already exists" }
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    const { data: user, error } = await supabase.from("users").insert({
      email: email, password: hashedPassword
    }).select()

    if (!user) {
      console.log(error)
      throw new Error("Error creating user")
    }

    return { 
      email,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Registration error" }
  }
}


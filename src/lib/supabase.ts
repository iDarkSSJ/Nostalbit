import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = process.env.SUPABASE_URL as string
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string
export const supabaseSecret = process.env.SUPABASE_JWT_SECRET as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.log(supabaseAnonKey)
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side only exports
export const getAdminSupabase = () => {
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE
  if (!supabaseServiceRole) {
    throw new Error("Missing Supabase service role key")
  }
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}


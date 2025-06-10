import { createClient } from "@supabase/supabase-js"

// Safe environment variable handling
const getEnvVar = (key: string, fallback = "") => {
  if (typeof window !== "undefined") {
    // Client-side: only access NEXT_PUBLIC_ variables
    return key.startsWith("NEXT_PUBLIC_") ? process.env[key] || fallback : fallback
  }
  // Server-side: can access all variables
  return process.env[key] || fallback
}

const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL", "https://placeholder.supabase.co")
const supabaseAnonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY", "placeholder-key")
const supabaseServiceKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY", "placeholder-service-key")

// Validate configuration
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return url.includes("supabase.co") && !url.includes("placeholder")
  } catch {
    return false
  }
}

const isValidKey = (key: string) => {
  return key.length > 20 && !key.includes("placeholder") && key.startsWith("eyJ")
}

export const isSupabaseConfigured = () => {
  return isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)
}

// Create clients with error handling
let supabaseClient: any = null
let supabaseAdminClient: any = null

try {
  if (isSupabaseConfigured()) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })

    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } else {
    // Create mock clients that don't throw errors
    supabaseClient = {
      from: () => ({
        select: () => ({ data: [], error: new Error("Supabase not configured") }),
        insert: () => ({ data: null, error: new Error("Supabase not configured") }),
        update: () => ({ data: null, error: new Error("Supabase not configured") }),
        delete: () => ({ data: null, error: new Error("Supabase not configured") }),
      }),
      auth: {
        signIn: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    }
    supabaseAdminClient = supabaseClient
  }
} catch (error) {
  console.warn("Supabase initialization failed:", error)
  // Fallback mock client
  supabaseClient = {
    from: () => ({
      select: () => ({ data: [], error: new Error("Supabase initialization failed") }),
      insert: () => ({ data: null, error: new Error("Supabase initialization failed") }),
      update: () => ({ data: null, error: new Error("Supabase initialization failed") }),
      delete: () => ({ data: null, error: new Error("Supabase initialization failed") }),
    }),
    auth: {
      signIn: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  }
  supabaseAdminClient = supabaseClient
}

export const supabase = supabaseClient
export const supabaseAdmin = supabaseAdminClient

// Database types (keep your existing types)
export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          stage: string
          status: "active" | "inactive" | "hired" | "rejected"
          service_type: string | null
          vehicle: string | null
          last_contact: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          stage: string
          status?: "active" | "inactive" | "hired" | "rejected"
          service_type?: string | null
          vehicle?: string | null
          last_contact: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          stage?: string
          status?: "active" | "inactive" | "hired" | "rejected"
          service_type?: string | null
          vehicle?: string | null
          last_contact?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      charter_bookings: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          pickup_location: string
          destination: string
          date: string
          time: string
          duration: number
          vehicle: string
          passengers: number
          special_requests: string | null
          total_price: number
          status: "pending" | "confirmed" | "completed" | "cancelled"
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          pickup_location: string
          destination: string
          date: string
          time: string
          duration: number
          vehicle: string
          passengers: number
          special_requests?: string | null
          total_price: number
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          pickup_location?: string
          destination?: string
          date?: string
          time?: string
          duration?: number
          vehicle?: string
          passengers?: number
          special_requests?: string | null
          total_price?: number
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          created_at?: string
        }
      }
    }
  }
}

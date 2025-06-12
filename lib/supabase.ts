import { createClient } from "@supabase/supabase-js"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Get environment variables safely
const supabaseUrl = isBrowser
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL

const supabaseAnonKey = isBrowser
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate configuration
export const isSupabaseConfigured = () => {
  const hasUrl =
    supabaseUrl &&
    supabaseUrl.length > 10 &&
    !supabaseUrl.includes("placeholder") &&
    supabaseUrl.includes("supabase.co")

  const hasKey = supabaseAnonKey && supabaseAnonKey.length > 20 && !supabaseAnonKey.includes("placeholder")

  return hasUrl && hasKey
}

// Create mock client for when Supabase is not configured
const createMockClient = () => ({
  from: (table: string) => ({
    select: (columns?: string, options?: any) => Promise.resolve({ data: [], error: null, count: 0 }),
    insert: (data: any) => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    update: (data: any) => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    delete: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    eq: (column: string, value: any) => ({
      select: (columns?: string, options?: any) => Promise.resolve({ data: [], error: null, count: 0 }),
    }),
  }),
  auth: {
    signIn: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: null } }),
  },
})

// Create clients
let supabaseClient: any
let supabaseAdminClient: any

if (isSupabaseConfigured()) {
  try {
    supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })

    if (supabaseServiceKey) {
      supabaseAdminClient = createClient(supabaseUrl!, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    } else {
      supabaseAdminClient = supabaseClient
    }
  } catch (error) {
    console.warn("Supabase client creation failed:", error)
    supabaseClient = createMockClient()
    supabaseAdminClient = createMockClient()
  }
} else {
  console.warn("Supabase not configured - using mock client")
  supabaseClient = createMockClient()
  supabaseAdminClient = createMockClient()
}

export const supabase = supabaseClient
export const supabaseAdmin = supabaseAdminClient

// Database types
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

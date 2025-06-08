import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for NextAuth
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types for authentication
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          company: string | null
          position: string | null
          role: "admin" | "user"
          status: "pending" | "approved" | "rejected"
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          company?: string | null
          position?: string | null
          role?: "admin" | "user"
          status?: "pending" | "approved" | "rejected"
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          company?: string | null
          position?: string | null
          role?: "admin" | "user"
          status?: "pending" | "approved" | "rejected"
          created_at?: string
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
      fleet_vehicles: {
        Row: {
          id: string
          name: string
          category: string
          year: string
          passengers: number
          price_per_hour: number
          status: "available" | "booked" | "maintenance"
          features: string[]
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          year: string
          passengers: number
          price_per_hour: number
          status?: "available" | "booked" | "maintenance"
          features?: string[]
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          year?: string
          passengers?: number
          price_per_hour?: number
          status?: "available" | "booked" | "maintenance"
          features?: string[]
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      partner_registrations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: string
          vehicle_color: string
          license_plate: string
          identification_type: string
          identification_number: string
          status: "pending" | "approved" | "rejected"
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          company: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: string
          vehicle_color: string
          license_plate: string
          identification_type: string
          identification_number: string
          status?: "pending" | "approved" | "rejected"
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          company?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_year?: string
          vehicle_color?: string
          license_plate?: string
          identification_type?: string
          identification_number?: string
          status?: "pending" | "approved" | "rejected"
          created_at?: string
        }
      }
      driver_candidates: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          stage: string
          status: "active" | "inactive" | "hired" | "rejected"
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
          last_contact?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

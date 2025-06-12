"use client"
import { SupabaseDebugClient } from "./client"

export default function DebugSupabasePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Debug</h1>
      <SupabaseDebugClient />
    </div>
  )
}

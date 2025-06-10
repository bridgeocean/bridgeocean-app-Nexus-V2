import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, stage, status, address, licenseNumber, vehicleOwned, notes } = body

    // Insert new candidate into Supabase
    const { data, error } = await supabase
      .from("driver_candidates")
      .insert([
        {
          name,
          email,
          phone,
          stage,
          status: status.toLowerCase(),
          last_contact: new Date().toISOString(),
          notes: `Address: ${address}\nLicense: ${licenseNumber}\nVehicle Owned: ${vehicleOwned ? "Yes" : "No"}\n\nNotes: ${notes}`,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save candidate", details: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Candidate added successfully", candidate: data[0] }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("driver_candidates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 })
    }

    return NextResponse.json({ candidates: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

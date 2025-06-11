import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase" // Use admin client instead

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received candidate data:", body)

    const { name, email, phone, stage, status, address, licenseNumber, vehicleOwned, notes } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields: name, email, phone" }, { status: 400 })
    }

    // Create insert data
    const insertData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      stage: stage || "Screening",
      status: (status || "active").toLowerCase(),
      notes: `Address: ${address || "Not provided"}
License: ${licenseNumber || "Not provided"}
Vehicle Owned: ${vehicleOwned ? "Yes" : "No"}

Additional Notes: ${notes || "None"}`,
    }

    console.log("Inserting data:", insertData)

    // Use supabaseAdmin to bypass RLS
    const { data, error } = await supabaseAdmin.from("candidates").insert([insertData]).select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        {
          error: "Failed to save candidate",
          details: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ message: "Candidate added successfully", candidate: data[0] }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Use supabaseAdmin for reading as well
    const { data, error } = await supabaseAdmin.from("candidates").select("*").order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 })
    }

    return NextResponse.json({ candidates: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

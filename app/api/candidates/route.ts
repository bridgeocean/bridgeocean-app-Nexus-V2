import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received candidate data:", body)

    const { name, email, phone, stage, status, address, licenseNumber, vehicleOwned, notes } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields: name, email, phone" }, { status: 400 })
    }

    // Create insert data WITHOUT last_contact field
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

    // Insert into the correct table name (check if it's 'candidates' or 'driver_candidates')
    const { data, error } = await supabase
      .from("candidates") // Try 'candidates' first
      .insert([insertData])
      .select()

    if (error) {
      console.error("Supabase error:", error)

      // If 'candidates' table doesn't exist, try 'driver_candidates'
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        const { data: data2, error: error2 } = await supabase.from("driver_candidates").insert([insertData]).select()

        if (error2) {
          return NextResponse.json(
            {
              error: "Failed to save candidate",
              details: error2.message,
              hint: "Check if the table exists and has the correct columns",
            },
            { status: 500 },
          )
        }

        return NextResponse.json({ message: "Candidate added successfully", candidate: data2[0] }, { status: 201 })
      }

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

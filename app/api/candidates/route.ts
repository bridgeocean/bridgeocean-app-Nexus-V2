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

    // Check if email already exists
    const { data: existingCandidate, error: checkError } = await supabaseAdmin
      .from("candidates")
      .select("id, email")
      .eq("email", email.trim().toLowerCase())
      .single()

    if (existingCandidate) {
      return NextResponse.json(
        {
          error: "Email already exists",
          details: `A candidate with email ${email} already exists in the system.`,
        },
        { status: 409 },
      )
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

      // Handle specific constraint errors
      if (error.code === "23505" && error.message.includes("candidates_email_key")) {
        return NextResponse.json(
          {
            error: "Email already exists",
            details: "A candidate with this email address already exists in the system.",
          },
          { status: 409 },
        )
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
    // Fix: Add type checking for the error object
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Internal server error", details: errorMessage }, { status: 500 })
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
    // Fix: Add type checking for the error object
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Internal server error", details: errorMessage }, { status: 500 })
  }
}

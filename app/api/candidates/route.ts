import { NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("API received data:", body)

    const { name, email, phone, stage, status, last_contact, notes } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and phone are required" },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - demo mode")
      
      // Return success response for demo mode
      const demoCandidate = {
        id: `demo_${Date.now()}`,
        name,
        email,
        phone,
        stage,
        status: status || "active",
        last_contact: last_contact || new Date().toISOString(),
        notes: notes || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      console.log("Demo mode - would create candidate:", demoCandidate)
      
      return NextResponse.json(
        { 
          message: "Candidate added successfully (Demo Mode)", 
          candidate: demoCandidate,
          demo: true
        },
        { status: 201 }
      )
    }

    // Try to insert into Supabase
    console.log("Attempting to insert into Supabase...")
    
    const candidateData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      stage: stage || "Screening",
      status: (status || "active").toLowerCase(),
      last_contact: last_contact || new Date().toISOString(),
      notes: notes || "",
    }

    console.log("Inserting candidate data:", candidateData)

    const { data, error } = await supabase
      .from("candidates")
      .insert([candidateData])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      
      // Check if it's a table not found error
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        return NextResponse.json(
          { 
            error: "Database table not found. Please run the database setup scripts first.",
            details: error.message,
            suggestion: "Run the SQL scripts in the Scripts section to create the required tables."
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: "Failed to save candidate to database", 
          details: error.message 
        },
        { status: 500 }
      )
    }

    console.log("Successfully inserted candidate:", data)

    return NextResponse.json(
      { 
        message: "Candidate added successfully", 
        candidate: data[0] 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log("Supabase not configured - returning demo data")
      
      // Return demo candidates
      const demoCandidates = [
        {
          id: "demo_1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+234 901 234 5678",
          stage: "Interview",
          status: "active",
          last_contact: new Date().toISOString(),
          notes: "Demo candidate data",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "demo_2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+234 902 345 6789",
          stage: "Onboarding",
          status: "active",
          last_contact: new Date().toISOString(),
          notes: "Demo candidate data",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
      
      return NextResponse.json({ candidates: demoCandidates, demo: true })
    }

    const { data, error } = await supabase
      .from("candidates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching candidates:", error)
      return NextResponse.json(
        { error: "Failed to fetch candidates", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ candidates: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    )
  }
}

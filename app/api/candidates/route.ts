import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

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

    // Check if environment variables are configured
    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("Supabase not configured - demo mode")
      
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

      return NextResponse.json(
        { 
          message: "Candidate added successfully (Demo Mode)", 
          candidate: demoCandidate,
          demo: true
        },
        { status: 201 }
      )
    }

    // Prepare candidate data
    const candidateData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      stage: stage || "Screening",
      status: (status || "active").toLowerCase(),
      last_contact: last_contact || new Date().toISOString(),
      notes: notes || "",
    }

    console.log("Inserting candidate data with service role:", candidateData)

    // Use the admin client with service role
    const { data, error } = await supabaseAdmin
      .from("candidates")
      .insert([candidateData])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { 
          error: "Failed to save candidate to database", 
          details: error.message,
          hint: "Check RLS policies and service role permissions"
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
    if (!supabaseUrl || !supabaseServiceKey) {
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
        }
      ]
      
      return NextResponse.json({ candidates: demoCandidates, demo: true })
    }

    const { data, error } = await supabaseAdmin
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

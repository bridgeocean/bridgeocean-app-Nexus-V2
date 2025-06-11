import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("=== CANDIDATE API DEBUG ===")
    console.log("1. API received data:", body)

    const { name, email, phone, stage, status, last_contact, notes } = body

    // Validate required fields
    if (!name || !email || !phone) {
      console.log("2. Validation failed - missing required fields")
      return NextResponse.json(
        { error: "Missing required fields: name, email, and phone are required" },
        { status: 400 }
      )
    }

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("3. Environment check:")
    console.log("   - Supabase URL exists:", !!supabaseUrl)
    console.log("   - Service key exists:", !!supabaseServiceKey)
    console.log("   - Service key length:", supabaseServiceKey?.length || 0)

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("4. Environment variables missing - using demo mode")
      
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

    // Create Supabase client
    console.log("5. Creating Supabase client...")
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

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

    console.log("6. Prepared candidate data:", candidateData)

    // Test connection first
    console.log("7. Testing Supabase connection...")
    const { data: testData, error: testError } = await supabaseAdmin
      .from("candidates")
      .select("count", { count: "exact", head: true })

    if (testError) {
      console.log("8. Connection test failed:", testError)
      return NextResponse.json(
        { 
          error: "Database connection failed", 
          details: testError.message,
          code: testError.code,
          hint: testError.hint
        },
        { status: 500 }
      )
    }

    console.log("8. Connection test successful, existing records:", testData)

    // Try to insert
    console.log("9. Attempting to insert candidate...")
    const { data, error } = await supabaseAdmin
      .from("candidates")
      .insert([candidateData])
      .select()

    if (error) {
      console.log("10. Insert failed with error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      
      return NextResponse.json(
        { 
          error: "Failed to save candidate to database", 
          details: error.message,
          code: error.code,
          hint: error.hint || "Check RLS policies and service role permissions"
        },
        { status: 500 }
      )
    }

    console.log("10. Insert successful:", data)

    return NextResponse.json(
      { 
        message: "Candidate added successfully", 
        candidate: data[0] 
      },
      { status: 201 }
    )

  } catch (error) {
    console.log("ERROR: Unexpected error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// Keep the GET method the same
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

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

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

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

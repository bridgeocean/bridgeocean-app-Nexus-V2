import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "vehicleMake",
      "vehicleModel",
      "vehicleYear",
      "vehicleType",
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          {
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Validate document uploads
    if (!data.documents || Object.keys(data.documents).length < 3) {
      return NextResponse.json(
        {
          error: "Missing required documents",
        },
        { status: 400 },
      )
    }

    // Create partner record in database
    const { data: partner, error } = await supabase
      .from("partners")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        experience: data.experience,
        availability: data.availability,
        vehicle_make: data.vehicleMake,
        vehicle_model: data.vehicleModel,
        vehicle_year: data.vehicleYear,
        vehicle_type: data.vehicleType,
        additional_info: data.additionalInfo,
        documents: data.documents,
        status: "pending_review",
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      partnerId: partner[0].id,
    })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    console.log("Partner registration API called!")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const formData = await request.json()

    console.log("Received partner data:", formData)

    // Save to database
    const { data, error } = await supabase
      .from("partner_registrations")
      .insert([
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.address,
          vehicle_make: formData.make,
          vehicle_model: formData.model,
          vehicle_year: formData.year,
          vehicle_color: formData.color,
          license_plate: formData.licensePlate,
          identification_type: "NIN",
          identification_number: "PENDING",
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Database insert error:", error)
      return NextResponse.json({ error: "Database insert failed", details: error.message }, { status: 500 })
    }

    console.log("Partner registration saved successfully:", data)

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "API Error", details: error.message }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    console.log("API called!")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("Supabase URL exists:", !!supabaseUrl)
    console.log("Supabase Key exists:", !!supabaseKey)

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log("Supabase client created")

    const bookingData = await request.json()
    console.log("Received booking data:", bookingData)

    // Test database connection first
    const { data: testData, error: testError } = await supabase.from("charter_bookings").select("count").limit(1)

    if (testError) {
      console.error("Database connection test failed:", testError)
      return NextResponse.json({ error: "Database connection failed", details: testError.message }, { status: 500 })
    }

    console.log("Database connection successful")

    // Save to database
    const { data, error } = await supabase
      .from("charter_bookings")
      .insert([
        {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          pickup_location: bookingData.pickupLocation,
          destination: bookingData.destination,
          date: bookingData.date,
          time: bookingData.time,
          duration: Number.parseInt(bookingData.duration),
          vehicle: bookingData.vehicle,
          vehicle_name: bookingData.vehicleName,
          passengers: Number.parseInt(bookingData.passengers),
          special_requests: bookingData.specialRequests,
          total_price: bookingData.totalPrice,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database insert error:", error)
      return NextResponse.json({ error: "Database insert failed", details: error.message }, { status: 500 })
    }

    console.log("Booking saved successfully:", data)

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "API Error", details: error.message }, { status: 500 })
  }
}

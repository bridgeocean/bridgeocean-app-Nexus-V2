import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

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
      console.error("Database error:", error)
      throw new Error("Failed to save booking")
    }

    // Send email notification
    try {
      await sendEmailNotification(bookingData)
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 })
  }
}

async function sendEmailNotification(bookingData: any) {
  // Email notification logic
  const emailContent = `
    New Charter Booking Received
    
    Customer Details:
    Name: ${bookingData.name}
    Email: ${bookingData.email}
    Phone: ${bookingData.phone}
    
    Trip Details:
    From: ${bookingData.pickupLocation}
    To: ${bookingData.destination}
    Date: ${bookingData.date}
    Time: ${bookingData.time}
    Duration: ${bookingData.duration} hours
    
    Vehicle: ${bookingData.vehicleName}
    Passengers: ${bookingData.passengers}
    Total Price: ₦${bookingData.totalPrice.toLocaleString()}
    
    Special Requests: ${bookingData.specialRequests || "None"}
  `

  // You can integrate with your email service here
  console.log("Email notification:", emailContent)
}

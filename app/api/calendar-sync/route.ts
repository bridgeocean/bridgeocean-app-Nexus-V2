import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const { action, eventData } = await request.json()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    switch (action) {
      case "create_event":
        // Save calendar event to database
        const { data: eventResult, error: eventError } = await supabase
          .from("calendar_events")
          .insert([
            {
              title: eventData.title,
              type: eventData.type,
              customer: eventData.customer,
              date: eventData.date,
              time: eventData.time,
              duration: eventData.duration,
              location: eventData.location,
              notes: eventData.notes,
              status: "pending",
              created_at: new Date().toISOString(),
            },
          ])
          .select()

        if (eventError) {
          console.error("Database error:", eventError)
          return NextResponse.json({ error: "Failed to save event" }, { status: 500 })
        }

        return NextResponse.json({ success: true, data: eventResult })

      case "sync_bookings":
        // Get recent charter bookings and create calendar events
        const { data: bookings, error: bookingsError } = await supabase
          .from("charter_bookings")
          .select("*")
          .eq("status", "confirmed")
          .gte("date", new Date().toISOString().split("T")[0])

        if (bookingsError) {
          return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
        }

        // Create calendar events for each booking
        const calendarEvents =
          bookings?.map((booking) => ({
            title: `Charter: ${booking.pickup_location} to ${booking.destination}`,
            type: "charter",
            customer: booking.name,
            date: booking.date,
            time: booking.time,
            duration: `${booking.duration} hours`,
            location: booking.pickup_location,
            notes: `Vehicle: ${booking.vehicle}\nPassengers: ${booking.passengers}\nPhone: ${booking.phone}`,
            status: "confirmed",
            booking_id: booking.id,
          })) || []

        return NextResponse.json({ success: true, events: calendarEvents })

      case "check_conflicts":
        // Check for booking conflicts
        const { date, time, duration } = eventData
        const { data: conflicts, error: conflictError } = await supabase
          .from("calendar_events")
          .select("*")
          .eq("date", date)
          .eq("type", "charter")

        if (conflictError) {
          return NextResponse.json({ error: "Failed to check conflicts" }, { status: 500 })
        }

        const hasConflict = conflicts?.some((event) => {
          // Simple time conflict check (can be enhanced)
          return event.time === time
        })

        return NextResponse.json({ hasConflict, conflicts })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Calendar API Error:", error)
    return NextResponse.json({ error: "Calendar API Error", details: error.message }, { status: 500 })
  }
}

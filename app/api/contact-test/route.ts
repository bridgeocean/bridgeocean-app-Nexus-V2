import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    console.log("Contact API called!")

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const formData = await request.json()

    console.log("Received contact data:", formData)

    // Save to database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: "new",
        },
      ])
      .select()

    if (error) {
      console.error("Database insert error:", error)
      return NextResponse.json({ error: "Database insert failed", details: error.message }, { status: 500 })
    }

    console.log("Contact message saved successfully:", data)

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "API Error", details: error.message }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log("Contact API called with:", formData)
    
    return NextResponse.json({ 
      success: true, 
      message: "Contact API is working!",
      received: formData 
    })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "API Error", details: error.message }, { status: 500 })
  }
}

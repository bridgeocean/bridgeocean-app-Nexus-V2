import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("API endpoint hit!")

    const data = await request.json()
    console.log("Received data:", data)

    // Just return success for now
    return NextResponse.json({
      success: true,
      message: "Test API working!",
      receivedData: data,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        error: "API Error",
        details: error,
      },
      { status: 500 },
    )
  }
}

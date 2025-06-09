import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt, mode } = await request.json()

    // In a production environment, this would call an actual AI service
    // like OpenAI, Anthropic, or your own custom model

    // For now, we'll simulate responses based on the mode and prompt
    let response = ""

    switch (mode) {
      case "customer-service":
        response = `Thank you for reaching out to Bridgeocean. ${
          prompt.includes("charter")
            ? "Our charter service offers both Toyota Camry and GMC Terrain options for your transportation needs in Lagos. Would you like to know more about our rates or availability?"
            : "We're here to assist with all your transportation needs. How can we help you today?"
        }`
        break
      case "partner-onboarding":
        response = `Welcome to the Bridgeocean partner onboarding process. ${
          prompt.includes("requirements")
            ? "To become a partner, you'll need to provide: Valid license, LASRRA card, LASDRI card, 2 guarantors (who have known you for 8+ years), and consent to the caution fee payment (₦350,000). Would you like more details on any of these requirements?"
            : "We're excited to have you join our team. The process involves screening, document verification, and contract signing. What specific information do you need?"
        }`
        break
      case "emergency":
        response = `URGENT: ${
          prompt.includes("accident")
            ? "Please ensure everyone is safe and call emergency services if needed. Then contact our emergency line at +234XXXXXXXX immediately. We'll dispatch assistance right away."
            : "This is a priority message from Bridgeocean. Please respond immediately with your current status and location."
        }`
        break
      case "business":
        response = `Bridgeocean Business Analysis: ${
          prompt.includes("revenue")
            ? "Based on current projections, we anticipate a 15% increase in charter bookings this quarter. The caution fee system has improved our financial stability by reducing risk exposure by approximately 35%."
            : "Our business metrics indicate steady growth in the Lagos transportation sector. Would you like specific data on partner retention, vehicle utilization, or customer satisfaction?"
        }`
        break
      case "content":
        response = `${
          prompt.includes("promotion")
            ? "Experience premium transportation with Bridgeocean! Our fleet of well-maintained vehicles and professional drivers ensure your journey is comfortable, safe, and punctual. Book your charter today and discover the Bridgeocean difference!"
            : "Bridgeocean: Connecting Lagos with reliable transportation solutions. Our commitment to quality service and professional standards makes us the preferred choice for discerning clients."
        }`
        break
      default:
        response = "Thank you for your message. How can Bridgeocean assist you today?"
    }

    // Add a slight delay to simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in AI response generation:", error)
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
  }
}

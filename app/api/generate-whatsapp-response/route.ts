import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message, companyInfo } = await request.json()
    
    // Generate response using fallback logic
    const responseText = generateBetterResponse(message, companyInfo)
    
    return NextResponse.json({ text: responseText })
  } catch (error) {
    console.error("Error in generate-whatsapp-response:", error)
    
    // Return a safe fallback response
    return NextResponse.json({ 
      text: "🚗 *BridgeOcean Response*\n\nThank you for contacting us. We're experiencing technical difficulties. Please contact us directly at +234 906 918 3165 or email bridgeocean@cyberservices.com for immediate assistance." 
    })
  }
}

// Enhanced response generator
function generateBetterResponse(message: string, companyInfo: any) {
  const lowerMessage = message.toLowerCase()
  const { name, services, contact, pricing } = companyInfo

  // Emergency responses
  if (
    lowerMessage.includes("emergency") ||
    lowerMessage.includes("urgent") ||
    lowerMessage.includes("accident") ||
    (lowerMessage.includes("help") && (lowerMessage.includes("now") || lowerMessage.includes("immediately")))
  ) {
    return `🚨 *${name} Emergency Response*\n\nThank you for contacting our emergency services. We understand this requires immediate attention.\n\n1️⃣ Please share your exact location\n2️⃣ Describe the emergency situation\n3️⃣ Number of people involved\n\nOur emergency coordination team is on standby. You can also call our emergency hotline at ${contact.whatsapp[0]}.\n\n*Nexus Emergency Logistics* - Satellite-Powered Coordination for Rapid Response`
  }

  // Booking and charter services
  if (
    lowerMessage.includes("book") ||
    lowerMessage.includes("charter") ||
    lowerMessage.includes("hire") ||
    lowerMessage.includes("car") ||
    lowerMessage.includes("vehicle") ||
    lowerMessage.includes("transport") ||
    lowerMessage.includes("trip")
  ) {
    let response = `🚗 *${name} Charter Services*\n\nThank you for your interest in our premium charter services.\n\n*Our Vehicles:*\n`

    // Add pricing information
    Object.entries(pricing).forEach(([vehicle, price]) => {
      response += `• ${vehicle}: ${price}\n`
    })

    response += `\n*To proceed with booking, we need:*\n`
    response += `1️⃣ Pickup location and destination\n`
    response += `2️⃣ Date and time\n`
    response += `3️⃣ Duration of service\n`
    response += `4️⃣ Number of passengers\n\n`

    response += `You can also book directly on our website: ${contact.website}/charter/book\n\nWe look forward to serving you!`

    return response
  }

  // Pricing inquiries
  if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("rate") ||
    lowerMessage.includes("fee") ||
    lowerMessage.includes("how much")
  ) {
    let response = `💰 *${name} Pricing Information*\n\n*Our current rates:*\n\n`

    Object.entries(pricing).forEach(([vehicle, price]) => {
      response += `• ${vehicle}: ${price}\n`
    })

    response += `\n*Additional Information:*\n`
    response += `• Additional charges apply for trips outside Lagos\n`
    response += `• All prices include professional driver, fuel, and vehicle maintenance\n`
    response += `• For trips longer than 10 hours, we charge ₦10,000 per additional hour\n\n`

    response += `For custom quotes or special requirements, please provide more details about your trip.\n\nThank you for choosing ${name}!`

    return response
  }

  // Partnership and registration
  if (
    lowerMessage.includes("partner") ||
    lowerMessage.includes("register") ||
    lowerMessage.includes("join") ||
    lowerMessage.includes("driver") ||
    lowerMessage.includes("my car") ||
    lowerMessage.includes("my vehicle")
  ) {
    return `🤝 *Become a ${name} Partner*\n\nThank you for your interest in partnering with us! We're always looking for quality vehicles and professional drivers.\n\n*To register your vehicle:*\n1️⃣ Visit ${contact.website}/charter/partner\n2️⃣ Complete the registration form\n3️⃣ Upload required documents\n\n*Requirements:*\n• Valid means of identification\n• Vehicle registration\n• Proof of insurance\n• Vehicle photos\n• Driver's license (if applicable)\n\nOur team will review your application within 48 hours.\n\n*Partner Benefits:*\n• Consistent booking opportunities\n• Competitive commission structure\n• Professional network access\n• Flexible scheduling\n\nWe look forward to welcoming you to the ${name} partner network!`
  }

  // Contact and location
  if (
    lowerMessage.includes("location") ||
    lowerMessage.includes("address") ||
    lowerMessage.includes("office") ||
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("call") ||
    lowerMessage.includes("phone")
  ) {
    return `📍 *${name} Contact Information*\n\n*You can reach us through:*\n\n• WhatsApp: ${contact.whatsapp.join(" or ")}\n• Email: ${contact.email}\n• Website: ${contact.website}\n\nOur team is available 24/7 for emergency services and 8am-8pm for general inquiries and bookings.\n\nWe aim to respond to all messages within 30 minutes during business hours.\n\nThank you for choosing ${name}!`
  }

  // Nexus platform
  if (
    lowerMessage.includes("nexus") ||
    lowerMessage.includes("satellite") ||
    lowerMessage.includes("emergency logistics") ||
    lowerMessage.includes("coordination")
  ) {
    return `🛰️ *${name} Nexus Emergency Logistics*\n\nNexus is our satellite-powered emergency coordination platform that provides:\n\n• Rapid emergency response coordination\n• Real-time vehicle tracking and routing\n• Hospital and medical facility coordination\n• Integrated communication systems\n• Traffic incident management\n• Medical emergency prioritization\n\nIn emergency situations, Nexus significantly reduces response times and improves outcomes through intelligent coordination.\n\n*How It Works:*\n1️⃣ Emergency reported via our platform\n2️⃣ Nearest resources identified and dispatched\n3️⃣ Real-time coordination with all stakeholders\n4️⃣ Continuous monitoring until resolution\n\nFor more information, visit ${contact.website}/nexus`
  }

  // Default response for general inquiries
  return `👋 *Welcome to ${name}*\n\nThank you for reaching out to us. We offer:\n\n${services.map((service) => `• ${service}`).join("\n")}\n\n*How may we assist you today?* Feel free to ask about our services, pricing, booking process, or emergency coordination.\n\n*Contact Information:*\n• WhatsApp: ${contact.whatsapp[0]}\n• Email: ${contact.email}\n• Website: ${contact.website}\n\nWe're here to help and look forward to serving you!`
}

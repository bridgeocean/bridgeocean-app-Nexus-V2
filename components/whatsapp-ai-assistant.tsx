"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WhatsAppAIAssistant() {
  const [customerMessage, setCustomerMessage] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  // AI response templates based on message content
  const generateAIResponse = async (message: string) => {
    setIsGenerating(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let response = ""

    // Simple keyword-based response system
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || lowerMessage.includes("accident")) {
      response = `🚨 *BridgeOcean Nexus Emergency Response*\n\nThank you for contacting our emergency services. This is an urgent matter that requires immediate attention.\n\n1. Please share your exact location\n2. Describe the emergency situation briefly\n3. Number of people involved\n\nOur emergency coordination team will respond immediately. You can also call our emergency hotline at +234 906 918 3165.\n\nNexus Emergency Logistics - Satellite-Powered Coordination`
    } else if (
      lowerMessage.includes("book") ||
      lowerMessage.includes("charter") ||
      lowerMessage.includes("hire") ||
      lowerMessage.includes("car") ||
      lowerMessage.includes("vehicle")
    ) {
      response = `🚗 *BridgeOcean Charter Services*\n\nThank you for your interest in our premium charter services. Here's what we offer:\n\n• Toyota Camry (2006) - ₦100,000 per 10 hours\n• GMC Terrain (2011) - ₦200,000 per 10 hours\n\nTo proceed with booking, I'll need:\n1. Your pickup location and destination\n2. Date and time\n3. Duration of service\n4. Number of passengers\n\nYou can also book directly on our website: bridgeocean.xyz/charter/book`
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("rate") ||
      lowerMessage.includes("fee")
    ) {
      response = `💰 *BridgeOcean Pricing Information*\n\nOur current rates:\n\n• Toyota Camry (2006): ₦100,000 per 10 hours\n• GMC Terrain (2011): ₦200,000 per 10 hours\n\nAdditional charges apply for trips outside Lagos.\n\nAll prices include professional driver, fuel, and vehicle maintenance. For custom quotes or special requirements, please provide more details about your trip.`
    } else if (
      lowerMessage.includes("partner") ||
      lowerMessage.includes("register") ||
      lowerMessage.includes("join") ||
      lowerMessage.includes("driver")
    ) {
      response = `🤝 *Become a BridgeOcean Partner*\n\nThank you for your interest in partnering with us! We're always looking for quality vehicles and professional drivers.\n\nTo register your vehicle:\n1. Visit bridgeocean.xyz/charter/partner\n2. Complete the registration form\n3. Upload required documents\n\nRequirements:\n• Valid means of identification\n• Vehicle registration\n• Proof of insurance\n• Vehicle photos\n\nOur team will review your application within 48 hours.`
    } else if (
      lowerMessage.includes("location") ||
      lowerMessage.includes("address") ||
      lowerMessage.includes("office") ||
      lowerMessage.includes("contact")
    ) {
      response = `📍 *BridgeOcean Contact Information*\n\nYou can reach us through:\n\n• WhatsApp: +234 906 918 3165 or +234 913 563 0154\n• Email: bridgeocean@cyberservices.com\n• Website: bridgeocean.xyz\n\nOur team is available 24/7 for emergency services and 8am-8pm for general inquiries and bookings.`
    } else if (
      lowerMessage.includes("nexus") ||
      lowerMessage.includes("satellite") ||
      lowerMessage.includes("emergency logistics") ||
      lowerMessage.includes("coordination")
    ) {
      response = `🛰️ *Nexus Emergency Logistics*\n\nNexus is our satellite-powered emergency coordination platform that provides:\n\n• Rapid emergency response coordination\n• Real-time vehicle tracking and routing\n• Hospital and medical facility coordination\n• Integrated communication systems\n\nIn emergency situations, Nexus significantly reduces response times and improves outcomes through intelligent coordination.\n\nFor more information, visit bridgeocean.xyz/nexus`
    } else {
      response = `👋 *Welcome to BridgeOcean*\n\nThank you for reaching out to us. We offer:\n\n• 🚨 Nexus Emergency Logistics - Satellite-powered emergency coordination\n• 🚗 Premium Charter Services - Professional vehicles for hire\n• 🤝 Partnership Opportunities - Register your vehicle\n\nHow may we assist you today? Feel free to ask about our services, pricing, booking process, or emergency coordination.`
    }

    setAiResponse(response)
    setIsGenerating(false)
  }

  const handleGenerateResponse = () => {
    if (!customerMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a customer message to generate a response",
        variant: "destructive",
      })
      return
    }

    generateAIResponse(customerMessage)
  }

  const copyToClipboard = () => {
    if (!aiResponse) return

    navigator.clipboard.writeText(aiResponse)
    toast({
      title: "Copied to clipboard",
      description: "AI response has been copied to your clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            WhatsApp AI Assistant
          </CardTitle>
          <CardDescription>Generate professional responses for WhatsApp communications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Message</label>
            <Textarea
              placeholder="Enter customer message or inquiry here..."
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button
            onClick={handleGenerateResponse}
            className="w-full"
            disabled={isGenerating || !customerMessage.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Response...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate AI Response
              </>
            )}
          </Button>

          {aiResponse && (
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">AI Generated Response</label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  Copy
                </Button>
              </div>
              <div className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm">{aiResponse}</div>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => {
                  // Open WhatsApp with the generated response
                  const encodedResponse = encodeURIComponent(aiResponse)
                  window.open(`https://wa.me/?text=${encodedResponse}`, "_blank")
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Open in WhatsApp
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageCircle, Phone, Send, ExternalLink } from "lucide-react"

interface WhatsAppMessage {
  to: string
  message: string
  type: "emergency" | "booking" | "general"
}

export function WhatsAppIntegration() {
  const [selectedBusinessNumber, setSelectedBusinessNumber] = useState("+234 906 918 3165")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"emergency" | "booking" | "general">("general")

  const businessNumbers = [
    { number: "+234 906 918 3165", label: "Primary Business Line", formatted: "2349069183165" },
    { number: "+234 913 563 0154", label: "Secondary Business Line", formatted: "2349135630154" },
  ]

  // Format phone number (remove spaces, add country code if needed)
  const formatPhoneNumber = (phone: string) => {
    let formatted = phone.replace(/\s+/g, "").replace(/[^\d+]/g, "")

    // Add Nigeria country code if no country code present
    if (!formatted.startsWith("+") && !formatted.startsWith("234")) {
      if (formatted.startsWith("0")) {
        formatted = "234" + formatted.substring(1)
      } else {
        formatted = "234" + formatted
      }
    }

    return formatted.replace("+", "")
  }

  // Send message via WhatsApp Web
  const sendWhatsAppMessage = () => {
    if (!phoneNumber || !message) {
      alert("Please enter both phone number and message")
      return
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")

    // Clear form
    setPhoneNumber("")
    setMessage("")
  }

  // Quick message templates
  const getQuickMessage = (type: string) => {
    const selectedFormatted =
      businessNumbers.find((b) => b.number === selectedBusinessNumber)?.formatted || "2349069183165"

    const templates = {
      emergency: `🚨 EMERGENCY ALERT from BridgeOcean Nexus

This is an urgent message regarding emergency logistics coordination. Please respond immediately.

Contact: ${selectedBusinessNumber}
Email: bridgeocean@cyberservices.com`,

      booking: `🚗 BridgeOcean Charter Services

Thank you for your interest in our premium charter services. 

Our fleet includes:
- Toyota Camry (2006) - ₦100,000 per 10 hours
- GMC Terrain (2011) - ₦200,000 per 10 hours

To book or get more information:
📞 ${selectedBusinessNumber}
🌐 Visit our website to complete your booking

Best regards,
BridgeOcean Team`,

      driver: `👨‍💼 BridgeOcean Driver Management

Hello! This message is regarding your driver application/interview with BridgeOcean.

Please ensure you have:
✅ Valid means of identification
✅ Proof of insurance
✅ Vehicle registration (if applicable)

Contact us: ${selectedBusinessNumber}
Email: bridgeocean@cyberservices.com`,

      nexus: `🛰️ Nexus Emergency Logistics

Emergency coordination update from BridgeOcean Nexus platform.

Our satellite-powered routing system is coordinating your emergency response.

For immediate assistance: ${selectedBusinessNumber}
Emergency hotline: Available 24/7`,
    }
    return templates[type as keyof typeof templates] || ""
  }

  return (
    <div className="space-y-6">
      {/* Quick Send Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Send WhatsApp Message
          </CardTitle>
          <CardDescription>Send messages directly through WhatsApp Web (works immediately)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="e.g., +234 813 526 1568 or 08135261568"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter with or without country code (Nigeria +234 will be added automatically)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={sendWhatsAppMessage} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send via WhatsApp
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Message Templates</CardTitle>
          <CardDescription>Pre-written messages for common scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setMessage(getQuickMessage("emergency"))}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-semibold">🚨 Emergency Alert</div>
                <div className="text-xs text-muted-foreground">Nexus emergency coordination</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => setMessage(getQuickMessage("booking"))}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-semibold">🚗 Charter Booking</div>
                <div className="text-xs text-muted-foreground">Fleet information & booking</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => setMessage(getQuickMessage("driver"))}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-semibold">👨‍💼 Driver Communication</div>
                <div className="text-xs text-muted-foreground">Interview & requirements</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => setMessage(getQuickMessage("nexus"))}
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-semibold">🛰️ Nexus Update</div>
                <div className="text-xs text-muted-foreground">Satellite-powered coordination</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Number Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Business WhatsApp Numbers
          </CardTitle>
          <CardDescription>Select which business number to use for communications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {businessNumbers.map((business) => (
              <div key={business.number} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={business.formatted}
                  name="businessNumber"
                  value={business.number}
                  checked={selectedBusinessNumber === business.number}
                  onChange={(e) => setSelectedBusinessNumber(e.target.value)}
                  className="h-4 w-4"
                />
                <label htmlFor={business.formatted} className="flex-1 cursor-pointer">
                  <div className="font-medium">{business.number}</div>
                  <div className="text-sm text-muted-foreground">{business.label}</div>
                </label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/${business.formatted}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Alert>
            <MessageCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Selected Business Number:</strong> {selectedBusinessNumber}
              <br />
              <a
                href={`https://wa.me/${businessNumbers.find((b) => b.number === selectedBusinessNumber)?.formatted}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1 mt-2"
              >
                Open WhatsApp Chat <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://wa.me/${businessNumbers.find((b) => b.number === selectedBusinessNumber)?.formatted}?text=Hello%20BridgeOcean%2C%20I%20need%20emergency%20logistics%20assistance`,
                  "_blank",
                )
              }
              className="h-auto p-4"
            >
              <div className="text-center">
                <div className="font-semibold text-red-600">🚨 Emergency</div>
                <div className="text-xs text-muted-foreground">Nexus Emergency Logistics</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://wa.me/${businessNumbers.find((b) => b.number === selectedBusinessNumber)?.formatted}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20charter%20service`,
                  "_blank",
                )
              }
              className="h-auto p-4"
            >
              <div className="text-center">
                <div className="font-semibold text-blue-600">🚗 Charter</div>
                <div className="text-xs text-muted-foreground">Premium Fleet Booking</div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://wa.me/${businessNumbers.find((b) => b.number === selectedBusinessNumber)?.formatted}?text=Hello%2C%20I%20have%20a%20general%20inquiry`,
                  "_blank",
                )
              }
              className="h-auto p-4"
            >
              <div className="text-center">
                <div className="font-semibold text-green-600">💬 General</div>
                <div className="text-xs text-muted-foreground">General Inquiries</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

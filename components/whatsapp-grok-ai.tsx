"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, Loader2, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WhatsAppGrokAI() {
  const [customerMessage, setCustomerMessage] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  // Example messages for quick testing
  const exampleMessages = [
    "I need to book a car for tomorrow from Lagos to Ibadan",
    "What are your prices for charter services?",
    "There's been an accident on Third Mainland Bridge, we need emergency assistance",
    "How can I register my vehicle with your service?",
    "Tell me more about your Nexus emergency logistics platform",
  ]

  // Generate AI response using the server-side API
  const generateAIResponse = async (message: string) => {
    setIsGenerating(true)

    try {
      // Call our server-side API endpoint that will handle the Grok API call
      const response = await fetch("/api/generate-whatsapp-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          companyInfo: {
            name: "BridgeOcean",
            services: [
              "Nexus Emergency Logistics - Satellite-powered emergency coordination",
              "Premium Charter Services - Professional vehicles for hire",
              "Partnership Opportunities - Register vehicles with our platform",
            ],
            contact: {
              whatsapp: ["+234 906 918 3165", "+234 913 563 0154"],
              email: "bridgeocean@cyberservices.com",
              website: "bridgeocean.xyz",
            },
            pricing: {
              "Toyota Camry (2006)": "₦100,000 per 10 hours",
              "GMC Terrain (2011)": "₦200,000 per 10 hours",
            },
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate response")
      }

      const data = await response.json()
      setAiResponse(data.text)
    } catch (error) {
      console.error("Error generating AI response:", error)
      toast({
        title: "Error generating response",
        description: "There was an error connecting to the AI service. Please try again.",
        variant: "destructive",
      })
      setAiResponse("Sorry, I couldn't generate a response at this time. Please try again later.")
    } finally {
      setIsGenerating(false)
    }
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
            Grok AI WhatsApp Assistant
          </CardTitle>
          <CardDescription>
            Generate intelligent, context-aware responses for WhatsApp communications using Grok AI
          </CardDescription>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Example Messages</label>
            <div className="flex flex-wrap gap-2">
              {exampleMessages.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomerMessage(example)}
                  className="text-xs"
                >
                  {example.length > 30 ? example.substring(0, 30) + "..." : example}
                </Button>
              ))}
            </div>
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
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => generateAIResponse(customerMessage)}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm">{aiResponse}</div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Open WhatsApp with the generated response (primary number)
                    const encodedResponse = encodeURIComponent(aiResponse)
                    window.open(`https://wa.me/2349069183165?text=${encodedResponse}`, "_blank")
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send via Primary
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Open WhatsApp with the generated response (secondary number)
                    const encodedResponse = encodeURIComponent(aiResponse)
                    window.open(`https://wa.me/2349135630154?text=${encodedResponse}`, "_blank")
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send via Secondary
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

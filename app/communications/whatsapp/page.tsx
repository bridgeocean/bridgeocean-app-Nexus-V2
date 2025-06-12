"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Settings, MessageCircle, ExternalLink, Bot, Send, Copy, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const MESSAGE_TEMPLATES = {
  welcome:
    "Welcome to Bridgeocean! We're excited to have you as a potential partner driver. We'll be in touch soon with next steps.",
  interview:
    "Hi! This is from Bridgeocean. We'd like to schedule your interview call. When would be a good time for you?",
  documents:
    "Please prepare the following documents for your application: Driver's License, LASRRA card, LASDRI card, and proof of address.",
  caution_fee:
    "The caution fee is ₦350,000 and is fully refundable at the end of your rental agreement. You can start with a minimum of ₦150,000.",
  visitation:
    "We'd like to schedule a home visitation to complete your application process. What days work best for you this week?",
  forms:
    "Please find the attached forms that need to be completed. Return them within 5 business days along with your guarantor information.",
}

function WhatsAppSender() {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const formatPhoneNumber = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    if (digits.startsWith("0")) {
      return "234" + digits.substring(1)
    } else if (!digits.startsWith("234")) {
      return "234" + digits
    }
    return digits
  }

  const sendWhatsAppMessage = () => {
    if (!phoneNumber || !message) {
      toast({
        title: "Missing Information",
        description: "Please enter both phone number and message",
        variant: "destructive",
      })
      return
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    toast({
      title: "WhatsApp Opened",
      description: "Message ready to send via WhatsApp Web",
    })
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message)
    toast({
      title: "Copied",
      description: "Message copied to clipboard",
    })
  }

  const useTemplate = (templateKey: string) => {
    setMessage(MESSAGE_TEMPLATES[templateKey])
    setSelectedTemplate(templateKey)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send WhatsApp Message
          </CardTitle>
          <CardDescription>Send messages to candidates via WhatsApp Web</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="0803 XXX XXXX or +234 803 XXX XXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="flex gap-2 mb-2">
              <Button variant="outline" size="sm" onClick={copyMessage} disabled={!message}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button onClick={sendWhatsAppMessage} className="w-full" disabled={!phoneNumber || !message}>
            <Send className="h-4 w-4 mr-2" />
            Send via WhatsApp Web
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>Quick templates for common scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label>Select Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome Message</SelectItem>
                <SelectItem value="interview">Interview Scheduling</SelectItem>
                <SelectItem value="documents">Document Request</SelectItem>
                <SelectItem value="caution_fee">Caution Fee Explanation</SelectItem>
                <SelectItem value="visitation">Home Visitation</SelectItem>
                <SelectItem value="forms">Forms & Requirements</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {Object.entries(MESSAGE_TEMPLATES).map(([key, template]) => (
              <Button
                key={key}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => setMessage(template)}
              >
                <div>
                  <div className="font-medium capitalize">{key.replace("_", " ")}</div>
                  <div className="text-xs text-muted-foreground truncate">{template.substring(0, 50)}...</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SimpleAI() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const generateResponse = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      // Simple AI response for WhatsApp context
      const responses = [
        `For WhatsApp message about "${input}": Hi! Thanks for your interest in Bridgeocean. We'll get back to you within 24 hours with more details.`,
        `Suggested WhatsApp reply for "${input}": Thank you for contacting Bridgeocean. Our team will review your message and respond shortly.`,
        `WhatsApp template for "${input}": Hello! We appreciate your message. A Bridgeocean representative will contact you soon to assist with your inquiry.`,
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setResponse(randomResponse)
    } catch (error) {
      setResponse("Sorry, I couldn't generate a response right now. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Simple AI Assistant
        </CardTitle>
        <CardDescription>Generate WhatsApp message suggestions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Describe what you need help with</Label>
          <Textarea
            placeholder="e.g., 'Customer asking about caution fee' or 'New driver wants to know requirements'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <Button onClick={generateResponse} disabled={loading || !input.trim()}>
          {loading ? "Generating..." : "Generate Response"}
        </Button>

        {response && (
          <div className="space-y-2">
            <Label>Suggested Response</Label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">{response}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(response)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Response
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function WhatsAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">WhatsApp Communications</h2>
        </div>

        <Tabs defaultValue="send" className="space-y-4">
          <TabsList>
            <TabsTrigger value="send">Send Messages</TabsTrigger>
            <TabsTrigger value="ai-assistant">
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="business">Business Setup</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-4">
            <WhatsAppSender />
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-4">
            <SimpleAI />
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Business Contact Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Primary Business WhatsApp</Label>
                      <div className="flex items-center gap-2">
                        <Input value="+234 906 918 3165" readOnly />
                        <Button size="sm" onClick={() => window.open("https://wa.me/2349069183165", "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Business WhatsApp</Label>
                      <div className="flex items-center gap-2">
                        <Input value="+234 913 563 0154" readOnly />
                        <Button size="sm" onClick={() => window.open("https://wa.me/2349135630154", "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(
                        "https://wa.me/2349069183165?text=Test%20message%20from%20BridgeOcean%20platform",
                        "_blank",
                      )
                    }
                  >
                    Test Primary WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(
                        "https://wa.me/2349135630154?text=Test%20message%20from%20BridgeOcean%20platform",
                        "_blank",
                      )
                    }
                  >
                    Test Secondary WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Integration Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WhatsApp Web</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Business API</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Assistant</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Business API Setup</CardTitle>
                <CardDescription>For advanced integration with automated messaging capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Status: WhatsApp Web Integration</h4>
                  <p className="text-sm text-gray-600">
                    Your platform currently uses WhatsApp Web links for immediate messaging. This works right now and
                    allows you to send messages to customers directly.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Option 1: Twilio (Recommended)</h3>
                    <Button onClick={() => window.open("https://twilio.com/whatsapp", "_blank")} className="w-full">
                      Get Started with Twilio
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Option 2: Facebook Direct</h3>
                    <Button
                      variant="outline"
                      onClick={() => window.open("https://business.whatsapp.com/api", "_blank")}
                      className="w-full"
                    >
                      Apply for Facebook API
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

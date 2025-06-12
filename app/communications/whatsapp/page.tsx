"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageCircle, ExternalLink, Send } from "lucide-react"

export default function WhatsAppPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")

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
      alert("Please enter both phone number and message")
      return
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const templates = [
    {
      title: "Welcome Message",
      description: "For new driver candidates",
      content:
        "Welcome to Bridgeocean! We're excited to have you as a potential partner driver. We'll be in touch soon with next steps.",
    },
    {
      title: "Interview Scheduling",
      description: "Schedule interview calls",
      content:
        "Hi! This is from Bridgeocean. We'd like to schedule your interview call. When would be a good time for you?",
    },
    {
      title: "Document Request",
      description: "Request required documents",
      content:
        "Please prepare the following documents: Driver's License, LASRRA card, LASDRI card, and proof of address.",
    },
    {
      title: "Caution Fee Explanation",
      description: "Explain caution fee details",
      content: "The caution fee is ₦350,000 and is fully refundable. You can start with a minimum of ₦150,000.",
    },
  ]

  const handleTemplateClick = (templateContent: string) => {
    setMessage(templateContent)
  }

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
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="business">Business Info</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
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
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Test your WhatsApp integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
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
                    <Phone className="h-4 w-4 mr-2" />
                    Test Primary WhatsApp (+234 906 918 3165)
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
                    <Phone className="h-4 w-4 mr-2" />
                    Test Secondary WhatsApp (+234 913 563 0154)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open("https://business.whatsapp.com/", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    WhatsApp Business Web
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>Pre-written messages for common scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3">
                  {templates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => handleTemplateClick(template.content)}
                    >
                      <div>
                        <div className="font-medium">{template.title}</div>
                        <div className="text-xs text-muted-foreground">{template.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Business Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input value="BridgeOcean" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Business Description</Label>
                  <Input value="Satellite-Powered Emergency Logistics & Charter Services" readOnly />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

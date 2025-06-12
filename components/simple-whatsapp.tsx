"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send, Copy } from "lucide-react"
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

export function SimpleWhatsApp() {
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, "")

    // Add country code if not present
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
                onClick={() => useTemplate(key)}
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

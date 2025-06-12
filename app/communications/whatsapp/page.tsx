"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageCircle, Send } from "lucide-react"

export default function WhatsAppPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    if (!phoneNumber || !message) {
      alert("Please enter phone number and message")
      return
    }

    let formattedPhone = phoneNumber.replace(/\D/g, "")
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "234" + formattedPhone.substring(1)
    }

    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">WhatsApp Communications</h2>

        <div className="grid gap-6 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Send WhatsApp Message
              </CardTitle>
              <CardDescription>Send messages via WhatsApp Web</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="0803 XXX XXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quick Templates</Label>
                  <div className="space-y-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() =>
                        setMessage("Welcome to Bridgeocean! We're excited to have you as a potential partner driver.")
                      }
                    >
                      Welcome Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() =>
                        setMessage("Hi! This is from Bridgeocean. We'd like to schedule your interview call.")
                      }
                    >
                      Interview Scheduling
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-[100px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button onClick={sendMessage} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send via WhatsApp Web
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Business Numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open("https://wa.me/2349069183165", "_blank")}
              >
                Primary: +234 906 918 3165
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open("https://wa.me/2349135630154", "_blank")}
              >
                Secondary: +234 913 563 0154
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

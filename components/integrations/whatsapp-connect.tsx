"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Phone, AlertCircle } from "lucide-react"

export function WhatsAppConnect() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          WhatsApp Business Integration
        </CardTitle>
        <CardDescription>
          Connect your WhatsApp Business account to send messages directly to candidates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>WhatsApp Business is connected successfully! Phone: {phoneNumber}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="business-phone">Business Phone Number</Label>
              <Input
                id="business-phone"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-api">WhatsApp Business API Token</Label>
              <Input
                id="whatsapp-api"
                type="password"
                placeholder="Enter your API token"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You'll need a WhatsApp Business API account. Visit{" "}
                <a
                  href="https://business.whatsapp.com/api"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Business API
                </a>{" "}
                to get started.
              </AlertDescription>
            </Alert>
            <Button onClick={handleConnect} disabled={!phoneNumber || !apiKey || isConnecting} className="w-full">
              {isConnecting ? "Connecting..." : "Connect WhatsApp Business"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

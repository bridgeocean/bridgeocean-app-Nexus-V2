"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, CheckCircle } from "lucide-react"

const calendarProviders = [
  { id: "google", name: "Google Calendar", icon: "🗓️" },
  { id: "outlook", name: "Microsoft Outlook", icon: "📅" },
  { id: "apple", name: "Apple Calendar", icon: "🍎" },
  { id: "yahoo", name: "Yahoo Calendar", icon: "📆" },
]

export function CalendarConnect() {
  const [selectedProvider, setSelectedProvider] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar Integration
        </CardTitle>
        <CardDescription>Connect your calendar to automatically schedule and sync meetings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {calendarProviders.find((p) => p.id === selectedProvider)?.name} is connected successfully!
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-2">
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your calendar provider" />
                </SelectTrigger>
                <SelectContent>
                  {calendarProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center gap-2">
                        <span>{provider.icon}</span>
                        {provider.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleConnect} disabled={!selectedProvider || isConnecting} className="w-full">
              {isConnecting
                ? "Connecting..."
                : `Connect ${selectedProvider ? calendarProviders.find((p) => p.id === selectedProvider)?.name : "Calendar"}`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Plus, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CalendarEvent {
  id: string
  title: string
  type: "interview" | "contract" | "visitation" | "meeting"
  candidate: string
  date: string
  time: string
  duration: string
  status: "scheduled" | "completed" | "cancelled"
}

export function GoogleCalendarIntegration() {
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Driver Interview - John Doe",
      type: "interview",
      candidate: "John Doe",
      date: "2024-01-15",
      time: "10:00",
      duration: "30 minutes",
      status: "scheduled",
    },
    {
      id: "2",
      title: "Contract Signing - Sarah Williams",
      type: "contract",
      candidate: "Sarah Williams",
      date: "2024-01-16",
      time: "14:00",
      duration: "1 hour",
      status: "scheduled",
    },
    {
      id: "3",
      title: "Home Visitation - Mike Johnson",
      type: "visitation",
      candidate: "Mike Johnson",
      date: "2024-01-17",
      time: "11:00",
      duration: "45 minutes",
      status: "completed",
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "interview" as const,
    candidate: "",
    date: "",
    time: "",
    duration: "30 minutes",
    notes: "",
  })

  const connectGoogleCalendar = () => {
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true)
      toast({
        title: "Calendar Connected",
        description: "Google Calendar has been successfully connected",
      })
    }, 1000)
  }

  const createGoogleCalendarEvent = (event: CalendarEvent | typeof newEvent) => {
    const startDate = new Date(`${event.date}T${event.time}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Default 1 hour

    let description = `Candidate: ${event.candidate}\nType: ${event.type}`
    if ("notes" in event && event.notes) description += `\nNotes: ${event.notes}`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(description)}`

    window.open(googleCalendarUrl, "_blank")
  }

  const addEvent = () => {
    if (!newEvent.title || !newEvent.candidate || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      type: newEvent.type,
      candidate: newEvent.candidate,
      date: newEvent.date,
      time: newEvent.time,
      duration: newEvent.duration,
      status: "scheduled",
    }

    setEvents([...events, event])

    // Also create in Google Calendar
    createGoogleCalendarEvent(newEvent)

    setNewEvent({
      title: "",
      type: "interview",
      candidate: "",
      date: "",
      time: "",
      duration: "30 minutes",
      notes: "",
    })
    setShowNewEvent(false)

    toast({
      title: "Event Created",
      description: `${event.title} has been scheduled and added to Google Calendar`,
    })
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "interview":
        return <Users className="h-4 w-4" />
      case "contract":
        return <CheckCircle className="h-4 w-4" />
      case "visitation":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-blue-100 text-blue-800"
      case "contract":
        return "bg-green-100 text-green-800"
      case "visitation":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Google Calendar Integration
          </CardTitle>
          <CardDescription>Manage driver interviews and appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Connect Your Google Calendar</h3>
                <p className="text-muted-foreground">Sync driver interviews and appointments automatically</p>
              </div>
              <Button onClick={connectGoogleCalendar} className="w-full max-w-sm">
                <Calendar className="mr-2 h-4 w-4" />
                Connect Google Calendar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                  <span className="text-sm">bridgeocean@cyberservices.com</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowNewEvent(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Event Form */}
      {showNewEvent && isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Event</CardTitle>
            <CardDescription>Create a new appointment and add to Google Calendar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interview">Driver Interview</SelectItem>
                    <SelectItem value="contract">Contract Signing</SelectItem>
                    <SelectItem value="visitation">Home Visitation</SelectItem>
                    <SelectItem value="meeting">General Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Candidate Name</Label>
                <Input
                  value={newEvent.candidate}
                  onChange={(e) => setNewEvent({ ...newEvent, candidate: e.target.value })}
                  placeholder="Enter candidate name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Driver Interview - John Doe"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Select
                  value={newEvent.duration}
                  onValueChange={(value) => setNewEvent({ ...newEvent, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="45 minutes">45 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={addEvent} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled appointments and interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {getEventIcon(event.type)}
                      <h4 className="font-semibold">{event.title}</h4>
                      <Badge className={getEventColor(event.type)}>{event.type}</Badge>
                      <Badge variant={event.status === "completed" ? "default" : "secondary"}>{event.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.candidate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time} ({event.duration})
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => createGoogleCalendarEvent(event)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://calendar.google.com", "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

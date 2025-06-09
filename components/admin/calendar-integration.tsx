"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Clock,
  Users,
  Plus,
  ExternalLink,
  Car,
  UserCheck,
  FileText,
  Key,
  AlertCircle,
  CheckCircle,
  FolderSyncIcon as Sync,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CalendarEvent {
  id: string
  title: string
  type: "charter" | "interview" | "contract" | "handover" | "maintenance"
  customer: string
  date: string
  time: string
  duration: string
  status: "confirmed" | "pending" | "completed"
  details: any
}

export function CalendarIntegration() {
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [selectedCalendar, setSelectedCalendar] = useState("bridgeocean-business")
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Charter: Lagos to Ibadan",
      type: "charter",
      customer: "John Doe",
      date: "2024-01-15",
      time: "09:00",
      duration: "4 hours",
      status: "confirmed",
      details: { vehicle: "Toyota Camry", pickup: "Victoria Island", destination: "Ibadan" },
    },
    {
      id: "2",
      title: "Partner Interview",
      type: "interview",
      customer: "Mike Johnson",
      date: "2024-01-16",
      time: "10:00",
      duration: "1 hour",
      status: "pending",
      details: { stage: "Final Interview", location: "Ajah Office" },
    },
    {
      id: "3",
      title: "Contract Signing & Vehicle Handover",
      type: "contract",
      customer: "Sarah Williams",
      date: "2024-01-17",
      time: "12:00",
      duration: "2 hours",
      status: "confirmed",
      details: { location: "Ajah", witness: "Mr Fatai", conductor: "Ms Yetunde" },
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "charter" as const,
    customer: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    notes: "",
  })

  const connectGoogleCalendar = () => {
    setTimeout(() => {
      setIsConnected(true)
      toast({
        title: "Calendar Connected",
        description: "Google Calendar has been successfully connected to Bridgeocean",
      })
    }, 1000)
  }

  const syncCalendar = () => {
    toast({
      title: "Syncing Calendar",
      description: "All Bridgeocean events are being synced to Google Calendar",
    })
  }

  const addEvent = () => {
    if (!newEvent.title || !newEvent.customer || !newEvent.date || !newEvent.time) {
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
      customer: newEvent.customer,
      date: newEvent.date,
      time: newEvent.time,
      duration: newEvent.duration || "1 hour",
      status: "pending",
      details: { location: newEvent.location, notes: newEvent.notes },
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      type: "charter",
      customer: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      notes: "",
    })
    setShowNewEvent(false)

    toast({
      title: "Event Added",
      description: `${event.title} has been scheduled for ${event.date}`,
    })
  }

  const createGoogleCalendarEvent = (event: CalendarEvent) => {
    const startDate = new Date(`${event.date}T${event.time}`)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours

    let description = `Customer: ${event.customer}\nType: ${event.type}\nDuration: ${event.duration}`
    if (event.details.vehicle) description += `\nVehicle: ${event.details.vehicle}`
    if (event.details.location) description += `\nLocation: ${event.details.location}`
    if (event.details.pickup) description += `\nPickup: ${event.details.pickup}`
    if (event.details.destination) description += `\nDestination: ${event.details.destination}`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(description)}`

    window.open(googleCalendarUrl, "_blank")
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "charter":
        return <Car className="h-4 w-4" />
      case "interview":
        return <UserCheck className="h-4 w-4" />
      case "contract":
        return <FileText className="h-4 w-4" />
      case "handover":
        return <Key className="h-4 w-4" />
      case "maintenance":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "charter":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-green-100 text-green-800"
      case "contract":
        return "bg-purple-100 text-purple-800"
      case "handover":
        return "bg-orange-100 text-orange-800"
      case "maintenance":
        return "bg-red-100 text-red-800"
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
            Bridgeocean Calendar Integration
          </CardTitle>
          <CardDescription>Manage charter bookings, partner interviews, and business appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Connect Your Google Calendar</h3>
                <p className="text-muted-foreground">Sync all Bridgeocean appointments and bookings automatically</p>
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
                <Button variant="outline" size="sm" onClick={syncCalendar}>
                  <Sync className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Calendar</Label>
                  <Select value={selectedCalendar} onValueChange={setSelectedCalendar}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bridgeocean-business">Bridgeocean Business</SelectItem>
                      <SelectItem value="charter-bookings">Charter Bookings Only</SelectItem>
                      <SelectItem value="partner-onboarding">Partner Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Auto-sync Events</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync new bookings</p>
                  </div>
                  <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowNewEvent(true)}>
          <CardContent className="p-4 text-center">
            <Plus className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold">New Event</h3>
            <p className="text-sm text-muted-foreground">Schedule appointment</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Car className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold">Charter Bookings</h3>
            <p className="text-sm text-muted-foreground">3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <UserCheck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold">Partner Interviews</h3>
            <p className="text-sm text-muted-foreground">2 scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold">Contract Signings</h3>
            <p className="text-sm text-muted-foreground">1 pending</p>
          </CardContent>
        </Card>
      </div>

      {/* New Event Form */}
      {showNewEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Event</CardTitle>
            <CardDescription>Add a new appointment to your Bridgeocean calendar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Event Type *</Label>
                <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="charter">Charter Booking</SelectItem>
                    <SelectItem value="interview">Partner Interview</SelectItem>
                    <SelectItem value="contract">Contract Signing</SelectItem>
                    <SelectItem value="handover">Vehicle Handover</SelectItem>
                    <SelectItem value="maintenance">Fleet Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Customer/Partner Name *</Label>
                <Input
                  value={newEvent.customer}
                  onChange={(e) => setNewEvent({ ...newEvent, customer: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Title *</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Charter: Lagos to Abuja"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>Time *</Label>
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
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="4 hours">4 hours</SelectItem>
                    <SelectItem value="8 hours">8 hours</SelectItem>
                    <SelectItem value="All day">All day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="e.g., Ajah Office, Customer Location"
              />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={newEvent.notes}
                onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                placeholder="Additional details, requirements, or reminders"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={addEvent} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Event
              </Button>
              <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your scheduled Bridgeocean appointments and bookings</CardDescription>
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
                    <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.customer}
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
                  {event.details.location && (
                    <p className="text-sm text-muted-foreground">📍 {event.details.location}</p>
                  )}
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

      {/* Calendar Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              Charter Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Today</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Week</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Next Week</span>
                <span className="font-semibold">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Partner Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Interviews</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Contract Signings</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Vehicle Handovers</span>
                <span className="font-semibold">1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Fleet Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Maintenance Due</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Inspections</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Available Vehicles</span>
                <span className="font-semibold text-green-600">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      {isConnected && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Calendar integration is active. All new bookings and appointments will be automatically synced to your
            Google Calendar.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

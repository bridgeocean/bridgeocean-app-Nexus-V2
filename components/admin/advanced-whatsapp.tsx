"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Users, Clock, Car, Calendar, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AdvancedWhatsApp() {
  const { toast } = useToast()
  const [selectedContact, setSelectedContact] = useState("")
  const [messageTemplate, setMessageTemplate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [selectedFromNumber, setSelectedFromNumber] = useState("+234 906 918 3165") // Default to primary

  // Load WhatsApp settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("bridgeocean_whatsapp_settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      const defaultNumber = settings.numbers?.find((n) => n.isDefault)
      if (defaultNumber) {
        setSelectedFromNumber(defaultNumber.number)
      }
    }
  }, [])

  // E-hailing drivers for inspections and services
  const ehailingDrivers = [
    {
      id: "1",
      name: "Mike Johnson",
      phone: "+234 813 526 1568",
      vehicle: "Toyota Camry",
      lastInspection: "2025-06-03",
      nextInspection: "2025-06-10",
      lastService: "2025-04-28",
      nextService: "2025-06-28",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Williams",
      phone: "+234 805 123 4567",
      vehicle: "GMC Terrain",
      lastInspection: "2025-06-03",
      nextInspection: "2025-06-10",
      lastService: "2025-04-28",
      nextService: "2025-06-28",
      status: "active",
    },
    {
      id: "3",
      name: "David Chen",
      phone: "+234 701 987 6543",
      vehicle: "Toyota Camry",
      lastInspection: "2025-06-03",
      nextInspection: "2025-06-10",
      lastService: "2025-03-30",
      nextService: "2025-05-30",
      status: "service_due",
    },
  ]

  // Charter customers and partners
  const charterContacts = [
    { id: "4", name: "John Doe", phone: "+234 813 526 1568", type: "customer", lastMessage: "2 hours ago" },
    { id: "5", name: "Jane Smith", phone: "+234 805 123 4567", type: "partner", lastMessage: "1 day ago" },
    { id: "6", name: "Corporate Client", phone: "+234 701 987 6543", type: "customer", lastMessage: "3 days ago" },
  ]

  const messageTemplates = {
    // E-hailing driver templates
    inspection_reminder: {
      title: "Weekly Inspection Reminder",
      content: `🔧 *Bridgeocean Weekly Inspection Reminder*

Hello {{driverName}},

This is a reminder for your weekly vehicle inspection:

📅 Date: Tuesday, {{inspectionDate}}
🕐 Time: 10:00 AM
📍 Location: Yaba Mechanic Workshop
🚗 Vehicle: {{vehicle}}

Please ensure your vehicle is ready for inspection. Bring all necessary documents.

*Important:* Attendance is mandatory for all active drivers.

Thank you,
Bridgeocean Drive Team`,
    },
    service_reminder: {
      title: "Bi-Monthly Service Reminder",
      content: `🛠️ *Bridgeocean Bi-Monthly Service Notice*

Hello {{driverName}},

Your vehicle is due for bi-monthly general service:

📅 Service Date: Saturday, {{serviceDate}}
🕐 Time: 9:00 AM
📍 Location: Designated Service Center
🚗 Vehicle: {{vehicle}}

*Service Requirements:*
- Engine oil change
- Brake inspection
- Tire rotation
- General maintenance check

*Financial Contribution:* Remember your ₦1,000 daily contribution helps cover service costs.

Please confirm your attendance.

Bridgeocean Drive Team`,
    },
    remittance_reminder: {
      title: "Weekly Remittance Reminder",
      content: `💰 *Weekly Remittance Due - Bridgeocean*

Hello {{driverName}},

Your weekly remittance is due:

📅 Due Date: Sunday (End of Week)
💵 Amount: {{remittanceAmount}}
🏦 Account: Bridgeocean Limited
📱 Transfer Details: [Account Number]

*Week Period:* {{weekStart}} to {{weekEnd}}

Please ensure payment is made before Sunday midnight.

Thank you,
Bridgeocean Drive Team`,
    },
    // Charter service templates
    booking_confirmation: {
      title: "Charter Booking Confirmation",
      content: `🚗 *Bridgeocean Charter Booking Confirmed*

Hello {{customerName}},

Your charter booking has been confirmed:

📅 Date: {{date}}
🕐 Time: {{time}}
📍 Pickup: {{pickupLocation}}
📍 Destination: {{destination}}
🚗 Vehicle: {{vehicle}}
👨‍💼 Driver: {{driverName}}

Our driver will contact you 30 minutes before pickup.

Thank you for choosing Bridgeocean!`,
    },
    partner_welcome: {
      title: "Partner Welcome Message",
      content: `🤝 *Welcome to Bridgeocean Partnership*

Hello {{partnerName}},

Welcome to the Bridgeocean family!

Your partnership application has been approved. Here are your next steps:

📋 Contract Signing: {{contractDate}}
📍 Location: Ajah Office
🕐 Time: 12:00 PM
👥 Contact: Ms Yetunde & Mr Fatai

*Required Documents:*
- LASRRA Card
- LASDRI Card
- Valid Driver's License
- 2 Guarantors
- 3 Referees

*Caution Fee:* ₦350,000 (refundable)

We look forward to a successful partnership!

Bridgeocean Drive Team`,
    },
  }

  const broadcastGroups = [
    { id: "ehailing_drivers", name: "E-hailing Drivers", count: 25, description: "Active e-hailing drivers" },
    { id: "charter_customers", name: "Charter Customers", count: 156, description: "Charter service customers" },
    { id: "partners", name: "Partners", count: 23, description: "Registered partners" },
    { id: "pending_partners", name: "Pending Partners", count: 12, description: "Awaiting approval" },
  ]

  const sendMessage = (phone: string, message: string, fromNumber?: string) => {
    const numberToUse = fromNumber || selectedFromNumber
    const formattedPhone = phone.replace(/\s+/g, "").replace("+", "")
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, "_blank")

    toast({
      title: "Message Sent",
      description: `WhatsApp opened for ${phone} from ${numberToUse}`,
    })
  }

  const sendInspectionReminders = () => {
    const driversNeedingInspection = ehailingDrivers.filter((driver) => {
      const nextInspection = new Date(driver.nextInspection)
      const today = new Date()
      const daysDiff = Math.ceil((nextInspection.getTime() - today.getTime()) / (1000 * 3600 * 24))
      return daysDiff <= 1 // Send reminder 1 day before
    })

    driversNeedingInspection.forEach((driver) => {
      const message = messageTemplates.inspection_reminder.content
        .replace(/{{driverName}}/g, driver.name)
        .replace(/{{inspectionDate}}/g, driver.nextInspection)
        .replace(/{{vehicle}}/g, driver.vehicle)

      sendMessage(driver.phone, message)
    })

    toast({
      title: "Inspection Reminders Sent",
      description: `Sent to ${driversNeedingInspection.length} drivers`,
    })
  }

  const sendServiceReminders = () => {
    const driversNeedingService = ehailingDrivers.filter((driver) => {
      const nextService = new Date(driver.nextService)
      const today = new Date()
      const daysDiff = Math.ceil((nextService.getTime() - today.getTime()) / (1000 * 3600 * 24))
      return daysDiff <= 3 // Send reminder 3 days before
    })

    driversNeedingService.forEach((driver) => {
      const message = messageTemplates.service_reminder.content
        .replace(/{{driverName}}/g, driver.name)
        .replace(/{{serviceDate}}/g, driver.nextService)
        .replace(/{{vehicle}}/g, driver.vehicle)

      sendMessage(driver.phone, message)
    })

    toast({
      title: "Service Reminders Sent",
      description: `Sent to ${driversNeedingService.length} drivers`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">E-hailing Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ehailingDrivers.length}</div>
            <p className="text-sm text-muted-foreground">Active drivers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Charter Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{charterContacts.filter((c) => c.type === "customer").length}</div>
            <p className="text-sm text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Messages Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-sm text-muted-foreground">+12 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-sm text-muted-foreground">Within 1 hour</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ehailing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ehailing">E-hailing Management</TabsTrigger>
          <TabsTrigger value="charter">Charter Communications</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="ehailing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={sendInspectionReminders} className="w-full justify-start">
                  <Car className="h-4 w-4 mr-2" />
                  Send Inspection Reminders (Tuesday 10am)
                </Button>
                <Button onClick={sendServiceReminders} className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Send Service Reminders (Bi-monthly)
                </Button>
                <Button className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Send Remittance Reminders (Sunday)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driver Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Active Drivers</span>
                  <Badge variant="default">{ehailingDrivers.filter((d) => d.status === "active").length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Service Due</span>
                  <Badge variant="destructive">
                    {ehailingDrivers.filter((d) => d.status === "service_due").length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Inspection Due</span>
                  <Badge variant="secondary">2</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>E-hailing Driver Management</CardTitle>
              <CardDescription>Manage inspections, services, and remittances for active drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ehailingDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Car className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{driver.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {driver.vehicle} • {driver.phone}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs">Next Inspection: {driver.nextInspection}</span>
                          <span className="text-xs">Next Service: {driver.nextService}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={driver.status === "active" ? "default" : "destructive"}>
                        {driver.status.replace("_", " ")}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          sendMessage(driver.phone, "Hello! This is a message from Bridgeocean Drive team.")
                        }
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Charter Service Communications</CardTitle>
              <CardDescription>Manage communications with charter customers and partners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Recipient</Label>
                  <Select value={selectedContact} onValueChange={setSelectedContact}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact" />
                    </SelectTrigger>
                    <SelectContent>
                      {charterContacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.phone}>
                          {contact.name} ({contact.type}) - {contact.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Template</Label>
                  <Select
                    onValueChange={(value) =>
                      setMessageTemplate(messageTemplates[value as keyof typeof messageTemplates]?.content || "")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                      <SelectItem value="partner_welcome">Partner Welcome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Send From Number</Label>
                <Select value={selectedFromNumber} onValueChange={setSelectedFromNumber}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select WhatsApp number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+234 906 918 3165">+234 906 918 3165 (Primary Business Line)</SelectItem>
                    <SelectItem value="+234 913 563 0154">+234 913 563 0154 (WhatsApp Only Line)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  rows={8}
                />
              </div>

              <Button
                onClick={() => sendMessage(selectedContact, messageTemplate)}
                disabled={!selectedContact || !messageTemplate}
                className="w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Broadcast Messages</CardTitle>
              <CardDescription>Send messages to multiple contacts at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {broadcastGroups.map((group) => (
                  <Card key={group.id} className="cursor-pointer hover:bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">{group.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{group.count}</div>
                          <Button size="sm" variant="outline">
                            <Users className="h-4 w-4 mr-2" />
                            Select
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Broadcast Message</Label>
                <Textarea placeholder="Type your broadcast message here..." rows={4} />
              </div>

              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Broadcast
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(messageTemplates).map(([key, template]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap">{template.content}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>E-hailing Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Inspection Compliance</span>
                  <span className="font-bold">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Compliance</span>
                  <span className="font-bold">88%</span>
                </div>
                <div className="flex justify-between">
                  <span>Remittance On-time</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response Time</span>
                  <span className="font-bold">15 min</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Delivery Rate</span>
                  <span className="font-bold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Read Rate</span>
                  <span className="font-bold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Rate</span>
                  <span className="font-bold">64%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

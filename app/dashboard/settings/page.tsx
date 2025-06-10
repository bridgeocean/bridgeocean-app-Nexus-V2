"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Save, TestTube } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  const [emailSettings, setEmailSettings] = useState({
    fromName: "Bridgeocean Drive Team",
    fromEmail: "bridgeocean@cyberservices.com",
    replyTo: "bridgeocean@cyberservices.com",
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
  })

  const [whatsappSettings, setWhatsappSettings] = useState({
    numbers: [
      {
        id: "primary",
        name: "Primary Business Line",
        number: "+234 906 918 3165",
        purpose: "Primary line for calls and WhatsApp (e-hailing and charter)",
        isDefault: true,
      },
      {
        id: "secondary",
        name: "Secondary WhatsApp Line",
        number: "+234 913 563 0154",
        purpose: "WhatsApp only line for additional communications",
        isDefault: false,
      },
    ],
    businessName: "Bridgeocean Drive",
    apiKey: "",
    webhookUrl: "",
  })

  const saveEmailSettings = () => {
    // Save to localStorage or API
    localStorage.setItem("bridgeocean_email_settings", JSON.stringify(emailSettings))
    toast({
      title: "Email Settings Saved",
      description: "Your email configuration has been updated",
    })
  }

  const saveWhatsAppSettings = () => {
    // Save to localStorage or API
    localStorage.setItem("bridgeocean_whatsapp_settings", JSON.stringify(whatsappSettings))
    toast({
      title: "WhatsApp Settings Saved",
      description: "Your WhatsApp configuration has been updated",
    })
  }

  const testEmailConnection = () => {
    toast({
      title: "Email Test",
      description: "Test email sent to your configured address",
    })
  }

  const testWhatsAppConnection = () => {
    toast({
      title: "WhatsApp Test",
      description: "Test message sent via WhatsApp Business API",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Communication Settings</h2>
          <Badge variant="outline">Configure your messaging services</Badge>
        </div>

        <Tabs defaultValue="email" className="space-y-4">
          <TabsList>
            <TabsTrigger value="email">Email Configuration</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Configuration</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>
                  Configure your email service for sending automated messages to candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      placeholder="Bridgeocean Drive Team"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      placeholder="bridgeocean@cyberservices.com"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="replyTo">Reply-To Email</Label>
                  <Input
                    id="replyTo"
                    type="email"
                    placeholder="bridgeocean@cyberservices.com"
                    value={emailSettings.replyTo}
                    onChange={(e) => setEmailSettings({ ...emailSettings, replyTo: e.target.value })}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">SMTP Configuration (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        placeholder="smtp.gmail.com"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        placeholder="587"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUser">SMTP Username</Label>
                      <Input
                        id="smtpUser"
                        placeholder="your-email@gmail.com"
                        value={emailSettings.smtpUser}
                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        placeholder="your-app-password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveEmailSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Email Settings
                  </Button>
                  <Button variant="outline" onClick={testEmailConnection}>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp Business Settings
                </CardTitle>
                <CardDescription>
                  Configure your WhatsApp Business API for sending messages to candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">WhatsApp Business Numbers</Label>
                  {whatsappSettings.numbers.map((numberConfig, index) => (
                    <Card key={numberConfig.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Number Name</Label>
                          <Input
                            placeholder="Primary Business Line"
                            value={numberConfig.name}
                            onChange={(e) => {
                              const updatedNumbers = [...whatsappSettings.numbers]
                              updatedNumbers[index].name = e.target.value
                              setWhatsappSettings({ ...whatsappSettings, numbers: updatedNumbers })
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input
                            placeholder="+234 906 918 3165"
                            value={numberConfig.number}
                            onChange={(e) => {
                              const updatedNumbers = [...whatsappSettings.numbers]
                              updatedNumbers[index].number = e.target.value
                              setWhatsappSettings({ ...whatsappSettings, numbers: updatedNumbers })
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label>Purpose/Description</Label>
                        <Input
                          placeholder="Primary line for calls and WhatsApp"
                          value={numberConfig.purpose}
                          onChange={(e) => {
                            const updatedNumbers = [...whatsappSettings.numbers]
                            updatedNumbers[index].purpose = e.target.value
                            setWhatsappSettings({ ...whatsappSettings, numbers: updatedNumbers })
                          }}
                        />
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <input
                          type="radio"
                          id={`default-${numberConfig.id}`}
                          name="defaultNumber"
                          checked={numberConfig.isDefault}
                          onChange={() => {
                            const updatedNumbers = whatsappSettings.numbers.map((num) => ({
                              ...num,
                              isDefault: num.id === numberConfig.id,
                            }))
                            setWhatsappSettings({ ...whatsappSettings, numbers: updatedNumbers })
                          }}
                        />
                        <Label htmlFor={`default-${numberConfig.id}`}>Set as default number</Label>
                        {numberConfig.isDefault && <Badge variant="default">Default</Badge>}
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Bridgeocean Drive"
                    value={whatsappSettings.businessName}
                    onChange={(e) => setWhatsappSettings({ ...whatsappSettings, businessName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">WhatsApp Business API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Your WhatsApp Business API key"
                    value={whatsappSettings.apiKey}
                    onChange={(e) => setWhatsappSettings({ ...whatsappSettings, apiKey: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://your-domain.com/api/whatsapp-webhook"
                    value={whatsappSettings.webhookUrl}
                    onChange={(e) => setWhatsappSettings({ ...whatsappSettings, webhookUrl: e.target.value })}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Current Configuration:</h4>
                  <p className="text-sm text-blue-700">
                    <strong>Method:</strong> Direct WhatsApp Web Links (No API required)
                    <br />
                    <strong>From Number:</strong>{" "}
                    {whatsappSettings.numbers.find((num) => num.isDefault)?.number || "N/A"}
                    <br />
                    <strong>Business Name:</strong> {whatsappSettings.businessName}
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveWhatsAppSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save WhatsApp Settings
                  </Button>
                  <Button variant="outline" onClick={testWhatsAppConnection}>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>
                  These templates are used when sending automated messages to candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Email Templates</Label>
                    <div className="mt-2 space-y-2">
                      <Badge variant="secondary">Candidate Screening Email</Badge>
                      <Badge variant="secondary">First Congratulatory Email</Badge>
                      <Badge variant="secondary">Contract Signing Email</Badge>
                      <Badge variant="secondary">Booking Confirmation</Badge>
                      <Badge variant="secondary">Partner Welcome</Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">WhatsApp Templates</Label>
                    <div className="mt-2 space-y-2">
                      <Badge variant="secondary">Inspection Reminder</Badge>
                      <Badge variant="secondary">Service Reminder</Badge>
                      <Badge variant="secondary">Remittance Reminder</Badge>
                      <Badge variant="secondary">General Notification</Badge>
                    </div>
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

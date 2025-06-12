"use client"

import { MainNav } from "@/components/main-nav"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"
import { WhatsAppAIAssistant } from "@/components/whatsapp-ai-assistant"
import { WhatsAppGrokAI } from "@/components/whatsapp-grok-ai"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Settings, MessageCircle, ExternalLink, Bot, Sparkles } from "lucide-react"
import { MeetingAssistant } from "@/app/dashboard/components/meeting-assistant"

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
              Simple AI
            </TabsTrigger>
            <TabsTrigger value="grok-ai">
              <Sparkles className="h-4 w-4 mr-2" />
              Grok AI
            </TabsTrigger>
            <TabsTrigger value="meeting-ai">
              <Bot className="h-4 w-4 mr-2" />
              Meeting AI
            </TabsTrigger>
            <TabsTrigger value="business">Business Setup</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-4">
            <WhatsAppIntegration />
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-4">
            <WhatsAppAIAssistant />
          </TabsContent>

          <TabsContent value="grok-ai" className="space-y-4">
            <WhatsAppGrokAI />
          </TabsContent>

          <TabsContent value="meeting-ai" className="space-y-4">
            <MeetingAssistant />
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
                    Test Secondary WhatsApp (+234 913 563 0154)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open("https://business.whatsapp.com/", "_blank")}
                  >
                    WhatsApp Business Web
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
                    <span className="text-sm">Webhook</span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Not Set</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Grok AI</span>
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Option 1: Twilio (Recommended)</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Sign up at{" "}
                        <a
                          href="https://twilio.com/whatsapp"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                          rel="noreferrer"
                        >
                          twilio.com/whatsapp
                        </a>
                      </li>
                      <li>Verify your business phone number</li>
                      <li>Apply for WhatsApp Business API</li>
                      <li>Get your Account SID and Auth Token</li>
                      <li>Add credentials to your platform</li>
                    </ol>
                    <Button onClick={() => window.open("https://twilio.com/whatsapp", "_blank")} className="w-full">
                      Get Started with Twilio
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Option 2: Facebook Direct</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Go to{" "}
                        <a
                          href="https://business.whatsapp.com/api"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                          rel="noreferrer"
                        >
                          WhatsApp Business API
                        </a>
                      </li>
                      <li>Apply for API access</li>
                      <li>Complete business verification</li>
                      <li>Wait for approval (1-4 weeks)</li>
                      <li>Set up webhook and credentials</li>
                    </ol>
                    <Button
                      variant="outline"
                      onClick={() => window.open("https://business.whatsapp.com/api", "_blank")}
                      className="w-full"
                    >
                      Apply for Facebook API
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Status: WhatsApp Web Integration</h4>
                  <p className="text-sm text-gray-600">
                    Your platform currently uses WhatsApp Web links for immediate messaging. This works right now and
                    allows you to send messages to customers directly. Once you get API access, we can upgrade to
                    automated messaging.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

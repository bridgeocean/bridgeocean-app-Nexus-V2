"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EmailAutomation() {
  const { toast } = useToast()
  const [emailSettings, setEmailSettings] = useState({
    autoBookingConfirmation: true,
    autoPartnerWelcome: true,
    autoContactResponse: true,
    reminderEmails: true,
  })

  const emailTemplates = {
    candidateScreening: {
      subject: "Bridgeocean Limited - Driver Partnership Opportunity",
      body: `Dear {{candidateName}},

Thank you for your interest in partnering with Bridgeocean Limited.

We are pleased to invite you to complete our driver onboarding process. Please find below the initial screening requirements:

📋 **Bio-Data Required:**
• Name: 
• Age:
• Location:
• Driving experience:
• Bolt/Uber experience:
• Current/Past job:
• Marital status:
• Education background:
• State of Origin:
• LGA:

📋 **Status Information:**
• Married with how many kids:
• Where does your family reside:

✅ **Requirements Checklist (Please respond Y/N):**
1. 2 Guarantors ___
2. Consent to payment of caution fees (₦350,000) ___
   *The caution fees is your money and we won't be requesting for it until the last stage of contract signing and key handover.
3. Valid license ___
4. LASRRA card ___
5. LASDRI card ___
6. 3 Referees ___

🏠 **Accommodation Details:**
• Is your house a gated apartment with a compound?
• All our cars are fitted with trackers, and we'll need geocoordinates of where you'll park the car each night.
• Please note: driving limit is within Lagos.

📱 **Next Steps:**
Please complete this information and send via WhatsApp to +234 906 918 3165.

**LASRRA Registration:** https://registration.lagosresidents.gov.ng/register/

We look forward to building a successful partnership with you.

Best regards,

Bridgeocean Drive
For
Bridgeocean Limited`,
    },

    firstEmail: {
      subject: "Congratulations and Next Steps - Bridgeocean Limited",
      body: `Dear {{candidateName}},

Thank you once again for your time and participation in the onboarding process. We hope it was an enjoyable experience.

We are pleased to inform you that you have been selected for the next and final stage: the contract signing. Below are a few important steps and reminders regarding this process:

1. **Congratulatory Email (this email):**
     ○ **Contract Review:**
     Attached, you will find three samples of the contract you will be signing. Please take your time to review it carefully. Should you have any questions or need clarifications, feel free to reach out to us via WhatsApp.
     
     ○ **Driver's Manual:**
     Also attached is the Driver's Manual specifically designed for Bridgeocean Limited. It contains all the guidelines and processes you will need to be familiar with. Kindly review this document thoroughly.

2. **Please confirm via WhatsApp** once you have read and understood both documents and send over the signature page of the Driver's Manual.

3. **Second Email:**
     After receiving your confirmation, we will send a second email with details regarding the contract signing and other onboarding activities.

Once again, congratulations, and we look forward to building a successful partnership with you.

Best regards,

Bridgeocean Drive
For
Bridgeocean Limited`,
    },

    secondEmail: {
      subject: "Congratulations and Next Steps: Contract Signing, Caution Fees Payment and Vehicle Pick-up",
      body: `Dear {{candidateName}},

Thank you once again for your time and for choosing to partner with Bridgeocean Limited. We hope you had an enjoyable onboarding process.

We are now at the final stage of completing the onboarding process, which includes contract signing and key collection. Please see the important details and steps below:

**Contract Signing and Vehicle Pick-Up:**
• Date: {{contractDate}}
• Location: {{contractLocation}}
• Time: {{contractTime}}
• Individual to Conduct Signing: {{signingOfficer}}
• Witness: {{witnessName}}

**Before Arrival for Contract Signing:**
Please send the signed signature page of the Driver's Manual as a soft copy via WhatsApp (if not already done).

**Online Signing:** Signing the contract online is required.

**Pre-Contract Signing Requirements:**
**Caution Fees Transfer:**
Please transfer the caution fees to the provided account number as mentioned in the contract sample sent in our first email. Once we confirm receipt of the caution fees, the contract signing and key handover will be finalized.

**Post-Contract Signing Tasks:**
• **Vehicle Inspection:** Ensure that the fire extinguisher, jack, extra tires, and all necessary vehicle papers are in place. Your confirmation is required to verify this.
• **This Week's Remittance:** The week's remittance will be calculated from the time of contract signing to Sunday. Sunday is our end of the week, and the expected time to pay the week's remittance.
• **Weekly Inspection:** Inspections occur on Tuesday, usually at 10am. Your first inspection will be the Tuesday following the contract signing at our designated mechanic workshop in Yaba.
• **General Service:** Your first general service will be bi-monthly on the last Saturday of the second month.

**Communication:** You will be added to a WhatsApp group after signing the contract. This group will serve for general information, but private chats with all our drivers are always open.

**Financial Planning:** It is expected that you will join the ₦1,000 daily contribution for drivers. This is part of our initiative to ensure financial security and avoid financial pressure during general services.

Any additional information not listed here will be communicated via WhatsApp.

Once again, congratulations, and we look forward to a positive partnership.

Best regards,

Bridgeocean Drive
For
Bridgeocean Limited`,
    },

    bookingConfirmation: {
      subject: "Booking Confirmation - Bridgeocean Charter Services",
      body: `Dear {{customerName}},

Thank you for booking with Bridgeocean Charter Services!

📋 **Booking Details:**
• Vehicle: {{vehicle}}
• Date: {{date}} at {{time}}
• Pickup: {{pickupLocation}}
• Destination: {{destination}}
• Duration: {{duration}} hours
• Total Cost: {{totalPrice}}

🚗 **What's Next:**
1. Our driver will contact you 30 minutes before pickup
2. Please have your ID ready
3. Our vehicle will arrive at the specified location

📞 **Contact Information:**
• WhatsApp: +234 906 918 3165
• Email: bridgeocean@cyberservices.com

**Please note:** Our driving service is limited to Lagos area.

Thank you for choosing Bridgeocean!

Best regards,
Bridgeocean Team`,
    },

    partnerWelcome: {
      subject: "Welcome to Bridgeocean Partner Network!",
      body: `Dear {{partnerName}},

Welcome to the Bridgeocean Partner Network! 🎉

Your application has been approved and you're now part of our premium logistics network.

📋 **Your Registration Details:**
• Vehicle: {{vehicleMake}} {{vehicleModel}} ({{vehicleYear}})
• License Plate: {{licensePlate}}
• Status: Approved ✅

🚀 **Important Reminders:**
• **Weekly Inspections:** Every Tuesday at 10am at our Yaba workshop
• **General Service:** Bi-monthly on the last Saturday of the second month
• **Remittance:** Due every Sunday (end of our week)
• **Daily Contribution:** ₦1,000 daily contribution expected
• **Driving Limit:** Within Lagos only
• **Vehicle Tracking:** GPS coordinates required for nightly parking

💰 **Financial Information:**
• Caution fees: ₦350,000 (refundable security deposit)
• Weekly remittance due every Sunday
• Daily contribution: ₦1,000 for financial security

📞 **Support:**
• WhatsApp: +234 906 918 3165
• You will be added to our drivers' WhatsApp group
• Private chats always available

**Required Documents Status:**
• Valid License: ✅
• LASRRA Card: ✅
• LASDRI Card: ✅
• 2 Guarantors: ✅
• 3 Referees: ✅

Welcome aboard!

Bridgeocean Drive
For
Bridgeocean Limited`,
    },

    contactResponse: {
      subject: "Thank you for contacting Bridgeocean",
      body: `Dear {{contactName}},

Thank you for reaching out to Bridgeocean!

We have received your message: "{{message}}"

Our team will review your inquiry and respond within 24 hours. For urgent matters, please contact us directly:

📞 **Immediate Contact:**
• WhatsApp: +234 906 918 3165
• Emergency: +234 913 563 0154

🌐 **Our Services:**
• **Charter Services:** Premium vehicle hire within Lagos
• **Nexus Emergency Logistics:** Satellite-powered coordination
• **Partnership Opportunities:** Join our driver network

**Current Fleet:**
• Toyota Camry (2006): ₦100,000 per 10 hours
• GMC Terrain (2011): ₦200,000 per 10 hours

**Partnership Requirements:**
• Valid driving license
• LASRRA and LASDRI cards
• 2 Guarantors and 3 Referees
• ₦350,000 caution fees (refundable)
• Lagos residence with gated parking

Thank you for your interest in Bridgeocean!

Best regards,
Customer Service Team
Bridgeocean Limited`,
    },

    reminderEmail: {
      subject: "Reminder: {{reminderType}} - Bridgeocean Limited",
      body: `Dear {{driverName}},

This is a friendly reminder regarding your upcoming {{reminderType}}.

📅 **Reminder Details:**
• Type: {{reminderType}}
• Date: {{reminderDate}}
• Time: {{reminderTime}}
• Location: {{reminderLocation}}

**Important Notes:**
{{#if isInspection}}
• Weekly inspection at our Yaba workshop
• Please ensure vehicle is clean and ready
• Bring all vehicle documents
{{/if}}

{{#if isService}}
• Bi-monthly general service
• ₦1,000 daily contribution helps cover service costs
• Service typically takes 2-4 hours
{{/if}}

{{#if isRemittance}}
• Weekly remittance due every Sunday
• Calculate from Monday to Sunday
• Send payment confirmation via WhatsApp
{{/if}}

📞 **Contact:**
• WhatsApp: +234 906 918 3165
• Any questions? Reach out anytime

Thank you for being a valued Bridgeocean partner.

Best regards,
Bridgeocean Drive
For
Bridgeocean Limited`,
    },
  }

  const sendTestEmail = async (templateType: string) => {
    toast({
      title: "Test Email Sent",
      description: `${templateType} template sent to your email`,
    })
  }

  const toggleAutomation = (setting: string) => {
    setEmailSettings((prev) => ({
      ...prev,
      [setting as keyof typeof prev]: !prev[setting as keyof typeof prev],
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Automation Settings
          </CardTitle>
          <CardDescription>Configure automated email notifications for your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label>Booking Confirmations</Label>
                <p className="text-sm text-muted-foreground">Auto-send booking confirmations</p>
              </div>
              <Switch
                checked={emailSettings.autoBookingConfirmation}
                onCheckedChange={() => toggleAutomation("autoBookingConfirmation")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label>Partner Welcome</Label>
                <p className="text-sm text-muted-foreground">Welcome new partners</p>
              </div>
              <Switch
                checked={emailSettings.autoPartnerWelcome}
                onCheckedChange={() => toggleAutomation("autoPartnerWelcome")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label>Contact Responses</Label>
                <p className="text-sm text-muted-foreground">Auto-respond to contact forms</p>
              </div>
              <Switch
                checked={emailSettings.autoContactResponse}
                onCheckedChange={() => toggleAutomation("autoContactResponse")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label>Reminder Emails</Label>
                <p className="text-sm text-muted-foreground">Send booking reminders</p>
              </div>
              <Switch
                checked={emailSettings.reminderEmails}
                onCheckedChange={() => toggleAutomation("reminderEmails")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="queue">Email Queue</TabsTrigger>
          <TabsTrigger value="analytics">Email Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(emailTemplates).map(([key, template]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => sendTestEmail(key)}>
                      <Send className="h-4 w-4 mr-2" />
                      Test Send
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input value={template.subject} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Body</Label>
                    <Textarea value={template.body} readOnly rows={8} className="font-mono text-sm" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">customerName</Badge>
                    <Badge variant="secondary">vehicle</Badge>
                    <Badge variant="secondary">date</Badge>
                    <Badge variant="secondary">totalPrice</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Queue Status</CardTitle>
              <CardDescription>Monitor pending and sent emails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Sent Today</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Failed</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Open Rate</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Click Rate</span>
                    <span className="font-bold">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Rate</span>
                    <span className="font-bold">99%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Booking confirmation sent</span>
                    <span className="text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Partner welcome sent</span>
                    <span className="text-muted-foreground">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Contact response sent</span>
                    <span className="text-muted-foreground">1 hour ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Copy, ExternalLink, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const EMAIL_TEMPLATES = {
  screening: {
    subject: "Bridgeocean Driver Application - Bio-data Requirements",
    body: `Dear [CANDIDATE_NAME],

Thank you for your interest in becoming a Bridgeocean partner driver.

To proceed with your application, please provide the following bio-data:

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
Bridgeocean Drive Team
bridgeocean@cyberservices.com
+234 906 918 3165`,
  },
  interview: {
    subject: "Interview Invitation - Bridgeocean Drive Partnership",
    body: `Dear [CANDIDATE_NAME],

Congratulations! You have successfully passed our initial screening process.

We are pleased to invite you for an interview to discuss your partnership with Bridgeocean Drive.

📅 **Interview Details:**
• Date: [INTERVIEW_DATE]
• Time: [INTERVIEW_TIME]
• Location: Ajah Office, Lagos
• Duration: Approximately 30-45 minutes
• Interviewer: Ms. Yetunde & Mr. Fatai

📋 **What to Bring:**
• Valid Driver's License
• LASRRA Card (or application receipt)
• LASDRI Card (or application receipt)
• Passport photographs (2 copies)
• Guarantor contact information
• Any questions you may have

🏢 **Office Address:**
[Your Ajah Office Address]
Lagos, Nigeria

📞 **Contact Information:**
• WhatsApp: +234 906 918 3165
• Phone: +234 913 563 0154

**Please confirm your attendance by replying to this email or sending a WhatsApp message.**

If you need to reschedule, please contact us at least 24 hours in advance.

We look forward to meeting you and discussing this exciting opportunity.

Best regards,
Bridgeocean Drive Team`,
  },
  email1: {
    subject: "Congratulations and Next Steps - Bridgeocean Limited",
    body: `Dear [CANDIDATE_NAME],

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
Bridgeocean Drive Team
+234 906 918 3165`,
  },
  email2: {
    subject: "Congratulations and Next Steps: Contract Signing, Caution Fees Payment and Vehicle Pick-up",
    body: `Dear [CANDIDATE_NAME],

Thank you once again for your time and for choosing to partner with Bridgeocean Limited. We hope you had an enjoyable onboarding process.

We are now at the final stage of completing the onboarding process, which includes contract signing and key collection. Please see the important details and steps below:

**Contract Signing and Vehicle Pick-Up:**
• Date: [CONTRACT_DATE]
• Location: [CONTRACT_LOCATION]
• Time: [CONTRACT_TIME]
• Individual to Conduct Signing: [SIGNING_OFFICER]
• Witness: [WITNESS_NAME]

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
Bridgeocean Drive Team
+234 906 918 3165`,
  },
}

const EMAIL_CLIENTS = [
  {
    value: "gmail",
    label: "Gmail",
    url: "https://mail.google.com/mail/u/0/#inbox?compose=new",
    supportsPreFill: true,
  },
  {
    value: "outlook",
    label: "Outlook",
    url: "https://outlook.live.com/mail/0/inbox",
    supportsPreFill: false,
  },
  {
    value: "yahoo",
    label: "Yahoo Mail",
    url: "https://mail.yahoo.com/d/compose",
    supportsPreFill: false,
  },
  {
    value: "mail",
    label: "Mail.com",
    url: "https://www.mail.com/",
    supportsPreFill: false,
  },
]

export function EmailAutomation() {
  const { toast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [candidateName, setCandidateName] = useState("")
  const [customSubject, setCustomSubject] = useState("")
  const [customBody, setCustomBody] = useState("")
  const [selectedClient, setSelectedClient] = useState("gmail")
  const [showCopyModal, setShowCopyModal] = useState(false)
  const [copyContent, setCopyContent] = useState("")

  const handleTemplateSelect = (templateKey: string) => {
    setSelectedTemplate(templateKey)
    const template = EMAIL_TEMPLATES[templateKey]
    setCustomSubject(template.subject)
    setCustomBody(template.body)
  }

  const personalizeEmail = () => {
    if (!candidateName) {
      toast({
        title: "Missing Information",
        description: "Please enter candidate name to personalize email",
        variant: "destructive",
      })
      return
    }

    const personalizedSubject = customSubject.replace(/\[CANDIDATE_NAME\]/g, candidateName)
    const personalizedBody = customBody.replace(/\[CANDIDATE_NAME\]/g, candidateName)

    setCustomSubject(personalizedSubject)
    setCustomBody(personalizedBody)

    toast({
      title: "Email Personalized",
      description: `Email personalized for ${candidateName}`,
    })
  }

  // Improved clipboard function with fallback
  const copyToClipboard = async (text: string, type: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        toast({
          title: "Copied",
          description: `${type} copied to clipboard`,
        })
      } else {
        // Fallback for older browsers or non-HTTPS
        fallbackCopyToClipboard(text, type)
      }
    } catch (err) {
      console.error("Clipboard copy failed:", err)
      // Show the content in a modal for manual copying
      setCopyContent(text)
      setShowCopyModal(true)
      toast({
        title: "Copy Manually",
        description: `Please copy the ${type.toLowerCase()} from the popup window`,
        variant: "destructive",
      })
    }
  }

  // Fallback copy method for older browsers
  const fallbackCopyToClipboard = (text: string, type: string) => {
    try {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        toast({
          title: "Copied",
          description: `${type} copied to clipboard`,
        })
      } else {
        throw new Error("Copy command failed")
      }
    } catch (err) {
      // Final fallback - show content for manual copying
      setCopyContent(text)
      setShowCopyModal(true)
      toast({
        title: "Copy Manually",
        description: `Please copy the ${type.toLowerCase()} from the popup window`,
        variant: "destructive",
      })
    }
  }

  const copyAllEmailContent = () => {
    const emailContent = `To: ${recipientEmail}\nSubject: ${customSubject}\n\n${customBody}`
    copyToClipboard(emailContent, "Complete Email")
  }

  const openEmailClient = () => {
    if (!recipientEmail || !customSubject || !customBody) {
      toast({
        title: "Missing Information",
        description: "Please fill in recipient, subject, and body",
        variant: "destructive",
      })
      return
    }

    const client = EMAIL_CLIENTS.find((c) => c.value === selectedClient)
    if (!client) return

    // For Gmail, we can pre-fill the compose window
    if (selectedClient === "gmail") {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customBody)}`
      window.open(gmailUrl, "_blank")
      toast({
        title: "Gmail Opened",
        description: "Gmail compose window opened with pre-filled content",
      })
    } else {
      // For other clients, just open the client and copy content
      window.open(client.url, "_blank")
      copyAllEmailContent()
    }
  }

  const selectedClientInfo = EMAIL_CLIENTS.find((c) => c.value === selectedClient)

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Email Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Pre-built templates for driver onboarding process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(EMAIL_TEMPLATES).map(([key, template]) => (
              <Button
                key={key}
                variant={selectedTemplate === key ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleTemplateSelect(key)}
              >
                <div className="space-y-1">
                  <div className="font-medium capitalize flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {key === "email1"
                      ? "First Email (Contract Review)"
                      : key === "email2"
                        ? "Second Email (Contract Signing)"
                        : key.replace("_", " ")}
                  </div>
                  <div className="text-xs text-muted-foreground">{template.subject}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Email Composer */}
        <Card>
          <CardHeader>
            <CardTitle>Email Composer</CardTitle>
            <CardDescription>Customize and send emails to candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Candidate Name</Label>
                <Input
                  placeholder="Enter candidate name"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Recipient Email</Label>
                <Input
                  type="email"
                  placeholder="candidate@email.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email Client</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EMAIL_CLIENTS.map((client) => (
                    <SelectItem key={client.value} value={client.value}>
                      {client.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedClientInfo && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {selectedClientInfo.supportsPreFill
                      ? "✅ This client supports auto-filling email content"
                      : "📋 Email content will be copied to clipboard - paste it in your email client"}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Subject</Label>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(customSubject, "Subject")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Input value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Email Body</Label>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(customBody, "Email body")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Textarea className="min-h-[200px]" value={customBody} onChange={(e) => setCustomBody(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button onClick={personalizeEmail} variant="outline" className="flex-1">
                Personalize Email
              </Button>
              <Button onClick={openEmailClient} className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Email Client
              </Button>
            </div>

            <Button onClick={copyAllEmailContent} variant="outline" className="w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy Complete Email
            </Button>

            {selectedTemplate && (
              <div className="mt-4">
                <Badge variant="secondary">Template: {selectedTemplate}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Manual Copy Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Copy Content Manually</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCopyModal(false)}>
                ✕
              </Button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please select all the text below and copy it manually (Ctrl+C or Cmd+C):
              </p>
              <Textarea
                value={copyContent}
                readOnly
                className="min-h-[300px] font-mono text-sm"
                onClick={(e) => e.target.select()}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const textarea = document.querySelector("textarea[readonly]")
                    if (textarea) {
                      textarea.select()
                    }
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Select All Text
                </Button>
                <Button onClick={() => setShowCopyModal(false)} className="flex-1">
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

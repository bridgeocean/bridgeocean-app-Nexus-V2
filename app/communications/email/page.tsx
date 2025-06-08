"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function EmailPage() {
  const { toast } = useToast()
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
    attachment: null as File | null,
  })
  const [emailClient, setEmailClient] = useState<string>("web")

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEmailData({
        ...emailData,
        attachment: e.target.files[0],
      })
    }
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    if (emailClient === "web") {
      // Send email using web form
      toast({
        title: "Email Sent",
        description: `Email sent to ${emailData.to}`,
      })
    } else if (emailClient === "mailto") {
      // Open default email client
      const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(
        emailData.subject,
      )}&body=${encodeURIComponent(emailData.body)}`

      window.open(mailtoLink, "_blank")
    } else if (emailClient === "gmail") {
      // Open Gmail compose
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        emailData.to,
      )}&su=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`

      window.open(gmailLink, "_blank")
    } else if (emailClient === "outlook") {
      // Open Outlook compose
      const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
        emailData.to,
      )}&subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`

      window.open(outlookLink, "_blank")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Compose Email</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Email</CardTitle>
            <CardDescription>Compose and send an email to candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendEmail} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-client">Email Client</Label>
                <Select value={emailClient} onValueChange={setEmailClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select email client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Form (BridgeOcean)</SelectItem>
                    <SelectItem value="mailto">Default Email Client</SelectItem>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="outlook">Outlook</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Choose how you want to send this email</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  type="email"
                  placeholder="recipient@example.com"
                  value={emailData.to}
                  onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  placeholder="Type your message here..."
                  className="min-h-[200px]"
                  value={emailData.body}
                  onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment</Label>
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="attachment"
                    className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Paperclip className="h-4 w-4" />
                    {emailData.attachment ? emailData.attachment.name : "Choose file"}
                  </Label>
                  <Input id="attachment" type="file" className="hidden" onChange={handleAttachmentChange} />
                  {emailData.attachment && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEmailData({ ...emailData, attachment: null })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Note: Attachments are only supported when using the web form option
                </p>
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MessageSquare, LogOut, UserPlus } from "lucide-react"
import { CandidateTable } from "./components/candidate-table"
import { EmailAutomation } from "@/components/admin/email-automation"
import { SimpleWhatsApp } from "@/components/simple-whatsapp"
import { GoogleCalendarIntegration } from "@/components/google-calendar-integration"
import Link from "next/link"

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin-login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/")
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bridgeocean Admin Dashboard</h1>
            <p className="text-gray-600">Driver Management & Communication Hub</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/candidates/new">
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add New Driver
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="drivers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="drivers">Driver Management</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="space-y-6">
            {/* Driver Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Screening</CardTitle>
                  <div className="h-4 w-4 bg-blue-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">Awaiting documents</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interview</CardTitle>
                  <div className="h-4 w-4 bg-purple-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">34</div>
                  <p className="text-xs text-muted-foreground">Scheduled this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
                  <div className="h-4 w-4 bg-green-500 rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">Contract signing</p>
                </CardContent>
              </Card>
            </div>

            {/* Driver Management Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Driver Candidates</CardTitle>
                    <CardDescription>
                      Manage candidates through: Screening → Selection → Interview → Onboarding
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/candidates/new">
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Candidate
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <CandidateTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="grid gap-6">
              {/* WhatsApp Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    WhatsApp Communication
                  </CardTitle>
                  <CardDescription>Send messages to candidates via WhatsApp Web</CardDescription>
                </CardHeader>
                <CardContent>
                  <SimpleWhatsApp />
                </CardContent>
              </Card>

              {/* Email Automation */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Automation - Driver Onboarding</CardTitle>
                  <CardDescription>
                    Automated emails for screening, interview invitations, and contract signing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmailAutomation />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Google Calendar Integration
                </CardTitle>
                <CardDescription>Manage interviews and appointments with Google Calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <GoogleCalendarIntegration />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  System configuration, user management, and application settings.
                </p>
                <Button className="mt-4" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

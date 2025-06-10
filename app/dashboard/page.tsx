"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MessageSquare, UserPlus, Users, Mail, Calendar, Bot, BarChart3 } from "lucide-react"
import { CandidateTable } from "./components/candidate-table"
import { RecentActivity } from "./components/recent-activity"
import { Overview } from "./components/overview"
import { EmailAutomation } from "@/components/admin/email-automation"
import { CalendarIntegration } from "@/components/admin/calendar-integration"
import { EnhancedAI } from "@/components/admin/enhanced-ai"
import { AdvancedWhatsApp } from "@/components/admin/advanced-whatsapp"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalCandidates: 0,
    charterBookings: 0,
    activeDrivers: 0,
    whatsappMessages: 127,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem("bridgeoceanAdminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      loadDashboardStats()
    } else {
      router.push("/admin-login")
    }
  }, [router])

  const loadDashboardStats = async () => {
    try {
      // Get total candidates
      const { data: candidates, error: candidatesError } = await supabase
        .from("candidates")
        .select("id", { count: "exact" })

      // Get charter bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from("charter_bookings")
        .select("id", { count: "exact" })

      // Get active drivers (candidates with status 'active')
      const { data: drivers, error: driversError } = await supabase
        .from("candidates")
        .select("id", { count: "exact" })
        .eq("status", "active")

      if (!candidatesError && !bookingsError && !driversError) {
        setStats({
          totalCandidates: candidates?.length || 0,
          charterBookings: bookings?.length || 0,
          activeDrivers: drivers?.length || 0,
          whatsappMessages: 127, // This could also come from a messages table
        })
      }
    } catch (error) {
      console.error("Error loading dashboard stats:", error)
      // Fallback to demo data if database fails
      setStats({
        totalCandidates: 245,
        charterBookings: 18,
        activeDrivers: 64,
        whatsappMessages: 127,
      })
    } finally {
      setLoading(false)
    }
  }

  // Refresh stats when returning to overview tab
  const refreshStats = () => {
    loadDashboardStats()
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Bridgeocean Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/candidates/new">
              <Button onClick={refreshStats}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </Link>
            <Button variant="outline" onClick={refreshStats}>
              🔄 Refresh Data
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          className="space-y-4"
          onValueChange={(value) => {
            if (value === "overview") refreshStats()
          }}
        >
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="email">📧 Email</TabsTrigger>
            <TabsTrigger value="calendar">📅 Calendar</TabsTrigger>
            <TabsTrigger value="ai">🤖 AI Assistant</TabsTrigger>
            <TabsTrigger value="whatsapp">📱 WhatsApp</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="settings" onClick={() => router.push("/dashboard/settings")}>
              ⚙️ Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? "..." : stats.totalCandidates}</div>
                  <p className="text-xs text-muted-foreground">
                    {loading ? "Loading..." : `+${Math.floor(stats.totalCandidates * 0.12)} from last month`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Charter Bookings</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? "..." : stats.charterBookings}</div>
                  <p className="text-xs text-muted-foreground">+2 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active E-hailing Drivers</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? "..." : stats.activeDrivers}</div>
                  <p className="text-xs text-muted-foreground">+6 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">WhatsApp Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.whatsappMessages}</div>
                  <p className="text-xs text-muted-foreground">+23 today</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Business Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions across all services</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Enhanced Email Tools
                </CardTitle>
                <CardDescription>Automated emails with Bridgeocean terminology</CardDescription>
              </CardHeader>
              <CardContent>
                <EmailAutomation />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendar Integration
                </CardTitle>
                <CardDescription>Charter bookings and partner appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarIntegration />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Enhanced AI Assistant
                </CardTitle>
                <CardDescription>Smart responses with Bridgeocean knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedAI />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Advanced WhatsApp Tools
                </CardTitle>
                <CardDescription>Driver management and customer communications</CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedWhatsApp />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics Dashboard
                </CardTitle>
                <CardDescription>Business insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Candidates</CardTitle>
                <CardDescription>Manage and track all driver candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <CandidateTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

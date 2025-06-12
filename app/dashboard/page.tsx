"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  MessageSquare,
  UserPlus,
  Users,
  Mail,
  Calendar,
  BarChart3,
  AlertCircle,
  Briefcase,
} from "lucide-react"
import { CandidateTable } from "./components/candidate-table"
import { RecentActivity } from "./components/recent-activity"
import { Overview } from "./components/overview"
import { EmailAutomation } from "@/components/admin/email-automation"
import { CalendarIntegration } from "@/components/admin/calendar-integration"
import { AdvancedWhatsApp } from "@/components/admin/advanced-whatsapp"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { MeetingAssistant } from "./components/meeting-assistant"
import Link from "next/link"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalCandidates: 0,
    charterBookings: 0,
    activeDrivers: 0,
    whatsappMessages: 127,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      // Check authentication
      const authStatus = localStorage.getItem("bridgeoceanAdminAuth")
      if (authStatus === "true") {
        setIsAuthenticated(true)
        loadDashboardStats()
      } else {
        router.push("/admin-login")
      }
    } catch (err) {
      console.error("Authentication check failed:", err)
      setError("Authentication system error")
      setLoading(false)
    }
  }, [router])

  const loadDashboardStats = async () => {
    try {
      setError(null)

      // Use demo data if Supabase is not configured
      if (!isSupabaseConfigured()) {
        console.log("Using demo data - Supabase not configured")
        setStats({
          totalCandidates: 245,
          charterBookings: 18,
          activeDrivers: 64,
          whatsappMessages: 127,
        })
        setLoading(false)
        return
      }

      // Try to load real data
      try {
        const [candidatesResult, bookingsResult, driversResult] = await Promise.allSettled([
          supabase.from("candidates").select("id", { count: "exact" }),
          supabase.from("charter_bookings").select("id", { count: "exact" }),
          supabase.from("candidates").select("id", { count: "exact" }).eq("status", "active"),
        ])

        let totalCandidates = 0
        let charterBookings = 0
        let activeDrivers = 0

        if (candidatesResult.status === "fulfilled" && candidatesResult.value?.data) {
          totalCandidates = candidatesResult.value.count || candidatesResult.value.data.length || 0
        }

        if (bookingsResult.status === "fulfilled" && bookingsResult.value?.data) {
          charterBookings = bookingsResult.value.count || bookingsResult.value.data.length || 0
        }

        if (driversResult.status === "fulfilled" && driversResult.value?.data) {
          activeDrivers = driversResult.value.count || driversResult.value.data.length || 0
        }

        setStats({
          totalCandidates,
          charterBookings,
          activeDrivers,
          whatsappMessages: 127,
        })
      } catch (dbError) {
        console.warn("Database query failed, using demo data:", dbError)
        setStats({
          totalCandidates: 245,
          charterBookings: 18,
          activeDrivers: 64,
          whatsappMessages: 127,
        })
      }
    } catch (error) {
      console.error("Error loading dashboard stats:", error)
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

  const refreshStats = () => {
    setLoading(true)
    loadDashboardStats()
  }

  if (!isAuthenticated && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <br />
            <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Bridgeocean Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/candidates/new">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </Link>
            <Button variant="outline" onClick={refreshStats} disabled={loading}>
              {loading ? "..." : "🔄"} Refresh Data
            </Button>
          </div>
        </div>

        {!isSupabaseConfigured() && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Database not configured. Showing demo data. Add your Supabase environment variables to see live data.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meeting-assistant">🎯 Interviews</TabsTrigger>
            <TabsTrigger value="email">📧 Email</TabsTrigger>
            <TabsTrigger value="calendar">📅 Calendar</TabsTrigger>
            <TabsTrigger value="whatsapp">📱 WhatsApp</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
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

          <TabsContent value="meeting-assistant" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Meeting Assistant MVP
                </CardTitle>
                <CardDescription>AI-powered interview preparation for driver candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <MeetingAssistant />
              </CardContent>
            </Card>
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

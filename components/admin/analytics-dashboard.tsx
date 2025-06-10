"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Car, DollarSign, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function AnalyticsDashboard() {
  // Add at the top of the component:
  const [businessMetrics, setBusinessMetrics] = useState({
    charterBookings: 0,
    charterRevenue: 0,
    charterGrowth: 0,
    ehailingDrivers: 0,
    ehailingRevenue: 0,
    ehailingGrowth: 0,
    activePartners: 0,
    pendingPartners: 0,
    partnerGrowth: 0,
    totalCautionFees: 0,
    dailyContributions: 0,
    weeklyRemittances: 0,
    inspectionCompliance: 0,
    serviceCompliance: 0,
    customerSatisfaction: 0,
    avgResponseTime: "15 min",
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBusinessMetrics()
  }, [])

  const loadBusinessMetrics = async () => {
    try {
      // Get charter bookings
      const { data: bookings } = await supabase.from("charter_bookings").select("*")

      // Get active drivers
      const { data: drivers } = await supabase.from("candidates").select("*").eq("status", "active")

      // Get partners
      const { data: partners } = await supabase.from("candidates").select("*").eq("status", "partner")

      // Get pending partners
      const { data: pending } = await supabase.from("candidates").select("*").eq("status", "pending")

      // Calculate metrics
      const charterBookings = bookings?.length || 0
      const ehailingDrivers = drivers?.filter((d) => d.service_type === "ehailing").length || 0
      const activePartners = partners?.length || 0
      const pendingPartners = pending?.length || 0

      setBusinessMetrics({
        charterBookings,
        charterRevenue: charterBookings * 45000, // Average booking value
        charterGrowth: 12.5,
        ehailingDrivers,
        ehailingRevenue: ehailingDrivers * 1800000, // Average monthly revenue per driver
        ehailingGrowth: 18.3,
        activePartners,
        pendingPartners,
        partnerGrowth: 8.7,
        totalCautionFees: ehailingDrivers * 350000,
        dailyContributions: ehailingDrivers * 30000, // 30 days * 1000
        weeklyRemittances: ehailingDrivers * 100000, // Average weekly
        inspectionCompliance: 96,
        serviceCompliance: 88,
        customerSatisfaction: 94,
        avgResponseTime: "15 min",
      })
    } catch (error) {
      console.error("Error loading business metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  // Sample data - in real app, this would come from your database
  // const businessMetrics = {
  //   // Charter service metrics
  //   charterBookings: 245,
  //   charterRevenue: 33500000,
  //   charterGrowth: 12.5,

  //   // E-hailing metrics
  //   ehailingDrivers: 25,
  //   ehailingRevenue: 45200000,
  //   ehailingGrowth: 18.3,

  //   // Partner metrics
  //   activePartners: 25,
  //   pendingPartners: 8,
  //   partnerGrowth: 8.7,

  //   // Financial metrics
  //   totalCautionFees: 8750000, // 25 drivers × ₦350,000
  //   dailyContributions: 750000, // 25 drivers × ₦1,000 × 30 days
  //   weeklyRemittances: 2500000,

  //   // Operational metrics
  //   inspectionCompliance: 96,
  //   serviceCompliance: 88,
  //   customerSatisfaction: 94,
  //   avgResponseTime: "15 min",
  // }

  const monthlyData = [
    { month: "Jan", charter: 45, ehailing: 180, partners: 20, revenue: 12500000 },
    { month: "Feb", charter: 52, ehailing: 195, partners: 22, revenue: 14200000 },
    { month: "Mar", charter: 48, ehailing: 210, partners: 23, revenue: 15800000 },
    { month: "Apr", charter: 61, ehailing: 225, partners: 24, revenue: 17100000 },
    { month: "May", charter: 55, ehailing: 240, partners: 25, revenue: 18900000 },
    { month: "Jun", charter: 67, ehailing: 255, partners: 25, revenue: 20500000 },
  ]

  const vehiclePerformance = [
    {
      vehicle: "Toyota Camry Fleet",
      count: 15,
      charterBookings: 156,
      ehailingTrips: 1850,
      revenue: 25600000,
      utilization: 78,
      avgRating: 4.7,
    },
    {
      vehicle: "GMC Terrain Fleet",
      count: 10,
      charterBookings: 89,
      ehailingTrips: 1200,
      revenue: 22100000,
      utilization: 65,
      avgRating: 4.8,
    },
  ]

  const driverPerformance = [
    {
      name: "Mike Johnson",
      vehicle: "Toyota Camry",
      charterTrips: 23,
      ehailingTrips: 145,
      earnings: 2300000,
      rating: 4.8,
      compliance: 98,
    },
    {
      name: "Sarah Williams",
      vehicle: "GMC Terrain",
      charterTrips: 18,
      ehailingTrips: 120,
      earnings: 3600000,
      rating: 4.9,
      compliance: 95,
    },
    {
      name: "David Chen",
      vehicle: "Toyota Camry",
      charterTrips: 15,
      ehailingTrips: 98,
      earnings: 1500000,
      rating: 4.6,
      compliance: 92,
    },
  ]

  const upcomingEvents = [
    { type: "inspection", date: "2025-06-10", description: "Weekly inspection - All drivers", count: 25 },
    { type: "service", date: "2025-06-28", description: "Bi-monthly service - Group A", count: 12 },
    { type: "remittance", date: "2025-06-08", description: "Weekly remittance due", count: 25 },
    { type: "contract", date: "2025-06-12", description: "New partner contract signing", count: 3 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Charter Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{(businessMetrics.charterRevenue / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{businessMetrics.charterGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-hailing Revenue</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{(businessMetrics.ehailingRevenue / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{businessMetrics.ehailingGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessMetrics.ehailingDrivers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{businessMetrics.partnerGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessMetrics.inspectionCompliance}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charter">Charter Service</TabsTrigger>
          <TabsTrigger value="ehailing">E-hailing Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
                <CardDescription>Key metrics across all services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Charter Bookings</p>
                    <p className="text-2xl font-bold">{businessMetrics.charterBookings}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">E-hailing Trips</p>
                    <p className="text-2xl font-bold">6,375</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Partners</p>
                    <p className="text-2xl font-bold">{businessMetrics.activePartners}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Customer Satisfaction</p>
                    <p className="text-2xl font-bold">{businessMetrics.customerSatisfaction}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.type === "inspection"
                              ? "bg-blue-500"
                              : event.type === "service"
                                ? "bg-orange-500"
                                : event.type === "remittance"
                                  ? "bg-green-500"
                                  : "bg-purple-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{event.description}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{event.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="charter" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Charter Service Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Bookings</span>
                  <span className="font-bold">{businessMetrics.charterBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span className="font-bold">₦{(businessMetrics.charterRevenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Booking Value</span>
                  <span className="font-bold">
                    ₦{Math.round(businessMetrics.charterRevenue / businessMetrics.charterBookings).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Satisfaction</span>
                  <span className="font-bold">{businessMetrics.customerSatisfaction}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Lagos → Ibadan</span>
                  <span className="font-bold">34%</span>
                </div>
                <div className="flex justify-between">
                  <span>Airport Transfers</span>
                  <span className="font-bold">28%</span>
                </div>
                <div className="flex justify-between">
                  <span>Lagos → Abuja</span>
                  <span className="font-bold">18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Corporate Events</span>
                  <span className="font-bold">12%</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Routes</span>
                  <span className="font-bold">8%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Performance - Charter Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclePerformance.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Car className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">{vehicle.vehicle}</h4>
                        <p className="text-sm text-muted-foreground">{vehicle.count} vehicles</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-right">
                      <div>
                        <p className="text-sm text-muted-foreground">Charter Bookings</p>
                        <p className="font-bold">{vehicle.charterBookings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-bold">₦{(vehicle.revenue / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-bold">{vehicle.avgRating}★</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ehailing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessMetrics.ehailingDrivers}</div>
                <p className="text-sm text-muted-foreground">E-hailing fleet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inspection Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessMetrics.inspectionCompliance}%</div>
                <p className="text-sm text-muted-foreground">Weekly inspections</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessMetrics.serviceCompliance}%</div>
                <p className="text-sm text-muted-foreground">Bi-monthly services</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>E-hailing Operations</CardTitle>
              <CardDescription>Driver management and compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Operational Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total E-hailing Trips</span>
                      <span className="font-bold">6,375</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Trips per Driver</span>
                      <span className="font-bold">255</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Remittance Collection</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Contribution Participation</span>
                      <span className="font-bold">88%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Compliance Tracking</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tuesday Inspections</span>
                      <Badge variant="default">96% attendance</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Bi-monthly Services</span>
                      <Badge variant="secondary">88% completion</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Document Compliance</span>
                      <Badge variant="default">94% valid</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle Condition</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Caution Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{(businessMetrics.totalCautionFees / 1000000).toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground">25 drivers × ₦350K</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{(businessMetrics.dailyContributions / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground">Monthly collection</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Remittances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{(businessMetrics.weeklyRemittances / 1000000).toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground">Average per week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{((businessMetrics.charterRevenue + businessMetrics.ehailingRevenue) / 1000000).toFixed(1)}M
                </div>
                <p className="text-sm text-muted-foreground">Combined services</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Breakdown</CardTitle>
              <CardDescription>Revenue streams and financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Revenue Sources</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>E-hailing Operations</span>
                      <span className="font-bold">
                        ₦{(businessMetrics.ehailingRevenue / 1000000).toFixed(1)}M (57%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Charter Services</span>
                      <span className="font-bold">₦{(businessMetrics.charterRevenue / 1000000).toFixed(1)}M (43%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Remittances</span>
                      <span className="font-bold">
                        ₦{((businessMetrics.weeklyRemittances * 4) / 1000000).toFixed(1)}M/month
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Contributions</span>
                      <span className="font-bold">
                        ₦{(businessMetrics.dailyContributions / 1000000).toFixed(1)}M/month
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Financial Security</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Caution Fees (Held)</span>
                      <span className="font-bold">₦{(businessMetrics.totalCautionFees / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Driver Contribution Fund</span>
                      <span className="font-bold">
                        ₦{((businessMetrics.dailyContributions * 3) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Compliance</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Financial Health</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance Leaderboard</CardTitle>
              <CardDescription>Top performing drivers across both services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverPerformance.map((driver, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{driver.name}</h4>
                        <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-right">
                      <div>
                        <p className="text-sm text-muted-foreground">Charter</p>
                        <p className="font-bold">{driver.charterTrips}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-hailing</p>
                        <p className="font-bold">{driver.ehailingTrips}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Earnings</p>
                        <p className="font-bold">₦{(driver.earnings / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-bold">{driver.rating}★</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Driver Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Inspection Attendance</span>
                  <span className="font-bold">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Completion</span>
                  <span className="font-bold">88%</span>
                </div>
                <div className="flex justify-between">
                  <span>Document Validity</span>
                  <span className="font-bold">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Timeliness</span>
                  <span className="font-bold">92%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driver Satisfaction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall Satisfaction</span>
                  <span className="font-bold">4.2/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Response</span>
                  <span className="font-bold">4.5/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Process</span>
                  <span className="font-bold">4.1/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Communication</span>
                  <span className="font-bold">4.3/5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
